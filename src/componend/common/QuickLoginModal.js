import React, { useState, useRef, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { loginWithPhone, verifyOtp } from "../../api/commonApi";
import { __setToken } from "../../api/constant";

const AUTH_TOKEN_KEY = "baofeng_auth_token";
const AUTH_USER_KEY = "baofeng_auth_user";

/**
 * QuickLoginModal
 *
 * Reusable bottom-sheet login modal.
 *
 * Props:
 *   visible        {boolean}   — show/hide
 *   onClose        {fn}        — called when user dismisses without logging in
 *   onLoginSuccess {fn}        — called after successful login (do checkout etc.)
 *   title          {string}    — optional headline (default: "Login to Continue")
 *   subtitle       {string}    — optional subtext
 */
const QuickLoginModal = ({
    visible,
    onClose,
    onLoginSuccess,
    title = "Login to Continue",
    subtitle = "Please login to proceed with your order.",
}) => {
    const [step, setStep] = useState("phone"); // "phone" | "otp"
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(28);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const otpRefs = useRef([]);

    // ── Timer countdown ────────────────────────────────────────
    useEffect(() => {
        if (step !== "otp" || timer <= 0) return;
        const id = setTimeout(() => setTimer((t) => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer, step]);

    // ── Reset when modal opens ─────────────────────────────────
    useEffect(() => {
        if (visible) {
            setStep("phone");
            setPhone("");
            setOtp(["", "", "", ""]);
            setTimer(28);
        }
    }, [visible]);

    // ── Send OTP ───────────────────────────────────────────────
    const handleSendOtp = async () => {
        const trimmed = phone.trim();
        if (trimmed.length < 10) {
            Alert.alert(
                "Invalid Number",
                "Enter a valid 10-digit mobile number.",
            );
            return;
        }
        try {
            setLoading(true);
            const res = await loginWithPhone({
                countryCode: "+91",
                phoneNumber: trimmed,
            });
            if (res?.success) {
                setStep("otp");
                setTimer(28);
                setTimeout(() => otpRefs.current[0]?.focus(), 300);
            } else {
                Alert.alert("Error", res?.message || "Failed to send OTP.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── OTP input handler ──────────────────────────────────────
    const handleOtpChange = (val, idx) => {
        if (/^\d$/.test(val) || val === "") {
            const next = [...otp];
            next[idx] = val;
            setOtp(next);
            if (val && idx < 3) otpRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyPress = (key, idx) => {
        if (key === "Backspace" && !otp[idx] && idx > 0) {
            otpRefs.current[idx - 1]?.focus();
        }
    };

    // ── Verify OTP ─────────────────────────────────────────────
    const handleVerify = async () => {
        const otpStr = otp.join("");
        if (otpStr.length < 4) {
            Alert.alert("Invalid OTP", "Please enter the 4-digit OTP.");
            return;
        }
        try {
            setLoading(true);
            const res = await verifyOtp({
                countryCode: "+91",
                phoneNumber: phone.trim(),
                otp: otpStr,
            });
            if (res?.success && res?.data?.accessToken) {
                __setToken(res.data.accessToken);
                await AsyncStorage.setItem(
                    AUTH_TOKEN_KEY,
                    res.data.accessToken,
                );
                await AsyncStorage.setItem(
                    AUTH_USER_KEY,
                    JSON.stringify(res.data.user),
                );
                onLoginSuccess?.();
            } else {
                Alert.alert(
                    "Invalid OTP",
                    res?.message || "OTP verification failed.",
                );
                setOtp(["", "", "", ""]);
                otpRefs.current[0]?.focus();
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Resend OTP ─────────────────────────────────────────────
    const handleResend = async () => {
        if (timer > 0) return;
        try {
            setResending(true);
            const res = await loginWithPhone({
                countryCode: "+91",
                phoneNumber: phone.trim(),
            });
            if (res?.success) {
                setOtp(["", "", "", ""]);
                setTimer(28);
                otpRefs.current[0]?.focus();
            } else {
                Alert.alert("Error", res?.message || "Failed to resend OTP.");
            }
        } catch {
            Alert.alert("Error", "Network error.");
        } finally {
            setResending(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={s.overlay}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableOpacity
                    style={s.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View style={s.sheet}>
                    {/* Drag handle */}
                    <View style={s.handle} />

                    {/* Close btn */}
                    <TouchableOpacity style={s.closeBtn} onPress={onClose}>
                        <Feather name="x" size={20} color="#64748b" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={s.headerIcon}>
                        <MaterialCommunityIcons
                            name="shield-account-outline"
                            size={34}
                            color="#0069AF"
                        />
                    </View>
                    <Text style={s.title}>{title}</Text>
                    <Text style={s.subtitle}>{subtitle}</Text>

                    {/* ── Step: Phone ── */}
                    {step === "phone" && (
                        <View style={s.body}>
                            <Text style={s.fieldLabel}>MOBILE NUMBER</Text>
                            <View style={s.phoneRow}>
                                <View style={s.countryCode}>
                                    <Text style={s.countryCodeText}>
                                        🇮🇳 +91
                                    </Text>
                                </View>
                                <TextInput
                                    style={s.phoneInput}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder="Enter 10-digit number"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    autoFocus
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    s.actionBtn,
                                    (loading || phone.trim().length < 10) &&
                                        s.actionBtnDisabled,
                                ]}
                                onPress={handleSendOtp}
                                disabled={loading || phone.trim().length < 10}
                                activeOpacity={0.85}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                ) : (
                                    <Text style={s.actionBtnText}>
                                        Send OTP
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* ── Step: OTP ── */}
                    {step === "otp" && (
                        <View style={s.body}>
                            <Text style={s.otpSentText}>
                                OTP sent to{" "}
                                <Text style={s.otpPhone}>+91 {phone}</Text>
                            </Text>

                            {/* 4 OTP boxes */}
                            <View style={s.otpRow}>
                                {otp.map((digit, idx) => (
                                    <TextInput
                                        key={idx}
                                        ref={(r) => (otpRefs.current[idx] = r)}
                                        style={[
                                            s.otpBox,
                                            digit && s.otpBoxFilled,
                                        ]}
                                        value={digit}
                                        onChangeText={(v) =>
                                            handleOtpChange(v, idx)
                                        }
                                        onKeyPress={({ nativeEvent }) =>
                                            handleKeyPress(nativeEvent.key, idx)
                                        }
                                        keyboardType="numeric"
                                        maxLength={1}
                                        textAlign="center"
                                        selectTextOnFocus
                                    />
                                ))}
                            </View>

                            {/* Resend */}
                            <View style={s.resendRow}>
                                {timer > 0 ? (
                                    <Text style={s.timerText}>
                                        Resend in {timer}s
                                    </Text>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleResend}
                                        disabled={resending}
                                    >
                                        {resending ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#0069AF"
                                            />
                                        ) : (
                                            <Text style={s.resendText}>
                                                Resend OTP
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    onPress={() => setStep("phone")}
                                >
                                    <Text style={s.changeText}>
                                        Change number
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[
                                    s.actionBtn,
                                    (loading || otp.join("").length < 4) &&
                                        s.actionBtnDisabled,
                                ]}
                                onPress={handleVerify}
                                disabled={loading || otp.join("").length < 4}
                                activeOpacity={0.85}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                ) : (
                                    <Text style={s.actionBtnText}>
                                        Verify & Continue
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const s = StyleSheet.create({
    overlay: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 24,
        paddingBottom: Platform.OS === "ios" ? 40 : 28,
        alignItems: "center",
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E2E8F0",
        marginBottom: 16,
    },
    closeBtn: {
        position: "absolute",
        top: 20,
        right: 20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },

    // Header
    headerIcon: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: "#EFF9FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "center",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: "#64748b",
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 20,
        paddingHorizontal: 10,
    },

    // Body
    body: { width: "100%" },
    fieldLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 8,
    },

    // Phone row
    phoneRow: {
        flexDirection: "row",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 16,
    },
    countryCode: {
        paddingHorizontal: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFF",
        borderRightWidth: 1,
        borderRightColor: "#e2e8f0",
    },
    countryCodeText: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
    phoneInput: {
        flex: 1,
        height: 52,
        paddingHorizontal: 14,
        fontSize: 16,
        color: "#0f172a",
    },

    // OTP
    otpSentText: {
        fontSize: 13,
        color: "#64748b",
        textAlign: "center",
        marginBottom: 20,
    },
    otpPhone: { color: "#0069AF", fontWeight: "700" },
    otpRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginBottom: 18,
    },
    otpBox: {
        width: 62,
        height: 62,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        backgroundColor: "#F8FAFF",
        fontSize: 24,
        fontWeight: "800",
        color: "#0f172a",
        textAlign: "center",
    },
    otpBoxFilled: { borderColor: "#0069AF", backgroundColor: "#EFF9FF" },

    // Resend row
    resendRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    timerText: { fontSize: 13, color: "#94a3b8", fontWeight: "600" },
    resendText: { fontSize: 13, color: "#0069AF", fontWeight: "700" },
    changeText: { fontSize: 13, color: "#64748b", fontWeight: "600" },

    // Action button
    actionBtn: {
        height: 54,
        backgroundColor: "#0069AF",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    actionBtnDisabled: { opacity: 0.45 },
    actionBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default QuickLoginModal;

import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginWithPhone, verifyOtp } from "../../api/commonApi";
import { __setToken } from "../../api/constant";

const { width, height } = Dimensions.get("window");
const AUTH_TOKEN_KEY = "baofeng_auth_token";
const AUTH_USER_KEY = "baofeng_auth_user";

const OtpScreen = ({ navigation, route }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(28);
    const inputRefs = useRef([]);

    const phoneNumber = route.params?.phoneNumber || "";
    const countryCode = route.params?.countryCode || "+91";
    const displayPhone = `${countryCode} ${phoneNumber}`;

    // ── Countdown timer ────────────────────────────────────────
    useEffect(() => {
        if (timer > 0) {
            const id = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(id);
        }
    }, [timer]);

    const handleOtpChange = (value, index) => {
        if (/^\d$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (key, index) => {
        if (key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // ── Verify OTP ─────────────────────────────────────────────
    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length < 4) {
            Alert.alert("Invalid OTP", "Please enter the 4-digit OTP.");
            return;
        }
        try {
            setLoading(true);
            const res = await verifyOtp({
                countryCode,
                phoneNumber,
                otp: otpString,
            });
            if (res?.success && res?.data?.accessToken) {
                __setToken(res?.data?.accessToken);
                // Save token + user to AsyncStorage
                await AsyncStorage.setItem(
                    AUTH_TOKEN_KEY,
                    res.data.accessToken,
                );
                await AsyncStorage.setItem(
                    AUTH_USER_KEY,
                    JSON.stringify(res.data.user),
                );
                navigation.replace("HomeNavigator");
            } else {
                Alert.alert(
                    "Invalid OTP",
                    res?.message || "OTP verification failed. Try again.",
                );
                setOtp(["", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("OTP verify error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ── Resend OTP ─────────────────────────────────────────────
    const handleResend = async () => {
        if (timer > 0) return;
        try {
            setResending(true);
            const res = await loginWithPhone({ countryCode, phoneNumber });
            if (res?.success) {
                setOtp(["", "", "", ""]);
                setTimer(28);
                inputRefs.current[0]?.focus();
                Alert.alert(
                    "OTP Sent",
                    "A new OTP has been sent to your number.",
                );
            } else {
                Alert.alert("Error", res?.message || "Failed to resend OTP.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setResending(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.card}>
                        {/* Top Blue Section */}
                        <View style={styles.blueHeader}>
                            <Text style={styles.brandText}>BAOFENG</Text>
                            <Text style={styles.heroSubtitle}>
                                Turn your world{"\n"}digital in moments.
                            </Text>
                            <Image
                                source={require("../../assets/images/login_banner.png")}
                                style={styles.illustration}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Bottom Form Section */}
                        <View style={styles.formSection}>
                            <Text style={styles.loginTitle}>
                                Verify Your Number
                            </Text>

                            <Text style={styles.inputContainer}>
                                Enter OTP{" "}
                                <Text style={styles.phoneLabel}>
                                    (Code sent to {displayPhone})
                                </Text>
                            </Text>

                            {/* OTP inputs */}
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) =>
                                            (inputRefs.current[index] = ref)
                                        }
                                        style={[
                                            styles.otpInput,
                                            digit
                                                ? styles.otpInputFilled
                                                : null,
                                        ]}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        value={digit}
                                        onChangeText={(value) =>
                                            handleOtpChange(value, index)
                                        }
                                        onKeyPress={({ nativeEvent }) =>
                                            handleKeyPress(
                                                nativeEvent.key,
                                                index,
                                            )
                                        }
                                        placeholderTextColor="#BDBDBD"
                                        editable={!loading}
                                    />
                                ))}
                            </View>

                            {/* Timer / Resend */}
                            <View style={styles.resendRow}>
                                {timer > 0 ? (
                                    <Text style={styles.timerText}>
                                        Resend OTP in{" "}
                                        <Text style={styles.timerCount}>
                                            {timer}s
                                        </Text>
                                    </Text>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleResend}
                                        disabled={resending}
                                        style={styles.resendBtn}
                                    >
                                        {resending ? (
                                            <ActivityIndicator
                                                color="#0467AB"
                                                size="small"
                                            />
                                        ) : (
                                            <Text style={styles.resendText}>
                                                Resend OTP
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Verify button */}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (loading || otp.join("").length < 4) &&
                                        styles.buttonDisabled,
                                ]}
                                onPress={handleVerify}
                                disabled={loading || otp.join("").length < 4}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        Verify & Continue
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
    flex: { flex: 1, width: "100%" },
    card: {
        backgroundColor: "#F4F9FD",
        overflow: "hidden",
        marginTop: 25,
        width: "100%",
        height: "100%",
    },
    blueHeader: {
        flex: 1.2,
        backgroundColor: "#1B81C4",
        padding: 30,
        margin: 15,
        borderRadius: 20,
        height: 350,
    },
    brandText: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "900",
        fontStyle: "italic",
        letterSpacing: 1,
    },
    heroSubtitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10,
        lineHeight: 28,
    },
    illustration: { width: "100%", height: "70%", marginTop: 10 },
    formSection: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    loginTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2D2D4E",
        marginBottom: 15,
    },
    inputContainer: { marginBottom: 15 },
    phoneLabel: { fontWeight: "400", color: "#7E8494" },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    otpInput: {
        width: "22%",
        height: 50,
        backgroundColor: "#F8F9FB",
        borderWidth: 1,
        borderColor: "#D9DBE9",
        borderRadius: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "500",
        color: "#272848",
    },
    otpInputFilled: {
        borderColor: "#0467AB",
        backgroundColor: "#EBF4FF",
    },
    resendRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
    timerText: { fontSize: 14, color: "#7E8494" },
    timerCount: { fontWeight: "700", color: "#0467AB" },
    resendBtn: { paddingVertical: 4 },
    resendText: { fontSize: 14, color: "#0467AB", fontWeight: "700" },
    button: {
        backgroundColor: "#0467AB",
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
});

export default OtpScreen;

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { loginWithPhone } from "../../api/commonApi";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        const trimmed = phoneNumber.trim();
        if (trimmed.length < 10) {
            Alert.alert(
                "Invalid Number",
                "Please enter a valid 10-digit mobile number.",
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
                navigation.push("Otp", {
                    phoneNumber: trimmed,
                    countryCode: "+91",
                });
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed to send OTP. Try again.",
                );
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
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
                            Login to your BAOFENG Account
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.phoneRow}>
                                <View style={styles.countryCode}>
                                    <Text style={styles.countryCodeText}>
                                        🇮🇳 +91
                                    </Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter mobile number"
                                    placeholderTextColor="#C7C7CD"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                (loading || phoneNumber.length < 10) &&
                                    styles.buttonDisabled,
                            ]}
                            activeOpacity={0.8}
                            onPress={handleContinue}
                            disabled={loading || phoneNumber.length < 10}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Continue</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
    flex: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
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
    inputContainer: { marginBottom: 30 },
    label: {
        fontSize: 14,
        color: "#2D2D4E",
        fontWeight: "600",
        marginBottom: 8,
    },
    phoneRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    countryCode: {
        backgroundColor: "#F0F4F8",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    countryCodeText: { fontSize: 15, color: "#000", fontWeight: "600" },
    input: {
        flex: 1,
        backgroundColor: "#F0F4F8",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#000",
    },
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

export default LoginScreen;

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
} from "react-native";

const { width, height } = Dimensions.get("window");

const OtpScreen = ({ navigation, route }) => {
    // Image shows 4 digits, updated from 6
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(28);
    const inputRefs = useRef([]);
    const phoneNumber = route.params?.phoneNumber || "+91 8011226776";

    useEffect(() => {
        if (timer > 0) {
            const interval = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(interval);
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

                            {/* Replace with your local asset image */}
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
                                    (Code sent to {phoneNumber})
                                </Text>
                            </Text>

                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) =>
                                            (inputRefs.current[index] = ref)
                                        }
                                        style={styles.otpInput}
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

                            <Text style={styles.timerText}>
                                Resend OTP in {timer}s
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    loading && styles.buttonDisabled,
                                ]}
                                onPress={() => {
                                    navigation.push("HomeNavigator");
                                }} // Handle your verification logic here
                                disabled={loading}
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
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    flex: {
        flex: 1,
        width: "100%",
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
    illustration: {
        width: "100%",
        height: "70%",
        marginTop: 10,
    },
    formSection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#272848",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 14,
        color: "#272848",
        fontWeight: "700",
        marginBottom: 20,
    },
    phoneLabel: {
        fontWeight: "400",
        color: "#7E8494",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    otpInput: {
        width: "22%", // Adjusted for 4 digits
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
    timerText: {
        fontSize: 14,
        color: "#7E8494",
        marginBottom: 30,
    },
    loginTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2D2D4E",
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#2D2D4E",
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
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
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default OtpScreen;

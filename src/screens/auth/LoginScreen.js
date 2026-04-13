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
} from "react-native";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");

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
                            Login to your BAOFENG Account
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="XXXXX"
                                placeholderTextColor="#C7C7CD"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.8}
                            onPress={() => navigation.push("Otp")}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    loginTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2D2D4E",
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 30,
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

export default LoginScreen;

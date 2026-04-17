import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";

const AuthPrompt = ({ onLoginPress }) => {
    return (
        <View style={styles.container}>
            {/* Red Profile Placeholder */}
            <View style={styles.avatarContainer}>
                <Image
                    source={require("../../assets/images/na_user.png")}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>

            {/* Message Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>You don.t have login yet!</Text>
                <Text style={styles.subtitle}>Please Login</Text>
            </View>

            {/* Primary Login Button */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={onLoginPress}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 30,
        paddingTop: 0,
        height: 500,
        justifyContent: "center",
    },
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 60,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 30,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
    iconContainer: {
        marginBottom: 40,
    },

    textContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0f172a",
    },
    loginButton: {
        width: "100%",
        maxWidth: 320,
        height: 50,
        backgroundColor: "#0069AF",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "lowercase",
    },
});

export default AuthPrompt;

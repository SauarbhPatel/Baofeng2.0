import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NeedHelp = () => {
    return (
        <View style={styles.container}>
            {/* Chat Icon */}
            <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                    name="chat-processing"
                    size={30}
                    color="#fff"
                />
            </View>

            {/* Text Content */}
            <Text style={styles.title}>Need Help?</Text>
            <Text style={styles.description}>
                Our support team is here to assist you with any questions about
                your order.
            </Text>

            {/* Contact Button */}
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <MaterialCommunityIcons
                    name="chat-outline"
                    size={16}
                    color="#ea580c"
                />
                <Text style={styles.buttonText}>Contact Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ea580c",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    iconWrapper: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        lineHeight: 20,
        marginBottom: 15,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#ffffff",
        borderRadius: 50,
        paddingVertical: 10,
        marginTop: 15,
        gap: 10,
        backgroundColor: "#ffffff",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#ea580c", // Orange text matching the container
    },
});

export default NeedHelp;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const DeliveryAddressBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Ionicons name="location-outline" size={18} color="#0071bc" />
                <Text style={styles.headerTitle}>Delivery Address</Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.nameText}>John Smith</Text>

                <Text style={styles.addressLine}>123 Main Street, Apt 4B</Text>
                <Text style={styles.addressLine}>New York, NY 10001</Text>
                <Text style={styles.addressLine}>United States</Text>
            </View>

            <View style={styles.contactRow}>
                <Feather name="phone" size={14} color="#94a3b8" />
                <Text style={styles.phoneText}>+1 (555) 123-4567</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    addressContainer: {
        marginBottom: 20,
    },
    nameText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
    },
    addressLine: {
        fontSize: 12,
        color: "#64748b", // Slate gray for secondary text
        lineHeight: 20,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    phoneText: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "500",
    },
});

export default DeliveryAddressBox;

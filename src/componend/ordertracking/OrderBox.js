import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderBox = () => {
    return (
        <View style={styles.cardContainer}>
            {/* Header Info */}
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.label}>Order Number</Text>
                    <Text style={styles.orderValue}>BF-2026-0012345</Text>
                </View>
                <View style={styles.alignRight}>
                    <Text style={styles.label}>Expected Delivery</Text>
                    <Text style={styles.deliveryValue}>Today, 6:00 PM</Text>
                </View>
            </View>

            {/* Status Overlay Box */}
            <View style={styles.statusBadge}>
                <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={22}
                    color="#fff"
                />
                <Text style={styles.statusText}>
                    Out for delivery – Your package will arrive soon!
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#0071bc",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    label: {
        color: "rgba(255, 255, 255, 0.8)", // Faded white label
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 8,
    },
    orderValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800", // Bold value
        letterSpacing: 0.5,
    },
    alignRight: {
        alignItems: "flex-end",
    },
    deliveryValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    statusBadge: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 8,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        flex: 1,
    },
});

export default OrderBox;

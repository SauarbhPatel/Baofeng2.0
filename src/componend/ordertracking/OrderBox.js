import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const STATUS_LABEL = {
    PENDING: "Your order has been placed successfully.",
    PROCESSING: "Your order is being prepared for shipment.",
    SHIPPED: "Your order has been picked up by courier.",
    IN_TRANSIT: "Package is out for delivery to your address.",
    DELIVERED: "Package has been delivered to your address.",
};

const OrderBox = ({ order = {} }) => {
    const statusText =
        STATUS_LABEL[order.status] || order.status || "Processing";

    return (
        <View style={styles.cardContainer}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.label}>Order Number</Text>
                    <Text style={styles.orderValue}>
                        {order.orderNumber || "—"}
                    </Text>
                </View>
                <View style={styles.alignRight}>
                    <Text style={styles.label}>Est. Delivery</Text>
                    <Text style={styles.deliveryValue}>
                        {order.shipping?.estimatedDeliveryText || "—"}
                    </Text>
                </View>
            </View>

            <View style={styles.statusBadge}>
                <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={22}
                    color="#fff"
                />
                <Text style={styles.statusText}>{statusText}</Text>
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
        // flexDirection: "row",
        // justifyContent: "space-between",
        marginBottom: 24,
        // flexWrap: "wrap",
    },
    label: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 8,
    },
    orderValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    alignRight: { marginTop: 15 },
    deliveryValue: { color: "#fff", fontSize: 14, fontWeight: "700" },
    statusBadge: {
        backgroundColor: "rgba(255,255,255,0.15)",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 8,
    },
    statusText: { color: "#fff", fontSize: 12, flex: 1 },
});
export default OrderBox;

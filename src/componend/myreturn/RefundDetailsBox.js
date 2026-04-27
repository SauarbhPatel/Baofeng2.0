import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RefundDetailsBox = ({
    subtotal = "₹4,798",
    shipping = "₹0",
    tax = "₹0",
    totalRefund = "₹4,798",
    method = "Original Payment Method",
    time = "3-5 business days after quality check",
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Refund Details</Text>

            {/* Pricing Breakdown */}
            <View style={styles.breakdownContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>{subtotal}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Shipping</Text>
                    <Text style={styles.value}>{shipping}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Tax</Text>
                    <Text style={styles.value}>{tax}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Total Section */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Refund</Text>
                <Text style={styles.totalValue}>{totalRefund}</Text>
            </View>

            {/* Method & Time Box */}
            <View style={styles.infoBox}>
                <View style={styles.section}>
                    <Text style={styles.boxLabel}>REFUND METHOD</Text>
                    <Text style={styles.boxValue}>{method}</Text>
                </View>

                <View style={[styles.section, { marginTop: 15 }]}>
                    <Text style={styles.boxLabel}>ESTIMATED TIME</Text>
                    <Text style={styles.boxValue}>{time}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    breakdownContainer: {
        gap: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 13,
        color: "#64748b",
        fontWeight: "500",
    },
    value: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 20,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
    },
    infoBox: {
        backgroundColor: "#f0f9ff", // Light blue background
        borderRadius: 20,
        padding: 18,
    },
    boxLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    boxValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1e293b",
        lineHeight: 20,
    },
});

export default RefundDetailsBox;

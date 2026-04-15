import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RefundSummary = () => {
    return (
        <View style={styles.cardContainer}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>🧾 {"  "}Refund Summary</Text>
            </View>

            {/* Summary Table */}
            <View style={styles.tableBody}>
                <View style={styles.row}>
                    <Text style={styles.label}>Product</Text>
                    <Text style={styles.value}>UV-5R Radio</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Order ID</Text>
                    <Text style={styles.value}>#BF-20251102</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Order Date</Text>
                    <Text style={styles.value}>29 Oct 2025</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Delivery Date</Text>
                    <Text style={styles.value}>2 Nov 2025</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Item Cost</Text>
                    <Text style={styles.value}>₹2,499</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Shipping Paid</Text>
                    <Text style={styles.value}>₹0 (Free)</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Tax</Text>
                    <Text style={styles.value}>₹449</Text>
                </View>
                <View style={styles.divider} />

                {/* Final Refund Amount */}
                <View style={styles.totalRow}>
                    <Text style={styles.label}>Refund Amount</Text>
                    <Text style={styles.totalValue}>₹2,499</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
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
        marginBottom: 24,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    tableBody: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#eff6ff",
        width: "100%",
    },
    label: {
        fontSize: 13,
        color: "#94a3b8",
    },
    value: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        paddingVertical: 12,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "800", // Heaviest weight for the final amount
        color: "#0071bc", // Signature blue brand color
    },
});

export default RefundSummary;

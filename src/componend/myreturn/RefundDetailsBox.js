import React from "react";
import { StyleSheet, View, Text } from "react-native";

// ── Map API refundMethod code → display label ─────────────────
const METHOD_LABELS = {
    UPI: "UPI",
    BANK: "Bank Transfer",
    BANK_TRANSFER: "Bank Transfer",
    ORIGINAL_CARD: "Original Payment Card",
    STORE_CREDIT: "Store Credit",
};

const RefundDetailsBox = ({ refundMethod, upi, bankDetails, amount = 0 }) => {
    const totalRefund = `₹${Number(amount).toLocaleString("en-IN")}`;
    const methodLabel =
        METHOD_LABELS[refundMethod?.toUpperCase()] || refundMethod || "—";

    // Build refund account detail line
    const accountDetail = (() => {
        if (refundMethod?.toUpperCase() === "UPI" && upi) return upi;
        if (bankDetails?.accountNumber)
            return `A/C: ${bankDetails.accountNumber} • IFSC: ${bankDetails.ifscCode}`;
        return null;
    })();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Refund Details</Text>

            {/* Pricing Breakdown */}
            <View style={styles.breakdownContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>{totalRefund}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Shipping</Text>
                    <Text style={styles.value}>₹0</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Tax</Text>
                    <Text style={styles.value}>₹0</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Total */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Refund</Text>
                <Text style={styles.totalValue}>{totalRefund}</Text>
            </View>

            {/* Method & Time Box */}
            <View style={styles.infoBox}>
                <View style={styles.section}>
                    <Text style={styles.boxLabel}>REFUND METHOD</Text>
                    <Text style={styles.boxValue}>{methodLabel}</Text>
                    {accountDetail && (
                        <Text style={[styles.boxValue, styles.accountDetail]}>
                            {accountDetail}
                        </Text>
                    )}
                </View>

                <View style={[styles.section, { marginTop: 15 }]}>
                    <Text style={styles.boxLabel}>ESTIMATED TIME</Text>
                    <Text style={styles.boxValue}>
                        3-5 business days after quality check
                    </Text>
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
    breakdownContainer: { gap: 12 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: { fontSize: 13, color: "#64748b", fontWeight: "500" },
    value: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
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
    totalLabel: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
    totalValue: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
    infoBox: {
        backgroundColor: "#f0f9ff",
        borderRadius: 20,
        padding: 18,
    },
    section: {},
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
    accountDetail: {
        fontSize: 12,
        color: "#64748b",
        marginTop: 2,
    },
});

export default RefundDetailsBox;

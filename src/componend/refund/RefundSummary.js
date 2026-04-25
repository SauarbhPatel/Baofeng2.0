import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RefundSummary = ({ order }) => {
    if (!order) return null;

    const firstItem = order?.items?.[0];

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const rows = [
        { label: "Product", value: firstItem?.productName || "—" },
        {
            label: "Order ID",
            value: order?.orderNumber ? `#${order.orderNumber}` : "—",
        },
        {
            label: "Order Date",
            value: formatDate(order?.orderDate || order?.createdAt),
        },
        { label: "Delivery Date", value: formatDate(order?.deliveredAt) },
        {
            label: "Item Cost",
            value: firstItem?.unitPrice
                ? `₹${firstItem.unitPrice.toLocaleString("en-IN")}`
                : "—",
        },
        {
            label: "Shipping Paid",
            value:
                order?.shippingFee > 0
                    ? `₹${order.shippingFee.toLocaleString("en-IN")}`
                    : "₹0 (Free)",
        },
        {
            label: "Tax",
            value:
                order?.taxTotal > 0
                    ? `₹${order.taxTotal.toLocaleString("en-IN")}`
                    : "₹0",
        },
    ];

    // Refund amount = item cost (not shipping or tax typically)
    const refundAmount = firstItem?.unitPrice
        ? firstItem.unitPrice * (firstItem.quantity || 1)
        : order?.grandTotal || 0;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>🧾 {"  "}Refund Summary</Text>
            </View>

            <View style={styles.tableBody}>
                {rows.map((row, idx) => (
                    <React.Fragment key={row.label}>
                        <View style={styles.row}>
                            <Text style={styles.label}>{row.label}</Text>
                            <Text style={styles.value} numberOfLines={2}>
                                {row.value}
                            </Text>
                        </View>
                        {idx < rows.length - 1 && (
                            <View style={styles.divider} />
                        )}
                    </React.Fragment>
                ))}

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.label}>Refund Amount</Text>
                    <Text style={styles.totalValue}>
                        ₹{refundAmount.toLocaleString("en-IN")}
                    </Text>
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
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
        flex: 1,
        textAlign: "right",
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
        fontWeight: "800",
        color: "#0071bc",
    },
});

export default RefundSummary;

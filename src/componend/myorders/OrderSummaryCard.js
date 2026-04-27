import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";

// ── Status config ──────────────────────────────────────────────
const STATUS_CONFIG = {
    PENDING: {
        icon: "clock-outline",
        iconType: "MCI",
        color: "#f97316",
        bg: "#fff7ed",
        border: "#fed7aa",
    },
    VERIFIED: {
        icon: "check-circle-outline",
        iconType: "MCI",
        color: "#3b82f6",
        bg: "#eff6ff",
        border: "#bfdbfe",
    },
    PROCESSING: {
        icon: "clock-outline",
        iconType: "MCI",
        color: "#2196f3",
        bg: "#e3f2fd",
        border: "#90caf9",
    },
    SHIPPED: {
        icon: "truck-delivery-outline",
        iconType: "MCI",
        color: "#8b5cf6",
        bg: "#f5f3ff",
        border: "#ddd6fe",
    },
    DELIVERED: {
        icon: "check-circle-outline",
        iconType: "MCI",
        color: "#00c853",
        bg: "#f0fff4",
        border: "#bbf7d0",
    },
    CANCELLED: {
        icon: "close-circle",
        iconType: "ANT",
        color: "#ef4444",
        bg: "#fef2f2",
        border: "#fee2e2",
    },
    RETURNED: {
        icon: "refresh",
        iconType: "FTH",
        color: "#64748b",
        bg: "#f1f5f9",
        border: "#e2e8f0",
    },
};

const getStatusCfg = (s) =>
    STATUS_CONFIG[s?.toUpperCase()] || STATUS_CONFIG.PENDING;

const StatusIcon = ({ cfg }) => {
    if (cfg.iconType === "ANT")
        return <AntDesign name={cfg.icon} size={14} color={cfg.color} />;
    if (cfg.iconType === "FTH")
        return <Feather name={cfg.icon} size={14} color={cfg.color} />;
    return (
        <MaterialCommunityIcons name={cfg.icon} size={14} color={cfg.color} />
    );
};

const OrderSummaryCard = ({
    customerName = "—",
    orderDate = "—",
    orderNo = "—",
    invoiceNo = "—",
    amount = "₹ 0",
    paid = "₹ 0",
    balance = "₹ 0",
    paymentType = "—",
    status = "PENDING",
}) => {
    const cfg = getStatusCfg(status);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Order Summary</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor: cfg.bg,
                                borderColor: cfg.border,
                            },
                        ]}
                    >
                        <StatusIcon cfg={cfg} />
                        <Text style={[styles.statusText, { color: cfg.color }]}>
                            {status}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.qrButton}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={24}
                        color="#475569"
                    />
                </TouchableOpacity>
            </View>

            {/* Main Details */}
            <View style={styles.detailsBox}>
                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>CUSTOMER NAME</Text>
                        <Text style={styles.value}>{customerName}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>ORDER DATE</Text>
                        <Text style={styles.value}>{orderDate}</Text>
                    </View>
                </View>

                <View style={[styles.infoGrid, { marginTop: 15 }]}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>ORDER NO</Text>
                        <Text style={styles.orangeValue}>{orderNo}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>INVOICE NO</Text>
                        <Text style={styles.orangeValue}>{invoiceNo}</Text>
                    </View>
                </View>
            </View>

            {/* Financial Box */}
            <View style={styles.financialBox}>
                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>AMOUNT</Text>
                        <Text style={styles.amountValue}>{amount}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>PAID</Text>
                        <Text style={styles.amountValue}>{paid}</Text>
                    </View>
                </View>
                <View style={[styles.infoGrid, { marginTop: 15 }]}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>BALANCE</Text>
                        <Text style={styles.amountValue}>{balance}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>PAYMENT TYPE</Text>
                        <Text style={styles.amountValue}>{paymentType}</Text>
                    </View>
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
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        alignSelf: "flex-start",
        gap: 6,
    },
    statusText: { fontSize: 13, fontWeight: "600" },
    qrButton: {
        width: 50,
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
    },
    detailsBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
    },
    financialBox: {
        backgroundColor: "#fffbeb",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fef3c7",
    },
    infoGrid: { flexDirection: "row" },
    gridItem: { flex: 1 },
    label: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    value: { fontSize: 15, fontWeight: "600", color: "#1e293b" },
    orangeValue: { fontSize: 15, fontWeight: "600", color: "#f97316" },
    amountValue: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
});

export default OrderSummaryCard;

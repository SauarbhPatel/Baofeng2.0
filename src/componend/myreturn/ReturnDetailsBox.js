import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ── Status config map ──────────────────────────────────────────
const STATUS_CONFIG = {
    APPROVED: {
        icon: "check-circle-outline",
        color: "#00c853",
        bg: "#f0fff4",
        border: "#00c853",
    },
    PROCESSING: {
        icon: "clock-outline",
        color: "#2196f3",
        bg: "#e3f2fd",
        border: "#2196f3",
    },
    REJECTED: {
        icon: "close-circle-outline",
        color: "#f43f5e",
        bg: "#fff1f2",
        border: "#f43f5e",
    },
    COMPLETED: {
        icon: "check-decagram-outline",
        color: "#3B82F6",
        bg: "#eff6ff",
        border: "#3B82F6",
    },
    CANCELLED: {
        icon: "cancel",
        color: "#94a3b8",
        bg: "#f1f5f9",
        border: "#94a3b8",
    },
};

const getStatusConfig = (status) =>
    STATUS_CONFIG[status?.toUpperCase()] || STATUS_CONFIG.PROCESSING;

const ReturnDetailsBox = ({
    returnId = "RET-20391",
    orderId = "#ILM-20391",
    date = "Feb 10, 2026",
    status = "Approved",
    reason = "Product not as described",
    comments = "The product specifications don't match what was shown in the listing. Requesting a full refund.",
}) => {
    const statusCfg = getStatusConfig(status);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Return Details</Text>
                    <Text style={styles.metaText}>{date}</Text>
                </View>

                {/* Status Badge — dynamic */}
                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: statusCfg.bg,
                            borderColor: statusCfg.border,
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name={statusCfg.icon}
                        size={14}
                        color={statusCfg.color}
                    />
                    <Text
                        style={[styles.statusText, { color: statusCfg.color }]}
                    >
                        {status}
                    </Text>
                </View>
            </View>
            <Text style={[styles.metaText, { marginTop: 5, marginBottom: 15 }]}>
                {returnId} • Order: {orderId}
            </Text>

            {/* Information Box */}
            <View style={styles.infoBox}>
                <View style={styles.section}>
                    <Text style={styles.label}>RETURN REASON</Text>
                    <Text style={styles.valueText}>{reason}</Text>
                </View>

                <View style={[styles.section, { marginTop: 15 }]}>
                    <Text style={styles.label}>CUSTOMER COMMENTS</Text>
                    <Text style={styles.valueText}>{comments}</Text>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 4,
    },
    metaText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "800",
    },
    infoBox: {
        backgroundColor: "#f0f9ff",
        borderRadius: 18,
        padding: 16,
    },
    label: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    valueText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1e293b",
        lineHeight: 20,
    },
});

export default ReturnDetailsBox;

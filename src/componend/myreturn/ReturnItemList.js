import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { OrderCardSkeleton } from "../common/SkeletonLoader";

// ── Map API status → color ─────────────────────────────────────
const getStatusColor = (status) => {
    const map = {
        PROCESSING: "#2196f3",
        APPROVED: "#00c853",
        REJECTED: "#f43f5e",
        COMPLETED: "#3B82F6",
        CANCELLED: "#94a3b8",
    };
    return map[status?.toUpperCase()] || "#94a3b8";
};

// ── Map API record → display shape ────────────────────────────
const mapRecord = (item) => ({
    _id: item._id,
    id: item.returnNumber,
    orderId: item.order?.orderNumber,
    date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "",
    status: item.returnExchangeStatus,
    statusColor: getStatusColor(item.returnExchangeStatus),
    indicatorColor: getStatusColor(item.returnExchangeStatus),
    refundAmount:
        item.product?.sellingPrice && item.product?.quantity
            ? `₹${(item.product.sellingPrice * item.product.quantity).toLocaleString("en-IN")}`
            : "—",
    productName: item.product?.productName || "—",
    productCategory: item.reason?.reasonName || "",
    qty: item.product?.quantity || 1,
    price: item.product?.sellingPrice
        ? `₹${item.product.sellingPrice.toLocaleString("en-IN")}`
        : "—",
    tag: item.requestFor || null,
    tagColor: item.requestFor === "EXCHANGE" ? "#ff8f00" : "#0069AF",
    // image: item.media?.imgUrls?.[0] || "https://via.placeholder.com/60",
    image: "https://via.placeholder.com/60",
});

const ReturnItemList = ({ navigation, data = [], loading = false }) => {
    // ── Skeleton ───────────────────────────────────────────────
    if (loading) {
        return (
            <View>
                {Array(3)
                    .fill(null)
                    .map((_, i) => (
                        <OrderCardSkeleton key={i} />
                    ))}
            </View>
        );
    }

    // ── Empty ──────────────────────────────────────────────────
    if (!loading && data.length === 0) {
        return (
            <View style={styles.emptyBox}>
                <Feather name="inbox" size={40} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No returns yet</Text>
                <Text style={styles.emptyText}>
                    Your return & exchange requests will appear here.
                </Text>
            </View>
        );
    }

    // ── List ───────────────────────────────────────────────────
    return (
        <View style={styles.container}>
            {data.map((raw) => {
                const item = mapRecord(raw);
                return (
                    <View key={item._id} style={styles.card}>
                        {/* Left color indicator */}
                        <View
                            style={[
                                styles.indicator,
                                { backgroundColor: item.indicatorColor },
                            ]}
                        />

                        <View style={styles.cardContent}>
                            {/* Header Section */}
                            <View style={styles.cardHeader}>
                                <View style={styles.idSection}>
                                    <Text style={styles.returnId}>
                                        {item.id}
                                    </Text>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            {
                                                backgroundColor:
                                                    item.statusColor + "15",
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                { color: item.statusColor },
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.refundSection}>
                                    <Text style={styles.refundLabel}>
                                        Refund Amount
                                    </Text>
                                    <Text style={styles.refundValue}>
                                        {item.refundAmount}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.orderMeta}>
                                Order: {item.orderId} • {item.date} • 1 Item
                            </Text>

                            {/* Product Nested Card */}
                            <View style={styles.productContainer}>
                                <View style={styles.productRow}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.productImage}
                                    />
                                    <View style={styles.productDetails}>
                                        <Text
                                            style={styles.productName}
                                            numberOfLines={2}
                                        >
                                            {item.productName}
                                        </Text>
                                        <Text style={styles.productCategory}>
                                            {item.productCategory}
                                        </Text>
                                        <Text style={styles.priceText}>
                                            <Text
                                                style={[
                                                    styles.productCategory,
                                                    { fontWeight: "400" },
                                                ]}
                                            >
                                                Qty: {item.qty}
                                            </Text>{" "}
                                            {item.price}
                                        </Text>
                                    </View>
                                </View>

                                {/* Action Buttons Row */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
                                        onPress={() =>
                                            navigation.push("ReturnDetails", {
                                                returnId: item._id,
                                            })
                                        }
                                    >
                                        <Text style={styles.actionBtnText}>
                                            View Details
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.actionBtn,
                                            styles.supportBtn,
                                        ]}
                                        onPress={() =>
                                            navigation.push("SupportTickets")
                                        }
                                    >
                                        <Feather
                                            name="headphones"
                                            size={12}
                                            color="#0069AF"
                                        />
                                        <Text
                                            style={[
                                                styles.actionBtnText,
                                                { color: "#0069AF" },
                                            ]}
                                        >
                                            Support
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { gap: 12 },

    // ── Empty state ───────────────────────────────────────────
    emptyBox: { alignItems: "center", paddingVertical: 40, gap: 8 },
    emptyTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
    emptyText: { fontSize: 13, color: "#94a3b8", textAlign: "center" },

    // ── Card ──────────────────────────────────────────────────
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    indicator: { width: 5, borderRadius: 4 },
    cardContent: { flex: 1, padding: 14 },

    // Header
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    idSection: { gap: 4 },
    returnId: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    statusText: { fontSize: 11, fontWeight: "700" },
    refundSection: { alignItems: "flex-end" },
    refundLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "600" },
    refundValue: { fontSize: 17, fontWeight: "800", color: "#0f172a" },

    orderMeta: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 10,
        lineHeight: 18,
    },

    // Product nested card
    productContainer: {
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        padding: 12,
    },
    productRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
    productImage: {
        width: 55,
        height: 55,
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    productDetails: { flex: 1 },
    productName: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    productCategory: { fontSize: 12, color: "#94a3b8", marginVertical: 2 },
    priceText: { fontSize: 14, fontWeight: "800", color: "#1e293b" },

    // Buttons
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 12,
    },
    actionBtn: {
        flex: 1,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 4,
    },
    supportBtn: { borderColor: "#e0f2fe", backgroundColor: "#f0f9ff" },
    actionBtnText: { fontSize: 11, fontWeight: "700", color: "#64748b" },
});

export default ReturnItemList;

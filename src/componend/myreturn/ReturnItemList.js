import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const ReturnItemList = ({ navigation }) => {
    const returnData = [
        {
            id: "RET-20391",
            orderId: "#ILM-20391",
            date: "Feb 10, 2026",
            itemsCount: 2,
            status: "Approved",
            statusColor: "#00c853",
            refundAmount: "₹4,798",
            productName: "Baofeng BF-888s Licence Free Walkie Talkie",
            productCategory: "Licence Free",
            qty: 1,
            price: "₹3,299",
            tag: "Replacement",
            tagColor: "#ff8f00",
            indicatorColor: "#00c853",
            image: "https://via.placeholder.com/60",
        },
        {
            id: "RET-20387",
            orderId: "#ILM-20387",
            date: "Feb 08, 2026",
            itemsCount: 1,
            status: "Processing",
            statusColor: "#2196f3",
            refundAmount: "₹29,990",
            productName: "Sony WH-1000XM5 Wireless Headphones",
            productCategory: "Black",
            qty: 1,
            price: "₹29,990",
            tag: null,
            indicatorColor: "#2196f3",
            image: "https://via.placeholder.com/60",
        },
    ];

    return (
        <View style={styles.container}>
            {returnData.map((item, index) => (
                <View key={index} style={styles.card}>
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
                                <Text style={styles.returnId}>{item.id}</Text>
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
                            Order: {item.orderId} • {item.date}
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
                                        numberOfLines={1}
                                    >
                                        {item.productName}
                                    </Text>
                                    <Text style={styles.productCategory}>
                                        {item.productCategory} • Qty: {item.qty}
                                    </Text>
                                    <Text style={styles.priceText}>
                                        {item.price}
                                    </Text>
                                </View>
                            </View>

                            {/* Action Buttons Row */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.actionBtn}
                                    onPress={() =>
                                        navigation.push("ReturnDetails")
                                    }
                                >
                                    <Text style={styles.actionBtnText}>
                                        View Details
                                    </Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={styles.actionBtn}>
                                    <Text style={styles.actionBtnText}>
                                        Track Shipment
                                    </Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity
                                    style={[
                                        styles.actionBtn,
                                        styles.supportBtn,
                                    ]}
                                >
                                    <Feather
                                        name="headphones"
                                        size={12}
                                        color="#0064a3"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text
                                        style={[
                                            styles.actionBtnText,
                                            { color: "#0064a3" },
                                        ]}
                                    >
                                        Support
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        marginBottom: 15,
        flexDirection: "row",
        overflow: "hidden",
    },
    indicator: { width: 5, height: "100%" },
    cardContent: { flex: 1, padding: 16 },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    idSection: { flexDirection: "row", alignItems: "center", gap: 8 },
    returnId: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: { fontSize: 11, fontWeight: "700" },
    refundSection: { alignItems: "flex-end" },
    refundLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "600" },
    refundValue: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
    orderMeta: { fontSize: 12, color: "#64748b", marginVertical: 10 },
    productContainer: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
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
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 12,
        flexWrap: "wrap",
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
        minWidth: "48%",
    },
    supportBtn: {
        borderColor: "#e0f2fe",
        backgroundColor: "#f0f9ff",
    },
    actionBtnText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#64748b",
    },
});

export default ReturnItemList;

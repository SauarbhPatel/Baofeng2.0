import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

// --- DATA SOURCE ---
const ORDER_DATA = [
    {
        id: "#LM-20482",
        status: "Shipped",
        date: "Feb 22, 2026",
        items: 3,
        price: "₹1,899",
        total: "₹1,347",
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
    },
    {
        id: "#LM-20483",
        status: "Processing",
        date: "Feb 22, 2026",
        items: 1,
        price: "₹1,899",
        total: "₹1,347",
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
    },
    {
        id: "#LM-20484",
        status: "Delivered",
        date: "Feb 21, 2026",
        items: 2,
        price: "₹1,899",
        total: "₹1,347",
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
    },
];

// --- MAIN SCREEN COMPONENT ---
export default function OrderListing({ activeTab, navigation }) {
    return (
        <FlatList
            data={
                activeTab == "All Orders"
                    ? ORDER_DATA
                    : ORDER_DATA.filter((item) => item?.status == activeTab)
            }
            renderItem={({ item }) => (
                <OrderItem cardData={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 15 }}
        />
    );
}

// --- ITEM COMPONENT ---
const OrderItem = ({ cardData, navigation }) => {
    const { status, id, date, items, price, total, image } = cardData;

    return (
        <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
                <StatusBadge status={status} />
                <Text style={styles.orderIdText}>{id}</Text>
            </View>
            <Text style={styles.cardSubText}>
                {date} • {items} items
            </Text>

            <View style={styles.productInfo}>
                <View style={styles.imgPlaceholder}>
                    <Image
                        source={image}
                        style={{ width: 45, height: 45 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>
                        Baofeng BF-888s Licence Free Walkie Talkie
                    </Text>
                    <Text style={styles.metaText}>Licence Free</Text>
                    <View>
                        <View style={styles.priceRow}>
                            <Text style={styles.qtyLabel}>Qty: 1</Text>
                            <Text style={styles.priceValue}>{price}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Action Area */}
            {status === "Shipped" ? (
                <TrackingTimeline />
            ) : (
                <>
                    <View style={styles.actionSection}>
                        <Text style={styles.totalText}>
                            Order Total:{" "}
                            <Text style={styles.totalAmount}>{total}</Text>
                        </Text>
                        <View style={styles.buttonRow}>
                            {status === "Processing" && (
                                <>
                                    <ActionButton
                                        label="Customer Support"
                                        primary
                                    />
                                    <ActionButton label="Cancel Order" />
                                    <ActionButton
                                        label={"Track Shipment"}
                                        primary={status !== "Processing"}
                                        onPress={() => {
                                            navigation.push("OrderTracking");
                                        }}
                                    />
                                </>
                            )}
                            {status === "Delivered" && (
                                <>
                                    <ActionButton
                                        label="10 Days Left to return"
                                        success
                                    />
                                </>
                            )}
                        </View>
                        <View style={styles.buttonRow}>
                            {status === "Delivered" && (
                                <>
                                    <ActionButton label="Return / Exchange" />
                                    <ActionButton
                                        label="Leave a Review"
                                        warning
                                    />
                                    <ActionButton label="Reorder" primary />
                                    <ActionButton
                                        label="Customer Support"
                                        primary
                                    />
                                    <ActionButton label="Invoice" />
                                </>
                            )}
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const StatusBadge = ({ status }) => {
    const colors = {
        Shipped: { bg: "#E6EFF5", text: "#4A7B9D" },
        Processing: { bg: "#FBF0E3", text: "#C8894A" },
        Delivered: { bg: "#EBF0E8", text: "#7A8C72" },
    };
    const theme = colors[status] || colors.Processing;
    return (
        <View style={[styles.badge, { backgroundColor: theme.bg }]}>
            <View style={[styles.dot, { backgroundColor: theme.text }]} />
            <Text style={[styles.badgeText, { color: theme.text }]}>
                {status}
            </Text>
        </View>
    );
};

const ActionButton = ({
    label,
    primary,
    warning,
    success,
    onPress = () => {},
}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.btn,
            primary && styles.btnPrimary,
            warning && styles.btnWarning,
            success && styles.btnSuccess,
        ]}
    >
        <Text
            style={[
                styles.btnTxt,
                primary && styles.txtWhite,
                warning && styles.txtOrange,
                success && styles.txtGreen,
            ]}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

const TrackingTimeline = () => (
    <View style={styles.timelineBox}>
        <View style={styles.estimateRow}>
            <Text style={styles.estimateText}>
                📍 Expected delivery: Feb 27, 2026
            </Text>
        </View>
        {["Ordered", "Confirmed", "Shipped"].map((step, i) => (
            <View key={i + step} style={styles.step}>
                <View style={styles.indicator}>
                    <View style={styles.activeDot} />
                    <View
                        style={[
                            styles.line,
                            i == 2 && { backgroundColor: "#E8E2D9" },
                        ]}
                    />
                </View>
                <Text style={styles.stepText}>{step}</Text>
            </View>
        ))}
        {["Out for Delivery"].map((step, i) => (
            <View key={i + step} style={styles.step}>
                <View style={styles.indicator}>
                    <View
                        style={[
                            styles.activeDot,
                            {
                                backgroundColor: "#ffffff",
                                borderWidth: 1,
                                borderColor: "#4A7B9D",
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.line,
                            i == 0 && { backgroundColor: "#E8E2D9" },
                        ]}
                    />
                </View>
                <Text style={styles.stepText}>{step}</Text>
            </View>
        ))}
        {["Ordered"].map((step, i) => (
            <View key={i + step} style={styles.step}>
                <View style={styles.indicator}>
                    <View
                        style={[
                            styles.activeDot,
                            { backgroundColor: "#E8E2D9" },
                        ]}
                    />
                </View>
                <Text style={styles.stepText}>{step}</Text>
            </View>
        ))}
    </View>
);

// --- STYLES ---
const styles = StyleSheet.create({
    container: {},
    header: { padding: 20, paddingTop: 40 },
    headerTitle: { fontSize: 28, fontWeight: "800", color: "#1e293b" },
    headerSub: { fontSize: 14, color: "#64748b", marginTop: 4 },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 16,
        gap: 12,
    },
    statCard: {
        width: "47%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        elevation: 2,
    },
    statIconContainer: { padding: 10, borderRadius: 12 },
    statCount: { fontSize: 18, fontWeight: "800" },
    statLabel: { fontSize: 11, color: "#94a3b8" },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 16,
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 15,
        borderWeight: 1,
        borderColor: "#f1f5f9",
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
    tabScroll: { paddingLeft: 16, marginBottom: 10 },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    activeTab: { backgroundColor: "#0070c0", borderColor: "#0070c0" },
    tabText: { fontSize: 13, fontWeight: "600", color: "#64748b" },
    activeTabText: { color: "#fff" },
    listPadding: {},
    orderCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: "#EBEBEB",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 6,
    },
    dot: { width: 6, height: 6, borderRadius: 3 },
    badgeText: { fontSize: 12 },
    orderIdText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#5A4F45",
        backgroundColor: "#F3F0EB",
        padding: 4,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    cardSubText: {
        fontSize: 12,
        color: "#8A7E72",
        marginBottom: 15,
        marginTop: 10,
    },
    productInfo: { flexDirection: "row", gap: 12, marginBottom: 16 },
    imgPlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: "#f1f5f9",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    productName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        width: "70%",
    },
    metaText: { fontSize: 12, color: "#8A7E72", marginTop: 2 },
    priceRow: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
        alignItems: "center",
    },
    qtyLabel: {
        fontSize: 11,
        color: "#64748b",
        backgroundColor: "#f1f5f9",
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    priceValue: { fontSize: 15, fontWeight: "800" },
    actionSection: {
        backgroundColor: "#FAF8F5",
        padding: 16,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#EBEBEB",
    },
    totalText: { color: "#8A7E72", marginBottom: 15 },
    totalAmount: { fontWeight: "800", color: "#1e293b" },
    buttonRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 8,
        flexWrap: "wrap",
    },
    btn: {
        flex: 1,
        minWidth: "48%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8E2D9",
    },
    btnPrimary: { backgroundColor: "#0069AF", borderColor: "#0069AF" },
    btnWarning: { backgroundColor: "#FBF0E3", borderColor: "#FBF0E3" },
    btnSuccess: { backgroundColor: "#EDF3DF", borderColor: "#B2C882" },
    btnTxt: {
        fontSize: 12,
        fontWeight: "600",
        color: "#475569",
        textAlign: "center",
    },
    txtWhite: { color: "#fff" },
    txtOrange: { color: "#C8894A" },
    txtGreen: { color: "#4F6D19" },
    timelineBox: { backgroundColor: "#E6EFF5", padding: 16, borderRadius: 16 },
    estimateRow: { flexDirection: "row", gap: 6, marginBottom: 25 },
    estimateText: { fontSize: 13, color: "#4A7B9D" },
    step: { flexDirection: "row", gap: 10, height: 35 },
    indicator: { alignItems: "center" },
    activeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#4A7B9D",
    },
    line: { width: 1.5, flex: 1, backgroundColor: "#4A7B9D" },
    stepText: { fontSize: 13, color: "#4A7B9D", marginTop: -3 },
});

// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     TextInput,
//     ScrollView,
// } from "react-native";
// import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

// // --- DATA SOURCE ---
// const ORDER_DATA = [
//     {
//         id: "#LM-20482",
//         status: "Shipped",
//         date: "Feb 22, 2026",
//         items: 3,
//         price: "₹1,899",
//         total: "₹1,347",
//         image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//     },
//     {
//         id: "#LM-20483",
//         status: "Processing",
//         date: "Feb 22, 2026",
//         items: 1,
//         price: "₹1,899",
//         total: "₹1,347",
//         image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//     },
//     {
//         id: "#LM-20484",
//         status: "Delivered",
//         date: "Feb 21, 2026",
//         items: 2,
//         price: "₹1,899",
//         total: "₹1,347",
//         image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//     },
// ];

// // --- MAIN SCREEN COMPONENT ---
// export default function OrderListing({ activeTab, navigation }) {
//     return (
//         <FlatList
//             data={
//                 activeTab == "All Orders"
//                     ? ORDER_DATA
//                     : ORDER_DATA.filter((item) => item?.status == activeTab)
//             }
//             renderItem={({ item }) => (
//                 <OrderItem cardData={item} navigation={navigation} />
//             )}
//             keyExtractor={(item) => item.id}
//             scrollEnabled={false}
//             contentContainerStyle={{ gap: 15 }}
//         />
//     );
// }

// // --- ITEM COMPONENT ---
// const OrderItem = ({ cardData, navigation }) => {
//     const { status, id, date, items, price, total, image } = cardData;

//     return (
//         <View style={styles.orderCard}>
//             <View style={styles.cardHeader}>
//                 <StatusBadge status={status} />
//                 <Text style={styles.orderIdText}>{id}</Text>
//             </View>
//             <Text style={styles.cardSubText}>
//                 {date} • {items} items
//             </Text>

//             <View style={styles.productInfo}>
//                 <View style={styles.imgPlaceholder}>
//                     <Image
//                         source={image}
//                         style={{ width: 45, height: 45 }}
//                         resizeMode="contain"
//                     />
//                 </View>
//                 <View style={styles.productDetails}>
//                     <Text style={styles.productName}>
//                         Baofeng BF-888s Licence Free Walkie Talkie
//                     </Text>
//                     <Text style={styles.metaText}>Licence Free</Text>
//                     <View>
//                         <View style={styles.priceRow}>
//                             <Text style={styles.qtyLabel}>Qty: 1</Text>
//                             <Text style={styles.priceValue}>{price}</Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//             {/* Action Area */}
//             {status === "Shipped" ? (
//                 <TrackingTimeline />
//             ) : (
//                 <>
//                     <View style={styles.actionSection}>
//                         <Text style={styles.totalText}>
//                             Order Total:{" "}
//                             <Text style={styles.totalAmount}>{total}</Text>
//                         </Text>
//                         <View style={styles.buttonRow}>
//                             {status === "Processing" && (
//                                 <>
//                                     <ActionButton
//                                         label="Customer Support"
//                                         primary
//                                     />
//                                     <ActionButton label="Cancel Order" />
//                                     <ActionButton
//                                         label={"Track Shipment"}
//                                         primary={status !== "Processing"}
//                                         onPress={() => {
//                                             navigation.push("OrderTracking");
//                                         }}
//                                     />
//                                 </>
//                             )}
//                             {status === "Delivered" && (
//                                 <>
//                                     <ActionButton
//                                         label="10 Days Left to return"
//                                         success
//                                     />
//                                 </>
//                             )}
//                         </View>
//                         <View style={styles.buttonRow}>
//                             {status === "Delivered" && (
//                                 <>
//                                     <ActionButton
//                                         label="Return / Exchange"
//                                         onPress={() => {
//                                             navigation.push("RefundRequest");
//                                         }}
//                                     />
//                                     <ActionButton
//                                         label="Leave a Review"
//                                         warning
//                                     />
//                                     <ActionButton label="Reorder" primary />
//                                     <ActionButton
//                                         label="Customer Support"
//                                         primary
//                                     />
//                                     <ActionButton label="Invoice" />
//                                 </>
//                             )}
//                         </View>
//                     </View>
//                 </>
//             )}
//         </View>
//     );
// };

// const StatusBadge = ({ status }) => {
//     const colors = {
//         Shipped: { bg: "#E6EFF5", text: "#4A7B9D" },
//         Processing: { bg: "#FBF0E3", text: "#C8894A" },
//         Delivered: { bg: "#EBF0E8", text: "#7A8C72" },
//     };
//     const theme = colors[status] || colors.Processing;
//     return (
//         <View style={[styles.badge, { backgroundColor: theme.bg }]}>
//             <View style={[styles.dot, { backgroundColor: theme.text }]} />
//             <Text style={[styles.badgeText, { color: theme.text }]}>
//                 {status}
//             </Text>
//         </View>
//     );
// };

// const ActionButton = ({
//     label,
//     primary,
//     warning,
//     success,
//     onPress = () => {},
// }) => (
//     <TouchableOpacity
//         onPress={onPress}
//         style={[
//             styles.btn,
//             primary && styles.btnPrimary,
//             warning && styles.btnWarning,
//             success && styles.btnSuccess,
//         ]}
//     >
//         <Text
//             style={[
//                 styles.btnTxt,
//                 primary && styles.txtWhite,
//                 warning && styles.txtOrange,
//                 success && styles.txtGreen,
//             ]}
//         >
//             {label}
//         </Text>
//     </TouchableOpacity>
// );

// const TrackingTimeline = () => (
//     <View style={styles.timelineBox}>
//         <View style={styles.estimateRow}>
//             <Text style={styles.estimateText}>
//                 📍 Expected delivery: Feb 27, 2026
//             </Text>
//         </View>
//         {["Ordered", "Confirmed", "Shipped"].map((step, i) => (
//             <View key={i + step} style={styles.step}>
//                 <View style={styles.indicator}>
//                     <View style={styles.activeDot} />
//                     <View
//                         style={[
//                             styles.line,
//                             i == 2 && { backgroundColor: "#E8E2D9" },
//                         ]}
//                     />
//                 </View>
//                 <Text style={styles.stepText}>{step}</Text>
//             </View>
//         ))}
//         {["Out for Delivery"].map((step, i) => (
//             <View key={i + step} style={styles.step}>
//                 <View style={styles.indicator}>
//                     <View
//                         style={[
//                             styles.activeDot,
//                             {
//                                 backgroundColor: "#ffffff",
//                                 borderWidth: 1,
//                                 borderColor: "#4A7B9D",
//                             },
//                         ]}
//                     />
//                     <View
//                         style={[
//                             styles.line,
//                             i == 0 && { backgroundColor: "#E8E2D9" },
//                         ]}
//                     />
//                 </View>
//                 <Text style={styles.stepText}>{step}</Text>
//             </View>
//         ))}
//         {["Ordered"].map((step, i) => (
//             <View key={i + step} style={styles.step}>
//                 <View style={styles.indicator}>
//                     <View
//                         style={[
//                             styles.activeDot,
//                             { backgroundColor: "#E8E2D9" },
//                         ]}
//                     />
//                 </View>
//                 <Text style={styles.stepText}>{step}</Text>
//             </View>
//         ))}
//     </View>
// );

// // --- STYLES ---
// const styles = StyleSheet.create({
//     container: {},
//     header: { padding: 20, paddingTop: 40 },
//     headerTitle: { fontSize: 28, fontWeight: "800", color: "#1e293b" },
//     headerSub: { fontSize: 14, color: "#64748b", marginTop: 4 },
//     statsGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         paddingHorizontal: 16,
//         gap: 12,
//     },
//     statCard: {
//         width: "47%",
//         backgroundColor: "#fff",
//         padding: 16,
//         borderRadius: 20,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 12,
//         elevation: 2,
//     },
//     statIconContainer: { padding: 10, borderRadius: 12 },
//     statCount: { fontSize: 18, fontWeight: "800" },
//     statLabel: { fontSize: 11, color: "#94a3b8" },
//     searchContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         margin: 16,
//         paddingHorizontal: 16,
//         height: 50,
//         borderRadius: 15,
//         borderWeight: 1,
//         borderColor: "#f1f5f9",
//     },
//     searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
//     tabScroll: { paddingLeft: 16, marginBottom: 10 },
//     tab: {
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 20,
//         marginRight: 8,
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: "#f1f5f9",
//     },
//     activeTab: { backgroundColor: "#0070c0", borderColor: "#0070c0" },
//     tabText: { fontSize: 13, fontWeight: "600", color: "#64748b" },
//     activeTabText: { color: "#fff" },
//     listPadding: {},
//     orderCard: {
//         backgroundColor: "#fff",
//         borderRadius: 16,
//         padding: 15,
//         borderWidth: 1,
//         borderColor: "#EBEBEB",
//     },
//     cardHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 4,
//     },
//     badge: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//         gap: 6,
//     },
//     dot: { width: 6, height: 6, borderRadius: 3 },
//     badgeText: { fontSize: 12 },
//     orderIdText: {
//         fontSize: 12,
//         fontWeight: "700",
//         color: "#5A4F45",
//         backgroundColor: "#F3F0EB",
//         padding: 4,
//         borderRadius: 8,
//         paddingHorizontal: 8,
//     },
//     cardSubText: {
//         fontSize: 12,
//         color: "#8A7E72",
//         marginBottom: 15,
//         marginTop: 10,
//     },
//     productInfo: { flexDirection: "row", gap: 12, marginBottom: 16 },
//     imgPlaceholder: {
//         width: 60,
//         height: 60,
//         backgroundColor: "#f1f5f9",
//         borderRadius: 12,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     productName: {
//         fontSize: 14,
//         fontWeight: "600",
//         color: "#1e293b",
//         width: "70%",
//     },
//     metaText: { fontSize: 12, color: "#8A7E72", marginTop: 2 },
//     priceRow: {
//         flexDirection: "row",
//         marginTop: 10,
//         gap: 10,
//         alignItems: "center",
//     },
//     qtyLabel: {
//         fontSize: 11,
//         color: "#64748b",
//         backgroundColor: "#f1f5f9",
//         paddingHorizontal: 6,
//         borderRadius: 4,
//     },
//     priceValue: { fontSize: 15, fontWeight: "800" },
//     actionSection: {
//         backgroundColor: "#FAF8F5",
//         padding: 16,
//         borderRadius: 13,
//         borderWidth: 1,
//         borderColor: "#EBEBEB",
//     },
//     totalText: { color: "#8A7E72", marginBottom: 15 },
//     totalAmount: { fontWeight: "800", color: "#1e293b" },
//     buttonRow: {
//         flexDirection: "row",
//         gap: 8,
//         marginBottom: 8,
//         flexWrap: "wrap",
//     },
//     btn: {
//         flex: 1,
//         minWidth: "48%",
//         height: 40,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#E8E2D9",
//     },
//     btnPrimary: { backgroundColor: "#0069AF", borderColor: "#0069AF" },
//     btnWarning: { backgroundColor: "#FBF0E3", borderColor: "#FBF0E3" },
//     btnSuccess: { backgroundColor: "#EDF3DF", borderColor: "#B2C882" },
//     btnTxt: {
//         fontSize: 12,
//         fontWeight: "600",
//         color: "#475569",
//         textAlign: "center",
//     },
//     txtWhite: { color: "#fff" },
//     txtOrange: { color: "#C8894A" },
//     txtGreen: { color: "#4F6D19" },
//     timelineBox: { backgroundColor: "#E6EFF5", padding: 16, borderRadius: 16 },
//     estimateRow: { flexDirection: "row", gap: 6, marginBottom: 25 },
//     estimateText: { fontSize: 13, color: "#4A7B9D" },
//     step: { flexDirection: "row", gap: 10, height: 35 },
//     indicator: { alignItems: "center" },
//     activeDot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//         backgroundColor: "#4A7B9D",
//     },
//     line: { width: 1.5, flex: 1, backgroundColor: "#4A7B9D" },
//     stepText: { fontSize: 13, color: "#4A7B9D", marginTop: -3 },
// });

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SkeletonBox } from "../common/SkeletonLoader";
import { cancelOrder } from "../../api/commonApi";

// ── Tab → status mapping ───────────────────────────────────────
const TAB_STATUS = {
    // "All Orders": null,
    Processing: ["PROCESSING", "PENDING"],
    Shipped: ["SHIPPED"],
    Delivered: ["DELIVERED"],
    Returned: ["RETURNED"],
    Cancelled: ["CANCELLED", "ABANDONED"],
};

// ── Status badge theme ─────────────────────────────────────────
const STATUS_THEME = {
    PROCESSING: {
        bg: "#FBF0E3",
        text: "#C8894A",
        dot: "#C8894A",
        label: "Processing",
    },
    PENDING: {
        bg: "#FBF0E3",
        text: "#C8894A",
        dot: "#C8894A",
        label: "Pending",
    },
    SHIPPED: {
        bg: "#E6EFF5",
        text: "#4A7B9D",
        dot: "#4A7B9D",
        label: "Shipped",
    },
    DELIVERED: {
        bg: "#EBF0E8",
        text: "#7A8C72",
        dot: "#7A8C72",
        label: "Delivered",
    },
    ABANDONED: {
        bg: "#ededed",
        text: "#838483",
        dot: "#838483",
        label: "Abandoned",
    },
    CANCELLED: {
        bg: "#fef2f2",
        text: "#dc2626",
        dot: "#dc2626",
        label: "Cancelled",
    },
};

const CANCEL_REASONS = [
    "Changed my mind",
    "Found a better price elsewhere",
    "Ordered by mistake",
    "Delivery time too long",
    "Payment issue",
    "Other",
];

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// ── Skeleton row ───────────────────────────────────────────────
const OrderSkeleton = () => (
    <View style={styles.skeletonCard}>
        <View style={styles.skeletonRow}>
            <SkeletonBox width={60} height={60} borderRadius={12} />
            <View style={{ flex: 1, marginLeft: 12, gap: 8 }}>
                <SkeletonBox width="80%" height={13} borderRadius={6} />
                <SkeletonBox width="50%" height={11} borderRadius={6} />
                <SkeletonBox width="35%" height={14} borderRadius={6} />
            </View>
        </View>
        <SkeletonBox
            width="100%"
            height={40}
            borderRadius={10}
            style={{ marginTop: 12 }}
        />
    </View>
);

// ── Cancel Order Modal ─────────────────────────────────────────
const CancelOrderModal = ({ visible, order, onClose, onCancelled }) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [customNote, setCustomNote] = useState("");
    const [cancelling, setCancelling] = useState(false);

    const isOther = selectedReason === "Other";
    const notes = isOther ? customNote.trim() : selectedReason;

    const handleCancel = async () => {
        if (!notes) {
            Alert.alert("Required", "Please select or enter a reason.");
            return;
        }
        try {
            setCancelling(true);
            console.log({ orderId: order._id, notes });
            const res = await cancelOrder({ orderId: order._id, notes });
            if (res?.success) {
                Alert.alert(
                    "Order Cancelled",
                    "Your order has been cancelled successfully.",
                );
                onCancelled();
                onClose();
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Could not cancel order. Please try again.",
                );
            }
        } catch (error) {
            console.log(error.status);
            if (error.status == 400) {
                return Alert.alert(
                    "Error",
                    "This order already has a shipping label and can no longer be cancelled.",
                );
            }
            if (error.status == 404) {
                return Alert.alert("Error", "Order not found");
            }
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setCancelling(false);
        }
    };

    const handleClose = () => {
        setSelectedReason("");
        setCustomNote("");
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={modal.overlay}>
                <View style={modal.sheet}>
                    {/* Header */}
                    <View style={modal.header}>
                        <View>
                            <Text style={modal.title}>Cancel Order</Text>
                            {order?.orderNumber && (
                                <Text style={modal.subtitle}>
                                    #{order.orderNumber}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={handleClose}
                            style={modal.closeBtn}
                        >
                            <Feather name="x" size={20} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <Text style={modal.sectionLabel}>Select a reason</Text>

                        {/* Reason chips */}
                        {CANCEL_REASONS.map((reason) => {
                            const isSelected = selectedReason === reason;
                            return (
                                <TouchableOpacity
                                    key={reason}
                                    style={[
                                        modal.reasonRow,
                                        isSelected && modal.reasonRowSelected,
                                    ]}
                                    onPress={() => setSelectedReason(reason)}
                                >
                                    <View
                                        style={[
                                            modal.radio,
                                            isSelected && modal.radioSelected,
                                        ]}
                                    >
                                        {isSelected && (
                                            <View style={modal.radioInner} />
                                        )}
                                    </View>
                                    <Text
                                        style={[
                                            modal.reasonText,
                                            isSelected &&
                                                modal.reasonTextSelected,
                                        ]}
                                    >
                                        {reason}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        {/* Custom input for "Other" */}
                        {isOther && (
                            <View style={modal.inputWrapper}>
                                <Text style={modal.inputLabel}>
                                    Please describe your reason
                                </Text>
                                <TextInput
                                    style={modal.textArea}
                                    placeholder="Type your reason here..."
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    numberOfLines={4}
                                    value={customNote}
                                    onChangeText={setCustomNote}
                                    textAlignVertical="top"
                                />
                            </View>
                        )}

                        {/* Warning note */}
                        <View style={modal.warningBox}>
                            <Feather
                                name="alert-circle"
                                size={14}
                                color="#f97316"
                            />
                            <Text style={modal.warningText}>
                                This action cannot be undone. Your refund (if
                                applicable) will be processed within 3–5
                                business days.
                            </Text>
                        </View>
                    </ScrollView>

                    {/* Actions */}
                    <View style={modal.actions}>
                        <TouchableOpacity
                            style={modal.keepBtn}
                            onPress={handleClose}
                        >
                            <Text style={modal.keepBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                modal.cancelBtn,
                                (!notes || cancelling) && modal.btnDisabled,
                            ]}
                            onPress={handleCancel}
                            disabled={!notes || cancelling}
                        >
                            {cancelling ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={modal.cancelBtnText}>
                                    Cancel Order
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ── Main component ─────────────────────────────────────────────
export default function OrderListing({
    activeTab,
    orders = [],
    loading,
    navigation,
}) {
    const [cancelModalOrder, setCancelModalOrder] = useState(null);

    if (loading) {
        return (
            <View style={{ gap: 15 }}>
                {[1, 2, 3].map((i) => (
                    <OrderSkeleton key={i} />
                ))}
            </View>
        );
    }

    const statusFilter = TAB_STATUS[activeTab];
    const filtered = statusFilter
        ? orders.filter((o) => statusFilter.includes(o.status))
        : orders;

    if (!filtered.length) {
        return (
            <View style={styles.emptyBox}>
                <Feather name="inbox" size={36} color="#94a3b8" />
                <Text style={styles.emptyText}>No orders found</Text>
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={filtered}
                renderItem={({ item }) => (
                    <OrderItem
                        order={item}
                        navigation={navigation}
                        onCancelPress={() => setCancelModalOrder(item)}
                    />
                )}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 15 }}
            />

            <CancelOrderModal
                visible={!!cancelModalOrder}
                order={cancelModalOrder}
                onClose={() => setCancelModalOrder(null)}
                onCancelled={() => onRefresh?.()}
            />
        </>
    );
}

// ── Single order card ──────────────────────────────────────────
const OrderItem = ({ order, navigation, onCancelPress }) => {
    const theme = STATUS_THEME[order.status] || STATUS_THEME.PENDING;
    const firstItem = order.items?.[0];

    return (
        <View style={styles.orderCard}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: theme.bg }]}>
                    <View
                        style={[styles.dot, { backgroundColor: theme.dot }]}
                    />
                    <Text style={[styles.badgeText, { color: theme.text }]}>
                        {theme.label || order.status}
                    </Text>
                </View>
                {order.orderNumber ? (
                    <Text
                        style={styles.orderIdText}
                        onPress={() =>
                            navigation.push("OrderDetails", {
                                orderId: order._id,
                                orderNumber: order.orderNumber,
                            })
                        }
                    >
                        {order.orderNumber}
                    </Text>
                ) : null}
            </View>

            <Text style={styles.cardSubText}>
                {formatDate(order.orderDate)} • {order.totalItems} item
                {order.totalItems !== 1 ? "s" : ""}
            </Text>

            {/* Product info */}
            {firstItem && (
                <View style={styles.productInfo}>
                    <View style={styles.imgPlaceholder}>
                        <Image
                            source={{ uri: firstItem.mainImageUrl }}
                            style={{ width: 45, height: 45 }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {firstItem.productName}
                        </Text>
                        {firstItem.sellerDetails?.sellerName && (
                            <Text style={styles.metaText} numberOfLines={1}>
                                {firstItem.sellerDetails.sellerName}
                            </Text>
                        )}
                        <View style={styles.priceRow}>
                            <Text style={styles.qtyLabel}>
                                {order.totalItems} item
                                {order.totalItems !== 1 ? "s" : ""}
                            </Text>
                            <Text style={styles.priceValue}>
                                ₹{order.grandTotal?.toLocaleString("en-IN")}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Actions */}
            <View style={styles.actionSection}>
                <Text style={styles.totalText}>
                    Order Total:{" "}
                    <Text style={styles.totalAmount}>
                        ₹{order.grandTotal?.toLocaleString("en-IN")}
                    </Text>
                </Text>
                <View style={styles.buttonRow}>
                    {["PENDING", "PROCESSING"].includes(order.status) && (
                        <>
                            <ActionButton label="Customer Support" />
                            <ActionButton
                                label="Cancel Order"
                                onPress={onCancelPress}
                            />
                            <ActionButton
                                label={"Track Shipment"}
                                primary
                                onPress={() =>
                                    navigation.push("OrderTracking", order)
                                }
                            />
                        </>
                    )}
                    {["SHIPPED"].includes(order.status) && (
                        <>
                            <ActionButton
                                label={"Track Shipment"}
                                onPress={() =>
                                    navigation.push("OrderTracking", order)
                                }
                            />
                            <ActionButton label="Customer Support" primary />
                        </>
                    )}
                    {order.status === "DELIVERED" && (
                        <ActionButton label="10 Days Left to return" success />
                    )}
                </View>
                {order.status === "DELIVERED" && (
                    <>
                        <View style={[styles.buttonRow]}>
                            <ActionButton
                                label="Return / Exchange"
                                onPress={() => {
                                    navigation.push("RefundRequest", {
                                        orderId: order._id,
                                        orderNumber: order.orderNumber,
                                    });
                                }}
                            />

                            <ActionButton label="Leave a Review" warning />
                            <ActionButton label="Reorder" primary />
                            <ActionButton label="Customer Support" primary />
                            <ActionButton label="Invoice" />
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const ActionButton = ({ label, primary, onPress = () => {} }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.btn, primary && styles.btnPrimary]}
    >
        <Text style={[styles.btnTxt, primary && styles.txtWhite]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    // Skeleton
    skeletonCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: "#EBEBEB",
    },
    skeletonRow: { flexDirection: "row" },

    // Order card
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
        gap: 8,
    },
    totalText: { color: "#8A7E72", marginBottom: 7 },
    totalAmount: { fontWeight: "800", color: "#1e293b" },
    buttonRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
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
    btnTxt: {
        fontSize: 12,
        fontWeight: "600",
        color: "#475569",
        textAlign: "center",
    },
    txtWhite: { color: "#fff" },
    emptyBox: { alignItems: "center", paddingVertical: 40, gap: 10 },
    emptyText: { fontSize: 15, color: "#94a3b8", fontWeight: "500" },
    productDetails: { flex: 1 },
});

const modal = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        // maxHeight: "80%",
        minHeight: "75%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    title: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
    subtitle: { fontSize: 13, color: "#64748b", marginTop: 3 },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "#475569",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    reasonRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        marginBottom: 10,
        backgroundColor: "#f8fafc",
        gap: 12,
    },
    reasonRowSelected: {
        borderColor: "#0069AF",
        backgroundColor: "#f0f7ff",
    },
    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
    },
    radioSelected: { borderColor: "#0069AF" },
    radioInner: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#0069AF",
    },
    reasonText: { fontSize: 14, color: "#475569", fontWeight: "500", flex: 1 },
    reasonTextSelected: { color: "#0069AF", fontWeight: "700" },
    inputWrapper: { marginBottom: 14 },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748b",
        marginBottom: 8,
    },
    textArea: {
        backgroundColor: "#f8fafc",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        height: 100,
        fontSize: 14,
        color: "#1e293b",
    },
    warningBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        backgroundColor: "#fff7ed",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#fed7aa",
    },
    warningText: { fontSize: 12, color: "#9a3412", flex: 1, lineHeight: 18 },
    actions: { flexDirection: "row", gap: 12, marginTop: 8 },
    keepBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#0069AF",
    },
    keepBtnText: { color: "#0069AF", fontWeight: "700", fontSize: 15 },
    cancelBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dc2626",
    },
    btnDisabled: { opacity: 0.5 },
    cancelBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

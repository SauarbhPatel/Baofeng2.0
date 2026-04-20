// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native";
// import MainHeader from "../../componend/common/MainHeader";

// const OrderConfirmation = ({ navigation, route }) => {
//     const { orders } = route?.params || {};

//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />

//             <ScrollView
//                 contentContainerStyle={{ paddingTop: 15 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.cardContainer}>
//                     <View style={styles.successArea}>
//                         <SuccessConfetti />
//                         <View style={styles.successCircle}>
//                             <LinearGradient
//                                 colors={["#10b981", "#059669"]}
//                                 style={styles.successGradient}
//                                 start={{ x: 0, y: 0 }}
//                                 end={{ x: 0, y: 1 }}
//                             >
//                                 <Ionicons
//                                     name="checkmark"
//                                     size={36}
//                                     color="#fff"
//                                 />
//                             </LinearGradient>
//                         </View>
//                     </View>

//                     <View style={styles.textCenter}>
//                         <Text style={styles.titleText}>
//                             Thank you for your purchase
//                         </Text>
//                         <Text style={styles.descText}>
//                             Your order has been confirmed and will be shipped
//                             soon. We’ve sent a confirmation email to your inbox.
//                         </Text>
//                     </View>

//                     <View style={styles.summaryCard}>
//                         <View style={styles.summaryRow}>
//                             <View style={styles.iconBoxPurple}>
//                                 <Feather
//                                     name="package"
//                                     size={24}
//                                     color="#fff"
//                                 />
//                             </View>
//                             <View>
//                                 <Text style={styles.cardHeader}>
//                                     Order Summary
//                                 </Text>
//                                 <Text style={styles.orderNo}>
//                                     Order No:{" "}
//                                     <Text style={styles.boldAmount}>
//                                         HGSR2602156001
//                                     </Text>
//                                 </Text>
//                             </View>
//                         </View>

//                         <View style={styles.infoStack}>
//                             <InfoCard
//                                 colors={["#efffff", "#fffefe"]}
//                                 iconName="calendar-outline"
//                                 label="Order Date"
//                                 value="March 13, 2026"
//                                 borderColor="#d0fdfd"
//                                 iconBg="#0ea5e9"
//                             />

//                             <InfoCard
//                                 colors={["#fff2ff", "#fffefe"]}
//                                 iconName="truck-outline"
//                                 label="Est. Delivery"
//                                 value="March 18-20, 2026"
//                                 borderColor="#fee1fe"
//                                 iconBg="#ec4899"
//                             />

//                             <InfoCard
//                                 colors={["#f2fff9", "#fffefe"]}
//                                 iconName="credit-card-outline"
//                                 label="Payment Method"
//                                 value="•••• •••• •••• 4242"
//                                 borderColor="#d8fee1"
//                                 iconBg="#16a34a"
//                             />

//                             <InfoCard
//                                 colors={["#fff8f2", "#fffefe"]}
//                                 iconName="map-marker-outline"
//                                 label="Shipping To"
//                                 value="Mumbai, India"
//                                 borderColor="#fedece"
//                                 iconBg="#f97316"
//                             />
//                         </View>
//                         <View style={styles.actionGrid}>
//                             <ActionButton
//                                 label="Back to Home"
//                                 icon="arrow-back"
//                                 onPress={() => navigation.push("HomeNavigator")}
//                             />
//                             <ActionButton
//                                 label="Share Order"
//                                 icon="share-social-outline"
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// // Sub-components for cleaner structure
// const InfoCard = ({ colors, iconName, label, value, borderColor, iconBg }) => (
//     <View style={[styles.gradientBorderWrapper, { borderColor }]}>
//         <LinearGradient
//             colors={colors}
//             style={styles.infoGradient}
//             start={{ x: 0, y: 0.5 }} // Horizontal Gradient
//             end={{ x: 1, y: 0.5 }}
//         >
//             <View style={[styles.infoIconBox, { backgroundColor: iconBg }]}>
//                 {/* <Ionicons name={iconName} size={20} color="#fff" /> */}
//                 <MaterialCommunityIcons
//                     name={iconName}
//                     size={20}
//                     color="#fff"
//                 />
//             </View>
//             <View>
//                 <Text style={styles.cardLabel}>{label}</Text>
//                 <Text style={styles.cardValue}>{value}</Text>
//             </View>
//         </LinearGradient>
//     </View>
// );

// const ActionButton = ({ label, icon, onPress = () => {} }) => (
//     <TouchableOpacity
//         onPress={onPress}
//         style={styles.btnSecondary}
//         activeOpacity={0.7}
//     >
//         <Ionicons
//             name={icon}
//             size={16}
//             color="#475569"
//             style={styles.btnIcon}
//         />
//         <Text style={styles.btnText}>{label}</Text>
//     </TouchableOpacity>
// );

// // Visual placeholder for confetti dots
// const SuccessConfetti = () => {
//     const dots = [
//         { size: 10, color: "#fef08a", top: -40, left: "20%" }, // Yellow
//         { size: 8, color: "#bbf7d0", top: -30, left: "45%" }, // Green
//         { size: 6, color: "#fef08a", top: -20, left: "70%" }, // Yellow
//         { size: 8, color: "#bef264", top: 30, left: "10%" }, // Lime
//         { size: 10, color: "#fef08a", top: 40, left: "55%" }, // Yellow
//         { size: 6, color: "#fed7aa", top: 50, left: "85%" }, // Orange
//     ];
//     return (
//         <View style={styles.confettiContainer}>
//             {dots.map((dot, i) => (
//                 <View
//                     key={i}
//                     style={[
//                         styles.dot,
//                         {
//                             width: dot.size,
//                             height: dot.size,
//                             borderRadius: dot.size / 2,
//                             backgroundColor: dot.color,
//                             top: dot.top,
//                             left: dot.left,
//                         },
//                     ]}
//                 />
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
//     cardContainer: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },

//     // Confetti & Success Logic
//     successArea: {
//         alignItems: "center",
//         marginVertical: 40,
//         position: "relative",
//     },
//     successCircle: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         padding: 6,
//         backgroundColor: "rgba(5, 150, 105, 0.1)", // Soft green outline glow
//     },
//     successGradient: {
//         width: "100%",
//         height: "100%",
//         borderRadius: 44,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     confettiContainer: { position: "absolute", width: "100%", height: "100%" },
//     dot: { position: "absolute" },

//     // Typography
//     textCenter: {
//         alignItems: "center",
//         marginBottom: 36,
//         paddingHorizontal: 10,
//     },
//     titleText: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#111827",
//         textAlign: "center",
//         marginBottom: 12,
//     },
//     descText: {
//         fontSize: 14,
//         color: "#6b7280",
//         textAlign: "center",
//         lineHeight: 20,
//     },

//     // Summary Card Logic
//     summaryCard: {
//         backgroundColor: "#ffffff",
//         borderRadius: 20,
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: "#E2E8F0",
//     },
//     summaryRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 16,
//         padding: 15,
//         borderBottomWidth: 1,
//         borderColor: "#E2E8F0",
//     },
//     iconBoxPurple: {
//         width: 50,
//         height: 50,
//         borderRadius: 16,
//         backgroundColor: "#7c3aed",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     cardHeader: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
//     orderNo: { fontSize: 12, color: "#6b7280", marginTop: 3 },
//     boldAmount: { fontWeight: "700", color: "#1f2937" },

//     // Info Card & Gradient Logic
//     infoStack: { gap: 15, padding: 15 },
//     gradientBorderWrapper: {
//         borderRadius: 16,
//         borderWidth: 1,
//         overflow: "hidden",
//     }, // Ensures gradient follows curve
//     infoGradient: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 16,
//         gap: 12,
//     },
//     infoIconBox: {
//         width: 44,
//         height: 44,
//         borderRadius: 14,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     cardLabel: {
//         fontSize: 12,
//         color: "#9ca3af",
//         textTransform: "uppercase",
//         letterSpacing: 0.5,
//     },
//     cardValue: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#1f2937",
//         marginTop: 2,
//     },

//     // Button Grid
//     actionGrid: { gap: 12, paddingHorizontal: 15, marginBottom: 15 },
//     btnSecondary: {
//         flexDirection: "row",
//         height: 50,
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: "#e5e7eb",
//         borderRadius: 14,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     btnIcon: { marginRight: 8 },
//     btnText: { fontSize: 14, fontWeight: "600", color: "#475569" },
// });

// export default OrderConfirmation;

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";

const OrderConfirmationScreen = ({ navigation, route }) => {
    const { orderData } = route?.params || {};
    // orderData.orders is the array from placeOrder / verifyRazorpay response
    const order = orderData?.orders?.[0] || null;

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const paymentMethod = order?.payment?.methodName || "—";
    const shippingCity = order?.shippingAddress?.city || "—";
    const deliveryText = order?.shipping?.estimatedDeliveryText || "—";

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                contentContainerStyle={{ paddingTop: 15 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardContainer}>
                    {/* ── Success icon + confetti ────────────────── */}
                    <View style={styles.successArea}>
                        <SuccessConfetti />
                        <View style={styles.successCircle}>
                            <LinearGradient
                                colors={["#10b981", "#059669"]}
                                style={styles.successGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >
                                <Ionicons
                                    name="checkmark"
                                    size={36}
                                    color="#fff"
                                />
                            </LinearGradient>
                        </View>
                    </View>

                    {/* ── Heading ────────────────────────────────── */}
                    <View style={styles.textCenter}>
                        <Text style={styles.titleText}>
                            Thank you for your purchase
                        </Text>
                        <Text style={styles.descText}>
                            Your order has been confirmed and will be shipped
                            soon.
                        </Text>
                    </View>

                    {/* ── Order Summary Card ─────────────────────── */}
                    <View style={styles.summaryCard}>
                        {/* Header */}
                        <View style={styles.summaryRow}>
                            <View style={styles.iconBoxPurple}>
                                <Feather
                                    name="package"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <View>
                                <Text style={styles.cardHeader}>
                                    Order Summary
                                </Text>
                                {order?.orderNumber && (
                                    <Text style={styles.orderNo}>
                                        Order No:{" "}
                                        <Text style={styles.boldAmount}>
                                            {order.orderNumber}
                                        </Text>
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Info cards */}
                        <View style={styles.infoStack}>
                            <InfoCard
                                colors={["#efffff", "#fffefe"]}
                                iconName="calendar-outline"
                                label="Order Date"
                                value={formatDate(order?.createdAt)}
                                borderColor="#d0fdfd"
                                iconBg="#0ea5e9"
                            />
                            <InfoCard
                                colors={["#fff2ff", "#fffefe"]}
                                iconName="truck-outline"
                                label="Est. Delivery"
                                value={deliveryText}
                                borderColor="#fee1fe"
                                iconBg="#ec4899"
                            />
                            <InfoCard
                                colors={["#f2fff9", "#fffefe"]}
                                iconName="credit-card-outline"
                                label="Payment Method"
                                value={paymentMethod}
                                borderColor="#d8fee1"
                                iconBg="#16a34a"
                            />
                            <InfoCard
                                colors={["#fff8f2", "#fffefe"]}
                                iconName="map-marker-outline"
                                label="Shipping To"
                                value={shippingCity}
                                borderColor="#fedece"
                                iconBg="#f97316"
                            />
                        </View>

                        {/* Items in order */}
                        {order?.items?.length > 0 && (
                            <View style={styles.itemsSection}>
                                <Text style={styles.itemsSectionTitle}>
                                    Items Ordered
                                </Text>
                                {order.items.map((item, i) => (
                                    <View key={i} style={styles.itemRow}>
                                        <Image
                                            source={{ uri: item.mainImageUrl }}
                                            style={styles.itemImage}
                                            resizeMode="contain"
                                        />
                                        <View style={styles.itemInfo}>
                                            <Text
                                                style={styles.itemName}
                                                numberOfLines={2}
                                            >
                                                {item.productName}
                                            </Text>
                                            <Text style={styles.itemMeta}>
                                                Qty: {item.quantity} × ₹
                                                {item.unitPrice?.toLocaleString(
                                                    "en-IN",
                                                )}
                                            </Text>
                                        </View>
                                        <Text style={styles.itemTotal}>
                                            ₹
                                            {item.lineTotal?.toLocaleString(
                                                "en-IN",
                                            )}
                                        </Text>
                                    </View>
                                ))}

                                {/* Totals */}
                                <View style={styles.totalsBox}>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>
                                            Subtotal
                                        </Text>
                                        <Text style={styles.totalValue}>
                                            ₹
                                            {order.subtotal?.toLocaleString(
                                                "en-IN",
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>
                                            Shipping
                                        </Text>
                                        <Text style={styles.totalValue}>
                                            ₹
                                            {order.shippingFee?.toLocaleString(
                                                "en-IN",
                                            )}
                                        </Text>
                                    </View>
                                    {order.taxTotal > 0 && (
                                        <View style={styles.totalRow}>
                                            <Text style={styles.totalLabel}>
                                                Tax (GST)
                                            </Text>
                                            <Text style={styles.totalValue}>
                                                ₹
                                                {order.taxTotal?.toLocaleString(
                                                    "en-IN",
                                                )}
                                            </Text>
                                        </View>
                                    )}
                                    <View
                                        style={[
                                            styles.totalRow,
                                            styles.grandTotalRow,
                                        ]}
                                    >
                                        <Text style={styles.grandTotalLabel}>
                                            Grand Total
                                        </Text>
                                        <Text style={styles.grandTotalValue}>
                                            ₹
                                            {order.grandTotal?.toLocaleString(
                                                "en-IN",
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Actions */}
                        <View style={styles.actionGrid}>
                            <ActionButton
                                label="Back to Home"
                                icon="arrow-back"
                                onPress={() => navigation.push("HomeNavigator")}
                            />
                            <ActionButton
                                label="View Orders"
                                icon="list-outline"
                                onPress={() =>
                                    navigation.push("HomeNavigator", {
                                        screen: "Orders",
                                    })
                                }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ── Sub-components ─────────────────────────────────────────────
const InfoCard = ({ colors, iconName, label, value, borderColor, iconBg }) => (
    <View style={[styles.gradientBorderWrapper, { borderColor }]}>
        <LinearGradient
            colors={colors}
            style={styles.infoGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
        >
            <View style={[styles.infoIconBox, { backgroundColor: iconBg }]}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={20}
                    color="#fff"
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel} numberOfLines={1}>
                    {label}
                </Text>
                <Text
                    style={styles.cardValue}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    {value}
                </Text>
            </View>
        </LinearGradient>
    </View>
);

const ActionButton = ({ label, icon, onPress = () => {} }) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.btnSecondary}
        activeOpacity={0.7}
    >
        <Ionicons
            name={icon}
            size={16}
            color="#475569"
            style={styles.btnIcon}
        />
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
);

const SuccessConfetti = () => {
    const dots = [
        { size: 10, color: "#fef08a", top: -40, left: "20%" },
        { size: 8, color: "#bbf7d0", top: -30, left: "45%" },
        { size: 6, color: "#fef08a", top: -20, left: "70%" },
        { size: 8, color: "#bef264", top: 30, left: "10%" },
        { size: 10, color: "#fef08a", top: 40, left: "55%" },
        { size: 6, color: "#fed7aa", top: 50, left: "85%" },
    ];
    return (
        <View style={styles.confettiContainer}>
            {dots.map((dot, i) => (
                <View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            width: dot.size,
                            height: dot.size,
                            borderRadius: dot.size / 2,
                            backgroundColor: dot.color,
                            top: dot.top,
                            left: dot.left,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    cardContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    successArea: {
        alignItems: "center",
        marginVertical: 40,
        position: "relative",
    },
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 6,
        backgroundColor: "rgba(5,150,105,0.1)",
    },
    successGradient: {
        width: "100%",
        height: "100%",
        borderRadius: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    confettiContainer: { position: "absolute", width: "100%", height: "100%" },
    dot: { position: "absolute" },
    textCenter: {
        alignItems: "center",
        marginBottom: 36,
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 12,
    },
    descText: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
        lineHeight: 20,
    },
    summaryCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#E2E8F0",
    },
    iconBoxPurple: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: "#7c3aed",
        justifyContent: "center",
        alignItems: "center",
    },
    cardHeader: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
    orderNo: { fontSize: 12, color: "#6b7280", marginTop: 3 },
    boldAmount: { fontWeight: "700", color: "#1f2937" },
    infoStack: { gap: 15, padding: 15 },
    gradientBorderWrapper: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
    },
    infoGradient: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
    },
    infoIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    cardLabel: {
        fontSize: 12,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    cardValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1f2937",
        marginTop: 2,
        maxWidth: "95%",
    },
    // Items section
    itemsSection: { paddingHorizontal: 15, paddingBottom: 15 },
    itemsSectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 12,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    itemImage: {
        width: 56,
        height: 56,
        borderRadius: 10,
        backgroundColor: "#f1f5f9",
    },
    itemInfo: { flex: 1 },
    itemName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
        lineHeight: 18,
    },
    itemMeta: { fontSize: 12, color: "#64748b", marginTop: 3 },
    itemTotal: { fontSize: 14, fontWeight: "700", color: "#0069AF" },
    totalsBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    totalLabel: { fontSize: 13, color: "#64748b" },
    totalValue: { fontSize: 13, fontWeight: "600", color: "#1e293b" },
    grandTotalRow: {
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 8,
        marginTop: 4,
    },
    grandTotalLabel: { fontSize: 15, fontWeight: "800", color: "#0f172a" },
    grandTotalValue: { fontSize: 16, fontWeight: "800", color: "#0069AF" },
    // Actions
    actionGrid: {
        gap: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        marginTop: 4,
    },
    btnSecondary: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    btnIcon: { marginRight: 8 },
    btnText: { fontSize: 14, fontWeight: "600", color: "#475569" },
});

export default OrderConfirmationScreen;

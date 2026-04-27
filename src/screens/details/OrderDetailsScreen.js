// import React, { useState, useCallback } from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     TouchableOpacity,
//     RefreshControl,
//     ActivityIndicator,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import MainHeader from "../../componend/common/MainHeader";
// import OrderSummaryCard from "../../componend/myorders/OrderSummaryCard";
// import OrderItems from "../../componend/myorders/OrderItems";
// import PriceDetails from "../../componend/myorders/PriceDetails";
// import Addresses from "../../componend/myorders/Addresses";

// const OrderDetailsScreen = ({ navigation, route }) => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" navigation={navigation} />

//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 <OrderSummaryCard />
//                 <OrderItems />
//                 <PriceDetails />
//                 <Addresses />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#D7E9F2" },
//     scrollContent: { paddingTop: 12, paddingBottom: 30 },
// });

// export default OrderDetailsScreen;
import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import OrderSummaryCard from "../../componend/myorders/OrderSummaryCard";
import OrderItems from "../../componend/myorders/OrderItems";
import PriceDetails from "../../componend/myorders/PriceDetails";
import Addresses from "../../componend/myorders/Addresses";
import { OrderDetailsSkeleton } from "../../componend/common/SkeletonLoader";
import { getOrderById } from "../../api/commonApi";

const OrderDetailsScreen = ({ navigation, route }) => {
    const { orderId } = route?.params || {};

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // ── Fetch ──────────────────────────────────────────────────
    const fetchOrder = useCallback(async () => {
        try {
            setError(null);
            const res = await getOrderById(orderId);
            if (res?.success && res?.data) {
                setOrder(res.data);
            } else {
                setError("Failed to load order details.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [orderId]);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchOrder();
        }, [fetchOrder]),
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOrder();
    }, [fetchOrder]);

    // ── Skeleton ───────────────────────────────────────────────
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <OrderDetailsSkeleton />
                </ScrollView>
            </SafeAreaView>
        );
    }

    // ── Error ──────────────────────────────────────────────────
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" navigation={navigation} />
                <View style={styles.centerBox}>
                    <Feather name="alert-circle" size={40} color="#94a3b8" />
                    <Text style={styles.errorTitle}>Something went wrong</Text>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryBtn}
                        onPress={fetchOrder}
                    >
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // ── Helpers ────────────────────────────────────────────────
    const fmt = (n) => Number(n || 0).toLocaleString("en-IN");
    const fmtDate = (iso) =>
        iso
            ? new Date(iso).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "—";
    const joinAddr = (...parts) => parts.filter(Boolean).join(", ");

    const firstSeller = order?.items?.[0]?.sellerDetails;

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                    />
                }
            >
                <OrderSummaryCard
                    customerName={order?.shippingAddress?.fullName}
                    orderDate={fmtDate(order?.createdAt)}
                    orderNo={order?.orderNumber}
                    invoiceNo={order?.invoiceNumber}
                    amount={`₹ ${fmt(order?.grandTotal)}`}
                    paid={
                        order?.paymentStatus === "PAID"
                            ? `₹ ${fmt(order?.grandTotal)}`
                            : "₹ 0"
                    }
                    balance={
                        order?.paymentStatus === "PAID"
                            ? "₹ 0"
                            : `₹ ${fmt(order?.grandTotal)}`
                    }
                    paymentType={order?.payment?.methodCode}
                    status={order?.status}
                />

                <OrderItems
                    items={order?.items?.map((item) => ({
                        id: item.listingBusinessId || item.listingId,
                        name: item.productName,
                        variant: item.sku || "—",
                        quantity: item.quantity,
                        price: `₹ ${fmt(item.unitPrice)}`,
                        delivery: "Home Delivery",
                        image: item.mainImageUrl,
                    }))}
                />

                <PriceDetails
                    basePrice={fmt(order?.subtotal)}
                    coupon="0"
                    discount={fmt(order?.discountTotal)}
                    shipping={fmt(order?.shippingFee)}
                    igst={fmt(order?.gst?.igstAmount)}
                    sgst={fmt(order?.gst?.sgstAmount)}
                    cgst={fmt(order?.gst?.cgstAmount)}
                    grandTotal={fmt(order?.grandTotal)}
                />

                <Addresses
                    deliveryAddress={{
                        name: order?.shippingAddress?.fullName,
                        location: joinAddr(
                            order?.shippingAddress?.addressLine1,
                            order?.shippingAddress?.addressLine2,
                            order?.shippingAddress?.city,
                            order?.shippingAddress?.state?.name,
                            order?.shippingAddress?.postalCode,
                        ),
                        phone: order?.shippingAddress?.phone,
                    }}
                    billingAddress={{
                        name: order?.billingAddress?.fullName,
                        location: joinAddr(
                            order?.billingAddress?.addressLine1,
                            order?.billingAddress?.addressLine2,
                            order?.billingAddress?.city,
                            order?.billingAddress?.state?.name,
                            order?.billingAddress?.postalCode,
                        ),
                        phone: order?.billingAddress?.phone,
                    }}
                    sellerDetail={{
                        name: firstSeller?.sellerName,
                        location: joinAddr(
                            firstSeller?.addressLine1,
                            firstSeller?.addressLine2,
                            firstSeller?.city,
                            firstSeller?.state,
                            firstSeller?.zip,
                        ),
                        phone: firstSeller?.phone,
                        email: firstSeller?.email,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 12, paddingBottom: 30 },
    centerBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 30,
    },
    errorTitle: { fontSize: 17, fontWeight: "700", color: "#1e293b" },
    errorText: { fontSize: 14, color: "#64748b", textAlign: "center" },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 6,
    },
    retryText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});

export default OrderDetailsScreen;

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainHeader from "../../componend/common/MainHeader";
import OrderBox from "../../componend/ordertracking/OrderBox";
import TrackingHistory from "../../componend/ordertracking/TrackingHistory";
import OrderItems from "../../componend/ordertracking/OrderItems";
import DeliveryAddressBox from "../../componend/ordertracking/DeliveryAddressBox";
import CourierDetails from "../../componend/ordertracking/CourierDetails";
import OrderSummary from "../../componend/ordertracking/OrderSummary";
import NeedHelp from "../../componend/ordertracking/NeedHelp";
import { getOrderTracking } from "../../api/commonApi";
import { OrderTrackingSkeleton } from "../../componend/common/OrderTrackingSkeletonLoader";

const AUTH_USER_KEY = "baofeng_auth_user";

const OrderTrackingScreen = ({ navigation, route }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // orderNumber can be passed via route params (from OrderListing Track button)
    const orderNumber = route?.params?.orderNumber || null;

    useEffect(() => {
        if (orderNumber) fetchTracking(orderNumber);
        else setLoading(false);
    }, [orderNumber]);

    const fetchTracking = async (oNum) => {
        try {
            setLoading(true);
            setError(null);
            // Get phone from stored user
            const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
            const user = raw ? JSON.parse(raw) : null;
            const mobile = user?.phoneNumber || "";
            if (!mobile) {
                setError("User not logged in.");
                return;
            }

            const res = await getOrderTracking(mobile, oNum);
            if (res?.success && res?.data) {
                setOrder(res.data);
            } else {
                setError("Order not found.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("OrderTracking error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ── Build tracking history from trackingJourney ────────────
    const buildHistoryData = (trackingJourney = []) => {
        const STATUS_META = {
            PENDING: {
                title: "Order Confirmed",
                icon: "checkmark-done",
                color: "#0071bc",
                desc: "Your order is being prepared for shipment.",
            },
            PROCESSING: {
                title: "Processing",
                icon: "checkmark-done",
                color: "#0071bc",
                desc: "Your order is being prepared for shipment.",
            },
            SHIPPED: {
                title: "Shipped",
                icon: "local-shipping",
                color: "#f97316",
                desc: "Your order has been picked up by courier.",
            },
            OUT_FOR_DELIVERY: {
                title: "Out for Delivery",
                icon: "rocket-launch",
                color: "#f97316",
                desc: "Package is out for delivery to your address",
            },
            DELIVERED: {
                title: "Delivered",
                icon: "glass-cheers",
                color: "#22c55e",
                desc: "Package has been delivered to your address.",
            },
        };

        const ORDER_FLOW = [
            "PENDING",
            "PROCESSING",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
        ];

        // 🔥 Normalize backend status → UI status
        const normalizeStatus = (status) => {
            if (status === "IN_TRANSIT") return "SHIPPED";
            return status;
        };

        // Normalize tracking data
        const normalizedJourney = trackingJourney.map((item) => ({
            ...item,
            status: normalizeStatus(item.status),
        }));

        const currentStatus =
            normalizedJourney[normalizedJourney.length - 1]?.status;

        const currentIndex = ORDER_FLOW.indexOf(currentStatus);
        console.log(currentIndex);

        return ORDER_FLOW.map((statusKey, index) => {
            const meta = STATUS_META[statusKey];

            let statusType = "pending";
            let iconName = meta.icon;
            let color = "#9ca3af"; // gray

            if (index < currentIndex) {
                statusType = "completed";
                iconName = meta.icon;
                color = meta.color;
            } else if (index === currentIndex) {
                statusType = "active";
                iconName = meta.icon;
                color = meta.color;
            }

            console.log(index, currentIndex, statusType);

            const stepData = normalizedJourney.find(
                (s) => s.status === statusKey,
            );

            return {
                title: meta.title,
                description: meta.desc,
                date: stepData?.at
                    ? new Date(stepData.at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                      })
                    : "",
                time: stepData?.at
                    ? new Date(stepData.at).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "",
                status: statusType,
                iconName,
                color,
            };
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            {loading ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    // style={{ backgroundColor: "#fff", marginTop: 1 }}
                >
                    {/* <TrackingSkeleton /> */}
                    <OrderTrackingSkeleton />
                </ScrollView>
            ) : error ? (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                    {orderNumber && (
                        <TouchableOpacity
                            style={styles.retryBtn}
                            onPress={() => fetchTracking(orderNumber)}
                        >
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : !order ? (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>
                        No order tracking data available.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ paddingTop: 15 }}
                    showsVerticalScrollIndicator={false}
                >
                    <OrderBox order={order} />
                    <TrackingHistory
                        historyData={buildHistoryData(order.trackingJourney)}
                    />
                    <OrderItems items={order.items} />
                    <DeliveryAddressBox
                        lable="Delivery Address"
                        address={order.billingAddress}
                    />
                    <DeliveryAddressBox
                        lable="Shipping Address"
                        address={order.shippingAddress}
                    />
                    <CourierDetails shipping={order.shipping} />
                    <OrderSummary order={order} />
                    <NeedHelp />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    errorBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        padding: 20,
    },
    errorText: { fontSize: 15, color: "#64748b", textAlign: "center" },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
    },
    retryText: { color: "#fff", fontWeight: "700" },
});

export default OrderTrackingScreen;

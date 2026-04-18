// import React from "react";
// import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
// import MainHeader from "../../componend/common/MainHeader";
// import DeliveryAddress from "../../componend/checkout/DeliveryAddress";
// import OrderReviewHeader from "../../componend/checkout/OrderReviewHeader";
// import DiscountCodes from "../../componend/checkout/DiscountCodes";
// import BillingSummary from "../../componend/checkout/BillingSummary";
// import ShippingMethod from "../../componend/checkout/ShippingMethod";
// import PaymentMethod from "../../componend/checkout/PaymentMethod";

// const CheckoutScreen = ({ navigation }) => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingTop: 15 }}
//             >
//                 <DeliveryAddress />
//                 <ShippingMethod />
//                 <PaymentMethod />
//                 <OrderReviewHeader />
//                 <DiscountCodes />
//                 <BillingSummary navigation={navigation} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
// });

// export default CheckoutScreen;

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    Alert,
} from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import DeliveryAddress from "../../componend/checkout/DeliveryAddress";
import ShippingMethod from "../../componend/checkout/ShippingMethod";
import PaymentMethod from "../../componend/checkout/PaymentMethod";
import OrderReviewHeader from "../../componend/checkout/OrderReviewHeader";
import DiscountCodes from "../../componend/checkout/DiscountCodes";
import BillingSummary from "../../componend/checkout/BillingSummary";
import {
    registerCart,
    getAbundantOrder,
    getShippingAddresses,
    getShippingMethods,
    placeOrder,
} from "../../api/commonApi";

const CheckoutScreen = ({ navigation, route }) => {
    const { abundantId, cartToken } = route?.params || {};

    // ── State ──────────────────────────────────────────────────
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [placingOrder, setPlacingOrder] = useState(false);

    // ── Init all checkout data ─────────────────────────────────
    useEffect(() => {
        if (abundantId && cartToken) initCheckout();
    }, [abundantId, cartToken]);

    const initCheckout = async () => {
        try {
            setLoading(true);
            const [, abundantRes, addressRes] = await Promise.all([
                registerCart({ cartToken }),
                getAbundantOrder(abundantId),
                getShippingAddresses(),
            ]);

            // Payment methods from abundant order
            if (abundantRes?.success && abundantRes?.data) {
                setOrderData(abundantRes.data);
                const methods =
                    abundantRes.data?.availablePaymentOptions?.methods || [];
                setPaymentMethods(methods);
                if (methods.length > 0) setSelectedPayment(methods[0]);
            }

            // Addresses — auto-select default
            if (abundantRes?.success && Array.isArray(addressRes?.data)) {
                setAddresses(addressRes.data);
                const defaultAddr =
                    addressRes.data.find((a) => a.isDefault) ||
                    addressRes.data[0];
                if (defaultAddr) {
                    setSelectedAddress(defaultAddr);
                    fetchShippingMethods(defaultAddr.postalCode);
                }
            }
        } catch (err) {
            console.error("Checkout init error:", err);
            Alert.alert("Error", "Failed to load checkout details.");
        } finally {
            setLoading(false);
        }
    };

    // ── Fetch shipping methods for selected address ────────────
    const fetchShippingMethods = async (pincode) => {
        try {
            const res = await getShippingMethods(pincode);
            if (res?.success && res?.data?.shippingMethods) {
                setShippingMethods(res.data.shippingMethods);
                setSelectedShipping(res.data.shippingMethods[0] || null);
            }
        } catch (err) {
            console.error("Shipping methods error:", err);
        }
    };

    // ── When user picks a different address ────────────────────
    const handleAddressSelect = (addr) => {
        setSelectedAddress(addr);
        setSelectedShipping(null);
        setShippingMethods([]);
        fetchShippingMethods(addr.postalCode);
    };

    // ── Place Order ────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        console.log("first");
        if (!selectedAddress) {
            Alert.alert("Missing", "Please select a delivery address.");
            return;
        }
        if (!selectedShipping) {
            Alert.alert("Missing", "Please select a shipping method.");
            return;
        }
        if (!selectedPayment) {
            Alert.alert("Missing", "Please select a payment method.");
            return;
        }
        try {
            setPlacingOrder(true);
            const orderId = orderData?._id;
            if (!orderId) throw new Error("Order ID missing");

            const res = await placeOrder(orderId, {
                shippingAddressId: selectedAddress._id,
                shippingMethodId: selectedShipping.id,
                shippingFee: selectedShipping.charges?.codFee || 0,
                paymentMethodId: selectedPayment._id,
                estimatedDeliveryText: selectedShipping.shippingMethodName,
            });

            if (res?.success && res?.data?.orders?.length > 0) {
                navigation.push("OrderConfirmation", { orderData: res.data });
            } else {
                Alert.alert("Error", res?.message || "Failed to place order.");
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("Place order error:", err);
        } finally {
            setPlacingOrder(false);
        }
    };

    // ── Loading state ──────────────────────────────────────────
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" />
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="#0069AF" />
                    <Text style={styles.loadingText}>
                        Preparing your order...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                {/* 1 ── Delivery Address ──────────────────────── */}
                <DeliveryAddress
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onSelect={handleAddressSelect}
                />

                {/* 2 ── Shipping Method ───────────────────────── */}
                <ShippingMethod
                    shippingMethods={shippingMethods}
                    selectedShipping={selectedShipping}
                    onSelect={setSelectedShipping}
                />

                {/* 3 ── Payment Method ────────────────────────── */}
                <PaymentMethod
                    paymentMethods={paymentMethods}
                    selectedPayment={selectedPayment}
                    onSelect={setSelectedPayment}
                />

                {/* 4 ── Order Review (collapsible) ────────────── */}
                <OrderReviewHeader orderData={orderData} />

                {/* 5 ── Discount Codes ────────────────────────── */}
                <DiscountCodes />

                {/* 6 ── Billing Summary + Place Order ─────────── */}
                <BillingSummary
                    orderData={orderData}
                    selectedShipping={selectedShipping}
                    onPlaceOrder={handlePlaceOrder}
                    placingOrder={placingOrder}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    loadingBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    loadingText: { color: "#64748b", fontSize: 14 },
});

export default CheckoutScreen;

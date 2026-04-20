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
import RazorpayCheckout from "react-native-razorpay";
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
    verifyRazorpayPayment,
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

            if (abundantRes?.success && abundantRes?.data) {
                setOrderData(abundantRes.data);
                const methods =
                    abundantRes.data?.availablePaymentOptions?.methods || [];
                setPaymentMethods(methods);
                if (methods.length > 0) setSelectedPayment(methods[0]);
            }

            if (addressRes?.success && Array.isArray(addressRes?.data)) {
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

    const handleAddressSelect = (addr) => {
        setSelectedAddress(addr);
        setSelectedShipping(null);
        setShippingMethods([]);
        fetchShippingMethods(addr.postalCode);
    };

    // ── Place Order — branches on payment method ───────────────
    const handlePlaceOrder = async () => {
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

            const payload = {
                shippingAddressId: selectedAddress._id,
                shippingMethodId: selectedShipping.id,
                shippingFee: selectedShipping.charges?.codFee || 0,
                paymentMethodId: selectedPayment._id,
                estimatedDeliveryText: selectedShipping.shippingMethodName,
            };

            const res = await placeOrder(orderId, payload);

            if (!res?.success) {
                Alert.alert("Error", res?.message || "Failed to place order.");
                return;
            }

            const isCOD = selectedPayment?.methodCode === "COD";
            const isRazorpay = selectedPayment?.methodCode === "RAZORPAY";

            // ── COD flow ───────────────────────────────────────
            if (isCOD && res?.data?.orders?.length > 0) {
                navigation.push("OrderConfirmation", { orderData: res.data });
                return;
            }

            // ── Razorpay flow ──────────────────────────────────
            if (isRazorpay && res?.data) {
                const rzpData = res.data;

                const options = {
                    description: "Baofeng Order Payment",
                    image: "https://baofengradios.s3.ap-south-1.amazonaws.com/image-1763203968899.png",
                    currency: rzpData.currency || "INR",
                    key: rzpData.paymentCred,
                    amount: rzpData.Total, // in paise
                    order_id: rzpData.orderId,
                    name: "Baofeng Radios",
                    prefill: {
                        name: rzpData.user?.name || "",
                        contact: rzpData.user?.phone || "",
                    },
                    theme: { color: "#0069AF" },
                };

                RazorpayCheckout.open(options)
                    .then(async (razorpayData) => {
                        // Payment successful — verify with backend
                        try {
                            const verifyRes = await verifyRazorpayPayment(
                                orderId,
                                {
                                    razorpayOrderId:
                                        razorpayData.razorpay_order_id,
                                    razorpayPaymentId:
                                        razorpayData.razorpay_payment_id,
                                    razorpaySignature:
                                        razorpayData.razorpay_signature,
                                },
                            );

                            if (
                                verifyRes?.success &&
                                verifyRes?.data?.orders?.length > 0
                            ) {
                                navigation.push("OrderConfirmation", {
                                    orderData: verifyRes.data,
                                });
                            } else {
                                Alert.alert(
                                    "Error",
                                    "Payment verification failed. Contact support.",
                                );
                            }
                        } catch {
                            Alert.alert(
                                "Error",
                                "Payment verification network error.",
                            );
                        } finally {
                            setPlacingOrder(false);
                        }
                    })
                    .catch((error) => {
                        // User cancelled or payment failed
                        console.log("Razorpay error:", error);
                        Alert.alert(
                            "Payment Cancelled",
                            // error?.description || "Payment was not completed.",
                            "Payment was not completed.",
                        );
                        setPlacingOrder(false);
                    });

                // Don't set placingOrder=false here — done inside then/catch
                return;
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("Place order error:", err);
        } finally {
            // Only reset for COD/error paths — Razorpay resets in then/catch
            if (selectedPayment?.methodCode !== "RAZORPAY") {
                setPlacingOrder(false);
            }
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
                <DeliveryAddress
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onSelect={handleAddressSelect}
                />
                <ShippingMethod
                    shippingMethods={shippingMethods}
                    selectedShipping={selectedShipping}
                    onSelect={setSelectedShipping}
                />
                <PaymentMethod
                    paymentMethods={paymentMethods}
                    selectedPayment={selectedPayment}
                    onSelect={setSelectedPayment}
                />
                <OrderReviewHeader orderData={orderData} />
                <DiscountCodes />
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

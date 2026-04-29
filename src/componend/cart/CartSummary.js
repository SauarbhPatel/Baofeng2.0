import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkoutOrder, registerCart } from "../../api/commonApi";
import QuickLoginModal from "../common/QuickLoginModal";

const CART_TOKEN_KEY = "baofeng_cart_token";
const AUTH_TOKEN_KEY = "baofeng_auth_token";

const CartSummary = ({ navigation, cartItems = [] }) => {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.unitSellingPrice * item.quantity,
        0,
    );
    const tax = 0;
    const discount = 0;
    const grandTotal = subtotal + tax - discount;

    // ── Core checkout logic (runs whether or not login modal was used) ─
    const proceedToCheckout = async () => {
        try {
            setCheckoutLoading(true);
            const cartToken = await AsyncStorage.getItem(CART_TOKEN_KEY);
            if (!cartToken) {
                Alert.alert(
                    "Error",
                    "Cart session not found. Please try again.",
                );
                return;
            }
            await registerCart({ cartToken });
            const res = await checkoutOrder({
                cartToken,
                discountTotal: discount,
                taxTotal: tax,
            });
            if (res?.success && res?.data) {
                navigation.push("Checkout", {
                    abundantId: res.data.abundantId,
                    cartToken,
                    checkoutData: res.data,
                });
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Checkout failed. Please try again.",
                );
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setCheckoutLoading(false);
        }
    };

    // ── Checkout button tap — check auth first ─────────────────
    const handleCheckout = async () => {
        try {
            const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            if (!token) {
                // Not logged in — show quick login modal
                setShowLoginModal(true);
                return;
            }
            // Already logged in — go straight to checkout
            proceedToCheckout();
        } catch {
            proceedToCheckout(); // fallback on storage error
        }
    };

    // ── After QuickLoginModal succeeds ─────────────────────────
    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        proceedToCheckout();
    };

    return (
        <>
            <View style={styles.container}>
                {/* Price Breakdown */}
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal:</Text>
                    <Text style={styles.value}>
                        ₹{subtotal.toLocaleString("en-IN")}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Discount:</Text>
                    <Text style={[styles.value, styles.discountText]}>
                        - ₹{discount.toLocaleString("en-IN")}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tax:</Text>
                    <Text style={[styles.value, styles.taxText]}>
                        + ₹{tax.toLocaleString("en-IN")}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Grand Total */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Grand Total:</Text>
                    <Text style={styles.totalValue}>
                        ₹{Math.max(0, grandTotal).toLocaleString("en-IN")}
                    </Text>
                </View>

                {/* Checkout button */}
                <TouchableOpacity
                    style={[
                        styles.checkoutBtn,
                        checkoutLoading && styles.checkoutDisabled,
                    ]}
                    onPress={handleCheckout}
                    disabled={checkoutLoading}
                    activeOpacity={0.85}
                >
                    {checkoutLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.checkoutText}>
                            Proceed to Checkout
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Payment Methods Footer */}
                <View style={styles.paymentFooter}>
                    {[
                        require("../../assets/images/payment_partener/1.png"),
                        require("../../assets/images/payment_partener/2.png"),
                        require("../../assets/images/payment_partener/3.png"),
                        require("../../assets/images/payment_partener/4.png"),
                        require("../../assets/images/payment_partener/5.png"),
                    ].map((n, i) => (
                        <View key={i + "paymentBox"} style={styles.paymentBox}>
                            <Image
                                source={n}
                                style={styles.paymentImage}
                                resizeMode="contain"
                            />
                        </View>
                    ))}
                </View>
            </View>
            {/* Quick Login Modal */}
            <QuickLoginModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
                title="Login to Checkout"
                subtitle="Please login to proceed with your order. It only takes a moment!"
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    label: { fontSize: 15, color: "#64748b" },
    value: { fontSize: 15, color: "#1e293b", fontWeight: "600" },
    discountText: { color: "#ef4444" },
    taxText: { color: "#22c55e" },
    divider: { height: 1, backgroundColor: "#e2e8f0" },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        marginTop: 8,
    },
    totalLabel: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
    totalValue: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
    checkoutBtn: {
        backgroundColor: "#0275d8",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    checkoutDisabled: { opacity: 0.5 },
    checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    paymentFooter: { flexDirection: "row", justifyContent: "center", gap: 8 },
    paymentBox: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
        height: 32,
    },
    paymentImage: { width: 40, height: 22 },
});

export default CartSummary;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CartSummary = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Price Breakdown */}
            <View style={styles.row}>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>₹1403.97</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Discount:</Text>
                <Text style={[styles.value, styles.discountText]}>
                    - ₹60.00
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Tax:</Text>
                <Text style={[styles.value, styles.taxText]}>+ ₹14.00</Text>
            </View>

            <View style={styles.divider} />

            {/* Grand Total */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total:</Text>
                <Text style={styles.totalValue}>₹1357.97</Text>
            </View>

            {/* Checkout Action */}
            <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => navigation.push("Checkout")}
            >
                <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>

            {/* Payment Methods Footer */}
            <View style={styles.paymentFooter}>
                <View style={styles.paymentBox}>
                    <Image
                        source={require("../../assets/images/payment_partener/1.png")}
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.paymentBox}>
                    <Image
                        source={require("../../assets/images/payment_partener/2.png")}
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.paymentBox}>
                    <Image
                        source={require("../../assets/images/payment_partener/3.png")}
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.paymentBox}>
                    <Image
                        source={require("../../assets/images/payment_partener/4.png")}
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.paymentBox}>
                    <Image
                        source={require("../../assets/images/payment_partener/5.png")}
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
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
    label: {
        fontSize: 15,
        color: "#64748b",
        // fontWeight: "500",
    },
    value: {
        fontSize: 15,
        color: "#1e293b",
        fontWeight: "600",
    },
    discountText: {
        color: "#ef4444",
    },
    taxText: {
        color: "#22c55e",
    },
    divider: {
        height: 1,
        backgroundColor: "#e2e8f0",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: "800",
        color: "#0f172a",
    },
    totalValue: {
        fontSize: 17,
        fontWeight: "800",
        color: "#0f172a",
    },
    checkoutBtn: {
        backgroundColor: "#0275d8",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    checkoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    paymentFooter: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
    },
    paymentLogo: {
        width: 50,
        height: 30,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
    },
    miniLogoText: {
        fontSize: 8,
        fontWeight: "bold",
        color: "#94a3b8",
    },
    paymentFooter: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
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
    paymentImage: {
        width: 40,
        height: 22,
    },
});

export default CartSummary;

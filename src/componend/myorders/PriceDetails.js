import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PriceDetails = ({
    basePrice = "0",
    coupon = "0",
    discount = "0",
    shipping = "0",
    igst = "0.00",
    sgst = "0",
    cgst = "0",
    grandTotal = "0",
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Price Details</Text>

            {/* Pricing Breakdown */}
            <View style={styles.row}>
                <Text style={styles.label}>Base Price</Text>
                <Text style={styles.value}>₹ {basePrice}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Coupon</Text>
                <Text style={styles.value}>({coupon})</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Discount Amount</Text>
                <Text style={styles.value}>{discount}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Shipping</Text>
                <Text style={styles.value}>{shipping}</Text>
            </View>

            {/* Tax Breakdown */}
            <View style={styles.row}>
                <Text style={styles.label}>IGST</Text>
                <Text style={styles.value}>{igst}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>SGST</Text>
                <Text style={styles.value}>{sgst}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>CGST</Text>
                <Text style={styles.value}>{cgst}</Text>
            </View>

            {/* Footer Section */}
            <View style={styles.divider} />

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>₹ {grandTotal}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0070ba",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.8)", // Semi-transparent white for labels
        fontWeight: "500",
    },
    value: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle white divider
        marginVertical: 15,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
});

export default PriceDetails;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const OrderSummary = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Order Summary</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>₹116.97</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Shipping</Text>
                <Text style={styles.value}>₹8.99</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Tax</Text>
                <Text style={styles.value}>₹10.05</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹136.01</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Feather name="download" size={16} color="#0071bc" />
                <Text style={styles.buttonText}>Download Invoice</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        color: "#94a3b8",
    },
    value: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 6,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0071bc",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#0071bc",
        borderRadius: 50,
        paddingVertical: 10,
        marginTop: 15,
        gap: 10,
        backgroundColor: "#F5F9FD",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0071bc",
    },
});

export default OrderSummary;

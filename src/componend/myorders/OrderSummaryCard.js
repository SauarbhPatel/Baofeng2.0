import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const OrderSummaryCard = ({
    customerName = "ABDUL QUADIR",
    orderDate = "11 Feb 2026",
    orderNo = "HGSR260069",
    invoiceNo = "HGSR115111",
    amount = "₹ 5,499",
    paid = "₹ 0",
    balance = "₹ 5,499",
    paymentType = "COD",
}) => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Order Summary</Text>
                    <View style={styles.statusBadge}>
                        <AntDesign
                            name="close-circle"
                            size={14}
                            color="#ef4444"
                        />
                        <Text style={styles.statusText}>Cancelled</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.qrButton}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={24}
                        color="#475569"
                    />
                </TouchableOpacity>
            </View>

            {/* Main Details */}
            <View style={styles.detailsBox}>
                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>CUSTOMER NAME</Text>
                        <Text style={styles.value}>{customerName}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>ORDER DATE</Text>
                        <Text style={styles.value}>{orderDate}</Text>
                    </View>
                </View>

                <View style={[styles.infoGrid, { marginTop: 15 }]}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>ORDER NO</Text>
                        <Text style={styles.orangeValue}>{orderNo}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>INVOICE NO</Text>
                        <Text style={styles.orangeValue}>{invoiceNo}</Text>
                    </View>
                </View>
            </View>

            {/* Financial Summary Box */}
            <View style={styles.financialBox}>
                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>ORDER AMOUNT</Text>
                        <Text style={styles.amountValue}>{amount}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>PAID</Text>
                        <Text style={styles.amountValue}>{paid}</Text>
                    </View>
                </View>

                <View style={[styles.infoGrid, { marginTop: 15 }]}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>BALANCE</Text>
                        <Text style={styles.amountValue}>{balance}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>PAYMENT TYPE</Text>
                        <Text style={styles.value}>{paymentType}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fef2f2",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#fee2e2",
        alignSelf: "flex-start",
        gap: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#ef4444",
    },
    qrButton: {
        width: 50,
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
    },
    detailsBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
    },
    financialBox: {
        backgroundColor: "#fffbeb", // Light yellow background
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fef3c7",
    },
    infoGrid: {
        flexDirection: "row",
    },
    gridItem: {
        flex: 1,
    },
    label: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    value: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1e293b",
    },
    orangeValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#f97316", // Custom orange for IDs
    },
    amountValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#0f172a",
    },
});

export default OrderSummaryCard;

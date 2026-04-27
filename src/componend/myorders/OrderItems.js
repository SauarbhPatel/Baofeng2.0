import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const OrderItems = ({ items = [] }) => {
    // Mock data structure based on your UI requirements
    const defaultItems = [
        {
            id: "ITM-2602-00104",
            name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
            variant: "Standard",
            quantity: 1,
            price: "₹ 21,177.96",
            delivery: "Home Delivery",
            image: "https://via.placeholder.com/100",
        },
        {
            id: "ITM-2602-00105",
            name: "Rechargeable Battery Pack",
            variant: "1500mAh",
            quantity: 1,
            price: "₹ 1,499.00",
            delivery: "Home Delivery",
            image: "https://via.placeholder.com/100",
        },
    ];

    const displayItems = items.length > 0 ? items : defaultItems;

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                Items ({displayItems.length})
            </Text>

            {displayItems.map((item, index) => (
                <View
                    key={item.id}
                    style={[
                        styles.itemWrapper,
                        index !== 0 && styles.itemSeparator,
                    ]}
                >
                    {/* Product Header */}
                    <View style={styles.productRow}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                        />
                        <View style={styles.productMeta}>
                            <Text style={styles.productName} numberOfLines={2}>
                                {item.name}
                            </Text>
                            <Text style={styles.productIdText}>
                                ID: {item.id}
                            </Text>
                        </View>
                    </View>

                    {/* Details Grid */}
                    <View style={styles.detailsBox}>
                        <View style={styles.gridRow}>
                            <View style={styles.gridItem}>
                                <Text style={styles.label}>VARIANT</Text>
                                <Text style={styles.value}>{item.variant}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.label}>QUANTITY</Text>
                                <Text style={styles.value}>
                                    {item.quantity}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.gridRow, { marginTop: 12 }]}>
                            <View style={styles.gridItem}>
                                <Text style={styles.label}>SALE RATE</Text>
                                <Text style={styles.value}>{item.price}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.label}>DELIVERY</Text>
                                <Text style={styles.value}>
                                    {item.delivery}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
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
    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    itemWrapper: {
        marginBottom: 25,
    },
    itemSeparator: {
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        paddingTop: 25,
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    productImage: {
        width: 65,
        height: 65,
        borderRadius: 12,
        backgroundColor: "#f8fafc",
    },
    productMeta: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
    },
    productIdText: {
        fontSize: 12,
        color: "#94a3b8",
        marginTop: 2,
        fontWeight: "600",
    },
    detailsBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        padding: 15,
    },
    gridRow: {
        flexDirection: "row",
    },
    gridItem: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
    },
    returnBtn: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        justifyContent: "center",
        alignItems: "center",
    },
    returnBtnText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#1e293b",
    },
    supportBtn: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
    },
    supportBtnText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#fff",
    },
});

export default OrderItems;

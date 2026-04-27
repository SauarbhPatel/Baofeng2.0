import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const ReturnedItemsCard = () => {
    // Data modeled from
    const items = [
        {
            id: "1",
            name: "Baofeng BF-888s Licence Free Walkie Talkie",
            category: "Licence Free",
            sku: "BF888S-001",
            qty: 1,
            price: "₹3,299",
            image: "https://via.placeholder.com/80", // Replace with your asset
        },
        {
            id: "2",
            name: "Rechargeable Battery Pack",
            category: "1500mAh",
            sku: "BAT-1500-001",
            qty: 1,
            price: "₹1,499",
            image: "https://via.placeholder.com/80", // Replace with your asset
        },
    ];

    return (
        <View style={styles.mainContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>Returned Items</Text>

                {items.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.productName} numberOfLines={2}>
                                {item.name}
                            </Text>
                            <Text style={styles.skuText}>
                                {item.category} • SKU: {item.sku}
                            </Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.qtyText}>
                                    Qty: {item.qty}
                                </Text>
                                <Text style={styles.priceText}>
                                    {item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {},
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    itemContainer: {
        backgroundColor: "#f8fafc", // Light-blue tinted inner box
        borderRadius: 20,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    productImage: {
        width: 75,
        height: 75,
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 15,
    },
    productName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
        lineHeight: 20,
    },
    skuText: {
        fontSize: 12,
        color: "#94a3b8",
        marginVertical: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    qtyText: {
        fontSize: 14,
        color: "#64748b",
        marginRight: 10,
    },
    priceText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
    },
});

export default ReturnedItemsCard;

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const ReturnedItemsCard = ({
    productName = "—",
    quantity = 1,
    sellingPrice = 0,
    imgUrls = [],
}) => {
    const image = imgUrls?.[0] || "https://via.placeholder.com/80";
    const price = `₹${Number(sellingPrice).toLocaleString("en-IN")}`;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>Returned Items</Text>

                <View style={styles.itemContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {productName}
                        </Text>
                        <Text style={styles.skuText}>Qty: {quantity}</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.qtyText}>× {quantity}</Text>
                            <Text style={styles.priceText}>{price}</Text>
                        </View>
                    </View>
                </View>
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
        backgroundColor: "#f8fafc",
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

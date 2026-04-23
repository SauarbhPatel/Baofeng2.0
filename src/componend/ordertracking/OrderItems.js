import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const OrderItems = ({ items = [] }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>📦 {"  "}Order Items</Text>
            </View>

            {/* Item Card */}
            {items?.map((item, index) => (
                <View style={styles.itemWrapper} key={item?.listingId + index}>
                    <View style={styles.imageContainer}>
                        {item?.mainImageUrl ? (
                            <Image
                                source={{ uri: item?.mainImageUrl }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain",
                                    borderRadius: 12,
                                }}
                            />
                        ) : (
                            <Feather name="package" size={32} color="#0071bc" />
                        )}
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {item?.productName}
                        </Text>
                        <Text style={styles.quantityText}>
                            Quantity:{" "}
                            <Text style={styles.quantityValue}>
                                {item?.quantity}
                            </Text>
                        </Text>
                        <Text style={styles.priceText}>
                            ₹{item.lineTotal?.toLocaleString("en-IN")}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    itemWrapper: {
        backgroundColor: "#F5F9FD", // Suble blue item background
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0f172a",
        lineHeight: 18,
        marginBottom: 4,
    },
    quantityText: {
        fontSize: 12,
        color: "#94a3b8", // Muted text for labels
        marginBottom: 6,
    },
    quantityValue: {
        fontWeight: "600",
        color: "#475569",
    },
    priceText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0071bc", // Premium blue for price
    },
});

export default OrderItems;

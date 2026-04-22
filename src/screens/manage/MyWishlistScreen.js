import React from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";

const MyWishlistScreen = () => {
    const wishlistItems = [
        {
            id: 1,
            title: "Baofeng BF-888s Licence Free Walkie Talkie Frequency 446-...",
            price: "₹1,185.59",
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"), // Replace with your image path
            inStock: true,
        },
        {
            id: 2,
            title: "Baofeng BF-888s Licence Free Walkie Talkie Frequency 446-...",
            price: "₹1,185.59",
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"), // Replace with your image path
            inStock: true,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    {/* Header with Title and Global Actions */}
                    <View style={styles.headerRow}>
                        <Text style={styles.headerTitle}>My Wishlist</Text>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Feather
                                    name="trash-2"
                                    size={20}
                                    color="#ef4444"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareBtn}>
                                <MaterialCommunityIcons
                                    name="share-outline"
                                    size={20}
                                    color="#0064a3"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Wishlist Items */}
                    <View style={{ gap: 15 }}>
                        {wishlistItems.map((item) => (
                            <View key={item.id} style={styles.itemCard}>
                                <View style={styles.itemTopSection}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={item.image}
                                            style={styles.productImage}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text
                                            style={styles.productTitle}
                                            numberOfLines={3}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text style={styles.priceRow}>
                                            <Text style={styles.unitPriceLabel}>
                                                Unit Price:{" "}
                                            </Text>
                                            <Text style={styles.priceValue}>
                                                {item.price}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.itemBottomSection}>
                                    <View style={styles.badgeContainer}>
                                        <View style={styles.stockBadge}>
                                            <Text style={styles.stockText}>
                                                In Stock
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.addToBagBtn}
                                        >
                                            <Text style={styles.addToBagText}>
                                                Add to Bag
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity>
                                        <Feather
                                            name="trash-2"
                                            size={24}
                                            color="#cbd5e1"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    scrollContent: {
        paddingTop: 15,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: "#F3FBFF",
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
        alignItems: "center",
        marginBottom: 25,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
    },
    headerActions: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    shareBtn: {
        backgroundColor: "#EBF7FD",
        padding: 2,
        paddingVertical: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#0069AF",
    },
    itemCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    itemTopSection: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 15,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#f8fafc",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: 70,
        height: 70,
    },
    infoContainer: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        lineHeight: 22,
        marginBottom: 8,
    },
    priceRow: {
        fontSize: 13,
    },
    unitPriceLabel: {
        color: "#94a3b8",
        // fontWeight: "500",
    },
    priceValue: {
        color: "#475569",
        fontWeight: "700",
    },
    itemBottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badgeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    stockBadge: {
        backgroundColor: "#f0fdf4", // Light green background
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    stockText: {
        color: "#22c55e", // Green text
        fontSize: 12,
        fontWeight: "700",
    },
    addToBagBtn: {
        borderWidth: 1,
        borderColor: "#ef4444", // Red outline
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
    },
    addToBagText: {
        color: "#ef4444",
        fontSize: 12,
        fontWeight: "600",
    },
});

export default MyWishlistScreen;

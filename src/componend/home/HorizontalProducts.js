import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HorizontalProductSkeleton } from "../common/SkeletonLoader";

const { width } = Dimensions.get("window");

const PRODUCTS = [
    {
        id: "1",
        name: "Baofeng BF-888s Licence Free Walkie Talkie",
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
        rating: 4,
        reviews: 234,
        price: 1399,
        oldPrice: 1599,
    },
    {
        id: "2",
        name: "Baofeng BF-888s Licence Free Walkie Talkie",
        image: require("../../assets/images/287a20ea431c80761203c9f3c075d7b29b6401f1.png"),
        rating: 4,
        reviews: 234,
        price: 1399,
        oldPrice: 1599,
    },
];

const HorizontalProducts = ({
    bgColor = "#fff",
    productBorder,
    navigation,
    loading = false,
}) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { borderColor: productBorder }]}
            activeOpacity={0.9}
            onPress={() => navigation.push("ProjectDetails")}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                </Text>
                <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome
                            key={star}
                            name="star"
                            size={14}
                            color={star <= item.rating ? "#FFD700" : "#E2E8F0"}
                            style={styles.starIcon}
                        />
                    ))}
                    <Text style={styles.reviewText}>({item.reviews})</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{item.price}</Text>
                    <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // ── Skeleton shimmer while loading ──────────────────────────
    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                <View style={styles.skeletonRow}>
                    {[1, 2].map((i) => (
                        <HorizontalProductSkeleton key={i} />
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <FlatList
                data={PRODUCTS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: "#D9EAF3",
        marginBottom: 15,
    },
    listPadding: {
        paddingHorizontal: 10,
    },
    skeletonRow: {
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 10,
    },
    card: {
        backgroundColor: "#FFFFFF",
        width: width * 0.65,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#3B82F6",
        overflow: "hidden",
        padding: 12,
    },
    imageContainer: {
        width: "100%",
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        paddingHorizontal: 5,
    },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
        lineHeight: 20,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    starIcon: {
        marginRight: 2,
    },
    reviewText: {
        fontSize: 13,
        color: "#94A3B8",
        marginLeft: 5,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000000",
        marginRight: 8,
    },
    oldPrice: {
        fontSize: 14,
        color: "#94A3B8",
        textDecorationLine: "line-through",
    },
});

export default HorizontalProducts;

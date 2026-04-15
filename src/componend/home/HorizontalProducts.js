import React, { useEffect, useState } from "react";
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
import { getProductListing } from "../../api/commonApi";
import { HorizontalProductSkeleton } from "../common/SkeletonLoader";

const { width } = Dimensions.get("window");

const HorizontalProducts = ({
    bgColor = "#fff",
    productBorder,
    navigation,
    refreshKey,
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [refreshKey]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getProductListing(2, 4);
            if (res?.success && res?.data?.records) {
                setProducts(res.data.records);
            } else {
                setError("Failed to load products");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("HorizontalProducts fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { borderColor: productBorder }]}
            activeOpacity={0.9}
            onPress={() => navigation.push("ProjectDetails", { product: item })}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productName} numberOfLines={2}>
                    {item.title}
                </Text>
                {/* Static 4-star rating until ratings API is available */}
                <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome
                            key={star}
                            name="star"
                            size={14}
                            color={star <= 4 ? "#FFD700" : "#E2E8F0"}
                            style={styles.starIcon}
                        />
                    ))}
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>
                        ₹{item.fromPrice?.toLocaleString("en-IN")}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: bgColor }]} />
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
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
});

export default HorizontalProducts;

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { getProductListing } from "../../api/commonApi";
import { GridProductSkeleton } from "../common/SkeletonLoader";

const GridProduct = ({
    gradientColors = ["#FFFFFF", "#D7E9F2"],
    lable = "",
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
            const res = await getProductListing(1, 4);
            if (res?.success && res?.data?.records) {
                setProducts(res.data.records);
            } else {
                setError("Failed to load products");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("GridProduct fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={() => navigation?.push("ProjectDetails")}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.productPrice}>
                ₹{item.fromPrice?.toLocaleString("en-IN")}
            </Text>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={gradientColors} style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{lable}</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Feather name="arrow-right" size={14} color="#0275d8" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.skeletonGrid}>
                    {[1, 2, 3, 4].map((i) => (
                        <GridProductSkeleton key={i} />
                    ))}
                </View>
            ) : error ? (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        onPress={fetchProducts}
                        style={styles.retryBtn}
                    >
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false}
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 24,
        padding: 20,
        marginHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "#C7DBE5",
        marginBottom: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1e293b",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#0275d8",
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardContainer: {
        width: "48%",
    },
    imageWrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    productImage: {
        width: "85%",
        height: "85%",
    },
    productTitle: {
        color: "#334155",
        fontSize: 15,
        fontWeight: "700",
        lineHeight: 18,
    },
    productPrice: {
        fontSize: 13,
        color: "#0069AF",
        fontWeight: "700",
        marginTop: 4,
    },
    errorBox: {
        alignItems: "center",
        paddingVertical: 20,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 13,
        marginBottom: 8,
    },
    retryBtn: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: "#0069AF",
        borderRadius: 8,
    },
    retryText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
});

export default GridProduct;

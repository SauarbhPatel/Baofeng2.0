import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getSimilarProducts } from "../../api/commonApi";
import { SimilarProductSkeleton } from "../common/SkeletonLoader";

const SKELETON_COUNT = 6;

const SimilarProducts = ({ categoryId, productId, navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (categoryId && productId) {
            fetchSimilarProducts();
        }
    }, [categoryId, productId]);

    const fetchSimilarProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getSimilarProducts(categoryId, productId);
            if (res?.success && res?.data?.records) {
                setProducts(res.data.records);
            } else if (res?.success && Array.isArray(res?.data)) {
                setProducts(res.data);
            } else {
                setError("Failed to load similar products");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("SimilarProducts fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ── Skeleton grid ──────────────────────────────────────────
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>
                    <Text style={styles.blueText}>Similar</Text> Products
                </Text>
                <View style={styles.skeletonGrid}>
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <SimilarProductSkeleton key={i} />
                    ))}
                </View>
            </View>
        );
    }

    // ── Error / empty state ────────────────────────────────────
    if (error || !products.length) return null;

    // ── Real product card ──────────────────────────────────────
    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
                navigation.push("ProjectDetails", {
                    product: {
                        slug:
                            item.variants?.[0]?.productVariationSlug ||
                            item.slug,
                        listingId: item.variants?.[0]?.listingId || "",
                        pickupPointId: null,
                    },
                })
            }
        >
            {item.isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                </View>
            )}

            <Image
                source={{ uri: item?.variants?.[0]?.mainImageUrl || "" }}
                style={styles.productImage}
                resizeMode="contain"
            />

            <Text style={styles.productName} numberOfLines={1}>
                {item.title}
            </Text>

            <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>
                    ₹
                    {item?.variants?.[0]?.boxsellingPrice?.toLocaleString(
                        "en-IN",
                    )}
                </Text>
                {item?.variants?.[0]?.boxMrp && (
                    <Text style={styles.oldPrice}>
                        ₹{item?.variants?.[0]?.boxMrp?.toLocaleString("en-IN")}
                    </Text>
                )}
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="cart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buyBtn, styles.buyBtnActive]}>
                    <Text style={[styles.buyBtnText, styles.buyTextActive]}>
                        BUY NOW
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="heart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>
                <Text style={styles.blueText}>Similar</Text> Products
            </Text>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        paddingTop: 15,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    sectionTitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 15,
        color: "#1e293b",
    },
    blueText: {
        fontWeight: "700",
        color: "#0284c7",
    },
    // ── Skeleton grid ────────────────────────────────────────
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    // ── Product card ─────────────────────────────────────────
    row: { justifyContent: "space-between" },
    card: {
        backgroundColor: "#fff",
        width: "48%",
        borderRadius: 8,
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        alignItems: "center",
        position: "relative",
    },
    newBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "#0ea5e9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 1,
    },
    newBadgeText: { color: "#fff", fontSize: 8 },
    productImage: {
        width: 100,
        height: 120,
        marginBottom: 10,
    },
    productName: {
        fontSize: 10,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 4,
        textAlign: "center",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
    },
    currentPrice: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#0284c7",
    },
    oldPrice: {
        fontSize: 9,
        color: "#94a3b8",
        textDecorationLine: "line-through",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        borderColor: "#F4F4F4",
    },
    buyBtn: {
        paddingVertical: 6,
        paddingHorizontal: 5,
        flex: 0.8,
        alignItems: "center",
    },
    buyBtnActive: { backgroundColor: "#0284c7" },
    buyBtnText: { fontSize: 10, fontWeight: "800" },
    buyTextActive: { color: "#fff" },
});

export default SimilarProducts;

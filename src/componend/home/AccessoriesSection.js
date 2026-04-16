import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getProductListing } from "../../api/commonApi";
import { AccessorySkeleton } from "../common/SkeletonLoader";

const AccessoriesSection = ({ onViewAll, refreshKey, navigation }) => {
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
                setError("Failed to load accessories");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Accessories fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#0B399D", "#0069AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.blueCard}
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Accessories</Text>
                    <TouchableOpacity
                        onPress={onViewAll}
                        style={styles.viewAllBtn}
                    >
                        <Text style={styles.viewAllText}>View All</Text>
                        <Feather name="arrow-right" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* ── Skeleton shimmer while loading ── */}
                {loading ? (
                    <View style={styles.grid}>
                        {[1, 2, 3, 4].map((i) => (
                            <AccessorySkeleton key={i} />
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
                    <View style={styles.grid}>
                        {products.map((item) => (
                            <TouchableOpacity
                                key={item._id}
                                style={styles.itemCard}
                                activeOpacity={1}
                                // onPress={() =>
                                //     navigation.push("ProjectDetails", {
                                //         product: item,
                                //     })
                                // }
                                onPress={() =>
                                    navigation.push("ProjectDetails", {
                                        product: {
                                            slug:
                                                item.variants?.[0]
                                                    ?.productVariationSlug ||
                                                item.slug,
                                            listingId:
                                                item.variants?.[0]
                                                    ?.listings?.[0]
                                                    ?.listingId || "",
                                            pickupPointId:
                                                item.variants?.[0]
                                                    ?.listings?.[0]
                                                    ?.inventoryByPickup?.[0]
                                                    ?.pickupPointId || "",
                                        },
                                    })
                                }
                            >
                                <View style={styles.whiteBox}>
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={styles.productImage}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.itemName} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                {/* <Text style={styles.itemPrice}>
                                    ₹{item.fromPrice?.toLocaleString("en-IN")}
                                </Text> */}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    blueCard: {
        borderRadius: 24,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
    },

    // ── Grid layout ─────────────────────────────────────────────
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    itemCard: {
        width: "48%",
        marginBottom: 20,
    },
    whiteBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
    },
    productImage: {
        width: "85%",
        height: "85%",
    },
    itemName: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 18,
    },
    itemPrice: {
        color: "#93C5FD",
        fontSize: 13,
        fontWeight: "600",
        marginTop: 4,
    },

    // ── Error state ─────────────────────────────────────────────
    errorBox: {
        alignItems: "center",
        paddingVertical: 30,
    },
    errorText: {
        color: "#FCA5A5",
        fontSize: 13,
        marginBottom: 10,
    },
    retryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.4)",
    },
    retryText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
});

export default AccessoriesSection;

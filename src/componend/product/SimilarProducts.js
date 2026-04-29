// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { getSimilarProducts } from "../../api/commonApi";
// import { SimilarProductSkeleton } from "../common/SkeletonLoader";

// const SKELETON_COUNT = 6;

// const SimilarProducts = ({ categoryId, productId, navigation }) => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (categoryId && productId) {
//             fetchSimilarProducts();
//         }
//     }, [categoryId, productId]);

//     const fetchSimilarProducts = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const res = await getSimilarProducts(categoryId, productId);
//             if (res?.success && res?.data?.records) {
//                 setProducts(res.data.records);
//             } else if (res?.success && Array.isArray(res?.data)) {
//                 setProducts(res.data);
//             } else {
//                 setError("Failed to load similar products");
//             }
//         } catch (err) {
//             setError("Network error. Please try again.");
//             console.error("SimilarProducts fetch error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ── Skeleton grid ──────────────────────────────────────────
//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.sectionTitle}>
//                     <Text style={styles.blueText}>Similar</Text> Products
//                 </Text>
//                 <View style={styles.skeletonGrid}>
//                     {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
//                         <SimilarProductSkeleton key={i} />
//                     ))}
//                 </View>
//             </View>
//         );
//     }

//     // ── Error / empty state ────────────────────────────────────
//     if (error || !products.length) return null;

//     // ── Real product card ──────────────────────────────────────
//     const renderProduct = ({ item }) => (
//         <TouchableOpacity
//             style={styles.card}
//             activeOpacity={0.85}
//             onPress={() =>
//                 navigation.push("ProjectDetails", {
//                     product: {
//                         slug:
//                             item.variants?.[0]?.productVariationSlug ||
//                             item.slug,
//                         listingId: item.variants?.[0]?.listingId || "",
//                         pickupPointId: null,
//                     },
//                 })
//             }
//         >
//             {item.isNew && (
//                 <View style={styles.newBadge}>
//                     <Text style={styles.newBadgeText}>NEW</Text>
//                 </View>
//             )}

//             <Image
//                 source={{ uri: item?.variants?.[0]?.mainImageUrl || "" }}
//                 style={styles.productImage}
//                 resizeMode="contain"
//             />

//             <Text style={styles.productName} numberOfLines={2}>
//                 {item.title}
//             </Text>

//             <View style={styles.priceRow}>
//                 <Text style={styles.currentPrice}>
//                     ₹
//                     {item?.variants?.[0]?.boxsellingPrice?.toLocaleString(
//                         "en-IN",
//                     )}
//                 </Text>
//                 {item?.variants?.[0]?.boxMrp && (
//                     <Text style={styles.oldPrice}>
//                         ₹{item?.variants?.[0]?.boxMrp?.toLocaleString("en-IN")}
//                     </Text>
//                 )}
//             </View>

//             <View style={styles.actionRow}>
//                 <TouchableOpacity
//                     style={[styles.buyBtn, styles.buyBtnActive, { flex: 1 }]}
//                 >
//                     <Text style={[styles.buyBtnText, styles.buyTextActive]}>
//                         Add To Cart
//                     </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[
//                         styles?.buyBtn,
//                         { paddingHorizontal: 6, borderRadius: 50 },
//                     ]}
//                 >
//                     <MaterialCommunityIcons
//                         name="heart"
//                         size={16}
//                         color="#64748b"
//                     />
//                 </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.sectionTitle}>
//                 <Text style={styles.blueText}>Similar</Text> Products
//             </Text>

//             <FlatList
//                 data={products}
//                 renderItem={renderProduct}
//                 keyExtractor={(item) => item._id}
//                 numColumns={2}
//                 columnWrapperStyle={styles.row}
//                 scrollEnabled={false}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         // backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         // paddingTop: 15,
//         paddingHorizontal: 5,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         // borderWidth: 1,
//         // borderColor: "#EBF7FD",
//     },
//     sectionTitle: {
//         fontSize: 20,
//         marginBottom: 15,
//         color: "#1e293b",
//         fontWeight: "700",
//     },
//     blueText: {
//         fontWeight: "700",
//     },
//     // ── Skeleton grid ────────────────────────────────────────
//     skeletonGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//     },
//     // ── Product card ─────────────────────────────────────────
//     row: { justifyContent: "space-between" },
//     card: {
//         backgroundColor: "#fff",
//         width: "46%",
//         borderRadius: 8,
//         // paddingTop: 10,
//         // paddingHorizontal: 10,
//         marginBottom: 15,
//         // borderWidth: 1,
//         // borderColor: "#e2e8f0",
//         // alignItems: "center",
//         position: "relative",
//         overflow: "hidden",
//     },
//     newBadge: {
//         position: "absolute",
//         top: 8,
//         left: 8,
//         backgroundColor: "#0ea5e9",
//         paddingHorizontal: 6,
//         paddingVertical: 2,
//         borderRadius: 2,
//         zIndex: 1,
//     },
//     newBadgeText: { color: "#fff", fontSize: 8 },
//     productImage: {
//         width: "100%",
//         height: 140,
//         marginBottom: 10,
//         borderRadius: 8,
//         borderWidth: 0.5,
//         borderColor: "#e2e8f0",
//         backgroundColor: "#fff",
//     },
//     productName: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#334155",
//         marginBottom: 4,
//     },
//     priceRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 6,
//         marginBottom: 10,
//     },
//     currentPrice: {
//         fontSize: 15,
//         fontWeight: "bold",
//         color: "#0284c7",
//     },
//     oldPrice: {
//         fontSize: 12,
//         color: "#94a3b8",
//         textDecorationLine: "line-through",
//     },
//     actionRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: "100%",
//         justifyContent: "space-between",
//         gap: 8,
//     },
//     buyBtn: {
//         paddingVertical: 6,
//         paddingHorizontal: 5,
//         alignItems: "center",
//         backgroundColor: "#EEF1FF",
//     },
//     buyBtnActive: { borderRadius: 10 },
//     buyBtnText: { fontSize: 12, fontWeight: "800" },
//     buyTextActive: { color: "#0069AF" },
// });

// export default SimilarProducts;

import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getSimilarProducts,
    addToCart,
    getWishlist,
    addToWishlist,
    deleteWishlistItem,
} from "../../api/commonApi";
import { SimilarProductSkeleton } from "../common/SkeletonLoader";

const SKELETON_COUNT = 6;
const CART_TOKEN_KEY = "baofeng_cart_token";

const SimilarProducts = ({ categoryId, productId, navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ── Per-item loading maps ──────────────────────────────────
    const [cartLoadingId, setCartLoadingId] = useState(null); // item._id
    const [wishLoadingId, setWishLoadingId] = useState(null); // item._id
    // Set of listingId business IDs that are in the wishlist
    const [wishlistedIds, setWishlistedIds] = useState(new Set());

    // ── Fetch similar products ─────────────────────────────────
    useEffect(() => {
        if (categoryId && productId) fetchSimilarProducts();
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

    // ── Fetch wishlist once products loaded ────────────────────
    useEffect(() => {
        if (products.length > 0) fetchWishlistIds();
    }, [products]);

    const fetchWishlistIds = async () => {
        try {
            const res = await getWishlist(1, 100);
            if (res?.success && res?.data?.items) {
                const ids = new Set(
                    res.data.items.map((i) => i.listing?.listingId),
                );
                setWishlistedIds(ids);
            }
        } catch {
            // silent
        }
    };

    // ── Add to Cart ────────────────────────────────────────────
    const handleAddToCart = useCallback(
        async (item) => {
            const mongoProductId = item._id;
            const listingMongoId = item.variants?.[0]?.listingMongoId || "";

            if (!mongoProductId || !listingMongoId) {
                Alert.alert("Error", "Product info missing.");
                return;
            }
            try {
                setCartLoadingId(item._id);
                const savedToken = await AsyncStorage.getItem(CART_TOKEN_KEY);
                const res = await addToCart({
                    productId: mongoProductId,
                    listingId: listingMongoId,
                    quantity: 1,
                    ...(savedToken ? { cartToken: savedToken } : {}),
                });
                if (res?.success && res?.data?.cartToken) {
                    await AsyncStorage.setItem(
                        CART_TOKEN_KEY,
                        res.data.cartToken,
                    );
                    Alert.alert(
                        "Added to Cart ✓",
                        `${item.title} added to cart.`,
                        [
                            {
                                text: "Go to Cart",
                                onPress: () =>
                                    navigation.push("HomeNavigator", {
                                        screen: "Cart",
                                    }),
                            },
                            { text: "OK" },
                        ],
                    );
                } else {
                    Alert.alert("Error", "Could not add to cart.");
                }
            } catch {
                Alert.alert(
                    "Already Added",
                    "This item is already in your cart.",
                    [
                        {
                            text: "Go to Cart",
                            onPress: () =>
                                navigation.push("HomeNavigator", {
                                    screen: "Cart",
                                }),
                        },
                        { text: "OK" },
                    ],
                );
            } finally {
                setCartLoadingId(null);
            }
        },
        [navigation],
    );

    // ── Toggle Wishlist ────────────────────────────────────────
    const handleWishlistToggle = useCallback(
        async (item) => {
            const listingBizId = item.variants?.[0]?.listingId || "";
            const productBizId = item.productBusinessId || "";

            console.log(JSON.stringify(item));

            if (!listingBizId) {
                Alert.alert("Error", "Product info missing.");
                return;
            }

            const isWished = wishlistedIds.has(listingBizId);

            try {
                setWishLoadingId(item._id);
                if (isWished) {
                    const res = await deleteWishlistItem(listingBizId);
                    if (res?.success) {
                        setWishlistedIds((prev) => {
                            const next = new Set(prev);
                            next.delete(listingBizId);
                            return next;
                        });
                    }
                } else {
                    console.log({
                        listingId: listingBizId,
                        productId: productBizId,
                    });
                    const res = await addToWishlist({
                        listingId: listingBizId,
                        productId: productBizId,
                    });
                    if (res?.success) {
                        setWishlistedIds((prev) =>
                            new Set(prev).add(listingBizId),
                        );
                    }
                }
            } catch (error) {
                console.log(error);
                Alert.alert("Error", "Network error. Please try again.");
            } finally {
                setWishLoadingId(null);
            }
        },
        [wishlistedIds],
    );

    // ── Skeleton ───────────────────────────────────────────────
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

    if (error || !products.length) return null;

    // ── Product card ───────────────────────────────────────────
    const renderProduct = ({ item }) => {
        const listingBizId = item.variants?.[0]?.listingId || "";
        const isWished = wishlistedIds.has(listingBizId);
        const cartLoading = cartLoadingId === item._id;
        const wishLoading = wishLoadingId === item._id;

        return (
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

                <Text style={styles.productName} numberOfLines={2}>
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
                            ₹
                            {item?.variants?.[0]?.boxMrp?.toLocaleString(
                                "en-IN",
                            )}
                        </Text>
                    )}
                </View>

                <View style={styles.actionRow}>
                    {/* Add to Cart */}
                    <TouchableOpacity
                        style={[
                            styles.buyBtn,
                            styles.buyBtnActive,
                            { flex: 1 },
                            cartLoading && { opacity: 0.6 },
                        ]}
                        // onPress={() => handleAddToCart(item)}
                        // disabled={cartLoading || wishLoading}
                        disabled
                    >
                        {cartLoading ? (
                            <ActivityIndicator size="small" color="#0069AF" />
                        ) : (
                            <Text
                                style={[
                                    styles.buyBtnText,
                                    styles.buyTextActive,
                                ]}
                            >
                                Add To Cart
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Wishlist */}
                    <TouchableOpacity
                        style={[
                            styles.buyBtn,
                            { paddingHorizontal: 8, borderRadius: 50 },
                        ]}
                        // onPress={() => handleWishlistToggle(item)}
                        // disabled={cartLoading || wishLoading}
                        disabled
                    >
                        {wishLoading ? (
                            <ActivityIndicator
                                size="small"
                                color="#ef4444"
                                style={{ width: 16, height: 16 }}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name={isWished ? "heart" : "heart-outline"}
                                size={16}
                                color={isWished ? "#ef4444" : "#64748b"}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

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
        borderRadius: 24,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 15,
        color: "#1e293b",
        fontWeight: "700",
    },
    blueText: { fontWeight: "700" },
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    row: { justifyContent: "space-between" },
    card: {
        backgroundColor: "#fff",
        width: "46%",
        borderRadius: 8,
        marginBottom: 15,
        position: "relative",
        overflow: "hidden",
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
        width: "100%",
        height: 140,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#e2e8f0",
        backgroundColor: "#fff",
    },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 4,
        paddingHorizontal: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    currentPrice: { fontSize: 15, fontWeight: "bold", color: "#0284c7" },
    oldPrice: {
        fontSize: 12,
        color: "#94a3b8",
        textDecorationLine: "line-through",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 4,
        paddingBottom: 8,
    },
    buyBtn: {
        paddingVertical: 6,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEF1FF",
        minHeight: 32,
    },
    buyBtnActive: { borderRadius: 10 },
    buyBtnText: { fontSize: 12, fontWeight: "800" },
    buyTextActive: { color: "#0069AF" },
});

export default SimilarProducts;

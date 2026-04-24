import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import { SkeletonBox } from "../../componend/common/SkeletonLoader";
import {
    getWishlist,
    addToCart,
    deleteWishlistItem,
} from "../../api/commonApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_TOKEN_KEY = "baofeng_cart_token";

// ── Skeleton Card ──────────────────────────────────────────────
const WishlistSkeleton = () => (
    <View style={styles.skeletonCard}>
        <View style={styles.itemTopSection}>
            <SkeletonBox width={80} height={80} borderRadius={15} />
            <View style={{ flex: 1, gap: 10, marginLeft: 15 }}>
                <SkeletonBox width="90%" height={13} borderRadius={6} />
                <SkeletonBox width="70%" height={13} borderRadius={6} />
                <SkeletonBox width="45%" height={13} borderRadius={6} />
            </View>
        </View>
        <View style={styles.itemBottomSection}>
            <SkeletonBox width="55%" height={34} borderRadius={8} />
            <SkeletonBox width={24} height={24} borderRadius={12} />
        </View>
    </View>
);

// ── Empty State ────────────────────────────────────────────────
const EmptyWishlist = ({ navigation }) => (
    <View style={styles.emptyBox}>
        <Feather name="heart" size={52} color="#cbd5e1" />
        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
        <Text style={styles.emptySubtitle}>
            Save items you love and come back to them anytime.
        </Text>
        <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.push("ProductListing")}
        >
            <Feather name="shopping-bag" size={16} color="#fff" />
            <Text style={styles.shopBtnText}>Browse Products</Text>
        </TouchableOpacity>
    </View>
);

const MyWishlistScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [cartLoadingId, setCartLoadingId] = useState(null);
    const [removeLoadingId, setRemoveLoadingId] = useState(null);

    // Re-fetch every time screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchWishlist();
        }, []),
    );

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getWishlist(1, 100);
            if (res?.success && res?.data?.items) {
                setItems(res.data.items);
            } else {
                setError("Failed to load wishlist.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Wishlist fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchWishlist();
    };

    // ── Add to Cart ────────────────────────────────────────────
    const handleAddToCart = async (item) => {
        const productId = item.product?.productId;
        const listingId = item.listing?.listingId;

        if (!productId || !listingId) {
            Alert.alert("Error", "Product information missing.");
            return;
        }

        try {
            setCartLoadingId(item.wishlistItemId);
            const savedToken = await AsyncStorage.getItem(CART_TOKEN_KEY);

            const res = await addToCart({
                productId,
                listingId,
                quantity: 1,
                ...(savedToken ? { cartToken: savedToken } : {}),
            });

            if (res?.success && res?.data?.cartToken) {
                await AsyncStorage.setItem(CART_TOKEN_KEY, res.data.cartToken);
                Alert.alert("Added ✓", `${item.product?.name} added to cart.`, [
                    {
                        text: "Go to Cart",
                        onPress: () =>
                            navigation.push("HomeNavigator", {
                                screen: "Cart",
                            }),
                    },
                    { text: "OK" },
                ]);
            } else {
                Alert.alert("Error", "Could not add to cart. Try again.");
            }
        } catch {
            Alert.alert(
                "Already in Cart",
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
    };

    // ── Remove from Wishlist ───────────────────────────────────
    const handleRemove = (item) => {
        Alert.alert(
            "Remove Item",
            `Remove "${item.product?.name}" from your wishlist?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => confirmRemove(item),
                },
            ],
        );
    };

    const confirmRemove = async (item) => {
        const listingId = item.listing?.listingId;
        if (!listingId) return;
        try {
            setRemoveLoadingId(item.wishlistItemId);
            const res = await deleteWishlistItem(listingId);
            if (res?.success) {
                // Remove from local state immediately
                setItems((prev) =>
                    prev.filter(
                        (i) => i.wishlistItemId !== item.wishlistItemId,
                    ),
                );
            } else {
                Alert.alert("Error", res?.message || "Failed to remove item.");
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("removeWishlist error:", err);
        } finally {
            setRemoveLoadingId(null);
        }
    };

    // ── Navigate to Product ────────────────────────────────────
    const handleProductPress = (item) => {
        navigation.push("ProjectDetails", {
            product: {
                slug: item.product?.slug || "",
                listingId: item.listing?.listingId || "",
                pickupPointId:
                    item.listing?.inventoryByPickup?.[0]?.pickupPointId || "",
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.headerTitle}>My Wishlist</Text>
                            {!loading && !error && (
                                <Text style={styles.headerSubtitle}>
                                    {items.length} item
                                    {items.length !== 1 ? "s" : ""} saved
                                </Text>
                            )}
                        </View>
                        {!loading && items.length > 0 && (
                            <TouchableOpacity style={styles.shareBtn}>
                                <MaterialCommunityIcons
                                    name="share-outline"
                                    size={20}
                                    color="#0064a3"
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* ── Loading Skeletons ── */}
                    {loading && (
                        <View style={{ gap: 15 }}>
                            {[1, 2, 3].map((i) => (
                                <WishlistSkeleton key={i} />
                            ))}
                        </View>
                    )}

                    {/* ── Error ── */}
                    {!loading && error && (
                        <View style={styles.errorBox}>
                            <Feather
                                name="wifi-off"
                                size={36}
                                color="#94a3b8"
                            />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                style={styles.retryBtn}
                                onPress={fetchWishlist}
                            >
                                <Text style={styles.retryText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* ── Empty ── */}
                    {!loading && !error && items.length === 0 && (
                        <EmptyWishlist navigation={navigation} />
                    )}

                    {/* ── Wishlist Items ── */}
                    {!loading && !error && items.length > 0 && (
                        <View style={{ gap: 15 }}>
                            {items.map((item) => (
                                <WishlistItem
                                    key={item.wishlistItemId}
                                    item={item}
                                    onPress={() => handleProductPress(item)}
                                    onAddToCart={() => handleAddToCart(item)}
                                    onRemove={() => handleRemove(item)}
                                    cartLoading={
                                        cartLoadingId === item.wishlistItemId
                                    }
                                    removeLoading={
                                        removeLoadingId === item.wishlistItemId
                                    }
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ── Single Wishlist Item Card ───────────────────────────────────
const WishlistItem = ({
    item,
    onPress,
    onAddToCart,
    onRemove,
    cartLoading,
    removeLoading,
}) => {
    const { product, listing, unavailable, priceDropped, priceDifference } =
        item;
    const isOutOfStock = !listing?.isActive || listing?.stock === 0;
    const currentPrice = listing?.unitSellingPrice || item.addedPrice;

    return (
        <TouchableOpacity
            style={[styles.itemCard, unavailable && styles.itemCardUnavailable]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {/* Unavailable banner */}
            {unavailable && (
                <View style={styles.unavailableBanner}>
                    <Text style={styles.unavailableText}>
                        Currently Unavailable
                    </Text>
                </View>
            )}

            {/* Price dropped badge */}
            {priceDropped && priceDifference > 0 && (
                <View style={styles.priceDropBadge}>
                    <Feather name="trending-down" size={12} color="#16a34a" />
                    <Text style={styles.priceDropText}>
                        ₹{priceDifference} price drop
                    </Text>
                </View>
            )}

            <View style={styles.itemTopSection}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product?.mainImageUrl }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.productTitle} numberOfLines={3}>
                        {product?.name}
                    </Text>

                    {/* Price */}

                    <View style={styles.priceContainer}>
                        <Text style={styles.unitPriceLabel}>
                            Unit Price:{" "}
                            <Text style={styles.priceValue}>
                                ₹{currentPrice?.toLocaleString("en-IN")}
                            </Text>
                        </Text>
                        {item.addedPrice !== currentPrice && (
                            <Text style={styles.addedPrice}>
                                Was ₹{item.addedPrice?.toLocaleString("en-IN")}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.itemBottomSection}>
                <View style={styles.badgeContainer}>
                    {/* Stock badge */}
                    {isOutOfStock ? (
                        <View style={styles.outOfStockBadge}>
                            <Text style={styles.outOfStockText}>
                                Out of Stock
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.stockBadge}>
                            <Feather
                                name="check-circle"
                                size={12}
                                color="#16a34a"
                            />
                            <Text style={styles.stockText}>In Stock</Text>
                        </View>
                    )}

                    {/* Add to Cart button */}
                    {!unavailable && !isOutOfStock && (
                        <TouchableOpacity
                            style={[
                                styles.addToBagBtn,
                                cartLoading && styles.btnDisabled,
                            ]}
                            onPress={onAddToCart}
                            disabled={cartLoading}
                        >
                            {cartLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#0069AF"
                                />
                            ) : (
                                <>
                                    <Feather
                                        name="shopping-cart"
                                        size={13}
                                        color="#0069AF"
                                    />
                                    <Text style={styles.addToBagText}>
                                        Add to Cart
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}
                </View>

                {/* Remove button */}
                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={onRemove}
                    disabled={removeLoading}
                >
                    {removeLoading ? (
                        <ActivityIndicator size="small" color="#ef4444" />
                    ) : (
                        <Feather name="trash-2" size={18} color="#ef4444" />
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 15, paddingBottom: 30 },
    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },

    // ── Header ────────────────────────────────────────────────
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    headerSubtitle: { fontSize: 13, color: "#64748b", marginTop: 3 },
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

    // ── Skeleton Card ─────────────────────────────────────────
    skeletonCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        gap: 14,
    },

    // ── Item Card ─────────────────────────────────────────────
    itemCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    itemCardUnavailable: { opacity: 0.65 },

    // Badges
    unavailableBanner: {
        backgroundColor: "#fef2f2",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-start",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    unavailableText: { fontSize: 11, fontWeight: "700", color: "#dc2626" },
    priceDropBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#f0fdf4",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: "flex-start",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    priceDropText: { fontSize: 11, fontWeight: "700", color: "#16a34a" },

    // Top section
    itemTopSection: { flexDirection: "row", gap: 14, marginBottom: 14 },
    imageContainer: {
        width: 82,
        height: 82,
        backgroundColor: "#f8fafc",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    productImage: { width: 68, height: 68 },

    infoContainer: { flex: 1 },
    productTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        lineHeight: 20,
        marginBottom: 5,
    },
    variantText: { fontSize: 11, color: "#94a3b8", marginBottom: 6 },
    priceContainer: { flexDirection: "row", alignItems: "baseline", gap: 8 },
    priceValue: { fontSize: 16, fontWeight: "800", color: "#0069AF" },
    priceRow: {
        fontSize: 13,
    },
    unitPriceLabel: {
        color: "#94a3b8",
        // fontWeight: "500",
    },
    priceValue2: {
        color: "#475569",
        fontWeight: "700",
    },
    addedPrice: {
        fontSize: 12,
        color: "#94a3b8",
        textDecorationLine: "line-through",
    },

    // Bottom section
    itemBottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badgeContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
    stockBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    stockText: { color: "#16a34a", fontSize: 12, fontWeight: "700" },
    outOfStockBadge: {
        backgroundColor: "#fef2f2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    outOfStockText: { color: "#dc2626", fontSize: 12, fontWeight: "700" },
    addToBagBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderWidth: 1.5,
        borderColor: "#0069AF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addToBagText: { color: "#0069AF", fontSize: 12, fontWeight: "600" },
    btnDisabled: { opacity: 0.5 },
    removeBtn: { padding: 4 },

    // ── Empty / Error states ──────────────────────────────────
    emptyBox: {
        alignItems: "center",
        paddingVertical: 40,
        gap: 12,
    },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
    emptySubtitle: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 21,
        paddingHorizontal: 20,
    },
    shopBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#0069AF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 14,
        marginTop: 8,
    },
    shopBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
    errorBox: { alignItems: "center", paddingVertical: 30, gap: 12 },
    errorText: { fontSize: 14, color: "#64748b", textAlign: "center" },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
    },
    retryText: { color: "#fff", fontWeight: "700" },
});

export default MyWishlistScreen;

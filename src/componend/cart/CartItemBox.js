import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getCart,
    updateCartQuantity,
    removeCartItem,
    clearCart as clearCartApi,
} from "../../api/commonApi";

const CART_TOKEN_KEY = "baofeng_cart_token";

const CartItemBox = ({ onCartUpdate, onLoading }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            onLoading();
            setLoading(true);
            setError(null);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            if (!token) {
                setCartItems([]);
                setLoading(false);
                return;
            }
            const res = await getCart(token);
            if (res?.success && res?.data?.items) {
                setCartItems(res.data.items);
                onCartUpdate?.(res.data.items);
            } else {
                setError("Failed to load cart");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const setItemLoading = (itemId, val) =>
        setActionLoading((prev) => ({ ...prev, [itemId]: val }));

    // ── Increase quantity ──────────────────────────────────────
    const handleIncrease = async (item) => {
        try {
            setItemLoading(item.itemId, true);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            const res = await updateCartQuantity({
                listingId: item.listingId,
                productId: item.productId,
                quantity: item.quantity + 1,
                cartToken: token,
            });
            if (res?.success) {
                setCartItems(res.data.items);
                onCartUpdate?.(res.data.items);
            }
        } catch {
        } finally {
            setItemLoading(item.itemId, false);
        }
    };

    // ── Decrease quantity (remove if qty is 1) ─────────────────
    const handleDecrease = async (item) => {
        try {
            setItemLoading(item.itemId, true);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            if (item.quantity <= 1) {
                // Remove item
                const res = await removeCartItem({
                    listingId: item.listingId,
                    productId: item.productId,
                    cartToken: token,
                });
                if (res?.success) {
                    setCartItems(res.data.items);
                    onCartUpdate?.(res.data.items);
                }
            } else {
                const res = await updateCartQuantity({
                    listingId: item.listingId,
                    productId: item.productId,
                    quantity: item.quantity - 1,
                    cartToken: token,
                });
                if (res?.success) {
                    setCartItems(res.data.items);
                    onCartUpdate?.(res.data.items);
                }
            }
        } catch {
        } finally {
            setItemLoading(item.itemId, false);
        }
    };

    // ── Delete icon (always removes) ──────────────────────────
    const handleRemove = async (item) => {
        try {
            setItemLoading(item.itemId, true);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            const res = await removeCartItem({
                listingId: item.listingId,
                productId: item.productId,
                cartToken: token,
            });
            if (res?.success) {
                setCartItems(res.data.items);
                onCartUpdate?.(res.data.items);
            }
        } catch {
        } finally {
            setItemLoading(item.itemId, false);
        }
    };

    // ── Clear entire cart ──────────────────────────────────────
    const handleClearCart = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            const res = await clearCartApi({ cartToken: token });
            if (res?.success) {
                setCartItems([]);
                onCartUpdate?.([]);
            }
        } catch {
        } finally {
            setLoading(false);
        }
    };

    // ── Loading ────────────────────────────────────────────────
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>My cart</Text>
                <View style={styles.mainContent}>
                    {[1, 2, 3].map((i) => (
                        <CartItemSkeleton key={i} />
                    ))}
                </View>
                <View style={styles.mainContent}>
                    {[1].map((i) => (
                        <CartItemSkeleton key={i} />
                    ))}
                </View>
            </View>
        );
    }

    // ── Error ──────────────────────────────────────────────────
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>My cart</Text>
                <View style={styles.mainContent}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        onPress={fetchCart}
                        style={styles.retryBtn}
                    >
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    if (cartItems.length === 0) {
        return null;
    }

    const renderItem = ({ item }) => {
        const isLoading = actionLoading[item.itemId];
        return (
            <View style={styles.cartCard}>
                <View style={styles.itemRow}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.mainImageUrl }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {item.productName}
                        </Text>
                        <Text style={styles.unitPriceLabel}>
                            Unit Price:{" "}
                            <Text style={styles.priceValue}>
                                ₹
                                {item.unitSellingPrice?.toLocaleString("en-IN")}
                            </Text>
                        </Text>
                        <Text style={styles.subtotalLabel}>
                            Subtotal:{" "}
                            <Text style={styles.subtotalValue}>
                                ₹
                                {(
                                    item.unitSellingPrice * item.quantity
                                )?.toLocaleString("en-IN")}
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Bottom row: delivery badge | qty control | delete */}
                <View style={styles.actionRow}>
                    <View style={styles.deliveryBadge}>
                        <Feather name="truck" size={14} color="#15803d" />
                        <Text style={styles.deliveryText}>HOME DELIVERY</Text>
                    </View>

                    {/* Qty +/- */}
                    <View style={styles.qtyControl}>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => handleDecrease(item)}
                            disabled={isLoading}
                        >
                            <MaterialCommunityIcons
                                name="minus"
                                size={16}
                                color="#0069AF"
                            />
                        </TouchableOpacity>

                        <View style={styles.qtyBox}>
                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#0069AF"
                                />
                            ) : (
                                <Text style={styles.qtyText}>
                                    {item.quantity}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => handleIncrease(item)}
                            disabled={isLoading}
                        >
                            <MaterialCommunityIcons
                                name="plus"
                                size={16}
                                color="#0069AF"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Delete */}
                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleRemove(item)}
                        disabled={isLoading}
                    >
                        <Feather name="trash-2" size={18} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>My cart ({cartItems.length})</Text>
            <View style={styles.mainContent}>
                <View style={styles.listHeader}>
                    <Text style={styles.sectionLabel}>Cart Items</Text>
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={handleClearCart}
                    >
                        <MaterialCommunityIcons
                            name="delete-sweep-outline"
                            size={18}
                            color="#ef4444"
                        />
                        <Text style={styles.clearText}>Clear Cart</Text>
                    </TouchableOpacity>
                </View>

                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.itemId}
                        scrollEnabled={false}
                        contentContainerStyle={{ gap: 12 }}
                    />
                )}
            </View>
        </View>
    );
};

// ── Skeleton card ──────────────────────────────────────────────
const CartItemSkeleton = () => (
    <View style={styles.skeletonCard}>
        <View style={styles.skeletonImg} />
        <View style={styles.skeletonInfo}>
            <View style={[styles.skeletonLine, { width: "90%" }]} />
            <View
                style={[styles.skeletonLine, { width: "60%", marginTop: 8 }]}
            />
            <View
                style={[styles.skeletonLine, { width: "40%", marginTop: 8 }]}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    mainContent: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionLabel: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
    clearBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    clearText: { color: "#ef4444", fontSize: 14, fontWeight: "600" },
    cartCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E7E5E4",
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    productImage: { width: 60, height: 60 },
    detailsContainer: { flex: 1 },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
        lineHeight: 20,
        marginBottom: 6,
    },
    unitPriceLabel: { fontSize: 12, color: "#64748b" },
    priceValue: { fontWeight: "bold", color: "#1e293b" },
    subtotalLabel: { fontSize: 12, color: "#64748b", marginTop: 4 },
    subtotalValue: { fontWeight: "bold", color: "#0069AF" },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    deliveryBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 4,
    },
    deliveryText: { color: "#15803d", fontSize: 11, fontWeight: "700" },
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3FBFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    qtyBtn: { padding: 8 },
    qtyBox: {
        minWidth: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    qtyText: { fontSize: 15, fontWeight: "800", color: "#0f172a" },
    deleteBtn: { padding: 6 },
    emptyText: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: 14,
        paddingVertical: 20,
    },
    errorText: { color: "#ef4444", textAlign: "center", marginBottom: 10 },
    retryBtn: {
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#0069AF",
        borderRadius: 8,
    },
    retryText: { color: "#fff", fontWeight: "600" },
    // Skeleton
    skeletonCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E7E5E4",
        marginBottom: 12,
    },
    skeletonImg: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: "#E2E8F0",
    },
    skeletonInfo: { flex: 1, marginLeft: 12, justifyContent: "center" },
    skeletonLine: { height: 12, backgroundColor: "#E2E8F0", borderRadius: 6 },
});

export default CartItemBox;

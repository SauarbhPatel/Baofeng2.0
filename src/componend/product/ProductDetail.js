import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    checkPincode,
    addToCart,
    getWishlist,
    deleteWishlistItem,
    addToWishlist,
} from "../../api/commonApi";
import { LinearGradient } from "expo-linear-gradient";

const CART_TOKEN_KEY = "baofeng_cart_token";

const ProductDetail = ({
    product = {},
    cartBlocked = true,
    navigation,
    variantCom,
    quantity,
    setQuantity,
}) => {
    const [pincode, setPincode] = useState("");
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeResult, setPincodeResult] = useState(null); // { serviceable, codAllowed }
    const [isShowPinInput, setShowPinInput] = useState(false);
    // ── Wishlist state ─────────────────────────────────────────
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [wishLoading, setWishLoading] = useState(false);

    const {
        title = "",
        description = "",
        brandName = "BAOFENG",
        listing = {},
        stock = 0,
        isInStock = false,
        productId = "",
        reviews,
    } = product;

    const { unitSellingPrice = 0, unitMrp = 0, listingMongoId = "" } = listing;

    // listing.listingId = business ID like "L00000514"
    // productId = business ID like "P00000514"  (from product.productId)
    const listingBusinessId = listing?.listingId || "";
    const productBusinessId = product?.productBusinessId || productId || "";

    const discountPercent =
        unitMrp > 0
            ? (((unitMrp - unitSellingPrice) / unitMrp) * 100).toFixed(2)
            : 0;

    // ── Check wishlist status on mount / listing change ────────

    const checkWishlistStatus = async () => {
        try {
            const res = await getWishlist(1, 100);
            if (res?.success && res?.data?.items) {
                const found = res.data.items.some(
                    (item) => item.listing?.listingId === listingBusinessId,
                );

                console.log(res?.data?.items);
                setIsWishlisted(found);
            }
        } catch {
            // silent — don't block UI
        }
    };

    useEffect(() => {
        if (!listingBusinessId) return;
        checkWishlistStatus();
    }, [listingBusinessId, product]);

    // ── Toggle wishlist ────────────────────────────────────────
    const handleWishlistToggle = async () => {
        // Block if out of stock
        if (!isInStock || stock === 0) {
            Alert.alert(
                "Out of Stock",
                "This product is currently out of stock and cannot be added to your wishlist.",
            );
            return;
        }

        if (!listingBusinessId || !productBusinessId) {
            Alert.alert("Error", "Product information missing.");
            return;
        }

        try {
            setWishLoading(true);

            if (isWishlisted) {
                // Remove from wishlist
                const res = await deleteWishlistItem(listingBusinessId);
                if (res?.success) {
                    setIsWishlisted(false);
                } else {
                    Alert.alert("Error", "Failed to remove from wishlist.");
                }
            } else {
                // Add to wishlist
                console.log({
                    listingId: listingBusinessId,
                    productId: productBusinessId,
                });
                const res = await addToWishlist({
                    listingId: listingBusinessId,
                    productId: productBusinessId,
                });
                if (res?.success) {
                    setIsWishlisted(true);
                } else {
                    Alert.alert(
                        "Error",
                        res?.message || "Failed to add to wishlist.",
                    );
                }
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setWishLoading(false);
        }
    };

    // ── COD / Pincode check ────────────────────────────────────
    const handlePincodeCheck = async () => {
        if (pincode.length !== 6) {
            Alert.alert(
                "Invalid Pincode",
                "Please enter a valid 6-digit pincode.",
            );
            return;
        }
        try {
            setPincodeLoading(true);
            setPincodeResult(null);
            const res = await checkPincode(pincode);
            if (res?.success) {
                setPincodeResult(res.data);
            } else {
                Alert.alert("Error", "Could not check pincode. Try again.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setPincodeLoading(false);
        }
    };

    // ── reviews ───────────────────────────────────────────
    const summary = useMemo(() => {
        if (!reviews.length) return { avg: 0, total: 0 };
        const total = reviews.length;
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        const avg = (sum / total).toFixed(1);

        return { avg, total };
    }, [reviews]);

    const StarRow = ({ rating, size = 16 }) => (
        <>
            {[1, 2, 3, 4, 5].map((s) => (
                <MaterialCommunityIcons
                    key={s}
                    name={s <= rating ? "star" : "star-outline"}
                    size={size}
                    color={s <= rating ? "#FFC107" : "#E5E7EB"}
                />
            ))}
        </>
    );

    return (
        <View style={styles.container}>
            {/* ── Wishlist Heart Button ── */}
            <TouchableOpacity
                onPress={handleWishlistToggle}
                disabled={wishLoading}
                style={{
                    position: "absolute",
                    right: 8,
                    top: 6,
                    zIndex: 10,
                    padding: 4,
                }}
                activeOpacity={0.7}
            >
                {wishLoading ? (
                    <ActivityIndicator
                        size="small"
                        color="#ef4444"
                        style={{ width: 25, height: 25 }}
                    />
                ) : (
                    <FontAwesome
                        name={isWishlisted ? "heart" : "heart-o"}
                        size={25}
                        color={isWishlisted ? "#ef4444" : "#94a3b8"}
                    />
                )}
            </TouchableOpacity>
            <View style={styles.brandTag}>
                <Text style={styles.brandLabel}>Brand : </Text>
                <Text style={styles.brandName}>{brandName}</Text>
            </View>

            {/* Product Title */}
            <Text style={styles.productTitle}>{title}</Text>
            <Text style={styles.productDescription}>{description}</Text>

            {/* Ratings */}
            <View style={styles.ratingRow}>
                <StarRow rating={summary?.avg} size={20} />
                <Text style={styles.productDescription}>
                    {"  "} {summary?.avg}/5 • {summary?.total} ratings
                </Text>
            </View>

            {/* Price Row */}
            <LinearGradient
                colors={["#FFF2EE", "#F0F3FF"]}
                style={{ padding: 15, borderRadius: 10, gap: 5 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.mrpText}>Special sale price</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.mrpText}>
                        <Text style={styles.finalPrice}>
                            ₹{unitSellingPrice}
                        </Text>
                        {"   "}
                        <Text style={{ textDecorationLine: "line-through" }}>
                            ₹{unitMrp}
                        </Text>{" "}
                        {discountPercent > 0 && (
                            <Text style={styles.discountText}>
                                {discountPercent}% off
                            </Text>
                        )}
                    </Text>
                </View>
                <Text style={styles.taxInfo}>
                    Tax Inclusive. Shipping calculated at checkout
                </Text>
            </LinearGradient>

            <View style={{ flexDirection: "row", gap: 10, marginVertical: 15 }}>
                {[
                    { lable: "Fast dispatch", desc: "Ships in 24 hrs" },
                    { lable: "Secure pay", desc: "UPI, cards, COD" },
                    { lable: "Support", desc: "Chat in 2 mins" },
                ]?.map((info) => (
                    <View
                        key={info?.lable}
                        style={{
                            backgroundColor: "#F7FAFF",
                            borderRadius: 6,
                            flex: 1,
                            padding: 10,
                            gap: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: "#000",
                                fontWeight: "700",
                                fontSize: 13,
                            }}
                        >
                            {info?.lable}
                        </Text>
                        <Text
                            style={{
                                color: "#6B7280",
                                fontSize: 11,
                            }}
                        >
                            {info?.desc}
                        </Text>
                    </View>
                ))}
            </View>
            {variantCom}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={styles.deliveryLabel}>Delivery & quantity</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#EAEEFF",
                        borderRadius: 15,
                        padding: 5,
                        paddingHorizontal: 12,
                    }}
                    activeOpacity={0.9}
                    onPress={() => setShowPinInput(!isShowPinInput)}
                >
                    <Text style={{ color: "#0069AF", fontWeight: "600" }}>
                        Check serviceability
                    </Text>
                </TouchableOpacity>
            </View>

            {/* ── COD Delivery Check ────────────────────────── */}
            {isShowPinInput ? (
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Enter Pincode"
                        style={styles.deliveryInput}
                        placeholderTextColor="#94a3b8"
                        keyboardType="number-pad"
                        maxLength={6}
                        value={pincode}
                        onChangeText={(t) => {
                            setPincode(t);
                            setPincodeResult(null);
                        }}
                    />
                    <TouchableOpacity
                        style={[
                            styles.checkBtn,
                            pincodeLoading && styles.btnDisabled,
                        ]}
                        onPress={handlePincodeCheck}
                        disabled={pincodeLoading}
                    >
                        {pincodeLoading ? (
                            <ActivityIndicator color="#FF7A59" size="small" />
                        ) : (
                            <Text style={styles.checkText}>Check</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : null}

            {/* Pincode result badge */}
            {pincodeResult && (
                <View
                    style={[
                        styles.pincodeBadge,
                        pincodeResult.serviceable
                            ? styles.pincodeBadgeSuccess
                            : styles.pincodeBadgeFail,
                    ]}
                >
                    <Feather
                        name={
                            pincodeResult.serviceable
                                ? "check-circle"
                                : "x-circle"
                        }
                        size={14}
                        color={
                            pincodeResult.serviceable ? "#16a34a" : "#dc2626"
                        }
                    />
                    <Text
                        style={[
                            styles.pincodeBadgeText,
                            pincodeResult.serviceable
                                ? styles.pincodeBadgeTextSuccess
                                : styles.pincodeBadgeTextFail,
                        ]}
                    >
                        {pincodeResult.serviceable
                            ? `Delivery available${pincodeResult.codAllowed ? " · COD allowed" : " · Prepaid only"}`
                            : "Delivery not available for this pincode"}
                    </Text>
                </View>
            )}

            {/* Quantity and Stock */}
            <View style={styles.stockRow}>
                <Text style={{ color: "#6B7280" }}>
                    Quantity{" "}
                    <Text style={styles.stockText}>
                        ({stock}{" "}
                        <Text
                            style={
                                isInStock
                                    ? styles.instockText
                                    : styles.outofstockText
                            }
                        >
                            {isInStock ? "Instock" : "Out of Stock"}
                        </Text>
                        )
                    </Text>
                </Text>

                <View
                    style={[
                        styles.quantityContainer,
                        stock == 0 && { opacity: 0.4 },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        style={styles.qtyBtn}
                        disabled={stock == 0}
                    >
                        <MaterialCommunityIcons
                            name="minus"
                            size={24}
                            color="#0069AF"
                        />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>
                        {stock == 0 ? 0 : quantity}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            setQuantity(Math.min(stock, quantity + 1))
                        }
                        style={styles.qtyBtn}
                        disabled={stock == 0}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={24}
                            color="#0069AF"
                        />
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.stockText}>
                    {stock}{" "}
                    <Text
                        style={
                            isInStock
                                ? styles.instockText
                                : styles.outofstockText
                        }
                    >
                        {isInStock ? "Instock" : "Out of Stock"}
                    </Text>
                </Text> */}
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 15 }}>
                {[
                    { lable: "Replacement", desc: "7-day easy replacement" },
                    { lable: "Warranty", desc: "1-year seller warranty" },
                ]?.map((info) => (
                    <View
                        key={info?.lable}
                        style={{
                            backgroundColor: "#F7FAFF",
                            borderRadius: 6,
                            flex: 1,
                            padding: 10,
                            gap: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: "#0069AF",
                                fontWeight: "700",
                                fontSize: 11,
                            }}
                        >
                            {info?.lable}
                        </Text>
                        <Text
                            style={{
                                color: "#000000",
                                fontSize: 13,
                                fontWeight: "700",
                            }}
                        >
                            {info?.desc}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 32,
        marginBottom: 15,
        marginHorizontal: 10,
        position: "relative",
    },
    actionRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
    btn: {
        flex: 1,
        height: 54,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },
    buyNowBtn: { backgroundColor: "#0066b2", borderColor: "#0066b2" },
    addToCartBtn: { backgroundColor: "transparent", borderColor: "#0066b2" },
    btnDisabled: { opacity: 0.6 },
    buyNowText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    addToCartText: { color: "#0066b2", fontSize: 18, fontWeight: "bold" },
    productTitle: {
        fontSize: 30,
        fontWeight: "900",
        color: "#000",
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 15,
        color: "#6B7280",
        lineHeight: 22,
        marginBottom: 12,
    },
    ratingRow: { flexDirection: "row", marginBottom: 5, marginTop: 5 },
    brandTag: {
        backgroundColor: "#EAEEFF",
        alignSelf: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    brandLabel: { color: "#0069AF", fontSize: 16, fontWeight: "700" },
    brandName: { color: "#0069AF", fontWeight: "900" },
    divider: {
        height: 1,
        backgroundColor: "#cbd5e1",
        marginVertical: 15,
        opacity: 0.5,
    },
    priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    mrpText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
    discountText: { color: "#22c55e", fontWeight: "bold" },
    separator: { color: "#64748b", marginHorizontal: 8 },
    saleText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
    finalPrice: { fontSize: 30, fontWeight: "800", color: "#000" },
    taxInfo: { fontSize: 13, color: "#6B7280" },
    // ── Delivery row ──────────────────────────────────────────
    deliveryRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    deliveryLabel: { fontSize: 16, fontWeight: "700", color: "#000" },
    inputWrapper: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingLeft: 15,
        height: 48,
        borderWidth: 1,
        borderColor: "#E2E2E2",
        borderRadius: 7,
        marginTop: 15,
    },
    deliveryInput: { flex: 1, fontSize: 14, color: "#000" },
    checkBtn: {
        backgroundColor: "#FFECE8",
        height: "80%",
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: "center",
        margin: 5,
    },
    checkText: { color: "#FF7A59", fontWeight: "600", fontSize: 13 },
    // ── Pincode result badge ───────────────────────────────────
    pincodeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    pincodeBadgeSuccess: {
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    pincodeBadgeFail: {
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    pincodeBadgeText: { fontSize: 13, fontWeight: "600", flex: 1 },
    pincodeBadgeTextSuccess: { color: "#16a34a" },
    pincodeBadgeTextFail: { color: "#dc2626" },
    // ── Stock / Qty ────────────────────────────────────────────
    stockRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        justifyContent: "space-between",
    },
    quantityContainer: {
        flexDirection: "row",
        backgroundColor: "#F7FAFF",
        borderRadius: 5,
        alignItems: "center",
        height: 45,
        // flex: 1,
        justifyContent: "space-between",
        overflow: "hidden",
        alignSelf: "flex-end",
    },
    qtyBtn: {
        padding: 5,
        backgroundColor: "#EEF1FF",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    qtyText: { fontSize: 20, fontWeight: "bold", paddingHorizontal: 20 },
    stockText: {
        fontWeight: "bold",
        flex: 1,
        color: "#000",
    },
    instockText: { color: "#22c55e" },
    outofstockText: { color: "#ef4444" },
});

export default ProductDetail;

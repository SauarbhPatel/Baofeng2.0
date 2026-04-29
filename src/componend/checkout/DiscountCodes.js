import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert,
    Animated,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// ── Self-contained shimmer box ─────────────────────────────────
const Sk = ({ w = "100%", h = 12, r = 6, style }) => {
    const anim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);
    const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.75],
    });
    return (
        <Animated.View
            style={[
                {
                    width: w,
                    height: h,
                    borderRadius: r,
                    backgroundColor: "#CBD5E1",
                    opacity,
                },
                style,
            ]}
        />
    );
};

// ── Single coupon card skeleton ────────────────────────────────
const CouponCardSkeleton = () => (
    <View style={s.couponCard}>
        {/* Badge placeholder */}
        <Sk w={56} h={56} r={14} />
        {/* Text lines */}
        <View style={{ flex: 1, gap: 6 }}>
            <Sk w="55%" h={14} />
            <Sk w="70%" h={11} />
            <Sk w="85%" h={10} />
        </View>
        {/* Apply pill placeholder */}
        <Sk w={58} h={30} r={20} />
    </View>
);
import { getAllCoupons, syncCheckout } from "../../api/commonApi";

// ── Coupon tag color by discount type ─────────────────────────
const TYPE_CFG = {
    PERCENTAGE: { color: "#0069AF", bg: "#E0F2FE", label: "%" },
    FLAT: { color: "#059669", bg: "#d1fae5", label: "₹" },
};
const getTypeCfg = (t) => TYPE_CFG[t?.toUpperCase()] || TYPE_CFG.FLAT;

const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "";

const DiscountCodes = ({
    abundantId,
    shippingMethodId,
    paymentMethodId,
    onCouponApplied, // () => void — called after success to re-fetch order
    setLoadingAbendent,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [input, setInput] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [couponsLoading, setCouponsLoading] = useState(false);
    const [applying, setApplying] = useState(false);
    const [appliedCode, setAppliedCode] = useState(null); // couponCode string
    const [couponMsg, setCouponMsg] = useState(null); // { success, message, discountAmount }

    // ── Fetch available coupons when expanded ──────────────────
    useEffect(() => {
        if (expanded && coupons.length === 0) fetchCoupons();
    }, [expanded]);

    const fetchCoupons = async () => {
        try {
            setCouponsLoading(true);
            const res = await getAllCoupons(1, 20);
            if (res?.success && res?.data?.records) {
                setCoupons(res.data.records);
            }
        } catch {
            // silent
        } finally {
            setCouponsLoading(false);
        }
    };

    // ── Apply coupon ───────────────────────────────────────────
    const handleApply = async (code) => {
        const couponCode = (code || input).trim().toUpperCase();
        if (!couponCode) return;
        if (!abundantId || !shippingMethodId || !paymentMethodId) {
            Alert.alert(
                "Error",
                "Please select shipping and payment method first.",
            );
            return;
        }
        try {
            setApplying(true);
            setCouponMsg(null);
            console.log({
                abondantId: abundantId,
                shippingMethodId,
                paymentMethodId,
                couponCode,
            });
            const res = await syncCheckout({
                abondantId: abundantId,
                shippingMethodId,
                paymentMethodId,
                couponCode,
            });

            console.log(res);
            if (res?.success) {
                const coupon = res.data?.coupon;
                setCouponMsg({
                    success: coupon?.couponApplied ?? false,
                    message: coupon?.message || "Coupon processed.",
                    discountAmount: coupon?.discountAmount || 0,
                    grandTotal: coupon?.grandTotal,
                });
                if (coupon?.couponApplied) {
                    setAppliedCode(couponCode);
                    setInput(couponCode);
                    onCouponApplied?.(); // re-fetch order data
                }
            } else {
                setCouponMsg({
                    success: false,
                    message: res?.message || "Failed to apply coupon.",
                });
            }
        } catch {
            setCouponMsg({
                success: false,
                message: "Network error. Please try again.",
            });
        } finally {
            setApplying(false);
        }
    };

    // ── Remove applied coupon ──────────────────────────────────
    const handleRemove = async () => {
        try {
            setApplying(true);
            setCouponMsg(null);
            // Sync without couponCode to remove it
            await syncCheckout({
                abondantId: abundantId,
                shippingMethodId,
                paymentMethodId,
            });
            setAppliedCode(null);
            setInput("");
            onCouponApplied?.();
        } catch {
            // silent
        } finally {
            setApplying(false);
        }
    };

    // ── Single coupon card ─────────────────────────────────────
    const renderCoupon = ({ item }) => {
        const cfg = getTypeCfg(item.discountType);
        const isApplied = appliedCode === item.couponCode;

        return (
            <View style={[s.couponCard, isApplied && s.couponCardApplied]}>
                {/* Left: badge + details */}
                <View style={[s.couponBadge, { backgroundColor: cfg.bg }]}>
                    <Text style={[s.couponBadgeText, { color: cfg.color }]}>
                        {item.amount}
                        {cfg.label}
                    </Text>
                    <Text style={[s.couponBadgeOff, { color: cfg.color }]}>
                        OFF
                    </Text>
                </View>
                <View style={s.couponInfo}>
                    <Text style={s.couponCode}>{item.couponCode}</Text>
                    <Text style={s.couponName} numberOfLines={1}>
                        {item.promotionName}
                    </Text>
                    <Text style={s.couponMeta}>
                        Min ₹{item.minCartValue} • Valid till{" "}
                        {fmt(item.endDate)}
                    </Text>
                </View>
                {/* Right: apply / applied */}
                {isApplied ? (
                    <TouchableOpacity
                        style={s.removePill}
                        onPress={handleRemove}
                        disabled={applying}
                    >
                        <Feather name="x" size={12} color="#ef4444" />
                        <Text style={s.removePillText}>Remove</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={s.applyPill}
                        onPress={() => handleApply(item.couponCode)}
                        disabled={applying}
                    >
                        <Text style={s.applyPillText}>Apply</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const handleChangePayment = async () => {
        try {
            appliedCode && setApplying(true);
            setLoadingAbendent(true);

            const res = await syncCheckout({
                abondantId: abundantId,
                shippingMethodId,
                paymentMethodId,
            });

            if (!res?.success) return;

            const coupon = res.data?.coupon;

            // No coupon field → sync OK, nothing to do
            if (!coupon) return;

            // Coupon invalidated by payment method change
            if (!coupon?.couponApplied) {
                setAppliedCode(null);
                setInput("");
                setCouponMsg({
                    success: coupon?.couponApplied ?? false,
                    message: coupon?.message || "Coupon processed.",
                    discountAmount: coupon?.discountAmount || 0,
                    grandTotal: coupon?.grandTotal,
                });
            }
        } catch {
        } finally {
            setApplying(false);
            onCouponApplied?.();
        }
    };
    useEffect(() => {
        if (paymentMethodId) {
            handleChangePayment();
        }
    }, [paymentMethodId]);

    return (
        <View style={s.container}>
            {/* ── Header row (always visible) ── */}
            <TouchableOpacity
                style={s.headerRow}
                activeOpacity={0.7}
                onPress={() => setExpanded((v) => !v)}
            >
                <View style={s.headerLeft}>
                    <MaterialCommunityIcons
                        name="ticket-percent-outline"
                        size={20}
                        color="#0069AF"
                    />
                    <Text style={s.title}>Discount Codes</Text>
                    {appliedCode && (
                        <View style={s.appliedBadge}>
                            <Text style={s.appliedBadgeText}>
                                {appliedCode}
                            </Text>
                        </View>
                    )}
                </View>
                <MaterialCommunityIcons
                    name={expanded ? "menu-up" : "menu-down"}
                    size={28}
                    color="#0f172a"
                />
            </TouchableOpacity>

            {/* ── Expanded content ── */}
            {expanded && (
                <View style={s.body}>
                    {/* Input row — same UI as CouponInput */}
                    <View style={s.inputWrapper}>
                        <TextInput
                            style={s.input}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#94a3b8"
                            value={input}
                            onChangeText={setInput}
                            autoCapitalize="characters"
                            editable={!appliedCode}
                        />
                        <View style={s.divider} />
                        {appliedCode ? (
                            <TouchableOpacity
                                style={s.applyBtn}
                                onPress={handleRemove}
                                disabled={applying}
                            >
                                {applying ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#ef4444"
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            s.applyText,
                                            { color: "#ef4444" },
                                        ]}
                                    >
                                        Remove
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={s.applyBtn}
                                onPress={() => handleApply()}
                                disabled={applying || !input.trim()}
                            >
                                {applying ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#2563eb"
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            s.applyText,
                                            !input.trim() && {
                                                color: "#94a3b8",
                                            },
                                        ]}
                                    >
                                        Apply
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Feedback message */}
                    {couponMsg && (
                        <View
                            style={[
                                s.msgBox,
                                {
                                    backgroundColor: couponMsg.success
                                        ? "#f0fdf4"
                                        : "#fef2f2",
                                    borderColor: couponMsg.success
                                        ? "#bbf7d0"
                                        : "#fecaca",
                                },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name={
                                    couponMsg.success
                                        ? "check-circle-outline"
                                        : "close-circle-outline"
                                }
                                size={16}
                                color={
                                    couponMsg.success ? "#16a34a" : "#ef4444"
                                }
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        s.msgText,
                                        {
                                            color: couponMsg.success
                                                ? "#16a34a"
                                                : "#ef4444",
                                        },
                                    ]}
                                >
                                    {couponMsg.message}
                                </Text>
                                {couponMsg.success &&
                                    couponMsg.discountAmount > 0 && (
                                        <Text style={s.msgSaving}>
                                            You save ₹
                                            {couponMsg.discountAmount.toLocaleString(
                                                "en-IN",
                                            )}
                                            !
                                        </Text>
                                    )}
                            </View>
                        </View>
                    )}

                    {/* Available coupons */}
                    <Text style={s.availTitle}>Available Coupons</Text>
                    {couponsLoading ? (
                        <View style={{ gap: 10 }}>
                            {[0, 1].map((i) => (
                                <CouponCardSkeleton key={i} />
                            ))}
                        </View>
                    ) : coupons.length === 0 ? (
                        <Text style={s.noCoupons}>
                            No coupons available right now.
                        </Text>
                    ) : (
                        <FlatList
                            data={coupons}
                            renderItem={renderCoupon}
                            keyExtractor={(item) => item._id}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 10 }} />
                            )}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    // ── Header ─────────────────────────────────────────────────
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
    title: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    appliedBadge: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },
    appliedBadgeText: { color: "#fff", fontSize: 11, fontWeight: "800" },

    // ── Body ───────────────────────────────────────────────────
    body: { marginTop: 14 },

    // ── Input (matches CouponInput UI) ─────────────────────────
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
        marginBottom: 12,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#1e293b",
    },
    divider: { width: 1, height: "60%", backgroundColor: "#e2e8f0" },
    applyBtn: {
        paddingHorizontal: 24,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    applyText: { fontSize: 16, fontWeight: "bold", color: "#2563eb" },

    // ── Feedback ───────────────────────────────────────────────
    msgBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 14,
    },
    msgText: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
    msgSaving: {
        fontSize: 12,
        color: "#16a34a",
        marginTop: 2,
        fontWeight: "700",
    },

    // ── Available coupons ──────────────────────────────────────
    availTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#64748b",
        marginBottom: 10,
    },
    noCoupons: {
        fontSize: 13,
        color: "#94a3b8",
        textAlign: "center",
        paddingVertical: 10,
    },

    // ── Coupon card ────────────────────────────────────────────
    couponCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    couponCardApplied: { borderColor: "#0069AF", borderWidth: 1.5 },
    couponBadge: {
        width: 56,
        height: 56,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    couponBadgeText: { fontSize: 15, fontWeight: "900" },
    couponBadgeOff: { fontSize: 9, fontWeight: "800" },
    couponInfo: { flex: 1 },
    couponCode: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0f172a",
        letterSpacing: 0.5,
    },
    couponName: { fontSize: 12, color: "#64748b", marginTop: 2 },
    couponMeta: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
    applyPill: {
        backgroundColor: "#EFF9FF",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#B0E0FD",
    },
    applyPillText: { fontSize: 12, fontWeight: "700", color: "#0069AF" },
    removePill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#FFF1F2",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    removePillText: { fontSize: 12, fontWeight: "700", color: "#ef4444" },
});

export default DiscountCodes;

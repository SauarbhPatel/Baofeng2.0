import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// ── Self-contained shimmer ─────────────────────────────────────
const Sk = ({ w = "100%", h = 12, r = 6, style, white = false }) => {
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
        outputRange: [0.3, 0.78],
    });
    return (
        <Animated.View
            style={[
                {
                    width: w,
                    height: h,
                    borderRadius: r,
                    backgroundColor: white
                        ? "rgba(255,255,255,0.35)"
                        : "#CBD5E1",
                    opacity,
                },
                style,
            ]}
        />
    );
};

// ── White card wrapper ─────────────────────────────────────────
const Card = ({ children, style }) => (
    <View style={[s.card, style]}>{children}</View>
);

// ── Header row (icon circle + title) ──────────────────────────
const CardHeader = ({ style }) => (
    <View style={[s.headerRow, style]}>
        <Animated.View style={s.headerIcon} />
        <Sk w={130} h={14} />
    </View>
);

// ══════════════════════════════════════════════════════════════
// 1. OrderBox  ──  blue card: order number + status badge
// ══════════════════════════════════════════════════════════════
export const OrderBoxSkeleton = () => (
    <View style={[s.card, s.blueCard]}>
        {/* Order Number label + value */}
        <Sk w="45%" h={11} r={5} white style={{ marginBottom: 8 }} />
        <Sk w="70%" h={18} r={6} white style={{ marginBottom: 4 }} />
        {/* Est. Delivery */}
        <Sk
            w="40%"
            h={11}
            r={5}
            white
            style={{ marginTop: 14, marginBottom: 8 }}
        />
        <Sk w="60%" h={14} r={6} white style={{ marginBottom: 20 }} />
        {/* Status badge box */}
        <View style={s.statusBadgeBox}>
            <Animated.View style={s.statusIcon} />
            <Sk w="75%" h={12} r={5} white />
        </View>
    </View>
);

// ══════════════════════════════════════════════════════════════
// 2. TrackingHistory  ──  white card: icon + title + 5 timeline steps
// ══════════════════════════════════════════════════════════════
export const TrackingHistorySkeleton = () => (
    <Card>
        <CardHeader style={{ marginBottom: 20 }} />
        {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={{ flexDirection: "row", minHeight: 56 }}>
                {/* Left: dot + line */}
                <View style={{ alignItems: "center", width: 35 }}>
                    <Animated.View
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            backgroundColor: "#CBD5E1",
                            opacity: 0.5,
                        }}
                    />
                    {i < 4 && (
                        <View
                            style={{
                                width: 2,
                                flex: 1,
                                backgroundColor: "#E2E8F0",
                                marginTop: -3,
                                marginBottom: -3,
                            }}
                        />
                    )}
                </View>
                {/* Right: title + date + description */}
                <View
                    style={{ flex: 1, marginLeft: 12, paddingTop: 4, gap: 6 }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Sk w="45%" h={13} />
                        <Sk w="28%" h={10} />
                    </View>
                    <Sk w="80%" h={11} />
                </View>
            </View>
        ))}
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 3. OrderItems  ──  white card: image + name + details grid per item
// ══════════════════════════════════════════════════════════════
export const OrderItemsSkeleton = () => (
    <Card>
        <Sk w={80} h={16} style={{ marginBottom: 16 }} />
        {[0, 1].map((i) => (
            <View key={i} style={i === 1 ? s.itemSep : {}}>
                {/* Image + name row */}
                <View style={s.itemRow}>
                    <Animated.View style={s.itemImg} />
                    <View style={{ flex: 1, gap: 6 }}>
                        <Sk w="85%" h={13} />
                        <Sk w="50%" h={11} />
                    </View>
                </View>
                {/* Details grid */}
                <View style={s.innerBox}>
                    <View style={s.grid2}>
                        <View style={{ flex: 1 }}>
                            <Sk w="60%" h={10} style={{ marginBottom: 6 }} />
                            <Sk w="80%" h={13} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Sk w="55%" h={10} style={{ marginBottom: 6 }} />
                            <Sk w="40%" h={13} />
                        </View>
                    </View>
                    <View style={[s.grid2, { marginTop: 12 }]}>
                        <View style={{ flex: 1 }}>
                            <Sk w="65%" h={10} style={{ marginBottom: 6 }} />
                            <Sk w="70%" h={13} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Sk w="60%" h={10} style={{ marginBottom: 6 }} />
                            <Sk w="85%" h={13} />
                        </View>
                    </View>
                </View>
            </View>
        ))}
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 4. DeliveryAddressBox  ──  white card: icon+title + name + lines + phone/email
//    (used twice: delivery + shipping address)
// ══════════════════════════════════════════════════════════════
export const DeliveryAddressBoxSkeleton = () => (
    <Card>
        <CardHeader style={{ marginBottom: 16 }} />
        {/* Name */}
        <Sk w="55%" h={14} style={{ marginBottom: 12 }} />
        {/* Address lines */}
        <Sk w="90%" h={12} style={{ marginBottom: 6 }} />
        <Sk w="75%" h={12} style={{ marginBottom: 14 }} />
        {/* Phone row */}
        <View style={s.contactRow}>
            <Animated.View style={s.contactIcon} />
            <Sk w="45%" h={12} />
        </View>
        {/* Email row */}
        <View style={s.contactRow}>
            <Animated.View style={s.contactIcon} />
            <Sk w="55%" h={12} />
        </View>
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 5. CourierDetails  ──  white card: icon+title + 3 label/value groups
// ══════════════════════════════════════════════════════════════
export const CourierDetailsSkeleton = () => (
    <Card>
        <CardHeader style={{ marginBottom: 16 }} />
        {[0, 1, 2].map((i) => (
            <View key={i} style={{ marginBottom: 16 }}>
                <Sk w="40%" h={10} style={{ marginBottom: 6 }} />
                <Sk w="65%" h={14} />
            </View>
        ))}
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 6. OrderSummary  ──  white card: subtotal + shipping + discount + total + pay method
// ══════════════════════════════════════════════════════════════
export const OrderSummarySkeleton = () => (
    <Card>
        <Sk w={120} h={16} style={{ marginBottom: 16 }} />
        {[70, 55, 60, 65].map((w, i) => (
            <View key={i} style={s.priceRow}>
                <Sk w={`${w}%`} h={13} />
                <Sk w={60} h={13} />
            </View>
        ))}
        <View style={s.divider} />
        {/* Grand total */}
        <View style={s.priceRow}>
            <Sk w="50%" h={16} />
            <Sk w={70} h={16} />
        </View>
        {/* Payment method */}
        <View style={[s.innerBox, { marginTop: 14 }]}>
            <Sk w="40%" h={10} style={{ marginBottom: 8 }} />
            <Sk w="60%" h={14} />
        </View>
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 7. NeedHelp  ──  orange card: icon + title + desc + button
// ══════════════════════════════════════════════════════════════
export const NeedHelpSkeleton = () => (
    <View style={[s.card, s.orangeCard]}>
        {/* Chat icon */}
        <Animated.View style={s.chatIcon} />
        {/* Title */}
        <Sk w="45%" h={18} r={6} white style={{ marginBottom: 12 }} />
        {/* Description lines */}
        <Sk w="95%" h={12} r={5} white style={{ marginBottom: 6 }} />
        <Sk w="80%" h={12} r={5} white style={{ marginBottom: 6 }} />
        <Sk w="65%" h={12} r={5} white style={{ marginBottom: 20 }} />
        {/* Button */}
        <Sk w="100%" h={44} r={22} white />
    </View>
);

// ══════════════════════════════════════════════════════════════
// Main export — all 7 skeletons in order
// ══════════════════════════════════════════════════════════════
export const OrderTrackingSkeleton = () => (
    <View style={s.wrapper}>
        <OrderBoxSkeleton />
        <TrackingHistorySkeleton />
        <OrderItemsSkeleton />
        <DeliveryAddressBoxSkeleton />
        <DeliveryAddressBoxSkeleton />
        <CourierDetailsSkeleton />
        <OrderSummarySkeleton />
        <NeedHelpSkeleton />
    </View>
);

// ─── Styles ───────────────────────────────────────────────────
const s = StyleSheet.create({
    wrapper: { paddingTop: 15, paddingBottom: 30 },

    // ── Shared card ────────────────────────────────────────────
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    blueCard: { backgroundColor: "#0071bc", borderWidth: 0 },
    orangeCard: { backgroundColor: "#ea580c", borderWidth: 0 },

    // ── Header row ─────────────────────────────────────────────
    headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    headerIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#CBD5E1",
        opacity: 0.5,
    },

    // ── OrderBox (blue card) ───────────────────────────────────
    statusBadgeBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 10,
    },
    statusIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(255,255,255,0.3)",
    },

    // ── OrderItems ─────────────────────────────────────────────
    itemRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 12,
        alignItems: "center",
    },
    itemImg: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: "#CBD5E1",
        opacity: 0.5,
    },
    itemSep: {
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 16,
        marginTop: 4,
    },
    innerBox: {
        backgroundColor: "#F8FAFF",
        borderRadius: 14,
        padding: 14,
        marginTop: 4,
    },
    grid2: { flexDirection: "row", gap: 12 },

    // ── DeliveryAddressBox ─────────────────────────────────────
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    contactIcon: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#CBD5E1",
        opacity: 0.5,
    },

    // ── OrderSummary ───────────────────────────────────────────
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },

    // ── NeedHelp (orange card) ─────────────────────────────────
    chatIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginBottom: 12,
    },
});

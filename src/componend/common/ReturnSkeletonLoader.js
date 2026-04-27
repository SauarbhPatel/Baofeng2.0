import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// ─── Shimmer bar ───────────────────────────────────────────────
const SK = ({ w = "100%", h = 12, r = 6, style }) => {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmer, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.35, 0.85],
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

// ─── Reusable layout wrappers ──────────────────────────────────
const Card = ({ children, style }) => (
    <View style={[s.card, style]}>{children}</View>
);

const Inner = ({ children, style }) => (
    <View style={[s.inner, style]}>{children}</View>
);

const Row = ({ children, style }) => (
    <View style={[s.row, style]}>{children}</View>
);

// ══════════════════════════════════════════════════════════════
// 1. Top banner  ──  return number + request type + status pill
// ══════════════════════════════════════════════════════════════
const BannerSK = () => (
    <View style={s.bannerCard}>
        <View style={{ gap: 8 }}>
            <SK w={160} h={18} />
            <SK w={100} h={13} />
        </View>
        <SK w={80} h={28} r={20} />
    </View>
);

// ══════════════════════════════════════════════════════════════
// 2. ReturnDetailsBox  ──  title + status + meta + info box
// ══════════════════════════════════════════════════════════════
const ReturnDetailsBoxSK = () => (
    <Card>
        <Row style={{ marginBottom: 6 }}>
            <View style={{ flex: 1, gap: 8 }}>
                <SK w="50%" h={18} />
                <SK w="75%" h={13} />
            </View>
            <SK w={80} h={26} r={20} />
        </Row>
        <SK w="65%" h={12} style={{ marginBottom: 14 }} />
        <Inner style={{ backgroundColor: "#EFF9FF" }}>
            <SK w="40%" h={10} style={{ marginBottom: 8 }} />
            <SK w="85%" h={14} style={{ marginBottom: 4 }} />
            <SK w="60%" h={13} />
            <SK w="40%" h={10} style={{ marginTop: 16, marginBottom: 8 }} />
            <SK w="90%" h={14} style={{ marginBottom: 4 }} />
            <SK w="70%" h={13} />
        </Inner>
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 3. ReturnedItemsCard  ──  title + image row + name/qty/price
// ══════════════════════════════════════════════════════════════
const ReturnedItemsCardSK = () => (
    <Card>
        <SK w={130} h={18} style={{ marginBottom: 14 }} />
        <Inner style={{ backgroundColor: "#F8FAFC" }}>
            <Row style={{ alignItems: "center" }}>
                <Animated.View
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 15,
                        backgroundColor: "#CBD5E1",
                        opacity: 0.5,
                    }}
                />
                <View style={{ flex: 1, marginLeft: 14, gap: 8 }}>
                    <SK w="90%" h={14} />
                    <SK w="50%" h={12} />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <SK w={40} h={14} />
                        <SK w={70} h={14} />
                    </View>
                </View>
            </Row>
        </Inner>
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 4. ReturnTimeline  ──  6 steps: icon circle + line + text
// ══════════════════════════════════════════════════════════════
const ReturnTimelineSK = () => (
    <Card>
        <SK w={140} h={18} style={{ marginBottom: 18 }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={{ flexDirection: "row", minHeight: 72 }}>
                {/* Left: circle + vertical line */}
                <View style={{ alignItems: "center", width: 45 }}>
                    <Animated.View
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            backgroundColor: "#CBD5E1",
                            opacity: 0.5,
                        }}
                    />
                    {i < 5 && (
                        <View
                            style={{
                                width: 2,
                                flex: 1,
                                backgroundColor: "#E2E8F0",
                                marginTop: -4,
                                marginBottom: -4,
                            }}
                        />
                    )}
                </View>
                {/* Right: title + time */}
                <View
                    style={{ flex: 1, marginLeft: 15, paddingTop: 10, gap: 8 }}
                >
                    <SK w="60%" h={13} />
                    <SK w="40%" h={11} />
                </View>
            </View>
        ))}
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 5. RefundDetailsBox  ──  rows + divider + total + info box
// ══════════════════════════════════════════════════════════════
const RefundDetailsBoxSK = () => (
    <Card>
        <SK w={120} h={18} style={{ marginBottom: 18 }} />
        {/* Price rows */}
        {[75, 50, 65].map((w, i) => (
            <View key={i} style={s.priceRow}>
                <SK w={`${w}%`} h={13} />
                <SK w={60} h={13} />
            </View>
        ))}
        <View style={s.divider} />
        {/* Total */}
        <View style={[s.priceRow, { marginBottom: 22 }]}>
            <SK w="50%" h={16} />
            <SK w={80} h={16} />
        </View>
        {/* Method + time info box */}
        <Inner style={{ backgroundColor: "#EFF9FF" }}>
            <SK w="40%" h={10} style={{ marginBottom: 8 }} />
            <SK w="60%" h={14} style={{ marginBottom: 4 }} />
            <SK w="40%" h={10} style={{ marginTop: 16, marginBottom: 8 }} />
            <SK w="80%" h={13} />
        </Inner>
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 6. PickupAddressBox  ──  icon + title + name/address/phone
// ══════════════════════════════════════════════════════════════
const PickupAddressBoxSK = () => (
    <Card>
        <Row style={{ marginBottom: 18, alignItems: "center" }}>
            <Animated.View
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    backgroundColor: "#CBD5E1",
                    opacity: 0.5,
                }}
            />
            <SK w={130} h={18} style={{ marginLeft: 12 }} />
        </Row>
        <SK w={120} h={14} style={{ marginBottom: 8 }} />
        <SK w="90%" h={13} style={{ marginBottom: 6 }} />
        <SK w="70%" h={13} style={{ marginBottom: 8 }} />
        <SK w={100} h={13} />
    </Card>
);

// ══════════════════════════════════════════════════════════════
// 7. Action buttons (Contact Support + Download Invoice)
// ══════════════════════════════════════════════════════════════
const ActionButtonsSK = () => (
    <View style={{ gap: 10, marginTop: 4 }}>
        <Animated.View
            style={{
                width: "100%",
                height: 50,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                opacity: 0.5,
            }}
        />
        <Animated.View
            style={{
                width: "100%",
                height: 50,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                opacity: 0.3,
            }}
        />
    </View>
);

// ══════════════════════════════════════════════════════════════
// Main export
// ══════════════════════════════════════════════════════════════
export const ReturnDetailsSkeleton = () => (
    <View style={s.wrapper}>
        <BannerSK />
        <ReturnDetailsBoxSK />
        <ReturnedItemsCardSK />
        <ReturnTimelineSK />
        <RefundDetailsBoxSK />
        <PickupAddressBoxSK />
        <ActionButtonsSK />
    </View>
);

const s = StyleSheet.create({
    wrapper: { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 30 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    inner: {
        backgroundColor: "#F8FAFF",
        borderRadius: 14,
        padding: 14,
        marginTop: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 16,
    },
    bannerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
});

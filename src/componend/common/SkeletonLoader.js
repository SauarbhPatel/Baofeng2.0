import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
const { width } = Dimensions.get("window");

// ─── Single shimmer bar ────────────────────────────────────────
export const SkeletonBox = ({ width, height, borderRadius = 8, style }) => {
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
                    width,
                    height,
                    borderRadius,
                    backgroundColor: "#CBD5E1",
                    opacity,
                },
                style,
            ]}
        />
    );
};

// ─── Category card skeleton ────────────────────────────────────
export const CategorySkeleton = () => (
    <View style={styles.categoryCard}>
        <SkeletonBox
            width="100%"
            height={undefined}
            borderRadius={25}
            style={styles.categoryCircle}
        />
        <SkeletonBox
            width="70%"
            height={12}
            borderRadius={6}
            style={styles.categoryLabel}
        />
    </View>
);

// ─── Accessory card skeleton (2-column grid inside blue card) ──
export const AccessorySkeleton = () => (
    <View style={styles.accessoryCard}>
        <SkeletonBox
            width="100%"
            height={120}
            borderRadius={15}
            style={styles.mb10}
        />
        <SkeletonBox width="80%" height={13} borderRadius={6} />
        <SkeletonBox
            width="55%"
            height={11}
            borderRadius={6}
            style={styles.mt6}
        />
    </View>
);

// ─── Horizontal product card skeleton ─────────────────────────
export const HorizontalProductSkeleton = () => (
    <View style={styles.hCard}>
        <SkeletonBox width="100%" height={240} borderRadius={12} />
        <SkeletonBox
            width="80%"
            height={14}
            borderRadius={6}
            style={styles.mt10}
        />
        <SkeletonBox
            width="50%"
            height={12}
            borderRadius={6}
            style={styles.mt8}
        />
        <SkeletonBox
            width="40%"
            height={16}
            borderRadius={6}
            style={styles.mt8}
        />
    </View>
);

// ─── Grid product card skeleton ────────────────────────────────
export const GridProductSkeleton = () => (
    <View style={styles.gridCard}>
        <SkeletonBox width="100%" height={120} borderRadius={15} />
        <SkeletonBox
            width="80%"
            height={13}
            borderRadius={6}
            style={styles.mt10}
        />
        <SkeletonBox
            width="50%"
            height={11}
            borderRadius={6}
            style={styles.mt6}
        />
    </View>
);

// ─── Banner skeleton ───────────────────────────────────────────
export const BannerSkeleton = ({ height = 160 }) => (
    <SkeletonBox
        width="100%"
        height={height}
        borderRadius={20}
        style={styles.bannerSkeleton}
    />
);

// ─── Order card skeleton ───────────────────────────────────────
export const OrderCardSkeleton = () => (
    <View style={styles.orderCard}>
        <View style={styles.orderRow}>
            <SkeletonBox width={60} height={60} borderRadius={12} />
            <View style={styles.orderDetails}>
                <SkeletonBox width="70%" height={13} borderRadius={6} />
                <SkeletonBox
                    width="40%"
                    height={11}
                    borderRadius={6}
                    style={styles.mt8}
                />
                <SkeletonBox
                    width="30%"
                    height={14}
                    borderRadius={6}
                    style={styles.mt8}
                />
            </View>
        </View>
        <SkeletonBox
            width="100%"
            height={40}
            borderRadius={10}
            style={styles.mt10}
        />
    </View>
);

// ─── Product Listing card skeleton (2-column grid) ─────────────
export const ProductListingSkeleton = () => (
    <View style={styles.listingCard}>
        {/* Image placeholder */}
        <SkeletonBox
            width="100%"
            height={140}
            borderRadius={14}
            style={styles.mb10}
        />
        {/* Badge placeholder */}
        <SkeletonBox
            width="35%"
            height={18}
            borderRadius={20}
            style={styles.mb10}
        />
        {/* Title line 1 */}
        <SkeletonBox width="95%" height={13} borderRadius={6} />
        {/* Title line 2 */}
        {/* <SkeletonBox
            width="70%"
            height={13}
            borderRadius={6}
            style={styles.mt6}
        /> */}
        {/* Stars row */}
        <SkeletonBox
            width="55%"
            height={10}
            borderRadius={6}
            style={styles.mt8}
        />
        {/* Price row */}
        <View style={styles.priceRow}>
            <SkeletonBox width="40%" height={16} borderRadius={6} />
            <SkeletonBox width="28%" height={12} borderRadius={6} />
        </View>
        {/* Button */}
        <SkeletonBox
            width="100%"
            height={36}
            borderRadius={10}
            style={styles.mt8}
        />
    </View>
);

const styles = StyleSheet.create({
    // Category
    categoryCard: {
        alignItems: "center",
        marginHorizontal: 8,
        width: 90,
    },
    categoryCircle: {
        width: 90,
        height: 90,
        aspectRatio: 1,
    },
    categoryLabel: {
        marginTop: 10,
        alignSelf: "center",
    },

    // Accessory
    accessoryCard: {
        width: "48%",
        marginBottom: 20,
    },

    // Horizontal product
    hCard: {
        width: width * 0.65,
        backgroundColor: "#F1F5F9",
        borderRadius: 20,
        padding: 12,
        marginRight: 10,
    },

    // Grid product
    gridCard: {
        width: "48%",
        // backgroundColor: "#F1F5F9",
        borderRadius: 15,
        // padding: 10,
        marginBottom: 15,
    },

    // Banner
    bannerSkeleton: {
        marginHorizontal: 10,
        marginBottom: 15,
    },

    // Order card
    orderCard: {
        backgroundColor: "#F1F5F9",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
    },
    orderRow: {
        flexDirection: "row",
        gap: 12,
    },
    orderDetails: {
        flex: 1,
        justifyContent: "center",
    },

    // Product Listing card
    listingCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    // Spacing helpers
    mb10: { marginBottom: 10 },
    mt6: { marginTop: 6 },
    mt8: { marginTop: 8 },
    mt10: { marginTop: 10 },
});

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

// ─── Product Detail Gallery skeleton ──────────────────────────
export const ProductGallerySkeleton = () => (
    <View style={styles.gallerySkeleton}>
        {/* Main image */}
        <SkeletonBox width="100%" height={width * 0.9} borderRadius={24} />
        {/* Thumbnails */}
        <View style={styles.thumbRow}>
            {[1, 2, 3, 4].map((i) => (
                <SkeletonBox key={i} width={75} height={75} borderRadius={12} />
            ))}
        </View>
    </View>
);

// ─── Product Detail Info skeleton ─────────────────────────────
export const ProductDetailSkeleton = () => (
    <View style={styles.detailSkeleton}>
        {/* Buy / Cart buttons */}
        <View style={styles.btnRow}>
            <SkeletonBox width="48%" height={54} borderRadius={16} />
            <SkeletonBox width="48%" height={54} borderRadius={16} />
        </View>
        {/* Title */}
        <SkeletonBox
            width="60%"
            height={30}
            borderRadius={8}
            style={styles.mt10}
        />
        {/* Description lines */}
        <SkeletonBox
            width="100%"
            height={14}
            borderRadius={6}
            style={styles.mt10}
        />
        <SkeletonBox
            width="90%"
            height={14}
            borderRadius={6}
            style={styles.mt6}
        />
        <SkeletonBox
            width="75%"
            height={14}
            borderRadius={6}
            style={styles.mt6}
        />
        {/* Stars */}
        <SkeletonBox
            width={130}
            height={24}
            borderRadius={6}
            style={styles.mt10}
        />
        {/* Brand tag */}
        <SkeletonBox
            width={120}
            height={38}
            borderRadius={15}
            style={styles.mt10}
        />
        {/* Divider */}
        <SkeletonBox
            width="100%"
            height={1}
            borderRadius={1}
            style={styles.mt15}
        />
        {/* Price */}
        <SkeletonBox
            width="70%"
            height={18}
            borderRadius={6}
            style={styles.mt10}
        />
        <SkeletonBox
            width="40%"
            height={24}
            borderRadius={6}
            style={styles.mt8}
        />
        {/* Divider */}
        <SkeletonBox
            width="100%"
            height={1}
            borderRadius={1}
            style={styles.mt15}
        />
        {/* Delivery row */}
        <SkeletonBox
            width="100%"
            height={48}
            borderRadius={25}
            style={styles.mt10}
        />
        {/* Divider */}
        <SkeletonBox
            width="100%"
            height={1}
            borderRadius={1}
            style={styles.mt15}
        />
        {/* Qty + stock */}
        <SkeletonBox
            width="100%"
            height={70}
            borderRadius={20}
            style={styles.mt10}
        />
    </View>
);

// ─── Variant strip skeleton ────────────────────────────────────
export const VariantSkeleton = () => (
    <View style={styles.variantRow}>
        {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.variantItem}>
                <SkeletonBox width={50} height={50} borderRadius={5} />
                <SkeletonBox
                    width={50}
                    height={11}
                    borderRadius={5}
                    style={styles.mt6}
                />
            </View>
        ))}
    </View>
);

// ─── Similar product card skeleton (2-column grid) ─────────────
export const SimilarProductSkeleton = () => (
    <View style={styles.similarCard}>
        {/* Product image */}
        <SkeletonBox
            width={100}
            height={120}
            borderRadius={8}
            style={styles.similarImg}
        />
        {/* Title line */}
        <SkeletonBox
            width="90%"
            height={11}
            borderRadius={5}
            style={styles.mt8}
        />
        {/* Price row */}
        <View style={styles.similarPriceRow}>
            <SkeletonBox width="45%" height={12} borderRadius={5} />
            <SkeletonBox width="30%" height={10} borderRadius={5} />
        </View>
        {/* Action row — cart | BUY NOW | heart */}
        <SkeletonBox
            width="100%"
            height={28}
            borderRadius={5}
            style={styles.mt8}
        />
    </View>
);

// ─── Category grid card skeleton (2-column ImageBackground cards) ─
export const CategoryGridSkeleton = () => (
    <View style={styles.categoryGridCard}>
        <SkeletonBox width="100%" height={180} borderRadius={16} />
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

    // Product Gallery
    gallerySkeleton: { marginHorizontal: 10, marginBottom: 15 },
    thumbRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
        paddingRight: 20,
    },

    // Product Detail
    detailSkeleton: { marginHorizontal: 10, marginBottom: 15 },
    btnRow: { flexDirection: "row", justifyContent: "space-between" },

    // Variant
    variantRow: {
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 16,
        paddingBottom: 15,
    },
    variantItem: { alignItems: "center" },

    // Similar product card
    similarCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        alignItems: "center",
    },
    similarImg: { alignSelf: "center", marginBottom: 8 },
    similarPriceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 6,
    },

    // Category grid card
    categoryGridCard: {
        width: "48%",
        height: 180,
        borderRadius: 16,
        marginBottom: 10,
        overflow: "hidden",
    },

    // Spacing helpers
    mb10: { marginBottom: 10 },
    mt6: { marginTop: 6 },
    mt8: { marginTop: 8 },
    mt10: { marginTop: 10 },
});

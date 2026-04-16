import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
} from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import ProductGallery from "../../componend/product/ProductGallary";
import ProductDetail from "../../componend/product/ProductDetail";
import LicenceNote from "../../componend/product/LicenceNote";
import MustRead from "../../componend/product/MustRead";
import ProductTabs from "../../componend/product/ProductTabs";
import SimilarProducts from "../../componend/product/SimilarProducts";
import CustomerReviews from "../../componend/product/CustomerReviews";
import HomeBanner1 from "../../componend/home/HomeBanner1";
import VariantCard from "../../componend/product/VariantCard";
import {
    ProductGallerySkeleton,
    ProductDetailSkeleton,
    VariantSkeleton,
} from "../../componend/common/SkeletonLoader";
import { getProductDetails } from "../../api/commonApi";

// Default pickup point ID — can be made dynamic later
const DEFAULT_PICKUP_POINT_ID = "69a1e57b1aeed5f800c42ef8";

const ProjectDetailsScreen = ({ navigation, route }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Passed from listing screen: { slug, listingId }
    const { slug, listingId, pickupPointId } = route?.params?.product || {};

    useEffect(() => {
        if (slug && listingId && pickupPointId) {
            fetchProduct(slug, listingId, pickupPointId);
        }
    }, [slug, listingId, pickupPointId]);

    const fetchProduct = async (
        productSlug,
        productListingId,
        productPpickupPointId,
    ) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getProductDetails(
                productSlug,
                productListingId,
                // productPpickupPointId || DEFAULT_PICKUP_POINT_ID,
                DEFAULT_PICKUP_POINT_ID,
            );
            if (res?.success && res?.data) {
                setProduct(res.data);
            } else {
                setError("Failed to load product");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            // console.error("ProductDetails fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle variant tap → re-fetch with new listingId
    const handleVariantSelect = (variantItem) => {
        if (variantItem?.listingId && slug) {
            fetchProduct(
                variantItem.productVariationSlug || slug,
                variantItem.listingId,
                variantItem?.inventoryByPickup?.[0]?.inventoryRowMongoId,
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: loading ? 1 : 15 }}
            >
                {loading ? (
                    // ── Skeleton placeholders ─────────────────────
                    <View style={{ backgroundColor: "#fff", paddingTop: 14 }}>
                        <ProductGallerySkeleton />
                        <ProductDetailSkeleton />
                        <VariantSkeleton />
                    </View>
                ) : error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (slug && listingId && pickupPointId) {
                                    fetchProduct(
                                        slug,
                                        listingId,
                                        pickupPointId,
                                    );
                                }
                            }}
                            style={styles.retryBtn}
                        >
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // ── Real content ──────────────────────────────
                    <>
                        <ProductGallery
                            mainImageUrl={product?.mainImageUrl}
                            galleryImageUrls={product?.galleryImageUrls}
                        />
                        <ProductDetail product={product} />
                        <VariantCard
                            variantAttributes={product?.variantAttributes}
                            onVariantSelect={handleVariantSelect}
                            productVariationSlug={product?.productVariationSlug}
                        />
                        {product?.complianceDocuments &&
                            product?.complianceDocuments?.length > 0 && (
                                <LicenceNote
                                    complianceDocuments={
                                        product?.complianceDocuments
                                    }
                                />
                            )}
                        <MustRead bulletPoints={product?.bulletPoints} />
                        <ProductTabs dynamicSection={product?.dynamicSection} />
                        <SimilarProducts
                            categoryId={product?.categoryId}
                            productId={product?._id}
                        />
                        <CustomerReviews />
                        <HomeBanner1
                            imageSource={require("../../assets/images/banner5.png")}
                        />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
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

export default ProjectDetailsScreen;

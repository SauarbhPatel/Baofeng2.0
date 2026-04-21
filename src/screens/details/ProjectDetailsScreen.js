import { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    FlatList,
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
    // true = all required compliance docs have been uploaded
    const [docsReady, setDocsReady] = useState(true);
    // whether this product actually needs compliance docs
    const [needsDocs, setNeedsDocs] = useState(false);

    // Passed from listing screen: { slug, listingId }
    const { slug, listingId, pickupPointId } = route?.params?.product || {};

    useEffect(() => {
        if (slug && listingId) {
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
                // Does this product require compliance documents?
                const hasDocs = res.data.complianceDocuments?.length > 0;
                setNeedsDocs(hasDocs);
                // If no docs required, cart is always open
                if (!hasDocs) setDocsReady(true);
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

    // Called by LicenceNote whenever upload status changes
    const handleDocsStatusChange = useCallback((allUploaded) => {
        console.log("allUploaded", allUploaded);
        setDocsReady(allUploaded);
    }, []);

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

    const HOME_SECTIONS = [
        { id: "ProductGallery", type: "ProductGallery" },
        { id: "ProductDetail", type: "ProductDetail" },
        { id: "VariantCard", type: "VariantCard" },
        { id: "LicenceNote", type: "LicenceNote" },
        { id: "MustRead", type: "MustRead" },
        { id: "ProductTabs", type: "ProductTabs" },
        { id: "SimilarProducts", type: "SimilarProducts" },
        { id: "CustomerReviews", type: "CustomerReviews" },
        { id: "HomeBanner1", type: "HomeBanner1" },
    ];

    const renderItem = useCallback(
        ({ item }) => {
            switch (item.type) {
                case "ProductGallery":
                    return (
                        <>
                            <ProductGallery
                                mainImageUrl={product?.mainImageUrl}
                                galleryImageUrls={product?.galleryImageUrls}
                            />
                        </>
                    );
                case "ProductDetail":
                    return (
                        <>
                            <ProductDetail
                                product={product}
                                cartBlocked={needsDocs && !docsReady}
                                navigation={navigation}
                            />
                        </>
                    );
                case "VariantCard":
                    return (
                        <>
                            <VariantCard
                                variantAttributes={product?.variantAttributes}
                                onVariantSelect={handleVariantSelect}
                                productVariationSlug={
                                    product?.productVariationSlug
                                }
                            />
                        </>
                    );
                case "LicenceNote":
                    return (
                        <>
                            {product?.complianceDocuments &&
                                product?.complianceDocuments?.length > 0 && (
                                    <LicenceNote
                                        complianceDocuments={
                                            product?.complianceDocuments
                                        }
                                        onDocsStatusChange={
                                            handleDocsStatusChange
                                        }
                                    />
                                )}
                        </>
                    );
                case "MustRead":
                    return (
                        <>
                            <MustRead bulletPoints={product?.bulletPoints} />
                        </>
                    );
                case "ProductTabs":
                    return (
                        <>
                            <ProductTabs
                                dynamicSection={product?.dynamicSection}
                            />
                        </>
                    );
                case "SimilarProducts":
                    return (
                        <>
                            <SimilarProducts
                                categoryId={product?.categoryId}
                                productId={product?._id}
                                navigation={navigation}
                            />
                        </>
                    );
                case "CustomerReviews":
                    return (
                        <>
                            <CustomerReviews />
                        </>
                    );
                case "HomeBanner1":
                    return (
                        <>
                            <HomeBanner1
                                imageSource={require("../../assets/images/banner5.png")}
                            />
                        </>
                    );

                default:
                    return null;
            }
        },
        [product, navigation],
    );

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: loading ? 1 : 15 }}
                windowSize={8}
                removeClippedSubviews
                onEndReachedThreshold={0.5}
                scrollEventThrottle={100}
                data={!error && !loading ? HOME_SECTIONS : []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
                        {loading ? (
                            // ── Skeleton placeholders ─────────────────────
                            <View
                                style={{
                                    backgroundColor: "#fff",
                                    paddingTop: 14,
                                }}
                            >
                                <ProductGallerySkeleton />
                                <ProductDetailSkeleton />
                                <VariantSkeleton />
                            </View>
                        ) : error ? (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>{error}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (
                                            slug &&
                                            listingId &&
                                            pickupPointId
                                        ) {
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
                        ) : null}
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },

    // ── Cart blocked banner ──────────────────────────────────────
    docsBanner: {
        backgroundColor: "#fef2f2",
        borderBottomWidth: 1,
        borderBottomColor: "#fecaca",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    docsBannerText: {
        fontSize: 13,
        color: "#dc2626",
        fontWeight: "600",
        textAlign: "center",
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

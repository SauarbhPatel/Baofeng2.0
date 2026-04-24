import { useCallback, useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
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
import { addToCart, getProductDetails } from "../../api/commonApi";
import ProductTabsBox from "../../componend/product/ProductTabsBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    MaterialCommunityIcons,
    Feather,
    FontAwesome,
} from "@expo/vector-icons";

// Default pickup point ID — can be made dynamic later
const DEFAULT_PICKUP_POINT_ID = "69a1e57b1aeed5f800c42ef8";
const CART_TOKEN_KEY = "baofeng_cart_token";

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
                            {/* <ProductGallery
                                mainImageUrl={product?.mainImageUrl}
                                galleryImageUrls={product?.galleryImageUrls}
                            /> */}
                        </>
                    );
                case "ProductDetail":
                    return (
                        <>
                            {/* <ProductDetail
                                product={product}
                                cartBlocked={needsDocs && !docsReady}
                                navigation={navigation}
                                variantCom={
                                    <VariantCard
                                        variantAttributes={
                                            product?.variantAttributes
                                        }
                                        onVariantSelect={handleVariantSelect}
                                        productVariationSlug={
                                            product?.productVariationSlug
                                        }
                                    />
                                }
                            /> */}
                        </>
                    );

                case "LicenceNote":
                    return (
                        <>
                            {/* {product?.complianceDocuments &&
                                product?.complianceDocuments?.length > 0 && (
                                    <LicenceNote
                                        complianceDocuments={
                                            product?.complianceDocuments
                                        }
                                        onDocsStatusChange={
                                            handleDocsStatusChange
                                        }
                                    />
                                )} */}
                        </>
                    );
                case "MustRead":
                    return (
                        <>
                            {/* <MustRead bulletPoints={product?.bulletPoints} /> */}
                        </>
                    );
                case "ProductTabs":
                    return (
                        <>
                            {/* <ProductTabs
                                dynamicSection={product?.dynamicSection}
                            /> */}
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

    const [sections, setSections] = useState({});
    const sectionsRef = useRef(sections);
    sectionsRef.current = sections;

    // Height map for each section
    const heightsRef = useRef({});
    const baseTopRef = useRef(0);

    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const handleScroll = (e) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent;
        const scrollY = contentOffset.y;
        const viewBottom = scrollY + layoutMeasurement.height;

        let bestIndex = null;
        let bestPercent = 0;
        let anyVisible = false;

        Object.keys(sectionsRef.current).forEach((key) => {
            const sec = sectionsRef.current[key];
            if (!sec) return;

            const visibleTop = Math.max(sec.top, scrollY);
            const visibleBottom = Math.min(sec.bottom, viewBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const percent = visibleHeight / sec.height;
            if (visibleHeight > 0) {
                anyVisible = true;
            }
            if (percent > bestPercent) {
                bestPercent = percent;
                bestIndex = Number(key);
            }
        });

        if (!anyVisible) {
            if (isSticky) setIsSticky(false);
            return;
        } else {
            if (!isSticky) setIsSticky(true);
        }

        if (bestIndex !== null && activeSection !== bestIndex) {
            setActiveSection(bestIndex);
            //console.log("set", bestIndex);
        }
    };

    const [cartLoading, setCartLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // ── Add to Cart ────────────────────────────────────────────
    const handleAddToCart = async (isNavigate) => {
        const { listing = {}, productId = "" } = product;
        const { listingMongoId = "" } = listing;

        if (!productId || !listingMongoId) {
            Alert.alert("Error", "Product information missing.");
            return;
        }
        try {
            setCartLoading(true);
            // Read existing cart token from AsyncStorage
            const savedToken = await AsyncStorage.getItem(CART_TOKEN_KEY);

            const payload = {
                productId,
                listingId: listingMongoId,
                quantity,
                ...(savedToken ? { cartToken: savedToken } : {}),
            };

            const res = await addToCart(payload);

            if (res?.success && res?.data?.cartToken) {
                // Persist cart token for subsequent adds
                await AsyncStorage.setItem(CART_TOKEN_KEY, res.data.cartToken);
                if (isNavigate)
                    return navigation.push("HomeNavigator", { screen: "Cart" });
                Alert.alert(
                    "Added to Cart ✓",
                    `${res.data.items?.length || 1} item(s) in your cart.`,
                    [
                        {
                            text: "Go to Cart",
                            onPress: () =>
                                navigation.push("HomeNavigator", {
                                    screen: "Cart",
                                }),
                            style: "cancel",
                        },
                        {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                        },
                    ],
                );
            } else {
                Alert.alert("Error", "Could not add to cart. Try again.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Already Added", "Product is already in the cart", [
                {
                    text: "Go to Cart",
                    onPress: () =>
                        navigation.push("HomeNavigator", { screen: "Cart" }),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        } finally {
            setCartLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader />
            {isSticky && (
                <ProductTabsBox
                    list={product?.dynamicSection || []}
                    activeTab={activeSection}
                    isSticky={true}
                />
            )}
            <FlatList
                onScroll={handleScroll}
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
                        {!error && !loading ? (
                            <>
                                <ProductGallery
                                    mainImageUrl={product?.mainImageUrl}
                                    galleryImageUrls={product?.galleryImageUrls}
                                />
                                <ProductDetail
                                    product={product}
                                    cartBlocked={needsDocs && !docsReady}
                                    navigation={navigation}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    variantCom={
                                        <VariantCard
                                            variantAttributes={
                                                product?.variantAttributes
                                            }
                                            onVariantSelect={
                                                handleVariantSelect
                                            }
                                            productVariationSlug={
                                                product?.productVariationSlug
                                            }
                                        />
                                    }
                                />
                                {product?.complianceDocuments &&
                                    product?.complianceDocuments?.length >
                                        0 && (
                                        <LicenceNote
                                            complianceDocuments={
                                                product?.complianceDocuments
                                            }
                                            onDocsStatusChange={
                                                handleDocsStatusChange
                                            }
                                        />
                                    )}
                                <MustRead
                                    bulletPoints={product?.bulletPoints}
                                />
                                <View
                                    style={{}}
                                    onLayout={(e) => {
                                        baseTopRef.current =
                                            e.nativeEvent.layout.y;
                                    }}
                                >
                                    {(product?.dynamicSection || [])?.map(
                                        (item, index) => (
                                            <View
                                                key={item?.sectionTitle}
                                                onLayout={(e) => {
                                                    const height =
                                                        e.nativeEvent.layout
                                                            .height;

                                                    heightsRef.current[index] =
                                                        height;

                                                    let top =
                                                        baseTopRef.current;
                                                    for (
                                                        let i = 0;
                                                        i < index;
                                                        i++
                                                    ) {
                                                        top +=
                                                            heightsRef.current[
                                                                i
                                                            ] || 0;
                                                    }
                                                    const bottom = top + height;

                                                    setSections((prev) => {
                                                        return {
                                                            ...prev,
                                                            [index]: {
                                                                top,
                                                                bottom,
                                                                height,
                                                            },
                                                        };
                                                    });
                                                }}
                                            >
                                                <ProductTabs
                                                    dynamicSection={[item]}
                                                    isShowTaps={
                                                        activeSection === index
                                                    }
                                                />
                                            </View>
                                        ),
                                    )}
                                </View>
                            </>
                        ) : null}
                    </>
                }
            />

            {product?.stock && product?.stock != 0 ? (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            styles.buyNowBtn,
                            // (cartLoading || cartBlocked) && styles.btnDisabled,
                            cartLoading && styles.btnDisabled,
                        ]}
                        onPress={() => {
                            if (needsDocs && !docsReady) {
                                Alert.alert(
                                    "Documents Required",
                                    "Please upload all required compliance documents before adding to cart.",
                                );
                                return;
                            }
                            handleAddToCart(true);
                        }}
                        disabled={cartLoading}
                    >
                        {cartLoading ? (
                            <ActivityIndicator color="#0066b2" size="small" />
                        ) : (
                            <Text style={styles.buyNowText}>
                                <MaterialCommunityIcons
                                    name="lightning-bolt"
                                    size={18}
                                />{" "}
                                Buy Now
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            styles.addToCartBtn,
                            cartLoading && styles.btnDisabled,
                            {
                                borderColor: "#EEF1FF",
                                backgroundColor: "#EEF1FF",
                            },
                        ]}
                        onPress={() => {
                            if (needsDocs && !docsReady) {
                                Alert.alert(
                                    "Documents Required",
                                    "Please upload all required compliance documents before adding to cart.",
                                );
                                return;
                            }
                            handleAddToCart();
                        }}
                        disabled={cartLoading}
                    >
                        {cartLoading ? (
                            <ActivityIndicator color="#0066b2" size="small" />
                        ) : (
                            <Text style={styles.addToCartText}>
                                <Feather name="shopping-cart" size={18} /> Add
                                to Cart
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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

    // ── Action Buttons ─────────────────────────────────────────────

    actionRow: {
        flexDirection: "row",
        gap: 12,
        // marginBottom: 24,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    btn: {
        flex: 1,
        // height: 54,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        paddingVertical: 10,
    },
    buyNowBtn: { backgroundColor: "#0066b2", borderColor: "#0066b2" },
    addToCartBtn: { backgroundColor: "transparent", borderColor: "#0066b2" },
    btnDisabled: { opacity: 0.6 },
    buyNowText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
    addToCartText: { color: "#0066b2", fontSize: 15, fontWeight: "bold" },
});

export default ProjectDetailsScreen;

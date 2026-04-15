// import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
// import MainHeader from "../../componend/common/MainHeader";
// import SimilarProducts from "../../componend/product/SimilarProducts";
// import HomeBanner1 from "../../componend/home/HomeBanner1";
// import FilterSection from "../../componend/product/FilterSection";

// const ProductListingScreen = ({ navigation }) => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingTop: 15 }}
//             >
//                 <FilterSection />
//                 <SimilarProducts />
//                 <HomeBanner1
//                     imageSource={require("../../assets/images/banner6.png")}
//                 />
//                 <HomeBanner1
//                     imageSource={require("../../assets/images/banner7.png")}
//                 />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
// });

// export default ProductListingScreen;
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import {
    FontAwesome,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import FilterSection from "../../componend/product/FilterSection";
import HomeBanner1 from "../../componend/home/HomeBanner1";
import { getProductListing } from "../../api/commonApi";
import { ProductListingSkeleton } from "../../componend/common/SkeletonLoader";

const { width } = Dimensions.get("window");
const LIMIT = 12;

const ProductListingScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("default");

    const sortOptions = [
        { id: "default", label: "Default" },
        { id: "price_asc", label: "Price ↑" },
        { id: "price_desc", label: "Price ↓" },
        { id: "newest", label: "Newest" },
    ];

    // ── Fetch products ────────────────────────────────────────
    const fetchProducts = useCallback(
        async ({ pageNum = 1, replace = true } = {}) => {
            try {
                if (replace) setLoading(true);
                setError(null);

                const res = await getProductListing(pageNum, LIMIT);

                if (res?.success && res?.data?.records) {
                    const fetched = res.data.records;
                    setProducts((prev) =>
                        replace ? fetched : [...prev, ...fetched],
                    );
                    // If fewer than LIMIT returned, no more pages
                    setHasMore(fetched.length === LIMIT);
                    setPage(pageNum);
                } else {
                    setError("Failed to load products");
                }
            } catch (err) {
                setError("Network error. Please try again.");
                console.error("ProductListing fetch error:", err);
            } finally {
                setLoading(false);
                setLoadingMore(false);
                setRefreshing(false);
            }
        },
        [],
    );

    useEffect(() => {
        fetchProducts({ pageNum: 1, replace: true });
    }, []);

    // ── Pull to refresh ───────────────────────────────────────
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts({ pageNum: 1, replace: true });
    }, [fetchProducts]);

    // ── Load more (pagination) ────────────────────────────────
    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore || loading) return;
        setLoadingMore(true);
        fetchProducts({ pageNum: page + 1, replace: false });
    }, [loadingMore, hasMore, loading, page, fetchProducts]);

    // ── Filter products by search ─────────────────────────────
    const filteredProducts = products.filter((p) =>
        p.title?.toLowerCase().includes(searchText.toLowerCase()),
    );

    // ── Sort products ─────────────────────────────────────────
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price_asc")
            return (a.fromPrice || 0) - (b.fromPrice || 0);
        if (sortBy === "price_desc")
            return (b.fromPrice || 0) - (a.fromPrice || 0);
        return 0;
    });

    // ── Render each product card ──────────────────────────────
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.push("ProjectDetails", { product: item })}
        >
            {/* Product Image */}
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>

            {/* Title */}
            <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
            </Text>

            {/* Star Rating (static 4 stars until ratings API) */}
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <FontAwesome
                        key={s}
                        name="star"
                        size={11}
                        color={s <= 4 ? "#FFD700" : "#E2E8F0"}
                        style={{ marginRight: 2 }}
                    />
                ))}
            </View>

            {/* Price */}
            <Text style={styles.productPrice}>
                ₹{item.fromPrice?.toLocaleString("en-IN")}
            </Text>

            {/* Add to Cart button */}
            {/* <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8}
                onPress={() =>
                    navigation.push("ProjectDetails", { product: item })
                }
            >
                <Feather name="shopping-cart" size={13} color="#fff" />
                <Text style={styles.addBtnText}>Add to Cart</Text>
            </TouchableOpacity> */}
            <View style={styles.actionRow}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="cart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buyBtn, styles.buyBtnActive]}>
                    <Text style={[styles.buyBtnText, styles.buyTextActive]}>
                        BUY NOW
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="heart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    // ── Skeleton grid (while initial load) ───────────────────
    const renderSkeletons = () => (
        <View style={styles.skeletonGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductListingSkeleton key={i} />
            ))}
        </View>
    );

    // ── Footer: load more spinner or end label ────────────────
    const renderFooter = () => {
        if (loadingMore) {
            return (
                <View style={styles.footerLoader}>
                    <ActivityIndicator size="small" color="#0069AF" />
                    <Text style={styles.footerText}>Loading more...</Text>
                </View>
            );
        }
        if (!hasMore && products.length > 0) {
            return (
                <View style={styles.footerLoader}>
                    <Text style={styles.footerEndText}>
                        ✓ All products loaded
                    </Text>
                </View>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            {/* ── Sticky Search + Sort Bar ── */}
            <View style={styles.searchBar}>
                <View style={styles.searchInputWrapper}>
                    <Feather name="search" size={16} color="#94a3b8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor="#94a3b8"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText("")}>
                            <Feather name="x" size={16} color="#94a3b8" />
                        </TouchableOpacity>
                    )}
                </View>
                <FilterSection />
            </View>

            {/* ── Sort Chips ── */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.sortRow}
                contentContainerStyle={styles.sortContent}
            >
                {sortOptions.map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        onPress={() => setSortBy(opt.id)}
                        style={[
                            styles.sortChip,
                            sortBy === opt.id && styles.sortChipActive,
                            { height: 30 },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sortChipText,
                                sortBy === opt.id && styles.sortChipTextActive,
                            ]}
                        >
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ── Product Count Label ── */}
            {!loading && !error && (
                <View style={styles.countRow}>
                    <Text style={styles.countText}>
                        {sortedProducts.length} product
                        {sortedProducts.length !== 1 ? "s" : ""} found
                    </Text>
                </View>
            )}

            {/* ── Main Content ── */}
            {loading ? (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {renderSkeletons()}
                </ScrollView>
            ) : error ? (
                <View style={styles.errorBox}>
                    <Feather name="wifi-off" size={40} color="#94a3b8" />
                    <Text style={styles.errorTitle}>Something went wrong</Text>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryBtn}
                        onPress={() =>
                            fetchProducts({ pageNum: 1, replace: true })
                        }
                    >
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            ) : sortedProducts.length === 0 ? (
                <View style={styles.errorBox}>
                    <Feather name="search" size={40} color="#94a3b8" />
                    <Text style={styles.errorTitle}>No products found</Text>
                    <Text style={styles.errorText}>
                        Try adjusting your search or filters
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={sortedProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0069AF"]}
                            tintColor="#0069AF"
                            progressBackgroundColor="#fff"
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },

    // ── Search + Filter bar ──────────────────────────────────
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
        gap: 8,
        marginTop: 1,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3FBFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#1e293b",
    },

    // ── Sort chips ───────────────────────────────────────────
    sortRow: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#EBF7FD",
    },
    sortContent: {
        paddingHorizontal: 10,
        gap: 8,
        marginBottom: 25,
    },
    sortChip: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#F3FBFF",
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    sortChipActive: {
        backgroundColor: "#0069AF",
        borderColor: "#0069AF",
    },
    sortChipText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000000",
    },
    sortChipTextActive: {
        color: "#fff",
    },

    // ── Count label ──────────────────────────────────────────
    countRow: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    countText: {
        fontSize: 13,
        color: "#64748b",
        fontWeight: "500",
    },

    // ── List & grid layout ───────────────────────────────────
    scrollContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
    },
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 14,
    },
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    // ── Product card ─────────────────────────────────────────
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#EDF1FA",
        elevation: 2,
        shadowColor: "#0069AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    imageWrapper: {
        width: "100%",
        height: 140,
        backgroundColor: "#F8FAFF",
        borderColor: "#F8FAFF",
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        overflow: "hidden",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    productTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#1e293b",
        lineHeight: 17,
        marginBottom: 6,
        // minHeight: 34,
    },
    starsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0069AF",
        marginBottom: 8,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0069AF",
        borderRadius: 10,
        paddingVertical: 8,
        gap: 6,
    },
    addBtnText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        borderColor: "#F4F4F4",
    },
    buyBtn: {
        paddingVertical: 6,
        paddingHorizontal: 5,
        flex: 0.8,
        alignItems: "center",
        borderRadius: 5,
    },
    buyBtnActive: {
        backgroundColor: "#0069AF",
    },
    buyBtnInactive: {
        backgroundColor: "transparent",
    },
    buyBtnText: {
        fontSize: 10,
        fontWeight: "800",
    },
    buyTextActive: {
        color: "#fff",
    },
    buyTextInactive: {
        color: "#0069AF",
    },

    // ── Footer loader ────────────────────────────────────────
    footerLoader: {
        alignItems: "center",
        paddingVertical: 20,
        gap: 6,
    },
    footerText: {
        fontSize: 13,
        color: "#64748b",
    },
    footerEndText: {
        fontSize: 13,
        color: "#22c55e",
        fontWeight: "600",
    },

    // ── Error / empty states ─────────────────────────────────
    errorBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 30,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
    },
    errorText: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20,
    },
    retryBtn: {
        marginTop: 8,
        backgroundColor: "#0069AF",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
    },
    retryText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default ProductListingScreen;

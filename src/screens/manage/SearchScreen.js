// import React from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     ImageBackground,
//     TouchableOpacity,
//     Dimensions,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import MainHeader from "../../componend/common/MainHeader";

// const { width } = Dimensions.get("window");
// const COLUMN_WIDTH = (width - 62) / 2;

// const SearchScreen = ({ navigation }) => {
//     const categories = [
//         {
//             id: "1",
//             title: "Walkie Talkie",
//             image: require("../../assets/images/87cec5832a2596c4a20d401293a7147d999baf36.jpg"),
//         },
//         {
//             id: "2",
//             title: "License Free",
//             image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
//         },
//         {
//             id: "3",
//             title: "BF-888s",
//             image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
//         },
//         {
//             id: "4",
//             title: "Licence Radios",
//             image: require("../../assets/images/80a393c5cdab6738f710630569415fac9d3914b6.jpg"),
//         },
//         {
//             id: "5",
//             title: "Business Radios",
//             image: require("../../assets/images/39f35aedd5ce467bcd35726dd695c50ea455c00c.png"),
//         },
//         {
//             id: "6",
//             title: "HAM Corner",
//             image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
//         },
//         {
//             id: "7",
//             title: "Walkie Talkie",
//             image: require("../../assets/images/87cec5832a2596c4a20d401293a7147d999baf36.jpg"),
//         },
//         {
//             id: "8",
//             title: "License Free",
//             image: require("../../assets/images/b6b708e9ce280094349963b78fbf1b69b1f20650.png"),
//         },
//         {
//             id: "9",
//             title: "BF-888s",
//             image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
//         },
//         {
//             id: "10",
//             title: "Licence Radios",
//             image: require("../../assets/images/80a393c5cdab6738f710630569415fac9d3914b6.jpg"),
//         },
//         {
//             id: "11",
//             title: "Business Radios",
//             image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
//         },
//         {
//             id: "12",
//             title: "HAM Corner",
//             image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
//         },
//     ];

//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader navigation={navigation} />
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 <Text style={styles.headerTitle}>Search Result</Text>

//                 {/* Search Bar */}
//                 <View style={styles.searchContainer}>
//                     <Feather
//                         name="search"
//                         size={20}
//                         color="#94a3b8"
//                         style={styles.searchIcon}
//                     />
//                     <TextInput
//                         placeholder="Licenses Free Walkie talkie"
//                         placeholderTextColor="#94a3b8"
//                         style={styles.searchInput}
//                     />
//                 </View>

//                 {/* Categories Grid */}
//                 <View style={styles.gridContainer}>
//                     <View style={{ flex: 1 }}>
//                         <Text style={styles.headerTitle}>
//                             Licenses Free Walkie talkie
//                         </Text>
//                         <Text
//                             style={{
//                                 fontSize: 12,
//                                 color: "#525252",
//                                 marginTop: -10,
//                             }}
//                         >
//                             72 Product Found
//                         </Text>
//                     </View>

//                     {/* Products List */}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
//     scrollContent: {
//         padding: 15,
//         paddingHorizontal: 10,
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#0f172a",
//         // textAlign: "center",
//         marginBottom: 15,
//     },
//     searchContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#FFFFFF",
//         borderRadius: 12,
//         paddingHorizontal: 15,
//         height: 50,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#CEDCE3",
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 16,
//         color: "#1e293b",
//     },
//     gridContainer: {
//         backgroundColor: "#ffffff",
//         borderRadius: 24,
//         padding: 15,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: 10,
//     },
//     categoryCard: {
//         width: COLUMN_WIDTH,
//         height: 180,
//         justifyContent: "flex-end",
//         overflow: "hidden",
//         borderRadius: 16,
//     },
//     cardImage: {
//         borderRadius: 16,
//     },
//     overlay: {
//         backgroundColor: "rgba(0,0,0,0.65)",
//         height: "100%",
//         width: "100%",
//         borderRadius: 16,
//         justifyContent: "flex-end",
//         padding: 12,
//         overflow: "hidden",
//     },
//     categoryTitle: {
//         color: "#FFFFFF",
//         fontSize: 15,
//         fontWeight: "700",
//     },
//     underline: {
//         width: 25,
//         height: 3,
//         backgroundColor: "#3B82F6",
//         marginTop: 4,
//         borderRadius: 2,
//     },
// });

// export default SearchScreen;

import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    Platform,
    StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import { searchProducts } from "../../api/commonApi";

// ── Skeleton for search results ────────────────────────────────
const SearchSkeleton = () => (
    <View style={styles.skeletonContainer}>
        {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.skeletonCard}>
                <View style={styles.skeletonImg} />
                <View style={styles.skeletonInfo}>
                    <View style={[styles.skeletonLine, { width: "80%" }]} />
                    <View
                        style={[
                            styles.skeletonLine,
                            { width: "40%", marginTop: 8 },
                        ]}
                    />
                </View>
            </View>
        ))}
    </View>
);

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null); // null = not searched yet
    const [error, setError] = useState(null);
    const debounceRef = useRef(null);
    const inputRef = useRef(null);

    // ── Debounced search ───────────────────────────────────────
    const handleQueryChange = (text) => {
        setQuery(text);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (text.trim().length < 2) {
            setResults(null);
            setError(null);
            return;
        }
        debounceRef.current = setTimeout(() => {
            runSearch(text.trim());
        }, 400);
    };

    const runSearch = async (q) => {
        try {
            console.log(q);
            setLoading(true);
            setError(null);
            const res = await searchProducts(q);
            if (res?.success && res?.data) {
                setResults(res.data);
            } else {
                setError("No results found.");
                setResults(null);
            }
        } catch {
            setError("Network error. Please try again.");
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults(null);
        setError(null);
        inputRef.current?.focus();
    };

    const goToProduct = (item) => {
        Keyboard.dismiss();
        navigation.push("ProjectDetails", {
            product: {
                slug: item.productVariationSlug || item.slug,
                listingId: item.listingId || "",
            },
        });
    };

    const goToCategory = () => {
        navigation.push("ProductListing");
    };

    const hasResults =
        results &&
        (results.products?.length > 0 ||
            results.categories?.length > 0 ||
            results.brands?.length > 0);

    return (
        <SafeAreaView style={styles.container}>
            {/* <MainHeader navigation={navigation} /> */}

            {/* ── Search Bar ── */}
            <View style={styles.searchBarWrapper}>
                <View style={styles.searchRow}>
                    <View style={styles.inputContainer}>
                        <Feather
                            name="search"
                            size={18}
                            color="#0069AF"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Search products, categories..."
                            placeholderTextColor="#94a3b8"
                            value={query}
                            onChangeText={handleQueryChange}
                            autoFocus
                            returnKeyType="search"
                            onSubmitEditing={() =>
                                query.trim().length >= 2 &&
                                runSearch(query.trim())
                            }
                        />
                        {query.length > 0 && (
                            <TouchableOpacity
                                onPress={clearSearch}
                                style={styles.clearBtn}
                            >
                                <Feather name="x" size={16} color="#94a3b8" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.cancelBtn}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Content ── */}
            {loading ? (
                <SearchSkeleton />
            ) : error ? (
                <View style={styles.emptyBox}>
                    <Feather name="search" size={40} color="#cbd5e1" />
                    <Text style={styles.emptyTitle}>No results found</Text>
                    <Text style={styles.emptySubtitle}>
                        Try a different keyword
                    </Text>
                </View>
            ) : !hasResults && query.length < 2 ? (
                // ── Initial / empty state ──────────────────────
                <View style={styles.emptyBox}>
                    <Feather name="search" size={48} color="#cbd5e1" />
                    <Text style={styles.emptyTitle}>Search Baofeng</Text>
                    <Text style={styles.emptySubtitle}>
                        Find radios, accessories, and more
                    </Text>
                </View>
            ) : !hasResults ? (
                <View style={styles.emptyBox}>
                    <Feather name="inbox" size={40} color="#cbd5e1" />
                    <Text style={styles.emptyTitle}>
                        No results for "{query}"
                    </Text>
                    <Text style={styles.emptySubtitle}>
                        Try a different keyword
                    </Text>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {/* ── Products Section ── */}
                    {results.products?.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Products
                                </Text>
                                <Text style={styles.sectionCount}>
                                    {results.products.length} found
                                </Text>
                            </View>
                            {results.products.slice(0, 10).map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={styles.productRow}
                                    activeOpacity={0.8}
                                    onPress={() => goToProduct(item)}
                                >
                                    <View style={styles.productImgBox}>
                                        <Image
                                            source={{ uri: item.mainImageUrl }}
                                            style={styles.productImg}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.productInfo}>
                                        <Text
                                            style={styles.productName}
                                            numberOfLines={2}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={styles.productId}>
                                            {item.listingId}
                                        </Text>
                                    </View>
                                    <Feather
                                        name="chevron-right"
                                        size={18}
                                        color="#94a3b8"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* ── Categories Section ── */}
                    {results.categories?.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Categories
                                </Text>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.chipRow}
                            >
                                {results.categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat._id}
                                        style={styles.categoryChip}
                                        onPress={goToCategory}
                                    >
                                        <Image
                                            source={{ uri: cat.image }}
                                            style={styles.chipImg}
                                            resizeMode="cover"
                                        />
                                        <Text
                                            style={styles.chipLabel}
                                            numberOfLines={1}
                                        >
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* ── Brands Section ── */}
                    {results.brands?.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Brands</Text>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.chipRow}
                            >
                                {results.brands.map((brand) => (
                                    <TouchableOpacity
                                        key={brand._id}
                                        style={styles.brandChip}
                                        onPress={goToCategory}
                                    >
                                        {brand.logo &&
                                        !brand.logo.startsWith("data:") ? (
                                            <Image
                                                source={{ uri: brand.logo }}
                                                style={styles.brandLogo}
                                                resizeMode="contain"
                                            />
                                        ) : (
                                            <View
                                                style={styles.brandLogoFallback}
                                            >
                                                <Text
                                                    style={styles.brandLogoText}
                                                >
                                                    {brand.name?.[0]}
                                                </Text>
                                            </View>
                                        )}
                                        <Text style={styles.brandName}>
                                            {brand.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },

    // ── Search bar ─────────────────────────────────────────────
    searchBarWrapper: {
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EBF7FD",
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
    },
    searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3FBFF",
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 46,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        gap: 8,
    },
    searchIcon: {},
    input: { flex: 1, fontSize: 15, color: "#1e293b" },
    clearBtn: { padding: 2 },
    cancelBtn: { paddingHorizontal: 4 },
    cancelText: { fontSize: 14, color: "#0069AF", fontWeight: "600" },

    // ── Skeleton ───────────────────────────────────────────────
    skeletonContainer: { padding: 15, gap: 12 },
    skeletonCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        gap: 12,
    },
    skeletonImg: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: "#E2E8F0",
    },
    skeletonInfo: { flex: 1, justifyContent: "center" },
    skeletonLine: { height: 12, backgroundColor: "#E2E8F0", borderRadius: 6 },

    // ── Empty / initial state ──────────────────────────────────
    emptyBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 30,
    },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
    emptySubtitle: { fontSize: 14, color: "#64748b", textAlign: "center" },

    // ── Sections ───────────────────────────────────────────────
    section: {
        backgroundColor: "#F3FBFF",
        borderRadius: 20,
        marginHorizontal: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        overflow: "hidden",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 14,
        paddingBottom: 10,
    },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
    sectionCount: { fontSize: 12, color: "#64748b" },

    // ── Product row ─────────────────────────────────────────────
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#EBF7FD",
        backgroundColor: "#fff",
        gap: 12,
    },
    productImgBox: {
        width: 56,
        height: 56,
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    productImg: { width: 44, height: 44 },
    productInfo: { flex: 1 },
    productName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        lineHeight: 20,
    },
    productId: { fontSize: 11, color: "#94a3b8", marginTop: 3 },

    // ── Category chips ──────────────────────────────────────────
    chipRow: { paddingHorizontal: 14, paddingBottom: 14, gap: 10 },
    categoryChip: {
        alignItems: "center",
        width: 80,
    },
    chipImg: {
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: "#E2E8F0",
        marginBottom: 6,
    },
    chipLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#334155",
        textAlign: "center",
    },

    // ── Brand chips ─────────────────────────────────────────────
    brandChip: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#EDF1FA",
        minWidth: 90,
    },
    brandLogo: { width: 64, height: 32, marginBottom: 6 },
    brandLogoFallback: {
        width: 64,
        height: 32,
        backgroundColor: "#0069AF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
    },
    brandLogoText: { fontSize: 18, fontWeight: "900", color: "#fff" },
    brandName: { fontSize: 11, fontWeight: "700", color: "#334155" },
});

export default SearchScreen;

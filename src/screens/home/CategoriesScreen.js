import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import { getCategories } from "../../api/commonApi";
import { CategoryGridSkeleton } from "../../componend/common/SkeletonLoader";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 62) / 2;
const PAGE_SIZE = 8;

const CategoriesScreen = ({ navigation }) => {
    const [allCategories, setAllCategories] = useState([]); // full list from API
    const [displayed, setDisplayed] = useState([]); // slice shown so far
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    // ── Fetch all categories from API ──────────────────────────
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await getCategories();
            if (res?.success && res?.data?.records) {
                const records = res.data.records;
                setAllCategories(records);
                setDisplayed(records.slice(0, PAGE_SIZE));
                setHasMore(records.length > PAGE_SIZE);
            }
        } catch (err) {
            console.error("Categories fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // ── Pull to refresh ────────────────────────────────────────
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setSearchText("");
        fetchCategories();
    }, []);

    // ── Load next 8 ────────────────────────────────────────────
    const loadMore = () => {
        if (loadingMore || !hasMore || searchText) return;
        setLoadingMore(true);
        setTimeout(() => {
            const next = allCategories.slice(0, displayed.length + PAGE_SIZE);
            setDisplayed(next);
            setHasMore(next.length < allCategories.length);
            setLoadingMore(false);
        }, 600); // small delay to show the loader
    };

    // ── Search filter (client-side) ────────────────────────────
    const filteredCategories = searchText.trim()
        ? allCategories.filter((c) =>
              c.name.toLowerCase().includes(searchText.toLowerCase()),
          )
        : displayed;

    // ── Render each category card ──────────────────────────────
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("ProductListing")}
        >
            <ImageBackground
                source={{ uri: item.image || item.icon }}
                style={styles.categoryCard}
                imageStyle={styles.cardImage}
            >
                <View style={styles.overlay}>
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                    <View style={styles.underline} />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    // ── Footer: load more spinner ──────────────────────────────
    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#0069AF" />
                <Text style={styles.footerText}>Loading more...</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader navigation={navigation} />

            {/* ── Search bar (sticky) ── */}

            <View style={{ padding: 10, marginTop: 5 }}>
                <Text style={styles.headerTitle}>
                    Categories you might like
                </Text>
                <View style={{}}>
                    <View style={styles.searchContainer}>
                        <Feather
                            name="search"
                            size={20}
                            color="#94a3b8"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            placeholder="Search categories"
                            placeholderTextColor="#94a3b8"
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchText("")}>
                                <Feather name="x" size={18} color="#94a3b8" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* ── Main content ── */}
            {loading ? (
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingTop: 0, marginBottom: 10 },
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.gridContainer}>
                        <View style={styles.skeletonGrid}>
                            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                                <CategoryGridSkeleton key={i} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <FlatList
                    data={filteredCategories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={{
                        ...styles.gridContainer,
                        margin: 10,
                        marginTop: 0,
                    }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={!searchText ? loadMore : null}
                    onEndReachedThreshold={0.4}
                    // ListHeaderComponent={
                    //     <Text style={[styles.headerTitle, ]}>
                    //         Categories you might like
                    //     </Text>
                    // }
                    ListHeaderComponentStyle={{
                        backgroundColor: "#D7E9F2",
                    }}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={
                        <View style={styles.emptyBox}>
                            <Feather name="search" size={36} color="#94a3b8" />
                            <Text style={styles.emptyText}>
                                No categories found
                            </Text>
                        </View>
                    }
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
    // ── Search bar ────────────────────────────────────────────
    searchWrapper: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EBF7FD",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3FBFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 46,
        borderWidth: 1,
        borderColor: "#CEDCE3",
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: "#1e293b" },

    // ── List ──────────────────────────────────────────────────
    listContent: { padding: 10, paddingBottom: 30 },
    scrollContent: { padding: 15 },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
        textAlign: "center",
        marginBottom: 15,
    },
    row: { justifyContent: "space-between", marginBottom: 10 },

    // ── Category card ─────────────────────────────────────────
    categoryCard: {
        width: COLUMN_WIDTH,
        height: 180,
        justifyContent: "flex-end",
        overflow: "hidden",
        borderRadius: 16,
    },
    cardImage: { borderRadius: 16 },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.65)",
        height: "100%",
        width: "100%",
        borderRadius: 16,
        justifyContent: "flex-end",
        padding: 12,
        overflow: "hidden",
    },
    categoryTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
    underline: {
        width: 25,
        height: 3,
        backgroundColor: "#3B82F6",
        marginTop: 4,
        borderRadius: 2,
    },

    // ── Skeleton ──────────────────────────────────────────────
    gridContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },

    // ── Footer loader ─────────────────────────────────────────
    footerLoader: {
        alignItems: "center",
        paddingVertical: 20,
        gap: 6,
    },
    footerText: { fontSize: 13, color: "#64748b" },

    // ── Empty state ───────────────────────────────────────────
    emptyBox: { alignItems: "center", paddingVertical: 40, gap: 10 },
    emptyText: { fontSize: 15, color: "#94a3b8", fontWeight: "500" },
});

export default CategoriesScreen;

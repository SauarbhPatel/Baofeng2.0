// import React, { useState, useCallback } from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     RefreshControl,
//     ActivityIndicator,
//     Alert,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import MainHeader from "../../componend/common/MainHeader";
// import { SkeletonBox } from "../../componend/common/SkeletonLoader";
// import {
//     getWishlist,
//     addToCart,
//     deleteWishlistItem,
// } from "../../api/commonApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ReturnItemList from "../../componend/myreturn/ReturnItemList";

// const CART_TOKEN_KEY = "baofeng_cart_token";

// const MyReturnsScreen = ({ navigation }) => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);
//     const [error, setError] = useState(null);
//     const [cartLoadingId, setCartLoadingId] = useState(null);
//     const [removeLoadingId, setRemoveLoadingId] = useState(null);

//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" navigation={navigation} />
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 <View style={styles.card}>
//                     {/* Header */}
//                     <View style={styles.headerRow}>
//                         <View>
//                             <Text style={styles.headerTitle}>My Returns</Text>
//                         </View>
//                     </View>
//                     <ReturnItemList navigation={navigation} />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#D7E9F2" },
//     scrollContent: { paddingTop: 15, paddingBottom: 30 },
//     card: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },

//     // ── Header ────────────────────────────────────────────────
//     headerRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         marginBottom: 20,
//     },
//     headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
// });

// export default MyReturnsScreen;

import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import ReturnItemList from "../../componend/myreturn/ReturnItemList";
import { getReturnListing } from "../../api/commonApi";

const LIMIT = 10;

const MyReturnsScreen = ({ navigation }) => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // ── Fetch ──────────────────────────────────────────────────
    const fetchReturns = useCallback(
        async ({ pageNum = 1, replace = true } = {}) => {
            try {
                if (replace) setLoading(true);
                setError(null);

                const res = await getReturnListing(pageNum, LIMIT);

                if (res?.success && res?.data?.records) {
                    const records = res.data.records;
                    setReturns((prev) =>
                        replace ? records : [...prev, ...records],
                    );
                    const { total, page: pg, limit } = res.data.pagination;
                    setHasMore(pg * limit < total);
                    setPage(pageNum);
                } else {
                    setError("Failed to load returns.");
                }
            } catch {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
                setLoadingMore(false);
                setRefreshing(false);
            }
        },
        [],
    );

    useFocusEffect(
        useCallback(() => {
            fetchReturns({ pageNum: 1, replace: true });
        }, [fetchReturns]),
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchReturns({ pageNum: 1, replace: true });
    }, [fetchReturns]);

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore || loading) return;
        setLoadingMore(true);
        fetchReturns({ pageNum: page + 1, replace: false });
    }, [loadingMore, hasMore, loading, page, fetchReturns]);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                    />
                }
                onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } =
                        nativeEvent;
                    const isBottom =
                        layoutMeasurement.height + contentOffset.y >=
                        contentSize.height - 40;
                    if (isBottom) loadMore();
                }}
                scrollEventThrottle={400}
            >
                <View style={styles.card}>
                    {/* Header — unchanged */}
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.headerTitle}>My Returns</Text>
                        </View>
                    </View>

                    {/* Error state */}
                    {error && !loading && (
                        <View style={styles.errorBox}>
                            <Feather
                                name="wifi-off"
                                size={32}
                                color="#94a3b8"
                            />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                style={styles.retryBtn}
                                onPress={() =>
                                    fetchReturns({ pageNum: 1, replace: true })
                                }
                            >
                                <Text style={styles.retryText}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* ReturnItemList — same as before, now gets live data */}
                    {!error && (
                        <ReturnItemList
                            navigation={navigation}
                            data={returns}
                            loading={loading}
                        />
                    )}

                    {/* Pagination footer */}
                    {loadingMore && (
                        <View style={styles.footerRow}>
                            <ActivityIndicator size="small" color="#0069AF" />
                            <Text style={styles.footerText}>
                                Loading more...
                            </Text>
                        </View>
                    )}
                    {!hasMore && returns.length > 0 && !loadingMore && (
                        <View style={styles.footerRow}>
                            <Text style={styles.footerEndText}>
                                ✓ All returns loaded
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 15, paddingBottom: 30 },
    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },

    // ── Header ─────────────────────────────────────────────────
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },

    // ── Error ──────────────────────────────────────────────────
    errorBox: { alignItems: "center", gap: 8, paddingVertical: 20 },
    errorText: { fontSize: 14, color: "#64748b", textAlign: "center" },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
    },
    retryText: { color: "#fff", fontWeight: "700", fontSize: 13 },

    // ── Footer ─────────────────────────────────────────────────
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
    },
    footerText: { fontSize: 13, color: "#64748b" },
    footerEndText: { fontSize: 13, color: "#22C55E", fontWeight: "600" },
});

export default MyReturnsScreen;

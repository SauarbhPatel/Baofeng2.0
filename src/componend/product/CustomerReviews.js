// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// const CustomerReviews = ({ reviews }) => {
//     const ratingData = [
//         { stars: 5, percentage: "60%", width: 0.6 },
//         { stars: 4, percentage: "25%", width: 0.25 },
//         { stars: 3, percentage: "10%", width: 0.1 },
//         { stars: 2, percentage: "5%", width: 0.05 },
//         { stars: 1, percentage: "5%", width: 0.05 },
//     ];

//     const ReviewCard = () => (
//         <View style={styles.reviewCard}>
//             <View style={styles.reviewHeader}>
//                 <View style={styles.avatar}>
//                     <Feather name="user" size={20} color="#64748b" />
//                 </View>
//                 <View style={styles.reviewerInfo}>
//                     <Text style={styles.reviewerName}>Rahul Sharma</Text>
//                     <Text style={styles.reviewDate}>12 Oct 2023</Text>
//                 </View>
//                 <View style={styles.starRowSmall}>
//                     {[1, 2, 3, 4, 5].map((s) => (
//                         <MaterialCommunityIcons
//                             key={s}
//                             name="star-outline"
//                             size={16}
//                             color="#0284c7"
//                         />
//                     ))}
//                 </View>
//             </View>
//             <Text style={styles.reviewText}>
//                 Excellent range and battery life. Used it for a wedding event
//                 management and it worked flawlessly throughout the day.
//             </Text>
//             <TouchableOpacity style={styles.helpfulBtn}>
//                 <MaterialCommunityIcons
//                     name="thumb-up-outline"
//                     size={16}
//                     color="#94a3b8"
//                 />
//                 <Text style={styles.helpfulText}>Helpful ( 24)</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={styles.mainContainer}>
//             <Text style={styles.title}>Customer Reviews</Text>

//             {/* Summary Section */}
//             <View style={styles.summaryCard}>
//                 <View style={styles.ratingOverview}>
//                     <Text style={styles.bigRating}>4.2</Text>
//                     <View style={styles.overviewStars}>
//                         <View style={styles.starRow}>
//                             {[1, 2, 3, 4].map((s) => (
//                                 <MaterialCommunityIcons
//                                     key={s}
//                                     name="star-outline"
//                                     size={20}
//                                     color="#0284c7"
//                                 />
//                             ))}
//                             <MaterialCommunityIcons
//                                 name="star-outline"
//                                 size={20}
//                                 color="#E5E7EB"
//                             />
//                         </View>
//                         <Text style={styles.reviewCount}>
//                             Based on 128 reviews
//                         </Text>
//                     </View>
//                 </View>

//                 {/* Progress Bars */}
//                 <View style={styles.statsContainer}>
//                     {ratingData.map((item) => (
//                         <View key={item.stars} style={styles.statRow}>
//                             <Text style={styles.statLabel}>{item.stars}</Text>
//                             <View style={styles.progressBackground}>
//                                 <View
//                                     style={[
//                                         styles.progressFill,
//                                         { width: `${item.width * 100}%` },
//                                     ]}
//                                 />
//                             </View>
//                             <Text style={styles.statPercent}>
//                                 {item.percentage}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>

//                 <TouchableOpacity style={styles.writeBtn}>
//                     <Text style={styles.writeBtnText}>Write a Review</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Top Reviews List */}
//             <View style={styles.listHeader}>
//                 <Text style={styles.subTitle}>Top Reviews</Text>
//                 <TouchableOpacity style={styles.filterBtn}>
//                     <Text style={styles.filterText}>Most Relevant</Text>
//                     <MaterialCommunityIcons
//                         name="chevron-down"
//                         size={18}
//                         color="#64748b"
//                     />
//                 </TouchableOpacity>
//             </View>

//             <ReviewCard />
//             <ReviewCard />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//         paddingBottom: 10,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "600",
//         color: "#0f172a",
//         marginBottom: 15,
//     },
//     summaryCard: {
//         backgroundColor: "#fff",
//         borderRadius: 20,
//         padding: 15,
//         marginBottom: 30,
//         borderWidth: 1,
//         borderColor: "#F3F4F6",
//     },
//     ratingOverview: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     bigRating: {
//         fontSize: 48,
//         fontWeight: "800",
//         color: "#0f172a",
//         marginRight: 15,
//     },
//     overviewStars: {
//         justifyContent: "center",
//     },
//     starRow: {
//         flexDirection: "row",
//         marginBottom: 4,
//     },
//     reviewCount: {
//         fontSize: 12,
//         color: "#64748b",
//     },
//     statsContainer: {
//         marginBottom: 20,
//     },
//     statRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     statLabel: {
//         width: 20,
//         fontSize: 12,
//         color: "#64748b",
//     },
//     progressBackground: {
//         flex: 1,
//         height: 6,
//         backgroundColor: "#f1f5f9",
//         borderRadius: 3,
//         marginHorizontal: 10,
//         overflow: "hidden",
//     },
//     progressFill: {
//         height: "100%",
//         backgroundColor: "#0284c7",
//     },
//     statPercent: {
//         width: 35,
//         fontSize: 11,
//         color: "#94a3b8",
//         textAlign: "right",
//     },
//     writeBtn: {
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         paddingVertical: 12,
//         alignItems: "center",
//     },
//     writeBtnText: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#1e293b",
//     },
//     listHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     subTitle: {
//         fontSize: 16,
//         fontWeight: "800",
//         color: "#1e293b",
//     },
//     filterBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     filterText: {
//         fontSize: 14,
//         color: "#64748b",
//         marginRight: 4,
//     },
//     reviewCard: {
//         backgroundColor: "#fff",
//         borderRadius: 20,
//         padding: 16,
//         marginBottom: 12,
//         borderWidth: 1,
//         borderColor: "#f1f5f9",
//     },
//     reviewHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 12,
//     },
//     avatar: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: "#f1f5f9",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 12,
//     },
//     reviewerInfo: {
//         flex: 1,
//     },
//     reviewerName: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     reviewDate: {
//         fontSize: 11,
//         color: "#94a3b8",
//     },
//     starRowSmall: {
//         flexDirection: "row",
//     },
//     reviewText: {
//         fontSize: 14,
//         color: "#475569",
//         lineHeight: 20,
//         marginBottom: 16,
//     },
//     helpfulBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 6,
//     },
//     helpfulText: {
//         fontSize: 12,
//         color: "#94a3b8",
//     },
// });

// export default CustomerReviews;

import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// ── Filter options ─────────────────────────────────────────────
const FILTER_OPTIONS = [
    { id: "relevant", label: "Most Relevant" },
    { id: "recent", label: "Most Recent" },
    { id: "highest", label: "Highest Rating" },
    { id: "lowest", label: "Lowest Rating" },
];

// ── Sort reviews by filter ─────────────────────────────────────
const sortReviews = (reviews, filterId) => {
    const arr = [...reviews];
    switch (filterId) {
        case "recent":
            return arr.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        case "highest":
            return arr.sort((a, b) => b.rating - a.rating);
        case "lowest":
            return arr.sort((a, b) => a.rating - b.rating);
        case "relevant":
        default:
            // Most relevant = highest rating first, then newest
            return arr.sort(
                (a, b) =>
                    b.rating - a.rating ||
                    new Date(b.createdAt) - new Date(a.createdAt),
            );
    }
};

// ── Format date ────────────────────────────────────────────────
const fmtDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// ── Star row ───────────────────────────────────────────────────
const StarRow = ({ rating, size = 16 }) => (
    <View style={{ flexDirection: "row", gap: 2 }}>
        {[1, 2, 3, 4, 5].map((s) => (
            <MaterialCommunityIcons
                key={s}
                name={s <= rating ? "star" : "star-outline"}
                size={size}
                color={s <= rating ? "#FFC107" : "#E5E7EB"}
            />
        ))}
    </View>
);

// ── Single review card ─────────────────────────────────────────
const ReviewCard = ({ review }) => {
    const hasAvatar =
        !!review.user?.userAvatar &&
        !review.user.userAvatar.includes("cdn.example.com");

    return (
        <View style={styles.reviewCard}>
            {/* Header: avatar + name + date */}
            <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                    {hasAvatar ? (
                        <Image
                            source={{ uri: review.user.userAvatar }}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                    ) : (
                        <Text style={styles.avatarInitial}>
                            {review.user?.userName?.[0]?.toUpperCase() || "U"}
                        </Text>
                    )}
                </View>
                <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>
                        {review.user?.userName || "Anonymous"}
                    </Text>
                    <Text style={styles.reviewDate}>
                        {fmtDate(review.createdAt)}
                    </Text>
                </View>
                {/* Rating badge */}
                <StarRow rating={review.rating} size={14} />
            </View>

            {/* Title */}
            {!!review.title && (
                <Text style={styles.reviewTitle}>{review.title}</Text>
            )}

            {/* Comment */}
            {!!review.comment && (
                <Text style={styles.reviewText}>{review.comment}</Text>
            )}

            {/* Media images */}
            {review.media?.imgUrls?.length > 0 &&
                !review.media.imgUrls[0].includes("cdn.example.com") && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.mediaRow}
                    >
                        {review.media.imgUrls.map((url, i) => (
                            <Image
                                key={i}
                                source={{ uri: url }}
                                style={styles.mediaImg}
                            />
                        ))}
                    </ScrollView>
                )}

            {/* Helpful */}
            <TouchableOpacity style={styles.helpfulBtn}>
                <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={16}
                    color="#94a3b8"
                />
                <Text style={styles.helpfulText}>Helpful</Text>
            </TouchableOpacity>
        </View>
    );
};

// ── Main component ─────────────────────────────────────────────
const CustomerReviews = ({ reviews = [] }) => {
    const [activeFilter, setActiveFilter] = useState("relevant");
    const [filterModal, setFilterModal] = useState(false);

    // ── Compute rating summary from real data ──────────────────
    const summary = useMemo(() => {
        if (!reviews.length) return { avg: 0, total: 0, dist: [] };
        const total = reviews.length;
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        const avg = (sum / total).toFixed(1);
        const dist = [5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            return { stars: star, count, pct: total > 0 ? count / total : 0 };
        });
        return { avg, total, dist };
    }, [reviews]);

    // ── Sort reviews ───────────────────────────────────────────
    const sorted = useMemo(
        () => sortReviews(reviews, activeFilter),
        [reviews, activeFilter],
    );

    const activeLabel =
        FILTER_OPTIONS.find((f) => f.id === activeFilter)?.label ||
        "Most Relevant";

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Customer Reviews</Text>

            {/* ── Summary card ── */}
            <View style={styles.summaryCard}>
                <View style={styles.ratingOverview}>
                    <Text style={styles.bigRating}>{summary.avg}</Text>
                    <View style={styles.overviewStars}>
                        <StarRow
                            rating={Math.round(Number(summary.avg))}
                            size={20}
                        />
                        <Text style={styles.reviewCount}>
                            Based on {summary.total} review
                            {summary.total !== 1 ? "s" : ""}
                        </Text>
                    </View>
                </View>

                {/* Progress bars */}
                <View style={styles.statsContainer}>
                    {summary.dist.map((item) => (
                        <View key={item.stars} style={styles.statRow}>
                            <Text style={styles.statLabel}>{item.stars}</Text>
                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${item.pct * 100}%` },
                                    ]}
                                />
                            </View>
                            <Text style={styles.statPercent}>
                                {Math.round(item.pct * 100)}%
                            </Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.writeBtn}>
                    <Text style={styles.writeBtnText}>Write a Review</Text>
                </TouchableOpacity>
            </View>

            {/* ── Top Reviews header + filter ── */}
            {sorted.length > 0 && (
                <>
                    <View style={styles.listHeader}>
                        <Text style={styles.subTitle}>
                            Top Reviews ({sorted.length})
                        </Text>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            onPress={() => setFilterModal(true)}
                        >
                            <Text style={styles.filterText}>{activeLabel}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={18}
                                color="#64748b"
                            />
                        </TouchableOpacity>
                    </View>

                    {sorted.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </>
            )}

            {/* ── Empty state ── */}
            {reviews.length === 0 && (
                <View style={styles.emptyBox}>
                    <MaterialCommunityIcons
                        name="star-outline"
                        size={36}
                        color="#CBD5E1"
                    />
                    <Text style={styles.emptyText}>No reviews yet</Text>
                </View>
            )}

            {/* ── Filter Modal ── */}
            <Modal
                visible={filterModal}
                transparent
                animationType="fade"
                onRequestClose={() => setFilterModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setFilterModal(false)}
                >
                    <View style={styles.modalSheet}>
                        <Text style={styles.modalTitle}>Sort Reviews</Text>
                        {FILTER_OPTIONS.map((opt) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={styles.modalItem}
                                onPress={() => {
                                    setActiveFilter(opt.id);
                                    setFilterModal(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.modalItemText,
                                        activeFilter === opt.id &&
                                            styles.modalItemActive,
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                                {activeFilter === opt.id && (
                                    <Ionicons
                                        name="checkmark"
                                        size={18}
                                        color="#0069AF"
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: 15,
    },

    // ── Summary card ───────────────────────────────────────────
    summaryCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    ratingOverview: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    bigRating: {
        fontSize: 48,
        fontWeight: "800",
        color: "#0f172a",
        marginRight: 15,
    },
    overviewStars: { justifyContent: "center" },
    reviewCount: { fontSize: 12, color: "#64748b", marginTop: 4 },
    statsContainer: { marginBottom: 20 },
    statRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    statLabel: { width: 20, fontSize: 12, color: "#64748b" },
    progressBackground: {
        flex: 1,
        height: 6,
        backgroundColor: "#f1f5f9",
        borderRadius: 3,
        marginHorizontal: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#0284c7",
        borderRadius: 3,
    },
    statPercent: {
        width: 35,
        fontSize: 11,
        color: "#94a3b8",
        textAlign: "right",
    },
    writeBtn: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
    },
    writeBtnText: { fontSize: 14, fontWeight: "700", color: "#1e293b" },

    // ── List header ────────────────────────────────────────────
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    subTitle: { fontSize: 16, fontWeight: "800", color: "#1e293b" },
    filterBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
    filterText: { fontSize: 14, color: "#64748b" },

    // ── Review card ────────────────────────────────────────────
    reviewCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        gap: 8,
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EBF7FD",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarInitial: { fontSize: 16, fontWeight: "800", color: "#0069AF" },
    reviewerInfo: { flex: 1 },
    reviewerName: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
    reviewDate: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    ratingBadgeText: { fontSize: 12, fontWeight: "800" },
    reviewTitle: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    reviewText: { fontSize: 14, color: "#475569", lineHeight: 20 },
    mediaRow: { marginTop: 4 },
    mediaImg: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 8,
        backgroundColor: "#f1f5f9",
    },
    helpfulBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
    helpfulText: { fontSize: 12, color: "#94a3b8" },

    // ── Empty ──────────────────────────────────────────────────
    emptyBox: { alignItems: "center", paddingVertical: 30, gap: 8 },
    emptyText: { fontSize: 14, color: "#94a3b8", fontWeight: "500" },

    // ── Filter Modal ───────────────────────────────────────────
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 34,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 16,
    },
    modalItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    modalItemText: { fontSize: 15, color: "#1e293b", fontWeight: "500" },
    modalItemActive: { color: "#0069AF", fontWeight: "700" },
});

export default CustomerReviews;

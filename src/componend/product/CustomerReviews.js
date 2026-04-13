import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const CustomerReviews = () => {
    const ratingData = [
        { stars: 5, percentage: "60%", width: 0.6 },
        { stars: 4, percentage: "25%", width: 0.25 },
        { stars: 3, percentage: "10%", width: 0.1 },
        { stars: 2, percentage: "5%", width: 0.05 },
        { stars: 1, percentage: "5%", width: 0.05 },
    ];

    const ReviewCard = () => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                    <Feather name="user" size={20} color="#64748b" />
                </View>
                <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>Rahul Sharma</Text>
                    <Text style={styles.reviewDate}>12 Oct 2023</Text>
                </View>
                <View style={styles.starRowSmall}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <MaterialCommunityIcons
                            key={s}
                            name="star-outline"
                            size={16}
                            color="#0284c7"
                        />
                    ))}
                </View>
            </View>
            <Text style={styles.reviewText}>
                Excellent range and battery life. Used it for a wedding event
                management and it worked flawlessly throughout the day.
            </Text>
            <TouchableOpacity style={styles.helpfulBtn}>
                <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={16}
                    color="#94a3b8"
                />
                <Text style={styles.helpfulText}>Helpful ( 24)</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Customer Reviews</Text>

            {/* Summary Section */}
            <View style={styles.summaryCard}>
                <View style={styles.ratingOverview}>
                    <Text style={styles.bigRating}>4.2</Text>
                    <View style={styles.overviewStars}>
                        <View style={styles.starRow}>
                            {[1, 2, 3, 4].map((s) => (
                                <MaterialCommunityIcons
                                    key={s}
                                    name="star-outline"
                                    size={20}
                                    color="#0284c7"
                                />
                            ))}
                            <MaterialCommunityIcons
                                name="star-outline"
                                size={20}
                                color="#E5E7EB"
                            />
                        </View>
                        <Text style={styles.reviewCount}>
                            Based on 128 reviews
                        </Text>
                    </View>
                </View>

                {/* Progress Bars */}
                <View style={styles.statsContainer}>
                    {ratingData.map((item) => (
                        <View key={item.stars} style={styles.statRow}>
                            <Text style={styles.statLabel}>{item.stars}</Text>
                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${item.width * 100}%` },
                                    ]}
                                />
                            </View>
                            <Text style={styles.statPercent}>
                                {item.percentage}
                            </Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.writeBtn}>
                    <Text style={styles.writeBtnText}>Write a Review</Text>
                </TouchableOpacity>
            </View>

            {/* Top Reviews List */}
            <View style={styles.listHeader}>
                <Text style={styles.subTitle}>Top Reviews</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <Text style={styles.filterText}>Most Relevant</Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={18}
                        color="#64748b"
                    />
                </TouchableOpacity>
            </View>

            <ReviewCard />
            <ReviewCard />
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
    summaryCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 30,
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
    overviewStars: {
        justifyContent: "center",
    },
    starRow: {
        flexDirection: "row",
        marginBottom: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: "#64748b",
    },
    statsContainer: {
        marginBottom: 20,
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    statLabel: {
        width: 20,
        fontSize: 12,
        color: "#64748b",
    },
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
    writeBtnText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1e293b",
    },
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterText: {
        fontSize: 14,
        color: "#64748b",
        marginRight: 4,
    },
    reviewCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },
    reviewDate: {
        fontSize: 11,
        color: "#94a3b8",
    },
    starRowSmall: {
        flexDirection: "row",
    },
    reviewText: {
        fontSize: 14,
        color: "#475569",
        lineHeight: 20,
        marginBottom: 16,
    },
    helpfulBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    helpfulText: {
        fontSize: 12,
        color: "#94a3b8",
    },
});

export default CustomerReviews;

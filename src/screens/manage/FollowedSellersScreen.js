import React from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";

const FollowedSellersScreen = ({ navigation }) => {
    const sellers = [
        {
            id: 1,
            name: "TechWorld Store",
            location: "New York, USA",
            rating: "4.9",
            reviews: "12.4 k reviews",
            products: "1240",
            initials: "TW",
            avatarColor: "#3b82f6",
            badge: "Top Rated",
            banner: require("../../assets/images/follwed/5ee80a8766c9fceef22296e9bcd52e0ab18d6ac3.png"),
        },
        {
            id: 2,
            name: "Fashion Hub",
            location: "London, UK",
            rating: "4.7",
            reviews: "8.2 k reviews",
            products: "3850",
            initials: "FH",
            avatarColor: "#ec4899",
            badge: "Premium",
            banner: require("../../assets/images/follwed/d24d485390891a51c220b65de43458d01d845820.png"),
        },
        {
            id: 3,
            name: "Gadget Galaxy",
            location: "Berlin, DE",
            rating: "4.7",
            reviews: "8.2 k reviews",
            products: "3850",
            initials: "FH",
            avatarColor: "#6366F1",
            // badge: "Premium",
            banner: require("../../assets/images/follwed/e17c81d123438c260e9c6131fca415edd4c5cee6.png"),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainCard}>
                    <Text style={styles.headerTitle}>Followed Sellers</Text>

                    {sellers.map((item) => (
                        <View key={item.id} style={styles.sellerCard}>
                            {/* Banner & Badge */}
                            <View style={styles.bannerContainer}>
                                <Image
                                    source={item.banner}
                                    style={styles.bannerImage}
                                />
                                {item?.badge ? (
                                    <View style={styles.badgeWrapper}>
                                        <View style={styles.statusBadge}>
                                            <MaterialCommunityIcons
                                                name="medal"
                                                size={12}
                                                color="#f97316"
                                            />
                                            <Text style={styles.badgeText}>
                                                {item.badge}
                                            </Text>
                                        </View>
                                    </View>
                                ) : null}
                                {/* Floating Avatar */}
                                <View
                                    style={[
                                        styles.avatar,
                                        { backgroundColor: item.avatarColor },
                                    ]}
                                >
                                    <Text style={styles.avatarText}>
                                        {item.initials}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.infoSection}>
                                <Text style={styles.sellerName}>
                                    {item.name}
                                </Text>
                                <View style={styles.locationRow}>
                                    <Feather
                                        name="map-pin"
                                        size={14}
                                        color="#94a3b8"
                                    />
                                    <Text style={styles.locationText}>
                                        {item.location}
                                    </Text>
                                </View>

                                {/* Stats Bar */}
                                <View style={styles.statsBar}>
                                    <View style={styles.statItem}>
                                        <View style={styles.statRow}>
                                            <Feather
                                                name="star"
                                                size={16}
                                                color="#eab308"
                                            />
                                            <Text style={styles.statValue}>
                                                {item.rating}
                                            </Text>
                                        </View>
                                        <Text style={styles.statLabel}>
                                            {item.reviews}
                                        </Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <View style={styles.statRow}>
                                            <Feather
                                                name="box"
                                                size={16}
                                                color="#22c55e"
                                            />
                                            <Text style={styles.statValue}>
                                                {item.products}
                                            </Text>
                                        </View>
                                        <Text style={styles.statLabel}>
                                            Products
                                        </Text>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.visitBtn}
                                        onPress={() =>
                                            navigation.push("SellerDetails")
                                        }
                                    >
                                        <Text style={styles.visitBtnText}>
                                            Visit Store
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.unfollowBtn}
                                    >
                                        <Text style={styles.unfollowBtnText}>
                                            Unfollow
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    scrollContent: {
        paddingTop: 15,
        paddingBottom: 30,
    },
    mainCard: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    sellerCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        marginBottom: 15,
        overflow: "hidden",
    },
    bannerContainer: {
        height: 120,
        width: "100%",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    badgeWrapper: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#1e293b",
    },
    avatar: {
        position: "absolute",
        bottom: -25,
        left: 20,
        width: 60,
        height: 60,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "800",
    },
    infoSection: {
        paddingTop: 35,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sellerName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        gap: 5,
    },
    locationText: {
        fontSize: 12,
        color: "#94a3b8",
        fontWeight: "600",
    },
    statsBar: {
        flexDirection: "row",
        backgroundColor: "#f8fafc",
        borderRadius: 15,
        padding: 12,
        marginTop: 20,
        gap: 20,
    },
    statItem: {
        flex: 1,
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    statValue: {
        fontSize: 15,
        fontWeight: "800",
        color: "#1e293b",
    },
    statLabel: {
        fontSize: 11,
        color: "#94a3b8",
        fontWeight: "600",
        marginTop: 2,
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 20,
        gap: 12,
    },
    visitBtn: {
        flex: 1,
        height: 37,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
    },
    visitBtnText: {
        color: "#0f172a",
        fontSize: 12,
        fontWeight: "700",
    },
    unfollowBtn: {
        flex: 1,
        height: 37,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#0064a3",
        justifyContent: "center",
        alignItems: "center",
    },
    unfollowBtnText: {
        color: "#0064a3",
        fontSize: 12,
        fontWeight: "700",
    },
});

export default FollowedSellersScreen;

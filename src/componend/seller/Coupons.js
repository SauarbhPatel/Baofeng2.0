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
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";

const Coupons = () => {
    const coupons = [
        {
            id: 1,
            title: "Limited Time Deal – Don't Miss Out",
            price: "$150",
            originalPrice: "$188",
            discount: "-23%",
            status: "Available",
            statusType: "success", // Green badge
            image: require("../../assets/images/follwed/6ef481949a23fbd1a156d36711dda69b0fd90e9b.jpg"),
            description:
                "(Cashback for purchases)\nWe found that you can buy some combos: Save $12.00 when you purchase these items",
            validity: "today for only $27.31",
        },
        {
            id: 2,
            title: "Limited Time Deal – Don't Miss Out",
            price: "$150",
            originalPrice: "$188",
            discount: "-23%",
            status: "Super Hot",
            statusType: "warning", // Orange badge
            image: require("../../assets/images/follwed/6ef481949a23fbd1a156d36711dda69b0fd90e9b.jpg"),
            description:
                "(Cashback for purchases)\nWe found that you can buy some combos: Save $12.00 when you purchase these items",
            validity: "today for only $27.31",
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>All Cupons</Text>

            {coupons.map((item) => (
                <View key={item.id} style={styles.couponCard}>
                    {/* Top Row: Badge and Wishlist */}
                    <View style={styles.cardHeader}>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor:
                                        item.statusType === "success"
                                            ? "#00cba9"
                                            : "#ff7e00",
                                },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name={
                                    item.statusType === "success"
                                        ? "check-circle-outline"
                                        : "fire"
                                }
                                size={14}
                                color="#ffffff"
                            />
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <TouchableOpacity>
                            <Feather name="heart" size={22} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    {/* Content Row */}
                    <View style={styles.contentRow}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={item.image}
                                style={styles.productImage}
                            />
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.couponTitle}>{item.title}</Text>

                            <View style={styles.priceRow}>
                                <MaterialCommunityIcons
                                    name="tag-outline"
                                    size={18}
                                    color="#ff7e00"
                                />
                                <Text style={styles.priceText}>
                                    {item.price}
                                </Text>
                                <Text style={styles.oldPrice}>
                                    {item.originalPrice}
                                </Text>
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>
                                        {item.discount}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.descriptionText}>
                                {item.description}
                            </Text>
                            <Text style={styles.validityText}>
                                {item.validity}
                            </Text>
                        </View>
                    </View>

                    {/* Action Footer */}
                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.revealBtn}>
                            <Text style={styles.revealText}>Reveal coupon</Text>
                            <FontAwesome5
                                name="cut"
                                size={12}
                                color="#d5d2d2"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareBtn}>
                            <Feather name="share-2" size={16} color="#1e293b" />
                            <Text style={styles.shareText}>Share & Earn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    couponCard: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        gap: 5,
    },
    statusText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "600",
    },
    contentRow: {
        flexDirection: "row",
        marginBottom: 20,
    },
    imageWrapper: {
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 5,
        width: 85,
        height: 85,
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 15,
    },
    couponTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#1e293b",
        lineHeight: 22,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 8,
    },
    priceText: {
        fontSize: 17,
        fontWeight: "900",
        color: "#ff7e00",
    },
    oldPrice: {
        fontSize: 13,
        color: "#cbd5e1",
        textDecorationLine: "line-through",
    },
    discountBadge: {
        backgroundColor: "#00cba9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    discountText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "900",
    },
    descriptionText: {
        fontSize: 12,
        color: "#929dac",
        marginTop: 10,
        lineHeight: 16,
    },
    validityText: {
        fontSize: 12,
        color: "#94a3b8",
        marginTop: 5,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        paddingTop: 15,
    },
    revealBtn: {
        backgroundColor: "#1e293b", // Dark navy button
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 10,
    },
    revealText: {
        color: "#ffffff",
        fontSize: 12,
    },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    shareText: {
        fontSize: 12,
        color: "#1e293b",
        fontWeight: "600",
    },
});

export default Coupons;

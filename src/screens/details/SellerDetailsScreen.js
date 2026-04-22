import React, { useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import HomeBanner1 from "../../componend/home/HomeBanner1";
import Home from "../../componend/seller/Home";
import TopSelling from "../../componend/seller/TopSelling";
import AllProducts from "../../componend/seller/AllProducts";
import Coupons from "../../componend/seller/Coupons";
const { width } = Dimensions.get("window");

const SellerDetailsScreen = () => {
    const [activeTab, setActiveTab] = useState("Home");

    const tabs = ["Home", "Top Selling", "Coupons", "All products"];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainCard}>
                    <HomeBanner1
                        dynamicScreenWidth={width - 50}
                        borderRadius={15}
                        imageSource={require("../../assets/images/follwed/Banner1.png")}
                    />

                    {/* Profile Section */}
                    <View style={styles.profileRow}>
                        <Image
                            source={require("../../assets/images/follwed/9097a0d20396b43b920dab6bd14e92624b5a708c.png")}
                            style={styles.profileLogo}
                        />
                        <View style={styles.nameContainer}>
                            <Text style={styles.sellerName}>
                                Baofeng Radios
                            </Text>
                            <View style={styles.ratingRow}>
                                <Feather
                                    name="star"
                                    size={12}
                                    color="#facc15"
                                />
                                <Feather
                                    name="star"
                                    size={12}
                                    color="#facc15"
                                />
                                <Feather
                                    name="star"
                                    size={12}
                                    color="#facc15"
                                />
                                <Feather
                                    name="star"
                                    size={12}
                                    color="#cbd5e1"
                                />
                                <Feather
                                    name="star"
                                    size={12}
                                    color="#cbd5e1"
                                />
                                <Text style={styles.reviewText}>
                                    (7 reviews)
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Membership & Follow Action */}
                    <View style={styles.actionRow}>
                        <View>
                            <Text style={styles.memberLabel}>Member Since</Text>
                            <Text style={styles.memberDate}>27 Nov 2018</Text>
                        </View>
                        <TouchableOpacity style={styles.followBtn}>
                            <Text style={styles.followBtnText}>
                                +Follow Seller
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Navigation Tabs */}
                    <View style={styles.tabContainer}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={styles.tabItem}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab &&
                                            styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                                {activeTab === tab && (
                                    <View style={styles.activeIndicator} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {activeTab == "Home" ? <Home /> : null}
                    {activeTab == "Top Selling" ? <TopSelling /> : null}
                    {activeTab == "Coupons" ? <Coupons /> : null}
                    {activeTab == "All products" ? <AllProducts /> : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2", // Background color
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
    bannerImage: {
        width: "100%",
        height: 180,
        borderRadius: 20,
        marginBottom: 20,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileLogo: {
        width: 50,
        height: 50,
        borderRadius: 35,
        marginRight: 15,
    },
    nameContainer: {
        flex: 1,
    },
    sellerName: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1e293b",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: 4,
    },
    reviewText: {
        fontSize: 12,
        color: "#94a3b8",
        marginLeft: 8,
        fontWeight: "500",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },
    memberLabel: {
        fontSize: 12,
        color: "#94a3b8",
        fontWeight: "500",
    },
    memberDate: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0f172a",
    },
    followBtn: {
        backgroundColor: "#0064a3",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 25,
    },
    followBtnText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 12,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#0069AF15",
        marginBottom: 15,
    },
    tabItem: {
        marginRight: 20,
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 13,
        color: "#475569",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#0064a3",
    },
    activeIndicator: {
        position: "absolute",
        bottom: -1,
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: "#0064a3",
        zIndex: 1,
    },
    promoContainer: {
        width: "100%",
        marginTop: 5,
    },
    promoImage: {
        width: "100%",
        height: 150,
        borderRadius: 5,
    },
});

export default SellerDetailsScreen;

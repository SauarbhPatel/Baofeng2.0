import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import { SkeletonBox } from "../../componend/common/SkeletonLoader";
import {
    getWishlist,
    addToCart,
    deleteWishlistItem,
} from "../../api/commonApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReturnItemList from "../../componend/myreturn/ReturnItemList";
import ReturnDetailsBox from "../../componend/myreturn/ReturnDetailsBox";
import ReturnedItemsCard from "../../componend/myreturn/ReturnedItemsCard";
import ReturnTimeline from "../../componend/myreturn/ReturnTimeline";
import RefundDetailsBox from "../../componend/myreturn/RefundDetailsBox";
import PickupAddressBox from "../../componend/myreturn/PickupAddressBox";

const CART_TOKEN_KEY = "baofeng_cart_token";

const ReturnDetailsScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [cartLoadingId, setCartLoadingId] = useState(null);
    const [removeLoadingId, setRemoveLoadingId] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <ReturnDetailsBox />
                <ReturnedItemsCard />
                <ReturnTimeline />
                <RefundDetailsBox />
                <PickupAddressBox />

                {/* Bottom Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>
                            Contact Support
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Download Invoice
                        </Text>
                    </TouchableOpacity>
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

    // Button Styles
    buttonContainer: {
        paddingHorizontal: 15,
        marginTop: 10,
        gap: 12,
    },
    primaryButton: {
        backgroundColor: "#0066b2",
        borderRadius: 16,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    primaryButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "700",
    },
    secondaryButton: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    secondaryButtonText: {
        color: "#0f172a",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default ReturnDetailsScreen;

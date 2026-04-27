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

const CART_TOKEN_KEY = "baofeng_cart_token";

const MyReturnsScreen = ({ navigation }) => {
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
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.headerTitle}>My Returns</Text>
                        </View>
                    </View>
                    <ReturnItemList navigation={navigation} />
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

    // ── Header ────────────────────────────────────────────────
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
});

export default MyReturnsScreen;

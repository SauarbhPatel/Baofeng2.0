import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import EmptyCart from "../../componend/cart/EmptyCart";
import CartItemBox from "../../componend/cart/CartItemBox";
import CouponInput from "../../componend/cart/CouponInput";
import CartSummary from "../../componend/cart/CartSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCart } from "../../api/commonApi";
const CART_TOKEN_KEY = "baofeng_cart_token";

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(true);

    // Called by CartItemBox whenever cart data changes
    const handleCartUpdate = (items) => {
        setLoading(false);
        setCartItems(items);
    };

    const onRefresh = () => {
        setCartItems([]);
        setRefreshKey((prev) => prev + 1);
    };

    const isEmpty = cartItems.length === 0;

    return (
        <SafeAreaView style={styles.maincontainer}>
            <MainHeader bgColor="#fff" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]} // Android spinner color
                        tintColor="#0069AF" // iOS spinner color
                        progressBackgroundColor="#fff"
                    />
                }
            >
                {/* CartItemBox always mounts — it shows skeleton / error / items internally */}
                <CartItemBox
                    key={refreshKey}
                    onCartUpdate={handleCartUpdate}
                    onLoading={() => setLoading(true)}
                />

                {/* Only show coupon + summary when there are items */}
                {!isEmpty && !loading && (
                    <>
                        {/* <CouponInput /> */}
                        <CartSummary
                            navigation={navigation}
                            cartItems={cartItems}
                        />
                    </>
                )}

                {/* Show empty cart UI only after data has loaded and cart IS empty */}
                {isEmpty && !loading && <EmptyCart />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    container: { flex: 1 },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    mainContent: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },

    // Error state
    errorText: { color: "#ef4444", textAlign: "center", marginBottom: 10 },
    retryBtn: {
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#0069AF",
        borderRadius: 8,
    },
    retryText: { color: "#fff", fontWeight: "600" },
});

export default CartScreen;

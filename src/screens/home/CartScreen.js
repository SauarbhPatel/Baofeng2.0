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
    const [loading, setLoading] = useState(true);
    const [showEmpty, setShowEmpty] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = await AsyncStorage.getItem(CART_TOKEN_KEY);
            if (!token) {
                setShowEmpty(true);
                setCartItems([]);
                setLoading(false);
                return;
            }
            const res = await getCart(token);

            console.log(JSON.stringify(res));
            if (res?.success && res?.data?.items) {
                setShowEmpty(false);

                setCartItems(res.data.items);
            } else {
                setError("Failed to load cart");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <SafeAreaView style={styles.maincontainer}>
            <MainHeader bgColor="#fff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={fetchCart}
                        colors={["#0069AF"]} // Android spinner color
                        tintColor="#0069AF" // iOS spinner color
                        progressBackgroundColor="#fff"
                    />
                }
            >
                {error ? (
                    <View style={styles.container}>
                        <Text style={styles.headerTitle}>My cart</Text>
                        <View style={styles.mainContent}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                // onPress={fetchCart}
                                style={styles.retryBtn}
                            >
                                <Text style={styles.retryText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : loading ? (
                    <View style={styles.container}>
                        <Text style={styles.headerTitle}>My cart</Text>
                        <View style={styles.mainContent}>
                            <ActivityIndicator
                                size="large"
                                color="#0069AF"
                                style={{ paddingVertical: 30 }}
                            />
                        </View>
                    </View>
                ) : (
                    <>
                        {!showEmpty ? (
                            <>
                                <CartItemBox
                                    clearCart={async () => {
                                        await AsyncStorage.removeItem(
                                            CART_TOKEN_KEY,
                                        );
                                        setShowEmpty(true);
                                    }}
                                    cartItems={cartItems}
                                />
                                <CouponInput />
                                <CartSummary navigation={navigation} />
                            </>
                        ) : (
                            <EmptyCart />
                        )}
                    </>
                )}
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

import React, { useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import EmptyCart from "../../componend/cart/EmptyCart";
import CartItemBox from "../../componend/cart/CartItemBox";
import CouponInput from "../../componend/cart/CouponInput";
import CartSummary from "../../componend/cart/CartSummary";

const CartScreen = ({ navigation }) => {
    const [state, setState] = useState({
        cartItem: [],
        showEmpty: false,
    });
    const { cartItem, showEmpty } = state;
    const updateState = (data) => setState((prv) => ({ ...prv, ...data }));

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#fff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                {!showEmpty ? (
                    <>
                        <CartItemBox
                            clearCart={() => updateState({ showEmpty: true })}
                        />
                        <CouponInput />
                        <CartSummary navigation={navigation} />
                    </>
                ) : (
                    <EmptyCart />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
});

export default CartScreen;

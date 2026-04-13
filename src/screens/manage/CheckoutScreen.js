import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import DeliveryAddress from "../../componend/checkout/DeliveryAddress";
import OrderReviewHeader from "../../componend/checkout/OrderReviewHeader";
import DiscountCodes from "../../componend/checkout/DiscountCodes";
import BillingSummary from "../../componend/checkout/BillingSummary";

const CheckoutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <DeliveryAddress />
                <OrderReviewHeader />
                <DiscountCodes />
                <BillingSummary />
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

export default CheckoutScreen;

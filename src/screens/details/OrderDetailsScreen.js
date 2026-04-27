import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import OrderSummaryCard from "../../componend/myorders/OrderSummaryCard";
import OrderItems from "../../componend/myorders/OrderItems";
import PriceDetails from "../../componend/myorders/PriceDetails";
import Addresses from "../../componend/myorders/Addresses";

const OrderDetailsScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <OrderSummaryCard />
                <OrderItems />
                <PriceDetails />
                <Addresses />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 12, paddingBottom: 30 },
});

export default OrderDetailsScreen;

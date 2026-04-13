import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import OrderDashboard from "../../componend/myorders/OrderDashboard";
import OrderListing from "../../componend/myorders/OrderListing";

const OrdersScreen = () => {
    const [state, setState] = useState({
        cartItem: [],
        showEmpty: false,
    });
    const { cartItem, showEmpty } = state;
    const updateState = (data) => setState((prv) => ({ ...prv, ...data }));

    const [activeTab, setActiveTab] = useState("All Orders");

    return (
        <SafeAreaView style={styles.safeArea}>
            <MainHeader bgColor="#fff" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <View style={styles.mainContainer}>
                    <OrderDashboard
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <OrderListing activeTab={activeTab} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#D7E9F2" },
    mainContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
});

export default OrdersScreen;

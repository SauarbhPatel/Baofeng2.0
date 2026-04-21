import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import OrderDashboard from "../../componend/myorders/OrderDashboard";
import OrderListing from "../../componend/myorders/OrderListing";
import { getOrderListing } from "../../api/commonApi";

const AUTH_USER_KEY = "baofeng_auth_user";

const OrdersScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState("All Orders");
    const [orders, setOrders] = useState([]);
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Re-fetch every time screen comes into focus
    // useFocusEffect(
    //     useCallback(() => {
    //         fetchOrders();
    //     }, []),
    // );
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
            const user = raw ? JSON.parse(raw) : null;
            const consumerId = user?.id;
            if (!consumerId) {
                setLoading(false);
                return;
            }

            const res = await getOrderListing(consumerId);
            if (res?.success && res?.data) {
                setOrders(res.data.orders || []);
                setCounts(res.data.counts || {});
            }
        } catch (err) {
            console.error("OrdersScreen fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <MainHeader bgColor="#fff" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <View style={styles.mainContainer}>
                    <OrderDashboard
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        counts={counts}
                    />
                    <OrderListing
                        activeTab={activeTab}
                        orders={orders}
                        loading={loading}
                        navigation={navigation}
                    />
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

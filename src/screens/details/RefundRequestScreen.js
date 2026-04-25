import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import RefundStatusTracker from "../../componend/refund/RefundStatusTracker";
import SelectItemBox from "../../componend/refund/SelectItemBox";
import RefundDetails from "../../componend/refund/RefundDetails";
import RefundSummary from "../../componend/refund/RefundSummary";
import WhatHappensNext from "../../componend/refund/WhatHappensNext";
import NeedHelp from "../../componend/refund/NeedHelp";
import { getOrderById, getAllReturnExchanges } from "../../api/commonApi";

const RefundRequestScreen = ({ navigation, route }) => {
    // Passed from OrderListing: { orderId, orderNumber }
    const { orderId, orderNumber } = route?.params || {};

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [existingReturn, setExistingReturn] = useState(null);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        initScreen();
    }, [orderId]);

    const initScreen = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Check if return/exchange already exists for this order
            const allReturnsRes = await getAllReturnExchanges();
            if (allReturnsRes?.success && allReturnsRes?.data?.records) {
                const found = allReturnsRes.data.records.find(
                    (r) => r.order?.orderNumber === orderNumber,
                );
                if (found) {
                    setExistingReturn(found);
                    setLoading(false);
                    return;
                }
            }

            // 2. No existing return — fetch order details
            if (orderId) {
                const orderRes = await getOrderById(orderId);
                if (orderRes?.success && orderRes?.data) {
                    setOrder(orderRes.data);
                } else {
                    setError("Failed to load order details.");
                }
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("RefundRequestScreen init error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" />
                <View style={styles.centerBox}>
                    <ActivityIndicator size="large" color="#0071bc" />
                    <Text style={styles.loadingText}>
                        Loading order details...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" />
                <View style={styles.centerBox}>
                    <Feather name="alert-circle" size={40} color="#94a3b8" />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryBtn}
                        onPress={initScreen}
                    >
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Existing return found — navigate to ReturnDetails (screen not built yet)
    if (existingReturn) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 15 }}
                >
                    <View style={styles.existingReturnCard}>
                        <View style={styles.existingReturnIcon}>
                            <Feather
                                name="check-circle"
                                size={40}
                                color="#0071bc"
                            />
                        </View>
                        <Text style={styles.existingReturnTitle}>
                            Request Already Submitted
                        </Text>
                        <Text style={styles.existingReturnNumber}>
                            {existingReturn.returnNumber}
                        </Text>
                        <View style={styles.existingReturnBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.existingReturnStatus}>
                                {existingReturn.returnExchangeStatus}
                            </Text>
                        </View>
                        <Text style={styles.existingReturnDesc}>
                            Your {existingReturn.requestFor?.toLowerCase()}{" "}
                            request has been submitted and is being processed.
                            Our team will contact you shortly.
                        </Text>
                        <TouchableOpacity
                            style={styles.goBackBtn}
                            onPress={() => {
                                // TODO: navigate to ReturnDetails when screen is ready
                                // navigation.push("ReturnDetails", { returnData: existingReturn });
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.goBackBtnText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                    <WhatHappensNext />
                    <NeedHelp />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <RefundStatusTracker />
                <SelectItemBox
                    order={order}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
                <RefundDetails
                    order={order}
                    navigation={navigation}
                    selectedIndex={selectedIndex}
                />
                <RefundSummary order={order} />
                <WhatHappensNext />
                <NeedHelp />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    centerBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        padding: 20,
    },
    loadingText: { fontSize: 14, color: "#64748b" },
    errorText: { fontSize: 14, color: "#64748b", textAlign: "center" },
    retryBtn: {
        backgroundColor: "#0071bc",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
    },
    retryText: { color: "#fff", fontWeight: "700" },

    // Existing return card
    existingReturnCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 24,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        alignItems: "center",
    },
    existingReturnIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#eff6ff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    existingReturnTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 8,
        textAlign: "center",
    },
    existingReturnNumber: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0071bc",
        marginBottom: 12,
    },
    existingReturnBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22c55e",
    },
    existingReturnStatus: {
        fontSize: 13,
        fontWeight: "700",
        color: "#16a34a",
    },
    existingReturnDesc: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
    },
    goBackBtn: {
        backgroundColor: "#0071bc",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 40,
    },
    goBackBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default RefundRequestScreen;

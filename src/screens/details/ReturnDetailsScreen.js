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
import ReturnDetailsBox from "../../componend/myreturn/ReturnDetailsBox";
import ReturnedItemsCard from "../../componend/myreturn/ReturnedItemsCard";
import ReturnTimeline from "../../componend/myreturn/ReturnTimeline";
import RefundDetailsBox from "../../componend/myreturn/RefundDetailsBox";
import PickupAddressBox from "../../componend/myreturn/PickupAddressBox";
import { getReturnById } from "../../api/commonApi";

// ── Status color map ───────────────────────────────────────────
const STATUS_COLORS = {
    PROCESSING: { bg: "#FFF7ED", text: "#F97316" },
    APPROVED: { bg: "#F0FDF4", text: "#22C55E" },
    REJECTED: { bg: "#FFF1F2", text: "#F43F5E" },
    COMPLETED: { bg: "#EFF6FF", text: "#3B82F6" },
    CANCELLED: { bg: "#F1F5F9", text: "#64748B" },
};
const getStatusColor = (s) =>
    STATUS_COLORS[s?.toUpperCase()] || { bg: "#F1F5F9", text: "#64748B" };

const ReturnDetailsScreen = ({ navigation, route }) => {
    const { returnId } = route?.params || {};

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // ── Fetch ──────────────────────────────────────────────────
    const fetchDetail = useCallback(async () => {
        try {
            setError(null);
            const res = await getReturnById(returnId);
            if (res?.success && res?.data) {
                setData(res.data);
            } else {
                setError("Failed to load return details.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [returnId]);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchDetail();
        }, [fetchDetail]),
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDetail();
    }, [fetchDetail]);

    // ── Loading ────────────────────────────────────────────────
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" navigation={navigation} />
                <View style={styles.centerBox}>
                    <ActivityIndicator size="large" color="#0069AF" />
                    <Text style={styles.loadingText}>Loading details...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // ── Error ──────────────────────────────────────────────────
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <MainHeader bgColor="#ffffff" navigation={navigation} />
                <View style={styles.centerBox}>
                    <Feather name="alert-circle" size={40} color="#94a3b8" />
                    <Text style={styles.errorTitle}>Something went wrong</Text>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryBtn}
                        onPress={fetchDetail}
                    >
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const statusColor = getStatusColor(data?.returnExchangeStatus);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                    />
                }
            >
                <ReturnDetailsBox
                    returnId={data?.returnNumber}
                    orderId={data?.order?.orderNumber}
                    date={new Date(data?.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        },
                    )}
                    status={data?.returnExchangeStatus}
                    reason={data?.reason?.reasonName}
                    comments={data?.description}
                />

                <ReturnedItemsCard
                    productName={data?.product?.productName}
                    quantity={data?.product?.quantity}
                    sellingPrice={data?.product?.sellingPrice}
                    // imgUrls={data?.media?.imgUrls}
                    imgUrls={null}
                />

                <ReturnTimeline
                    status={data?.returnExchangeStatus}
                    createdAt={data?.createdAt}
                />

                <RefundDetailsBox
                    refundMethod={data?.refundMethod}
                    upi={data?.upi}
                    bankDetails={data?.bankDetails}
                    amount={
                        data?.product?.sellingPrice * data?.product?.quantity
                    }
                />

                <PickupAddressBox pickupAddress={data?.pickupAddress} />

                {/* ── Action buttons ── */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.85}
                    >
                        <Feather name="headphones" size={16} color="#fff" />
                        <Text style={styles.primaryButtonText}>
                            Contact Support
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.85}
                    >
                        <Feather name="download" size={16} color="#0069AF" />
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
    scrollContent: { paddingTop: 12, paddingBottom: 30 },

    // ── Banner ────────────────────────────────────────────────
    bannerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        elevation: 2,
        shadowColor: "#0069AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    bannerLeft: { gap: 3 },
    returnNumber: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
    requestType: { fontSize: 13, color: "#64748b", fontWeight: "500" },
    statusBadge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: { fontSize: 12, fontWeight: "700" },

    // ── Buttons ───────────────────────────────────────────────
    buttonContainer: { paddingHorizontal: 10, gap: 10, marginTop: 4 },
    primaryButton: {
        backgroundColor: "#0069AF",
        borderRadius: 14,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    primaryButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
    secondaryButton: {
        borderWidth: 1.5,
        borderColor: "#0069AF",
        borderRadius: 14,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    secondaryButtonText: { color: "#0069AF", fontSize: 15, fontWeight: "700" },

    // ── Center states ─────────────────────────────────────────
    centerBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 30,
    },
    loadingText: { fontSize: 14, color: "#64748b" },
    errorTitle: { fontSize: 17, fontWeight: "700", color: "#1e293b" },
    errorText: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20,
    },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 6,
    },
    retryText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});

export default ReturnDetailsScreen;

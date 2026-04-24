import React, { useEffect, useState, useCallback } from "react";
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import { getShippingAddresses, getBillingAddresses } from "../../api/commonApi";

const TABS = ["My Billing Address", "My Shipping Address"];

const AddressScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [billingAddresses, setBilling] = useState([]);
    const [shippingAddresses, setShipping] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            setLoading(true);
            setError(null);
            const [billingRes, shippingRes] = await Promise.all([
                getBillingAddresses(),
                getShippingAddresses(),
            ]);

            if (billingRes?.success) {
                const data = billingRes.data || [];
                setBilling(data);
                // Auto-select default billing
                const def = data.find((a) => a.isDefault) || data[0];
                if (def && activeTab === 0) setSelectedId(def._id);
            }

            if (shippingRes?.success) {
                const data = shippingRes.data || [];
                setShipping(data);
                // Auto-select default shipping
                const def = data.find((a) => a.isDefault) || data[0];
                if (def && activeTab === 1) setSelectedId(def._id);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("AddressScreen fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchAll();
    };

    // When switching tabs auto-select the default of the new tab's list
    const handleTabSwitch = (idx) => {
        setActiveTab(idx);
        const list = idx === 0 ? billingAddresses : shippingAddresses;
        const def = list.find((a) => a.isDefault) || list[0];
        setSelectedId(def?._id || null);
    };

    const currentList = activeTab === 0 ? billingAddresses : shippingAddresses;

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>Addresses</Text>

                    {/* ── Tabs ────────────────────────────────── */}
                    <View style={styles.tabContainer}>
                        {TABS.map((tab, idx) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tab,
                                    activeTab === idx
                                        ? styles.activeTab
                                        : styles.inactiveTab,
                                ]}
                                onPress={() => handleTabSwitch(idx)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === idx
                                            ? styles.activeTabText
                                            : styles.inactiveTabText,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ── Content ─────────────────────────────── */}
                    {loading ? (
                        <View style={styles.loaderBox}>
                            <ActivityIndicator size="large" color="#0069AF" />
                            <Text style={styles.loadingText}>
                                Loading addresses...
                            </Text>
                        </View>
                    ) : error ? (
                        <View style={styles.loaderBox}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                onPress={fetchAll}
                                style={styles.retryBtn}
                            >
                                <Text style={styles.retryText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    ) : currentList.length === 0 ? (
                        <View style={styles.loaderBox}>
                            <Feather name="map-pin" size={36} color="#94a3b8" />
                            <Text style={styles.emptyText}>
                                No addresses found
                            </Text>
                        </View>
                    ) : (
                        currentList.map((item) => (
                            <AddressCard
                                key={item._id}
                                address={item}
                                isSelected={selectedId === item._id}
                                onSelect={() => setSelectedId(item._id)}
                            />
                        ))
                    )}

                    {/* ── Add New Address Button ────────────────── */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() =>
                            navigation.push("AddAddress", {
                                onSaved: () => {
                                    fetchAll();
                                },
                                addressType:
                                    activeTab == 0 ? "BILLING" : "SHIPPING",
                            })
                        }
                    >
                        <Feather name="plus-circle" size={24} color="#0064a3" />
                        <Text style={styles.addButtonText}>
                            Add New Address
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ── Address card ───────────────────────────────────────────────
const AddressCard = ({ address, isSelected, onSelect }) => {
    const {
        fullName,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        phone,
        isDefault,
    } = address;

    return (
        <View style={[styles.addressCard, isSelected && styles.selectedBorder]}>
            {/* Radio + Name */}
            <View style={styles.addressHeader}>
                <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={onSelect}
                >
                    <View
                        style={[
                            styles.radioCircle,
                            isSelected && styles.radioCircleSelected,
                        ]}
                    >
                        {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.addressName}>{fullName}</Text>
                </TouchableOpacity>

                {isDefault && (
                    <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.deleteIconBtn}>
                    <Feather name="trash-2" size={16} color="#ACB7D2" />
                </TouchableOpacity>
            </View>

            {/* Address lines */}
            <View style={styles.addressBody}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.addressText}>
                        {addressLine1}
                        {addressLine2 ? `, ${addressLine2}` : ""}
                    </Text>
                    <Text style={styles.addressText}>
                        {city}, {state?.name} — {postalCode}
                    </Text>
                    <Text style={styles.addressText}>{phone}</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="edit-3" size={18} color="#0064a3" />
                </TouchableOpacity>
            </View>
        </View>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },

    // ── Tabs ────────────────────────────────────────────────────
    tabContainer: { flexDirection: "row", marginBottom: 18, gap: 10 },
    tab: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        paddingHorizontal: 6,
    },
    activeTab: { backgroundColor: "#0064a3", borderColor: "#0064a3" },
    inactiveTab: { backgroundColor: "#ffffff", borderColor: "#0064a3" },
    activeTabText: { color: "#ffffff", fontWeight: "700", fontSize: 12 },
    inactiveTabText: { color: "#0064a3", fontWeight: "700", fontSize: 12 },
    tabText: {},

    // ── Loader / error / empty ───────────────────────────────────
    loaderBox: { alignItems: "center", paddingVertical: 30, gap: 12 },
    loadingText: { color: "#64748b", fontSize: 14 },
    errorText: { color: "#ef4444", fontSize: 13 },
    retryBtn: {
        backgroundColor: "#0069AF",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
    },
    retryText: { color: "#fff", fontWeight: "600" },
    emptyText: { color: "#94a3b8", fontSize: 14, fontWeight: "500" },

    // ── Address card ─────────────────────────────────────────────
    addressCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 15,
        marginBottom: 14,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
    },
    selectedBorder: { borderColor: "#0064a3", backgroundColor: "#f0f7ff" },
    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    radioContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
    radioCircle: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    radioCircleSelected: { borderColor: "#0064a3" },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#0064a3",
    },
    addressName: { fontSize: 15, fontWeight: "700", color: "#1e293b" },
    defaultBadge: {
        backgroundColor: "#dbeafe",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        marginRight: 8,
    },
    defaultText: { fontSize: 11, color: "#1d4ed8", fontWeight: "600" },
    deleteIconBtn: {
        padding: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ACB7D2",
    },
    addressBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    addressText: {
        fontSize: 13,
        color: "#94a3b8",
        lineHeight: 20,
        fontWeight: "500",
    },

    // ── Add button ───────────────────────────────────────────────
    addButton: {
        height: 90,
        borderWidth: 1.5,
        borderColor: "#0064a3",
        borderStyle: "dashed",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
        backgroundColor: "#fff",
    },
    addButtonText: {
        color: "#0064a3",
        fontWeight: "700",
        fontSize: 15,
        marginTop: 8,
    },
});

export default AddressScreen;

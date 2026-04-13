import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const OrderDashboard = ({ activeTab, setActiveTab }) => {
    const tabs = ["All Orders", "Processing", "Shipped", "Delivered"];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>
            <Text style={styles.subtitle}>Track & manage your purchases</Text>

            {/* Statistics Grid */}
            <View style={styles.statsGrid}>
                <View style={styles.statsRow}>
                    <StatCard
                        icon="package-variant"
                        count="24"
                        label="Total Orders"
                        bg="#fff7ed"
                        iconColor="#9a3412"
                    />
                    <StatCard
                        icon="check-circle"
                        count="18"
                        label="Delivered"
                        bg="#f0fdf4"
                        iconColor="#16a34a"
                    />
                </View>
                <View style={styles.statsRow}>
                    <StatCard
                        icon="truck-delivery"
                        count="3"
                        label="In Transit"
                        bg="#eff6ff"
                        iconColor="#2563eb"
                    />
                    <StatCard
                        icon="restore"
                        count="2"
                        label="Returns"
                        bg="#fef2f2"
                        iconColor="#dc2626"
                    />
                </View>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#94a3b8" />
                <TextInput
                    placeholder="Search orders..."
                    placeholderTextColor="#2C252080"
                    style={styles.searchInput}
                />
            </View>

            {/* Filter Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabsContainer}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tab,
                            activeTab === tab && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const StatCard = ({ icon, count, label, bg, iconColor }) => (
    <View style={styles.statCard}>
        <View style={[styles.iconBox, { backgroundColor: bg }]}>
            <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.statContent}>
            <Text style={styles.statCount}>{count}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1e293b",
    },
    subtitle: {
        fontSize: 14,
        color: "#8A7E72",
        marginTop: 4,
        marginBottom: 24,
    },
    statsGrid: {
        gap: 8,
        marginBottom: 15,
    },
    statsRow: {
        flexDirection: "row",
        gap: 8,
    },
    statCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "#E8E2D9",
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    statCount: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
    },
    statLabel: {
        fontSize: 11,
        color: "#8A7E72",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E8E2D9",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#1e293b",
    },
    tabsContainer: {
        flexDirection: "row",
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: "#fff",
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#E8E2D9",
    },
    activeTab: {
        backgroundColor: "#0070c0",
        borderColor: "#0070c0",
    },
    tabText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#8A7E72",
    },
    activeTabText: {
        color: "#fff",
    },
});

export default OrderDashboard;

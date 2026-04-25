import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
// Assuming these exist in your api folder
// import { getSupportTickets } from "../../api/commonApi";

const SupportTicketsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [tickets, setTickets] = useState([
        {
            id: "#TKT-00124",
            status: "Open",
            statusColor: "#00c853",
            title: "Order not delivered after 10 days",
            category: "Shipping & Delivery",
            date: "Apr 03, 2026",
            priority: "High",
            priorityColor: "#ffebee",
            priorityTextColor: "#ef5350",
        },
        {
            id: "#TKT-00119",
            status: "In Progress",
            statusColor: "#ff8f00",
            title: "Wrong item received in my package",
            category: "Returns & Refunds",
            date: "Apr 02, 2026",
            priority: "High",
            priorityColor: "#ffebee",
            priorityTextColor: "#ef5350",
        },
    ]);

    const summary = [
        {
            label: "OPEN",
            count: 2,
            icon: "clipboard-text-outline",
            color: "#00c853",
        },
        { label: "IN PROGRESS", count: 2, icon: "sync", color: "#ff8f00" },
        {
            label: "RESOLVED",
            count: 3,
            icon: "check-circle-outline",
            color: "#2196f3",
        },
        {
            label: "CLOSED",
            count: 1,
            icon: "close-circle-outline",
            color: "#78909c",
        },
    ];

    useEffect(() => {
        // fetchTickets();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        {/* Header Row */}
                        <View style={styles.headerRow}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.mainTitle}>
                                    All Tickets
                                </Text>
                                <View style={styles.countBadge}>
                                    <Text style={styles.countText}>
                                        8 tickets
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.sortBtn}>
                                <Text style={styles.sortBtnText}>Sort by</Text>
                                <Feather
                                    name="chevron-down"
                                    size={16}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Status Grid */}
                        <View style={styles.summaryGrid}>
                            {summary.map((item, index) => (
                                <View key={index} style={styles.summaryCard}>
                                    <View
                                        style={[
                                            styles.statusIcon,
                                            { backgroundColor: item.color },
                                        ]}
                                    >
                                        <MaterialCommunityIcons
                                            name={item.icon}
                                            size={22}
                                            color="#fff"
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.summaryLabel}>
                                            {item.label}
                                        </Text>
                                        <Text style={styles.summaryCount}>
                                            {item.count}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Search Section */}
                        <View style={styles.searchSection}>
                            <View style={styles.searchBar}>
                                <Feather
                                    name="search"
                                    size={20}
                                    color="#94a3b8"
                                />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search by Ticket ID..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            <TouchableOpacity style={styles.refreshBtn}>
                                <Ionicons
                                    name="refresh"
                                    size={20}
                                    color="#0f172a"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Ticket List */}
                        {loading ? (
                            <ActivityIndicator
                                size="large"
                                color="#0064a3"
                                style={{ marginTop: 50 }}
                            />
                        ) : (
                            tickets.map((ticket, index) => (
                                <View key={index} style={styles.ticketCard}>
                                    <View style={styles.ticketHeader}>
                                        <Text style={styles.ticketId}>
                                            {ticket.id}
                                        </Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                {
                                                    backgroundColor:
                                                        ticket.statusColor +
                                                        "15",
                                                },
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.dot,
                                                    {
                                                        backgroundColor:
                                                            ticket.statusColor,
                                                    },
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    {
                                                        color: ticket.statusColor,
                                                    },
                                                ]}
                                            >
                                                {ticket.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.ticketTitle}>
                                        {ticket.title}
                                    </Text>
                                    <Text style={styles.ticketSub}>
                                        {ticket.category} • {ticket.date}
                                    </Text>

                                    <View style={styles.ticketFooter}>
                                        <View
                                            style={[
                                                styles.priorityBadge,
                                                {
                                                    backgroundColor:
                                                        ticket.priorityColor,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.priorityText,
                                                    {
                                                        color: ticket.priorityTextColor,
                                                    },
                                                ]}
                                            >
                                                {ticket.priority}
                                            </Text>
                                        </View>
                                        <View style={styles.actions}>
                                            <TouchableOpacity
                                                style={styles.actionIcon}
                                            >
                                                <Feather
                                                    name="eye"
                                                    size={18}
                                                    color="#64748b"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.actionIcon}
                                            >
                                                <Feather
                                                    name="edit-3"
                                                    size={18}
                                                    color="#64748b"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.actionIcon}
                                            >
                                                <Feather
                                                    name="trash-2"
                                                    size={18}
                                                    color="#ef4444"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push("AddSupportTickets")}
                    style={{
                        position: "absolute",
                        bottom: 25,
                        right: 25,
                        left: 25,
                        padding: 12,
                        backgroundColor: "#0069AF",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 12,
                        zIndex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "600",
                            color: "#fff",
                            fontSize: 15,
                        }}
                    >
                        Create Ticket
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 15, paddingBottom: 10 },
    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        // marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 60,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    titleContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
    mainTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    countBadge: {
        backgroundColor: "#e0f2fe",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    countText: { color: "#0064a3", fontSize: 10, fontWeight: "700" },
    sortBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        gap: 5,
    },
    sortBtnText: { fontSize: 11, color: "#64748b", fontWeight: "600" },
    summaryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    summaryCard: {
        backgroundColor: "#fff",
        width: "48%",
        borderRadius: 12,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
        borderWidth: 0.8,
        borderColor: "#E5E7EB",
    },
    statusIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    summaryLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "800" },
    summaryCount: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
    searchSection: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
        borderWidth: 0.8,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#fff",
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 0.8,
        borderColor: "#E5E7EB",
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "#0f172a" },
    refreshBtn: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.8,
        borderColor: "#E5E7EB",
    },
    ticketCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    ticketHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    ticketId: { fontSize: 14, fontWeight: "600", color: "#0284C7" },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 6,
    },
    dot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 12, fontWeight: "800" },
    ticketTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 5,
    },
    ticketSub: {
        fontSize: 13,
        color: "#94a3b8",
        marginBottom: 20,
    },
    ticketFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priorityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    priorityText: { fontSize: 12, fontWeight: "800" },
    actions: { flexDirection: "row", gap: 10 },
    actionIcon: {
        padding: 8,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
});

export default SupportTicketsScreen;

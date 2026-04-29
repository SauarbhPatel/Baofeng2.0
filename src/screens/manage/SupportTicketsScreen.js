// import React, { useEffect, useState } from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
// } from "react-native";
// import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
// import MainHeader from "../../componend/common/MainHeader";
// // Assuming these exist in your api folder
// // import { getSupportTickets } from "../../api/commonApi";

// const SupportTicketsScreen = ({ navigation }) => {
//     const [loading, setLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [tickets, setTickets] = useState([
//         {
//             id: "#TKT-00124",
//             status: "Open",
//             statusColor: "#00c853",
//             title: "Order not delivered after 10 days",
//             category: "Shipping & Delivery",
//             date: "Apr 03, 2026",
//             priority: "High",
//             priorityColor: "#ffebee",
//             priorityTextColor: "#ef5350",
//         },
//         {
//             id: "#TKT-00119",
//             status: "In Progress",
//             statusColor: "#ff8f00",
//             title: "Wrong item received in my package",
//             category: "Returns & Refunds",
//             date: "Apr 02, 2026",
//             priority: "High",
//             priorityColor: "#ffebee",
//             priorityTextColor: "#ef5350",
//         },
//     ]);

//     const summary = [
//         {
//             label: "OPEN",
//             count: 2,
//             icon: "clipboard-text-outline",
//             color: "#00c853",
//         },
//         { label: "IN PROGRESS", count: 2, icon: "sync", color: "#ff8f00" },
//         {
//             label: "RESOLVED",
//             count: 3,
//             icon: "check-circle-outline",
//             color: "#2196f3",
//         },
//         {
//             label: "CLOSED",
//             count: 1,
//             icon: "close-circle-outline",
//             color: "#78909c",
//         },
//     ];

//     useEffect(() => {
//         // fetchTickets();
//     }, []);

//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : undefined}
//                 style={{ flex: 1 }}
//             >
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={styles.scrollContent}
//                     keyboardShouldPersistTaps="handled"
//                 >
//                     <View style={styles.card}>
//                         {/* Header Row */}
//                         <View style={styles.headerRow}>
//                             <View style={styles.titleContainer}>
//                                 <Text style={styles.mainTitle}>
//                                     All Tickets
//                                 </Text>
//                                 <View style={styles.countBadge}>
//                                     <Text style={styles.countText}>
//                                         8 tickets
//                                     </Text>
//                                 </View>
//                             </View>
//                             <TouchableOpacity style={styles.sortBtn}>
//                                 <Text style={styles.sortBtnText}>Sort by</Text>
//                                 <Feather
//                                     name="chevron-down"
//                                     size={16}
//                                     color="#64748b"
//                                 />
//                             </TouchableOpacity>
//                         </View>

//                         {/* Status Grid */}
// <View style={styles.summaryGrid}>
//     {summary.map((item, index) => (
//         <View key={index} style={styles.summaryCard}>
//             <View
//                 style={[
//                     styles.statusIcon,
//                     { backgroundColor: item.color },
//                 ]}
//             >
//                 <MaterialCommunityIcons
//                     name={item.icon}
//                     size={22}
//                     color="#fff"
//                 />
//             </View>
//             <View>
//                 <Text style={styles.summaryLabel}>
//                     {item.label}
//                 </Text>
//                 <Text style={styles.summaryCount}>
//                     {item.count}
//                 </Text>
//             </View>
//         </View>
//     ))}
// </View>

//                         {/* Search Section */}
//                         <View style={styles.searchSection}>
//                             <View style={styles.searchBar}>
//                                 <Feather
//                                     name="search"
//                                     size={20}
//                                     color="#94a3b8"
//                                 />
//                                 <TextInput
//                                     style={styles.searchInput}
//                                     placeholder="Search by Ticket ID..."
//                                     value={searchQuery}
//                                     onChangeText={setSearchQuery}
//                                     placeholderTextColor="#94a3b8"
//                                 />
//                             </View>
//                             <TouchableOpacity style={styles.refreshBtn}>
//                                 <Ionicons
//                                     name="refresh"
//                                     size={20}
//                                     color="#0f172a"
//                                 />
//                             </TouchableOpacity>
//                         </View>

//                         {/* Ticket List */}
//                         {loading ? (
//                             <ActivityIndicator
//                                 size="large"
//                                 color="#0064a3"
//                                 style={{ marginTop: 50 }}
//                             />
//                         ) : (
//                             tickets.map((ticket, index) => (
//                                 <View key={index} style={styles.ticketCard}>
//                                     <View style={styles.ticketHeader}>
//                                         <Text style={styles.ticketId}>
//                                             {ticket.id}
//                                         </Text>
//                                         <View
//                                             style={[
//                                                 styles.statusBadge,
//                                                 {
//                                                     backgroundColor:
//                                                         ticket.statusColor +
//                                                         "15",
//                                                 },
//                                             ]}
//                                         >
//                                             <View
//                                                 style={[
//                                                     styles.dot,
//                                                     {
//                                                         backgroundColor:
//                                                             ticket.statusColor,
//                                                     },
//                                                 ]}
//                                             />
//                                             <Text
//                                                 style={[
//                                                     styles.statusText,
//                                                     {
//                                                         color: ticket.statusColor,
//                                                     },
//                                                 ]}
//                                             >
//                                                 {ticket.status}
//                                             </Text>
//                                         </View>
//                                     </View>

//                                     <Text style={styles.ticketTitle}>
//                                         {ticket.title}
//                                     </Text>
//                                     <Text style={styles.ticketSub}>
//                                         {ticket.category} • {ticket.date}
//                                     </Text>

//                                     <View style={styles.ticketFooter}>
//                                         <View
//                                             style={[
//                                                 styles.priorityBadge,
//                                                 {
//                                                     backgroundColor:
//                                                         ticket.priorityColor,
//                                                 },
//                                             ]}
//                                         >
//                                             <Text
//                                                 style={[
//                                                     styles.priorityText,
//                                                     {
//                                                         color: ticket.priorityTextColor,
//                                                     },
//                                                 ]}
//                                             >
//                                                 {ticket.priority}
//                                             </Text>
//                                         </View>
//                                         <View style={styles.actions}>
// <TouchableOpacity
//     style={styles.actionIcon}
// >
//     <Feather
//         name="eye"
//         size={18}
//         color="#64748b"
//     />
// </TouchableOpacity>
// <TouchableOpacity
//     style={styles.actionIcon}
// >
//     <Feather
//         name="edit-3"
//         size={18}
//         color="#64748b"
//     />
// </TouchableOpacity>
// <TouchableOpacity
//     style={styles.actionIcon}
// >
//     <Feather
//         name="trash-2"
//         size={18}
//         color="#ef4444"
//     />
// </TouchableOpacity>
//                                         </View>
//                                     </View>
//                                 </View>
//                             ))
//                         )}
//                     </View>
//                 </ScrollView>

//                 <TouchableOpacity
//                     activeOpacity={0.9}
//                     onPress={() => navigation.push("AddSupportTickets")}
//                     style={{
//                         position: "absolute",
//                         bottom: 25,
//                         right: 25,
//                         left: 25,
//                         padding: 12,
//                         backgroundColor: "#0069AF",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: 12,
//                         zIndex: 1,
//                     }}
//                 >
//                     <Text
//                         style={{
//                             fontWeight: "600",
//                             color: "#fff",
//                             fontSize: 15,
//                         }}
//                     >
//                         Create Ticket
//                     </Text>
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#D7E9F2" },
//     scrollContent: { paddingTop: 15, paddingBottom: 10 },
//     card: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         // marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//         paddingBottom: 60,
//     },
//     headerRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     titleContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
//     mainTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
//     countBadge: {
//         backgroundColor: "#e0f2fe",
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 10,
//     },
//     countText: { color: "#0064a3", fontSize: 10, fontWeight: "700" },
//     sortBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         padding: 8,
//         paddingVertical: 4,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         gap: 5,
//     },
//     sortBtnText: { fontSize: 11, color: "#64748b", fontWeight: "600" },
//     summaryGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//         marginBottom: 5,
//     },
//     summaryCard: {
// backgroundColor: "#fff",
// width: "48%",
// borderRadius: 12,
// padding: 15,
// flexDirection: "row",
// alignItems: "center",
// gap: 12,
// marginBottom: 12,
// borderWidth: 0.8,
// borderColor: "#E5E7EB",
//     },
// statusIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
// },
//     summaryLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "800" },
//     summaryCount: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
//     searchSection: {
//         flexDirection: "row",
//         gap: 10,
//         marginBottom: 15,
//         borderWidth: 0.8,
//         borderColor: "#E5E7EB",
//         borderRadius: 12,
//         padding: 12,
//         backgroundColor: "#fff",
//     },
//     searchBar: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         paddingHorizontal: 15,
//         height: 50,
//         borderWidth: 0.8,
//         borderColor: "#E5E7EB",
//     },
//     searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "#0f172a" },
//     refreshBtn: {
//         backgroundColor: "#fff",
//         width: 50,
//         height: 50,
//         borderRadius: 12,
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 0.8,
//         borderColor: "#E5E7EB",
//     },
//     ticketCard: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 15,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#E2E8F0",
//     },
//     ticketHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     ticketId: { fontSize: 14, fontWeight: "600", color: "#0284C7" },
//     statusBadge: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//         gap: 6,
//     },
//     dot: { width: 6, height: 6, borderRadius: 3 },
//     statusText: { fontSize: 12, fontWeight: "800" },
//     ticketTitle: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#1e293b",
//         marginBottom: 5,
//     },
//     ticketSub: {
//         fontSize: 13,
//         color: "#94a3b8",
//         marginBottom: 20,
//     },
//     ticketFooter: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     priorityBadge: {
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 15,
//     },
//     priorityText: { fontSize: 12, fontWeight: "800" },
//     actions: { flexDirection: "row", gap: 10 },
//     actionIcon: {
// padding: 8,
// backgroundColor: "#ffffff",
// borderRadius: 10,
// borderWidth: 1,
// borderColor: "#E2E8F0",
//     },
// });

// export default SupportTicketsScreen;

import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import { OrderCardSkeleton } from "../../componend/common/SkeletonLoader";
import { getSupportTickets, deleteSupportTicket } from "../../api/commonApi";

const LIMIT = 10;

// ── Config ─────────────────────────────────────────────────────
const DEPARTMENTS = ["SUPPORT", "BILLING", "TECHNICAL"];
const PRIORITIES = ["HIGH", "MEDIUM", "LOW"];
const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
const SORT_ORDERS = ["DESC", "ASC"];

const STATUS_CFG = {
    OPEN: { color: "#00c853", bg: "#f0fff4" },
    IN_PROGRESS: { color: "#ff8f00", bg: "#fff8e1" },
    RESOLVED: { color: "#2196f3", bg: "#e3f2fd" },
    CLOSED: { color: "#78909c", bg: "#f1f5f9" },
};
const PRIORITY_CFG = {
    HIGH: { color: "#ef5350", bg: "#ffebee" },
    MEDIUM: { color: "#ff8f00", bg: "#fff8e1" },
    LOW: { color: "#43a047", bg: "#f0fff4" },
};
const getSC = (s) =>
    STATUS_CFG[s?.toUpperCase()] || { color: "#94a3b8", bg: "#f1f5f9" };
const getPC = (p) =>
    PRIORITY_CFG[p?.toUpperCase()] || { color: "#94a3b8", bg: "#f1f5f9" };

const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "—";

const SupportTicketsScreen = ({ navigation }) => {
    const [tickets, setTickets] = useState([]);
    const [counts, setCounts] = useState({
        openTickets: 0,
        closedTickets: 0,
        inProgressTickets: 0,
        resolvedTickets: 0,
    });
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [deleting, setDeleting] = useState(null);

    // ── Filter state ───────────────────────────────────────────
    const [filters, setFilters] = useState({
        sortOrder: "DESC",
        department: "",
        priority: "",
        status: "",
        from: null,
        to: null,
    });
    const [draftFilters, setDraftFilters] = useState({ ...filters });
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    // ── Fetch ──────────────────────────────────────────────────
    const fetchTickets = useCallback(
        async ({
            pageNum = 1,
            replace = true,
            appliedFilters = filters,
        } = {}) => {
            try {
                if (replace) setLoading(true);
                const params = {
                    page: pageNum,
                    limit: LIMIT,
                    sortOrder: appliedFilters.sortOrder,
                };
                if (appliedFilters.department)
                    params.department = appliedFilters.department;
                if (appliedFilters.priority)
                    params.priority = appliedFilters.priority;
                if (appliedFilters.status)
                    params.status = appliedFilters.status;
                if (appliedFilters.from)
                    params.from = appliedFilters.from.toISOString();
                if (appliedFilters.to)
                    params.to = appliedFilters.to.toISOString();

                const res = await getSupportTickets(params);
                if (res?.success) {
                    const records = res.data?.records || [];
                    setTickets((prev) =>
                        replace ? records : [...prev, ...records],
                    );
                    const pg = res.data?.pagination;
                    setHasMore(pg?.hasNext ?? false);
                    setPage(pageNum);
                    if (res.data?.statusCounts)
                        setCounts(res.data.statusCounts);
                }
            } catch {
                // silent
            } finally {
                setLoading(false);
                setLoadingMore(false);
                setRefreshing(false);
            }
        },
        [filters],
    );

    useFocusEffect(
        useCallback(() => {
            fetchTickets({ pageNum: 1, replace: true });
        }, [fetchTickets]),
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchTickets({ pageNum: 1, replace: true });
    };

    const loadMore = () => {
        if (loadingMore || !hasMore || loading) return;
        setLoadingMore(true);
        fetchTickets({ pageNum: page + 1, replace: false });
    };

    // ── Apply filters ──────────────────────────────────────────
    const applyFilters = () => {
        setFilters(draftFilters);
        setShowFilter(false);
        setPage(1);
        fetchTickets({
            pageNum: 1,
            replace: true,
            appliedFilters: draftFilters,
        });
    };

    const resetFilters = () => {
        const def = {
            sortOrder: "DESC",
            department: "",
            priority: "",
            status: "",
            from: null,
            to: null,
        };
        setDraftFilters(def);
        setFilters(def);
        setShowFilter(false);
        fetchTickets({ pageNum: 1, replace: true, appliedFilters: def });
    };

    // ── Delete ─────────────────────────────────────────────────
    const handleDelete = (ticket) => {
        Alert.alert("Delete Ticket", `Delete ${ticket.ticketNumber}?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        setDeleting(ticket._id);
                        const res = await deleteSupportTicket(ticket._id);
                        if (res?.success) {
                            setTickets((prev) =>
                                prev.filter((t) => t._id !== ticket._id),
                            );
                        } else {
                            Alert.alert("Error", "Failed to delete ticket.");
                        }
                    } catch {
                        Alert.alert("Error", "Network error.");
                    } finally {
                        setDeleting(null);
                    }
                },
            },
        ]);
    };

    // ── Search filter (client-side) ────────────────────────────
    const displayed = tickets.filter(
        (t) =>
            t.ticketNumber?.toLowerCase().includes(search.toLowerCase()) ||
            t.subject?.toLowerCase().includes(search.toLowerCase()),
    );

    // ── Active filter count badge ──────────────────────────────
    const activeCount = [
        filters.department,
        filters.priority,
        filters.status,
        filters.from,
        filters.to,
    ].filter(Boolean).length;

    // ── Render ticket card ─────────────────────────────────────
    const renderItem = ({ item }) => {
        const sc = getSC(item.status);
        const pc = getPC(item.priority);
        return (
            <View style={styles.ticketCard}>
                {/* Header */}
                <View style={styles.ticketHeader}>
                    <Text style={styles.ticketId}>{item.ticketNumber}</Text>
                    <View
                        style={[styles.statusBadge, { backgroundColor: sc.bg }]}
                    >
                        <View
                            style={[styles.dot, { backgroundColor: sc.color }]}
                        />
                        <Text style={[styles.statusText, { color: sc.color }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                {/* Subject + dept */}
                <Text style={styles.ticketTitle} numberOfLines={2}>
                    {item.subject}
                </Text>
                <Text style={styles.ticketSub}>
                    {item.department} • {fmt(item.createdAt)}
                </Text>
                {/* Footer */}
                <View style={styles.ticketFooter}>
                    <View
                        style={[
                            styles.priorityBadge,
                            { backgroundColor: pc.bg },
                        ]}
                    >
                        <Text
                            style={[styles.priorityText, { color: pc.color }]}
                        >
                            {item.priority}
                        </Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionIcon}>
                            <Feather name="eye" size={18} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionIcon}
                            onPress={() =>
                                navigation.push("AddSupportTickets", {
                                    ticket: item,
                                    onSaved: () =>
                                        fetchTickets({
                                            pageNum: 1,
                                            replace: true,
                                        }),
                                })
                            }
                        >
                            <Feather name="edit-3" size={18} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionIcon,
                                {
                                    backgroundColor: "#fff5f5",
                                    borderColor: "#fecaca",
                                },
                            ]}
                            onPress={() => handleDelete(item)}
                        >
                            {deleting === item._id ? (
                                <ActivityIndicator size={16} color="#ef4444" />
                            ) : (
                                <Feather
                                    name="trash-2"
                                    size={16}
                                    color="#ef4444"
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderFooter = () => {
        if (loadingMore)
            return (
                <ActivityIndicator
                    size="small"
                    color="#0069AF"
                    style={{ marginVertical: 16 }}
                />
            );
        if (!hasMore && tickets.length > 0)
            return <Text style={styles.endText}>✓ All tickets loaded</Text>;
        return null;
    };

    // ── Summary cards ──────────────────────────────────────────
    const summaryCards = [
        {
            label: "OPEN",
            count: counts.openTickets,
            color: "#00c853",
            icon: "clipboard-text-outline",
        },
        {
            label: "IN PROGRESS",
            count: counts.inProgressTickets,
            color: "#ff8f00",
            icon: "sync",
        },
        {
            label: "RESOLVED",
            count: counts.resolvedTickets,
            color: "#2196f3",
            icon: "check-circle-outline",
        },
        {
            label: "CLOSED",
            count: counts.closedTickets,
            color: "#78909c",
            icon: "close-circle-outline",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />

            <FlatList
                data={loading ? [] : displayed}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]}
                        tintColor="#0069AF"
                    />
                }
                ListHeaderComponent={
                    <View>
                        {/* Summary row */}
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            {summaryCards.map((item, index) => (
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

                        {/* Search + filter row */}
                        <View style={styles.searchSection}>
                            <View style={styles.searchBar}>
                                <Feather
                                    name="search"
                                    size={18}
                                    color="#94a3b8"
                                />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search by ticket ID or subject..."
                                    placeholderTextColor="#94a3b8"
                                    value={search}
                                    onChangeText={setSearch}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.filterBtn}
                                onPress={() => {
                                    setDraftFilters({ ...filters });
                                    setShowFilter(true);
                                }}
                            >
                                <Feather
                                    name="sliders"
                                    size={18}
                                    color={
                                        activeCount > 0 ? "#0069AF" : "#64748b"
                                    }
                                />
                                {activeCount > 0 && (
                                    <View style={styles.filterBadge}>
                                        <Text style={styles.filterBadgeText}>
                                            {activeCount}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Skeleton */}
                        {loading &&
                            Array(4)
                                .fill(null)
                                .map((_, i) => <OrderCardSkeleton key={i} />)}
                    </View>
                }
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.emptyBox}>
                            <Feather name="inbox" size={40} color="#CBD5E1" />
                            <Text style={styles.emptyTitle}>
                                No tickets found
                            </Text>
                            <Text style={styles.emptyText}>
                                Try changing your filters
                            </Text>
                        </View>
                    ) : null
                }
            />

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.9}
                onPress={() =>
                    navigation.push("AddSupportTickets", {
                        onSaved: () =>
                            fetchTickets({ pageNum: 1, replace: true }),
                    })
                }
            >
                <Text style={styles.fabText}>Create Ticket</Text>
            </TouchableOpacity>

            {/* ── Filter Modal ── */}
            <Modal
                visible={showFilter}
                transparent
                animationType="slide"
                onRequestClose={() => setShowFilter(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filters</Text>
                            <TouchableOpacity
                                onPress={() => setShowFilter(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            contentContainerStyle={styles.modalBody}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Sort Order */}
                            <FilterSection label="Sort Order">
                                {SORT_ORDERS.map((v) => (
                                    <Chip
                                        key={v}
                                        label={v}
                                        active={draftFilters.sortOrder === v}
                                        onPress={() =>
                                            setDraftFilters((p) => ({
                                                ...p,
                                                sortOrder: v,
                                            }))
                                        }
                                    />
                                ))}
                            </FilterSection>

                            {/* Department */}
                            <FilterSection label="Department">
                                <Chip
                                    label="All"
                                    active={!draftFilters.department}
                                    onPress={() =>
                                        setDraftFilters((p) => ({
                                            ...p,
                                            department: "",
                                        }))
                                    }
                                />
                                {DEPARTMENTS.map((v) => (
                                    <Chip
                                        key={v}
                                        label={v}
                                        active={draftFilters.department === v}
                                        onPress={() =>
                                            setDraftFilters((p) => ({
                                                ...p,
                                                department: v,
                                            }))
                                        }
                                    />
                                ))}
                            </FilterSection>

                            {/* Priority */}
                            <FilterSection label="Priority">
                                <Chip
                                    label="All"
                                    active={!draftFilters.priority}
                                    onPress={() =>
                                        setDraftFilters((p) => ({
                                            ...p,
                                            priority: "",
                                        }))
                                    }
                                />
                                {PRIORITIES.map((v) => (
                                    <Chip
                                        key={v}
                                        label={v}
                                        active={draftFilters.priority === v}
                                        onPress={() =>
                                            setDraftFilters((p) => ({
                                                ...p,
                                                priority: v,
                                            }))
                                        }
                                    />
                                ))}
                            </FilterSection>

                            {/* Status */}
                            <FilterSection label="Status">
                                <Chip
                                    label="All"
                                    active={!draftFilters.status}
                                    onPress={() =>
                                        setDraftFilters((p) => ({
                                            ...p,
                                            status: "",
                                        }))
                                    }
                                />
                                {STATUSES.map((v) => (
                                    <Chip
                                        key={v}
                                        label={v}
                                        active={draftFilters.status === v}
                                        onPress={() =>
                                            setDraftFilters((p) => ({
                                                ...p,
                                                status: v,
                                            }))
                                        }
                                    />
                                ))}
                            </FilterSection>

                            {/* Date range */}
                            <FilterSection label="Date Range">
                                <View style={styles.dateRow}>
                                    <TouchableOpacity
                                        style={styles.dateBtn}
                                        onPress={() => setShowFromPicker(true)}
                                    >
                                        <Feather
                                            name="calendar"
                                            size={14}
                                            color="#0069AF"
                                        />
                                        <Text style={styles.dateBtnText}>
                                            {draftFilters.from
                                                ? fmt(draftFilters.from)
                                                : "From"}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: "#94a3b8" }}>→</Text>
                                    <TouchableOpacity
                                        style={styles.dateBtn}
                                        onPress={() => setShowToPicker(true)}
                                    >
                                        <Feather
                                            name="calendar"
                                            size={14}
                                            color="#0069AF"
                                        />
                                        <Text style={styles.dateBtnText}>
                                            {draftFilters.to
                                                ? fmt(draftFilters.to)
                                                : "To"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </FilterSection>
                            {(draftFilters.from || draftFilters.to) && (
                                <TouchableOpacity
                                    onPress={() =>
                                        setDraftFilters((p) => ({
                                            ...p,
                                            from: null,
                                            to: null,
                                        }))
                                    }
                                    style={{
                                        padding: 8,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        backgroundColor: "#fff5f5",
                                        borderColor: "#fecaca",
                                        minHeight: 40,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={styles.clearDate}>
                                        Clear dates
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {showFromPicker && (
                                <DateTimePicker
                                    value={draftFilters.from || new Date()}
                                    mode="date"
                                    display={
                                        Platform.OS === "ios"
                                            ? "inline"
                                            : "default"
                                    }
                                    onChange={(_, d) => {
                                        setShowFromPicker(false);
                                        if (d)
                                            setDraftFilters((p) => ({
                                                ...p,
                                                from: d,
                                            }));
                                    }}
                                />
                            )}
                            {showToPicker && (
                                <DateTimePicker
                                    value={draftFilters.to || new Date()}
                                    mode="date"
                                    display={
                                        Platform.OS === "ios"
                                            ? "inline"
                                            : "default"
                                    }
                                    onChange={(_, d) => {
                                        setShowToPicker(false);
                                        if (d)
                                            setDraftFilters((p) => ({
                                                ...p,
                                                to: d,
                                            }));
                                    }}
                                />
                            )}
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.resetBtn}
                                onPress={resetFilters}
                            >
                                <Text style={styles.resetBtnText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyBtn}
                                onPress={applyFilters}
                            >
                                <Text style={styles.applyBtnText}>
                                    Apply Filters
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// ── Small reusable components ──────────────────────────────────
const FilterSection = ({ label, children }) => (
    <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>{label}</Text>
        <View style={styles.chipRow}>{children}</View>
    </View>
);

const Chip = ({ label, active, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.chip, active && styles.chipActive]}
    >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>
            {label?.toLowerCase()?.split("_").join(" ")}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    listContent: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 100 },

    // Summary
    summaryRow: { marginBottom: 14 },
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
    summaryCount: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
    summaryLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "800" },

    // Search
    searchSection: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 14,
        alignItems: "center",
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 8,
    },
    searchInput: { flex: 1, fontSize: 14, color: "#0f172a" },
    filterBtn: {
        width: 48,
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
    },
    filterBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#0069AF",
        justifyContent: "center",
        alignItems: "center",
    },
    filterBadgeText: { fontSize: 9, color: "#fff", fontWeight: "800" },

    // Ticket card
    ticketCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    ticketHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    ticketId: { fontSize: 14, fontWeight: "700", color: "#0284C7" },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 5,
    },
    dot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 11, fontWeight: "800" },
    ticketTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 4,
    },
    ticketSub: { fontSize: 12, color: "#94a3b8", marginBottom: 14 },
    ticketFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priorityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 12,
    },
    priorityText: { fontSize: 11, fontWeight: "800" },
    actions: { flexDirection: "row", gap: 8 },
    actionIcon: {
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#ffffff",
    },

    // FAB
    fab: {
        position: "absolute",
        bottom: 24,
        left: 20,
        right: 20,
        backgroundColor: "#0069AF",
        borderRadius: 14,
        height: 52,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        elevation: 4,
    },
    fabText: { color: "#fff", fontWeight: "700", fontSize: 15 },

    // Footer
    endText: {
        textAlign: "center",
        color: "#22c55e",
        fontWeight: "600",
        fontSize: 13,
        paddingVertical: 16,
    },

    // Empty
    emptyBox: { alignItems: "center", paddingVertical: 60, gap: 8 },
    emptyTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
    emptyText: { fontSize: 13, color: "#94a3b8" },

    // Filter modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: "85%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    modalTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
    modalBody: { padding: 20, paddingBottom: 10 },
    filterSection: { marginBottom: 20 },
    filterLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 10,
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    chipActive: { backgroundColor: "#0069AF", borderColor: "#0069AF" },
    chipText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748b",
        textTransform: "capitalize",
    },
    chipTextActive: { color: "#fff" },
    dateRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    dateBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 44,
        backgroundColor: "#F8FAFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#E0F2FE",
        minWidth: "45%",
    },
    dateBtnText: { fontSize: 13, fontWeight: "600", color: "#0069AF" },
    clearDate: {
        fontSize: 14,
        color: "#ef4444",
        fontWeight: "600",
        // marginTop: 8,
        textAlign: "center",
    },
    modalFooter: {
        flexDirection: "row",
        gap: 12,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    resetBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#0069AF",
        justifyContent: "center",
        alignItems: "center",
    },
    resetBtnText: { color: "#0069AF", fontWeight: "700", fontSize: 15 },
    applyBtn: {
        flex: 2,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#0069AF",
        justifyContent: "center",
        alignItems: "center",
    },
    applyBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

export default SupportTicketsScreen;

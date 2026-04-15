import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectItemBox = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                {/* <MaterialCommunityIcons
                    name="package-variant"
                    size={24}
                    color="#a16207"
                /> */}
                <Text style={styles.headerTitle}>
                    📦 {"  "}Select Item to Refund
                </Text>
            </View>

            {/* Selected Item Card */}
            <TouchableOpacity style={[styles.itemCard, styles.selectedCard]}>
                <View style={styles.imagePlaceholder}>
                    <MaterialCommunityIcons
                        name="radio"
                        size={32}
                        color="#a16207"
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>
                        Baofeng UV-5R Dual Band Radio
                    </Text>
                    <Text style={styles.orderInfo}>
                        Order #BF-20251102 · Qty: 1
                    </Text>

                    <View style={styles.statusBadge}>
                        <View style={styles.dot} />
                        <Text style={styles.statusText}>
                            Delivered 3 days ago
                        </Text>
                    </View>

                    <Text style={styles.priceText}>₹2,499</Text>
                </View>

                {/* Checkmark Indicator */}
                <View style={styles.checkCircle}>
                    <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>

            {/* Unselected Item Card */}
            <TouchableOpacity style={styles.itemCard}>
                <View style={styles.imagePlaceholder}>
                    <MaterialCommunityIcons
                        name="radio"
                        size={30}
                        color="#a16207"
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>
                        Baofeng UV-5R Dual Band Radio
                    </Text>
                    <Text style={styles.orderInfo}>
                        Order #BF-20251102 · Qty: 1
                    </Text>

                    <View style={styles.statusBadge}>
                        <View style={styles.dot} />
                        <Text style={styles.statusText}>
                            Delivered 3 days ago
                        </Text>
                    </View>

                    <Text style={styles.priceText}>₹2,499</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    itemCard: {
        backgroundColor: "#f8fbff", // Suble blue background for items
        borderRadius: 20,
        padding: 16,
        flexDirection: "row",
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedCard: {
        borderColor: "#0071bc", // Blue border for selected state
    },
    imagePlaceholder: {
        width: 65,
        height: 65,
        backgroundColor: "#e2e8f0",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 4,
    },
    orderInfo: {
        fontSize: 12,
        color: "#94a3b8",
        marginBottom: 6,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff7ed", // Light orange badge
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 50,
        marginBottom: 8,
        gap: 6,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 4,
        backgroundColor: "#ea580c",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#ea580c",
    },
    priceText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0071bc",
    },
    checkCircle: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#0071bc", // Blue check indicator
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SelectItemBox;

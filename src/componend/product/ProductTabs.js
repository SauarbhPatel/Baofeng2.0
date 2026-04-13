import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState("Description");

    const tabs = [
        "Description",
        "Legal Complaince",
        "Technical Details",
        "User Mannual",
        "Warranty",
    ];

    const highlights = [
        "Crystal clear audio quality with noise reduction",
        "Ergonomic design with non-slip grip",
        "Built-in LED flashlight for emergencies",
        "Intelligent charging with overcharge protection",
        "Voice prompt function for easy operation",
    ];

    return (
        <View style={styles.mainContainer}>
            {/* Tab Grid */}
            <View style={styles.tabGrid}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tabButton,
                            activeTab === tab
                                ? styles.activeTabButton
                                : styles.inactiveTabButton,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab
                                    ? styles.activeTabText
                                    : styles.inactiveTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Description Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.contentHeading}>
                    Professional Communication Made Simple
                </Text>

                <Text style={styles.bodyText}>
                    The Baofeng BF-888s is a professional-grade walkie talkie
                    designed for reliable communication in various environments.
                    Whether you're managing a construction site, coordinating an
                    event, or hiking in the wilderness, this device ensures you
                    stay connected.
                </Text>

                <Text style={styles.bodyText}>
                    With its compact design and robust build quality, the
                    BF-888s fits comfortably in your hand while withstanding
                    daily wear and tear. The 1500mAh battery provides up to 8
                    hours of continuous use, making it perfect for long shifts
                    or day trips.
                </Text>

                {/* Key Highlights Card */}
                <View style={styles.highlightsCard}>
                    <Text style={styles.highlightsTitle}>Key Highlights</Text>
                    {highlights.map((item, index) => (
                        <View key={index} style={styles.highlightRow}>
                            <MaterialCommunityIcons
                                name="check"
                                size={16}
                                color="#10b981"
                            />
                            <Text style={styles.highlightText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    tabGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 15,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 12,
        borderWidth: 1,
        minWidth: "47%",
        alignItems: "center",
    },
    activeTabButton: {
        backgroundColor: "#0069AF",
        borderColor: "#0069AF",
    },
    inactiveTabButton: {
        backgroundColor: "#fff",
        borderColor: "#D5ECF7",
    },
    tabText: {
        fontSize: 12,
        fontWeight: "700",
    },
    activeTabText: {
        color: "#fff",
    },
    inactiveTabText: {
        color: "#1e293b",
    },
    contentContainer: {},
    contentHeading: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    bodyText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 20,
        marginBottom: 15,
        // fontWeight: "500",
    },
    highlightsCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    highlightsTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0f172a",
        marginBottom: 15,
    },
    highlightRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10,
        gap: 10,
    },
    highlightText: {
        flex: 1,
        fontSize: 13,
        color: "#475569",
        // lineHeight: 16,
    },
});

export default ProductTabs;

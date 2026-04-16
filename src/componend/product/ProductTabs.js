import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AutoHeightWebView from "react-native-autoheight-webview";

const ProductTabs = ({ dynamicSection }) => {
    const tabs = dynamicSection?.map((item) => item?.sectionTitle);
    const [activeTab, setActiveTab] = useState(tabs[0] || "Description");

    const highlights = [
        "Crystal clear audio quality with noise reduction",
        "Ergonomic design with non-slip grip",
        "Built-in LED flashlight for emergencies",
        "Intelligent charging with overcharge protection",
        "Voice prompt function for easy operation",
    ];

    const wrappedHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <style>
                        body {
                          margin: 0;
                          margin-end: 10;
                          padding: 0;
                          font-size: 14px;
                          line-height: 1.4;
                          color: #333;
                          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
                        }
                        img {
                          max-width: 100%;
                          height: auto;
                          margin: 10px 0;
                          display: block;
                        }
                        h1,h2,h3,h4,h5 { margin: 6px 0; font-size: 16px; }
                        p { margin: 6px 0; }
                      </style>
                    </head>
                    <body>
                      ${dynamicSection?.find((item) => item?.sectionTitle == activeTab)?.content ?? ""}
                    </body>
                    </html>
                `;

    return (
        <>
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
                    <AutoHeightWebView
                        originWhitelist={["*"]}
                        source={{ html: wrappedHtml }}
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                        }}
                        customScript={`
        setTimeout(() => {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'height',
                    height: document.documentElement.scrollHeight
                })
            );
        }, 50);
    `}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                    />

                    {/* Key Highlights Card */}
                    {/* <View style={styles.highlightsCard}>
                        <Text style={styles.highlightsTitle}>
                            Key Highlights
                        </Text>
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
                    </View> */}
                </View>
            </View>
        </>
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
        marginTop: 15,
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

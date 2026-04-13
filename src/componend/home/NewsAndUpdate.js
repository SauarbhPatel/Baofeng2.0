import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const NewsAndUpdate = () => {
    return (
        <LinearGradient
            colors={["#FFD64D", "#FFC107"]}
            style={styles.container}
        >
            <View style={styles.headerRow}>
                <Text style={styles.title}>News & Updates</Text>
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Feather name="arrow-right" size={14} color="#1e293b" />
                </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>
                Stay informed about the latest in baofengradios technology
            </Text>

            <ImageBackground
                source={require("../../assets/images/news.png")}
                style={styles.newsCard}
                imageStyle={{ borderRadius: 16 }}
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
                    style={styles.cardOverlay}
                >
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Feather name="user" size={14} color="#cbd5e1" />
                            <Text style={styles.metaText}>Sarah Mitchell</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Feather
                                name="calendar"
                                size={14}
                                color="#cbd5e1"
                            />
                            <Text style={styles.metaText}>Mar 10, 2026</Text>
                        </View>
                    </View>

                    {/* Text Content */}
                    <Text style={styles.cardTitle}>
                        Future of Digital Radio Communication in 2026
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={3}>
                        Discover the latest advancements in digital radio
                        technology and how they're ustries.
                    </Text>

                    <TouchableOpacity style={styles.readMoreRow}>
                        <Text style={styles.readMoreText}>Read Full Story</Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={16}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
        color: "#0f172a",
    },
    subTitle: {
        fontSize: 15,
        color: "#334155",
        lineHeight: 20,
        marginBottom: 15,
        fontWeight: "500",
    },
    newsCard: {
        width: "100%",
        height: 220,
        justifyContent: "flex-end",
    },
    cardOverlay: {
        padding: 20,
        borderRadius: 24,
        height: "100%",
        justifyContent: "flex-end",
    },
    metaRow: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 12,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    metaText: {
        color: "#cbd5e1",
        fontSize: 13,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        lineHeight: 26,
    },
    cardDescription: {
        color: "#cbd5e1",
        fontSize: 13,
        // lineHeight: 20,
        marginBottom: 16,
    },
    readMoreRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    readMoreText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});

export default NewsAndUpdate;

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const InstagramSection = () => {
    return (
        <LinearGradient
            colors={["#FB2C36", "#FF6900"]} // Vibrant Red to Orange gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    License Free On Instagram
                </Text>
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Feather name="arrow-right" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                snapToInterval={width * 0.78}
                decelerationRate="fast"
            >
                <InstagramCard />
                <InstagramCard />
            </ScrollView>
        </LinearGradient>
    );
};

const InstagramCard = () => (
    <View style={styles.card}>
        <Text style={styles.cardHeaderTitle}>License Free on instagram</Text>

        {/* Profile Header */}
        <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
                <Image
                    source={require("../../assets/logo/app_logo.png")}
                    style={styles.avatar}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.username}>baofengindia</Text>
                    <Text style={styles.subtitle}>Power Drift</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.viewProfileBtn}>
                <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.mediaContainer}>
            <View style={styles.mainImage}>
                <Image
                    source={require("../../assets/images/insta1.png")}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.playButtonOverlay}>
                <MaterialCommunityIcons name="play" size={30} color="#000" />
            </View>
        </View>

        <TouchableOpacity>
            <Text style={styles.viewMoreText}>View more on instagram</Text>
        </TouchableOpacity>

        {/* Bottom Actions */}
        <View style={styles.actions}>
            <Feather
                name="message-circle"
                size={22}
                color="#1e293b"
                style={{ marginRight: 15 }}
            />
            <Feather name="share" size={22} color="#1e293b" />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingBottom: 35,
        borderRadius: 0, // Fits the screen width
        marginBottom: 15,
    },
    header: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 4,
    },
    scrollContent: {
        paddingLeft: 15,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        width: width * 0.75, // Card width
        padding: 16,
        marginRight: 15,
    },
    cardHeaderTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 12,
    },
    profileRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#FF4B2B",
        marginRight: 8,
    },
    username: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
    },
    subtitle: {
        fontSize: 11,
        color: "#64748b",
    },
    viewProfileBtn: {
        backgroundColor: "#0275d8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    viewProfileText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    mediaContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    mainImage: {
        ...StyleSheet.absoluteFillObject,
    },
    playButtonOverlay: {
        backgroundColor: "rgba(255,255,255,0.9)",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    viewMoreText: {
        color: "#0275d8",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 12,
    },
    actions: {
        flexDirection: "row",
    },
});

export default InstagramSection;

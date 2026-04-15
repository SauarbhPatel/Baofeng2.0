import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";

const OrderConfirmation = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            <ScrollView
                contentContainerStyle={{ paddingTop: 15 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.successArea}>
                        <SuccessConfetti />
                        <View style={styles.successCircle}>
                            <LinearGradient
                                colors={["#10b981", "#059669"]}
                                style={styles.successGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >
                                <Ionicons
                                    name="checkmark"
                                    size={36}
                                    color="#fff"
                                />
                            </LinearGradient>
                        </View>
                    </View>

                    <View style={styles.textCenter}>
                        <Text style={styles.titleText}>
                            Thank you for your purchase
                        </Text>
                        <Text style={styles.descText}>
                            Your order has been confirmed and will be shipped
                            soon. We’ve sent a confirmation email to your inbox.
                        </Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <View style={styles.iconBoxPurple}>
                                <Feather
                                    name="package"
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <View>
                                <Text style={styles.cardHeader}>
                                    Order Summary
                                </Text>
                                <Text style={styles.orderNo}>
                                    Order No:{" "}
                                    <Text style={styles.boldAmount}>
                                        HGSR2602156001
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoStack}>
                            <InfoCard
                                colors={["#efffff", "#fffefe"]}
                                iconName="calendar-outline"
                                label="Order Date"
                                value="March 13, 2026"
                                borderColor="#d0fdfd"
                                iconBg="#0ea5e9"
                            />

                            <InfoCard
                                colors={["#fff2ff", "#fffefe"]}
                                iconName="truck-outline"
                                label="Est. Delivery"
                                value="March 18-20, 2026"
                                borderColor="#fee1fe"
                                iconBg="#ec4899"
                            />

                            <InfoCard
                                colors={["#f2fff9", "#fffefe"]}
                                iconName="credit-card-outline"
                                label="Payment Method"
                                value="•••• •••• •••• 4242"
                                borderColor="#d8fee1"
                                iconBg="#16a34a"
                            />

                            <InfoCard
                                colors={["#fff8f2", "#fffefe"]}
                                iconName="map-marker-outline"
                                label="Shipping To"
                                value="Mumbai, India"
                                borderColor="#fedece"
                                iconBg="#f97316"
                            />
                        </View>
                        <View style={styles.actionGrid}>
                            <ActionButton
                                label="Back to Home"
                                icon="arrow-back"
                                onPress={() => navigation.push("HomeNavigator")}
                            />
                            <ActionButton
                                label="Share Order"
                                icon="share-social-outline"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Sub-components for cleaner structure
const InfoCard = ({ colors, iconName, label, value, borderColor, iconBg }) => (
    <View style={[styles.gradientBorderWrapper, { borderColor }]}>
        <LinearGradient
            colors={colors}
            style={styles.infoGradient}
            start={{ x: 0, y: 0.5 }} // Horizontal Gradient
            end={{ x: 1, y: 0.5 }}
        >
            <View style={[styles.infoIconBox, { backgroundColor: iconBg }]}>
                {/* <Ionicons name={iconName} size={20} color="#fff" /> */}
                <MaterialCommunityIcons
                    name={iconName}
                    size={20}
                    color="#fff"
                />
            </View>
            <View>
                <Text style={styles.cardLabel}>{label}</Text>
                <Text style={styles.cardValue}>{value}</Text>
            </View>
        </LinearGradient>
    </View>
);

const ActionButton = ({ label, icon, onPress = () => {} }) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.btnSecondary}
        activeOpacity={0.7}
    >
        <Ionicons
            name={icon}
            size={16}
            color="#475569"
            style={styles.btnIcon}
        />
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
);

// Visual placeholder for confetti dots
const SuccessConfetti = () => {
    const dots = [
        { size: 10, color: "#fef08a", top: -40, left: "20%" }, // Yellow
        { size: 8, color: "#bbf7d0", top: -30, left: "45%" }, // Green
        { size: 6, color: "#fef08a", top: -20, left: "70%" }, // Yellow
        { size: 8, color: "#bef264", top: 30, left: "10%" }, // Lime
        { size: 10, color: "#fef08a", top: 40, left: "55%" }, // Yellow
        { size: 6, color: "#fed7aa", top: 50, left: "85%" }, // Orange
    ];
    return (
        <View style={styles.confettiContainer}>
            {dots.map((dot, i) => (
                <View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            width: dot.size,
                            height: dot.size,
                            borderRadius: dot.size / 2,
                            backgroundColor: dot.color,
                            top: dot.top,
                            left: dot.left,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    cardContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },

    // Confetti & Success Logic
    successArea: {
        alignItems: "center",
        marginVertical: 40,
        position: "relative",
    },
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 6,
        backgroundColor: "rgba(5, 150, 105, 0.1)", // Soft green outline glow
    },
    successGradient: {
        width: "100%",
        height: "100%",
        borderRadius: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    confettiContainer: { position: "absolute", width: "100%", height: "100%" },
    dot: { position: "absolute" },

    // Typography
    textCenter: {
        alignItems: "center",
        marginBottom: 36,
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 12,
    },
    descText: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
        lineHeight: 20,
    },

    // Summary Card Logic
    summaryCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#E2E8F0",
    },
    iconBoxPurple: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: "#7c3aed",
        justifyContent: "center",
        alignItems: "center",
    },
    cardHeader: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
    orderNo: { fontSize: 12, color: "#6b7280", marginTop: 3 },
    boldAmount: { fontWeight: "700", color: "#1f2937" },

    // Info Card & Gradient Logic
    infoStack: { gap: 15, padding: 15 },
    gradientBorderWrapper: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
    }, // Ensures gradient follows curve
    infoGradient: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
    },
    infoIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    cardLabel: {
        fontSize: 12,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    cardValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1f2937",
        marginTop: 2,
    },

    // Button Grid
    actionGrid: { gap: 12, paddingHorizontal: 15, marginBottom: 15 },
    btnSecondary: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    btnIcon: { marginRight: 8 },
    btnText: { fontSize: 14, fontWeight: "600", color: "#475569" },
});

export default OrderConfirmation;

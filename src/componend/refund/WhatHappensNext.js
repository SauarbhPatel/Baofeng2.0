import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WhatHappensNext = () => {
    const steps = [
        {
            title: "Refund Request Submitted",
            description: "Right away – you’ll receive a confirmation email",
            isCompleted: true,
            isLast: false,
        },
        {
            title: "Team Reviews Your Request",
            description: "Within 24 hours of submission",
            isCompleted: false,
            isLast: false,
        },
        {
            title: "Return Pickup Scheduled",
            description: "1-2 business days after approval",
            isCompleted: false,
            isLast: false,
        },
        {
            title: "Refund Credited",
            description: "3-5 business days after item inspection",
            isCompleted: false,
            isLast: true,
        },
    ];

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>
                    ⏱️ {"  "}What Happens Next
                </Text>
            </View>

            {/* Stepper Container */}
            <View style={styles.stepperContainer}>
                {steps.map((item, index) => (
                    <View key={index} style={styles.stepWrapper}>
                        {/* Left Column: Indicator and Line */}
                        <View style={styles.indicatorColumn}>
                            <View
                                style={[
                                    styles.dot,
                                    item.isCompleted
                                        ? styles.dotActive
                                        : styles.dotInactive,
                                ]}
                            />
                            {!item.isLast && <View style={styles.line} />}
                        </View>

                        {/* Right Column: Content */}
                        <View style={styles.contentColumn}>
                            <Text
                                style={[
                                    styles.stepTitle,
                                    item.isCompleted
                                        ? styles.textActive
                                        : styles.textInactive,
                                ]}
                            >
                                {item.title}
                            </Text>
                            <Text style={styles.stepDescription}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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
        marginBottom: 32,
    },
    headerEmoji: {
        fontSize: 20,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    stepperContainer: {
        paddingLeft: 4,
    },
    stepWrapper: {
        flexDirection: "row",
    },
    indicatorColumn: {
        alignItems: "center",
        width: 24,
        marginRight: 16,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        zIndex: 2,
    },
    dotActive: {
        backgroundColor: "#0071bc", // Primary brand blue
    },
    dotInactive: {
        backgroundColor: "#e2e8f0", // Muted gray for pending steps
    },
    line: {
        width: 2,
        // height: 20,
        flex: 1,
        backgroundColor: "#eff6ff", // Very light blue connector line
        marginVertical: 10,
    },
    contentColumn: {
        flex: 1,
        paddingBottom: 25,
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 4,
    },
    textActive: {
        color: "#0f172a",
    },
    textInactive: {
        color: "#475569",
    },
    stepDescription: {
        fontSize: 12,
        color: "#94a3b8", // Grayish blue for meta info
        lineHeight: 20,
    },
});

export default WhatHappensNext;

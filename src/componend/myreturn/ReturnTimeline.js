import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";

// ── All possible steps in order ───────────────────────────────
const ALL_STEPS = [
    {
        title: "Return Requested",
        icon: "chatbubble-outline",
        iconType: "Ionicons",
    },
    {
        title: "Return Approved",
        icon: "check-circle-outline",
        iconType: "MaterialCommunityIcons",
    },
    {
        title: "Pickup Scheduled",
        icon: "truck-outline",
        iconType: "MaterialCommunityIcons",
    },
    {
        title: "Item Picked Up",
        icon: "box-open",
        iconType: "FontAwesome5",
    },
    {
        title: "Quality Check",
        icon: "file-text-outline",
        iconType: "MaterialCommunityIcons",
    },
    {
        title: "Refund Processed",
        icon: "check-circle-outline",
        iconType: "MaterialCommunityIcons",
    },
];

// ── How many steps are "completed" per status ─────────────────
const COMPLETED_STEPS = {
    PROCESSING: 1,
    APPROVED: 2,
    PICKUP_SCHEDULED: 3,
    PICKED_UP: 4,
    QUALITY_CHECK: 5,
    COMPLETED: 6,
    REJECTED: 1,
    CANCELLED: 1,
};

const getCompletedCount = (status) =>
    COMPLETED_STEPS[status?.toUpperCase()] ?? 1;

const ReturnTimeline = ({ status = "PROCESSING", createdAt }) => {
    const completedCount = getCompletedCount(status);

    const formatDate = (iso) => {
        if (!iso) return "";
        return new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const renderIcon = (step, isCompleted) => {
        const color = isCompleted ? "#00c853" : "#94a3b8";
        const size = 18;
        if (step.iconType === "Ionicons")
            return <Ionicons name={step.icon} size={size} color={color} />;
        if (step.iconType === "FontAwesome5")
            return <FontAwesome5 name={step.icon} size={15} color={color} />;
        return (
            <MaterialCommunityIcons
                name={step.icon}
                size={size}
                color={color}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Return Timeline</Text>

            <View style={styles.timelineWrapper}>
                {ALL_STEPS.map((step, index) => {
                    const isCompleted = index < completedCount;
                    const isLast = index === ALL_STEPS.length - 1;
                    // First step shows actual date, rest show Pending if not done
                    const timeLabel =
                        index === 0 && createdAt
                            ? formatDate(createdAt)
                            : isCompleted
                              ? "Completed"
                              : "Pending";

                    return (
                        <View key={index} style={styles.milestoneRow}>
                            {/* Left: icon + vertical line */}
                            <View style={styles.iconColumn}>
                                <View
                                    style={[
                                        styles.iconCircle,
                                        {
                                            borderColor: isCompleted
                                                ? "#00c853"
                                                : "#e2e8f0",
                                            backgroundColor: isCompleted
                                                ? "#f0fff4"
                                                : "#fff",
                                        },
                                    ]}
                                >
                                    {renderIcon(step, isCompleted)}
                                </View>
                                {!isLast && (
                                    <View
                                        style={[
                                            styles.verticalLine,
                                            {
                                                backgroundColor: isCompleted
                                                    ? "#00c853"
                                                    : "#e2e8f0",
                                            },
                                        ]}
                                    />
                                )}
                            </View>

                            {/* Right: title + time */}
                            <View style={styles.textColumn}>
                                <Text
                                    style={[
                                        styles.milestoneTitle,
                                        {
                                            color: isCompleted
                                                ? "#0f172a"
                                                : "#94a3b8",
                                        },
                                    ]}
                                >
                                    {step.title}
                                </Text>
                                <Text style={styles.milestoneTime}>
                                    {timeLabel}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    timelineWrapper: { paddingLeft: 5 },
    milestoneRow: { flexDirection: "row", minHeight: 80 },
    iconColumn: { alignItems: "center", width: 45 },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    verticalLine: {
        width: 2,
        flex: 1,
        marginTop: -5,
        marginBottom: -5,
    },
    textColumn: { flex: 1, marginLeft: 15 },
    milestoneTitle: { fontSize: 14, fontWeight: "700", marginBottom: 4 },
    milestoneTime: { fontSize: 12, color: "#64748b" },
});

export default ReturnTimeline;

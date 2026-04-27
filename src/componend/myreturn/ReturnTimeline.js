import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";

const ReturnTimeline = () => {
    // Data modeled from
    const timelineData = [
        {
            title: "Return Requested",
            time: "Feb 10, 2026, 10:30 AM",
            status: "completed",
            icon: "chatbubble-outline",
            iconType: "Ionicons",
        },
        {
            title: "Return Approved",
            time: "Feb 10, 2026, 2:15 PM",
            status: "completed",
            icon: "check-circle-outline",
            iconType: "MaterialCommunityIcons",
        },
        {
            title: "Pickup Scheduled",
            time: "Feb 12, 2026",
            status: "completed",
            icon: "truck-outline",
            iconType: "MaterialCommunityIcons",
        },
        {
            title: "Item Picked Up",
            time: "Pending",
            status: "pending",
            icon: "box-open",
            iconType: "FontAwesome5",
        },
        {
            title: "Quality Check",
            time: "Pending",
            status: "pending",
            icon: "file-text-outline",
            iconType: "MaterialCommunityIcons",
        },
        {
            title: "Refund Processed",
            time: "Pending",
            status: "pending",
            icon: "check-circle-outline",
            iconType: "MaterialCommunityIcons",
        },
    ];

    const renderIcon = (item) => {
        const color = item.status === "completed" ? "#00c853" : "#94a3b8";
        const size = 18;

        if (item.iconType === "Ionicons") {
            return <Ionicons name={item.icon} size={size} color={color} />;
        } else if (item.iconType === "FontAwesome5") {
            return <FontAwesome5 name={item.icon} size={15} color={color} />;
        }
        return (
            <MaterialCommunityIcons
                name={item.icon}
                size={size}
                color={color}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Return Timeline</Text>

            <View style={styles.timelineWrapper}>
                {timelineData.map((item, index) => (
                    <View key={index} style={styles.milestoneRow}>
                        {/* Left Side: Icons and Line */}
                        <View style={styles.iconColumn}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    {
                                        borderColor:
                                            item.status === "completed"
                                                ? "#00c853"
                                                : "#e2e8f0",
                                    },
                                ]}
                            >
                                {renderIcon(item)}
                            </View>
                            {index !== timelineData.length - 1 && (
                                <View
                                    style={[
                                        styles.verticalLine,
                                        {
                                            backgroundColor:
                                                item.status === "completed"
                                                    ? "#e2e8f0"
                                                    : "#f1f5f9",
                                        },
                                    ]}
                                />
                            )}
                        </View>

                        {/* Right Side: Text Content */}
                        <View style={styles.textColumn}>
                            <Text
                                style={[
                                    styles.milestoneTitle,
                                    {
                                        color:
                                            item.status === "completed"
                                                ? "#0f172a"
                                                : "#94a3b8",
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>
                            <Text style={styles.milestoneTime}>
                                {item.time}
                            </Text>
                        </View>
                    </View>
                ))}
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
    timelineWrapper: {
        paddingLeft: 5,
    },
    milestoneRow: {
        flexDirection: "row",
        minHeight: 80,
    },
    iconColumn: {
        alignItems: "center",
        width: 45,
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 1,
    },
    verticalLine: {
        width: 2,
        flex: 1,
        marginTop: -5,
        marginBottom: -5,
    },
    textColumn: {
        flex: 1,
        marginLeft: 15,
    },
    milestoneTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 4,
    },
    milestoneTime: {
        fontSize: 12,
        color: "#64748b",
    },
});

export default ReturnTimeline;

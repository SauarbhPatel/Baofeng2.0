import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const RefundStatusTracker = () => {
    const steps = [
        { label: "Order Placed", status: "completed" },
        { label: "Order Delivered", status: "completed" },
        { label: "Refund Requested", status: "active", stepNum: "3" },
        { label: "Under Review", status: "pending", stepNum: "4" },
        { label: "Review", status: "pending", stepNum: "5" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.trackerRow}>
                    {steps.map((item, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.stepContainer}>
                                {/* Step Circle */}
                                <View
                                    style={[
                                        styles.circle,
                                        item.status === "completed" &&
                                            styles.circleCompleted,
                                        item.status === "active" &&
                                            styles.circleActive,
                                        item.status === "pending" &&
                                            styles.circlePending,
                                    ]}
                                >
                                    {item.status === "completed" ? (
                                        <Feather
                                            name="check"
                                            size={16}
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text
                                            style={[
                                                styles.stepText,
                                                item.status === "active"
                                                    ? styles.textWhite
                                                    : styles.textGray,
                                            ]}
                                        >
                                            {item.stepNum}
                                        </Text>
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.label,
                                        item.status === "pending" &&
                                            styles.labelPending,
                                    ]}
                                >
                                    {item.label.replace(" ", "\n")}
                                </Text>
                            </View>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <View
                                    style={[
                                        styles.line,
                                        item.status === "completed"
                                            ? styles.lineGreen
                                            : styles.lineGray,
                                    ]}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
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
    trackerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    stepContainer: {
        alignItems: "center",
        width: 70,
        minHeight: 90,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },
    circleCompleted: { backgroundColor: "#22c55e" },
    circleActive: { backgroundColor: "#0071bc" },
    circlePending: { backgroundColor: "#f1f5f9" },
    line: {
        flex: 1,
        height: 3,
        marginHorizontal: -15,
        marginTop: -50,
        width: 40,
    },
    lineGreen: { backgroundColor: "#22c55e" },
    lineGray: { backgroundColor: "#e2e8f0" },
    stepText: { fontSize: 14, fontWeight: "800" },
    textWhite: { color: "#fff" },
    textGray: { color: "#94a3b8" },
    label: {
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 12,
        color: "#0f172a",
    },
    labelPending: { color: "#94a3b8" },
});

export default RefundStatusTracker;

// import React from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import {
//     Ionicons,
//     MaterialCommunityIcons,
//     FontAwesome5,
// } from "@expo/vector-icons";

// const TrackingHistory = () => {
//     const historyData = [
//         {
//             title: "Order Confirmed",
//             description: "Your order has been placed successfully",
//             date: "Feb 20, 2026",
//             time: "10:30 AM",
//             status: "completed",
//             icon: <Ionicons name="checkmark-done" size={18} color="#fff" />,
//         },
//         {
//             title: "Processing",
//             description: "Your order is being prepared for shipment",
//             date: "Feb 21, 2026",
//             time: "02:15 PM",
//             status: "completed",
//             icon: <Ionicons name="checkmark-done" size={18} color="#fff" />,
//         },
//         {
//             title: "Shipped",
//             description: "Your order has been picked up by courier",
//             date: "Feb 22, 2026",
//             time: "09:45 AM",
//             status: "completed",
//             icon: <Ionicons name="checkmark-done" size={18} color="#fff" />,
//         },
//         {
//             title: "Out for Delivery",
//             description: "Package is out for delivery to your address",
//             date: "Feb 26, 2026",
//             time: "08:20 AM",
//             status: "active",
//             icon: (
//                 <MaterialCommunityIcons
//                     name="rocket-launch"
//                     size={18}
//                     color="#fff"
//                 />
//             ),
//         },
//         {
//             title: "Delivered",
//             description: "Package will be delivered to your address",
//             date: "Feb 26, 2026",
//             time: "Expected",
//             status: "pending",
//             icon: (
//                 <FontAwesome5 name="glass-cheers" size={16} color="#94a3b8" />
//             ),
//         },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 {/* <MaterialCommunityIcons
//                     name="map-marker"
//                     size={18}
//                     color="#dc2626"
//                 /> */}
//                 <Text style={styles.headerTitle}>
//                     📍 {"  "}Tracking History
//                 </Text>
//             </View>

//             <View style={styles.timelineContainer}>
//                 {historyData.map((item, index) => (
//                     <View key={index} style={styles.stepWrapper}>
//                         {/* Timeline Line */}
//                         <View style={styles.leftColumn}>
//                             <View
//                                 style={[
//                                     styles.dot,
//                                     item.status === "completed" &&
//                                         styles.dotCompleted,
//                                     item.status === "active" &&
//                                         styles.dotActive,
//                                     item.status === "pending" &&
//                                         styles.dotPending,
//                                 ]}
//                             >
//                                 {item.icon}
//                             </View>
//                             {index !== historyData.length - 1 && (
//                                 <View
//                                     style={[
//                                         styles.line,
//                                         item.status === "completed"
//                                             ? styles.lineBlue
//                                             : styles.lineGray,
//                                     ]}
//                                 />
//                             )}
//                         </View>

//                         {/* Step Content */}
//                         <View style={styles.contentColumn}>
//                             <View style={styles.textHeader}>
//                                 <Text
//                                     style={[
//                                         styles.stepTitle,
//                                         item.status === "active" &&
//                                             styles.titleActive,
//                                     ]}
//                                 >
//                                     {item.title}
//                                 </Text>
//                                 <View style={styles.dateTimeContainer}>
//                                     <Text style={styles.dateText}>
//                                         {item.date}
//                                     </Text>
//                                     <Text style={styles.timeText}>
//                                         {item.time}
//                                     </Text>
//                                 </View>
//                             </View>
//                             <Text style={styles.stepDescription}>
//                                 {item.description}
//                             </Text>
//                         </View>
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#ffffff",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//         gap: 12,
//     },
//     headerTitle: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     timelineContainer: {},
//     stepWrapper: {
//         flexDirection: "row",
//         minHeight: 50,
//     },
//     leftColumn: {
//         alignItems: "center",
//         width: 35,
//     },
//     dot: {
//         width: 35,
//         height: 35,
//         borderRadius: 22,
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 2,
//     },
//     dotCompleted: {
//         backgroundColor: "#0071bc",
//     },
//     dotActive: {
//         backgroundColor: "#f97316", // Orange for "Out for Delivery"
//     },
//     dotPending: {
//         backgroundColor: "#f1f5f9",
//     },
//     line: {
//         width: 2,
//         flex: 1,
//         marginTop: -2,
//         marginBottom: -2,
//     },
//     lineBlue: {
//         backgroundColor: "#0071bc",
//     },
//     lineGray: {
//         backgroundColor: "#e2e8f0",
//     },
//     contentColumn: {
//         flex: 1,
//         paddingLeft: 10,
//         paddingBottom: 20,
//     },
//     textHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//     },
//     stepTitle: {
//         fontSize: 14,
//         fontWeight: "800",
//         color: "#1e293b",
//         flex: 1,
//     },
//     titleActive: {
//         color: "#f97316", // Orange title
//     },
//     dateTimeContainer: {
//         alignItems: "flex-end",
//     },
//     dateText: {
//         fontSize: 12,
//         fontWeight: "700",
//         color: "#64748b",
//     },
//     timeText: {
//         fontSize: 10,
//         color: "#94a3b8",
//         marginTop: 2,
//     },
//     stepDescription: {
//         fontSize: 12,
//         color: "#64748b",
//         lineHeight: 20,
//         width: "80%",
//         marginTop: -10,
//     },
// });

// export default TrackingHistory;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons";

const TrackingHistory = ({ historyData = [] }) => {
    const renderIcon = (iconName, status, color) => {
        const size = 18;
        const c = status === "pending" ? "#94a3b8" : "#fff";
        if (iconName === "checkmark-done")
            return <Ionicons name="checkmark-done" size={size} color={c} />;
        if (iconName === "rocket-launch")
            return (
                <MaterialCommunityIcons
                    name="rocket-launch"
                    size={size}
                    color={c}
                />
            );
        if (iconName === "glass-cheers")
            return <FontAwesome5 name="glass-cheers" size={16} color={c} />;
        if (iconName === "local-shipping")
            return <MaterialIcons name="local-shipping" size={16} color={c} />;
        return <Ionicons name="checkmark-done" size={size} color={c} />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    📍 {"  "}Tracking History
                </Text>
            </View>

            <View style={styles.timelineContainer}>
                {historyData.map((item, index) => (
                    <View key={index} style={styles.stepWrapper}>
                        <View style={styles.leftColumn}>
                            <View
                                style={[
                                    styles.dot,
                                    item.status === "completed" && {
                                        backgroundColor:
                                            item.color || "#0071bc",
                                    },
                                    item.status === "active" && {
                                        backgroundColor: "#f97316",
                                    },
                                    item.status === "pending" &&
                                        styles.dotPending,
                                ]}
                            >
                                {renderIcon(
                                    item.iconName,
                                    item.status,
                                    item.color,
                                )}
                            </View>
                            {index !== historyData.length - 1 && (
                                <View
                                    style={[
                                        styles.line,
                                        item.status === "completed"
                                            ? styles.lineBlue
                                            : styles.lineGray,
                                    ]}
                                />
                            )}
                        </View>

                        <View style={styles.contentColumn}>
                            <View style={styles.textHeader}>
                                <Text
                                    style={[
                                        styles.stepTitle,
                                        item.status === "active" &&
                                            styles.titleActive,
                                    ]}
                                >
                                    {item.title}
                                </Text>
                                <View style={styles.dateTimeContainer}>
                                    <Text style={styles.dateText}>
                                        {item.date}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        {item.time}
                                    </Text>
                                </View>
                            </View>
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
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    headerTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
    timelineContainer: {},
    stepWrapper: { flexDirection: "row", minHeight: 50 },
    leftColumn: { alignItems: "center", width: 35 },
    dot: {
        width: 35,
        height: 35,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: "#0071bc",
    },
    dotPending: { backgroundColor: "#f1f5f9" },
    line: { width: 2, flex: 1, marginTop: -2, marginBottom: -2 },
    lineBlue: { backgroundColor: "#0071bc" },
    lineGray: { backgroundColor: "#e2e8f0" },
    contentColumn: { flex: 1, paddingLeft: 10, paddingBottom: 20 },
    textHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    stepTitle: { fontSize: 14, fontWeight: "800", color: "#1e293b", flex: 1 },
    titleActive: { color: "#f97316" },
    dateTimeContainer: { alignItems: "flex-end" },
    dateText: { fontSize: 12, fontWeight: "700", color: "#64748b" },
    timeText: { fontSize: 10, color: "#94a3b8", marginTop: 2 },
    stepDescription: {
        fontSize: 12,
        color: "#64748b",
        lineHeight: 20,
        width: "80%",
        marginTop: -10,
    },
});

export default TrackingHistory;

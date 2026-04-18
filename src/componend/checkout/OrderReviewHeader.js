// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const OrderReviewHeader = () => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.contentRow} activeOpacity={0.7}>
//                 <View style={styles.textContainer}>
//                     <Text style={styles.title}>Order Review</Text>
//                     <Text style={styles.subtitle}>Your Order has 3 Items</Text>
//                 </View>

//                 <MaterialCommunityIcons
//                     name="menu-down"
//                     size={32}
//                     color="#0f172a"
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     contentRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     textContainer: {
//         flex: 1,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//         marginBottom: 5,
//     },
//     subtitle: {
//         fontSize: 13,
//         color: "#475569",
//     },
// });

// export default OrderReviewHeader;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderReviewHeader = ({ orderData }) => {
    const [expanded, setExpanded] = useState(false);
    const items = orderData?.items || [];
    const itemCount = items.length;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.contentRow}
                activeOpacity={0.7}
                onPress={() => setExpanded((prev) => !prev)}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Order Review</Text>
                    <Text style={styles.subtitle}>
                        Your Order has {itemCount} Item
                        {itemCount !== 1 ? "s" : ""}
                    </Text>
                </View>
                <MaterialCommunityIcons
                    name={expanded ? "menu-up" : "menu-down"}
                    size={32}
                    color="#0f172a"
                />
            </TouchableOpacity>

            {/* Expandable items list */}
            {expanded &&
                items.map((item, i) => (
                    <View key={i} style={styles.itemRow}>
                        <Image
                            source={{ uri: item.mainImageUrl }}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={2}>
                                {item.productName}
                            </Text>
                            <Text style={styles.itemMeta}>
                                Qty: {item.quantity} × ₹
                                {item.unitPrice?.toLocaleString("en-IN")}
                            </Text>
                            <Text style={styles.itemTotal}>
                                ₹{item.lineTotal?.toLocaleString("en-IN")}
                            </Text>
                        </View>
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: { flex: 1 },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 5,
    },
    subtitle: { fontSize: 13, color: "#475569" },
    // Expanded items
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#EBF7FD",
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#f1f5f9",
    },
    itemDetails: { flex: 1 },
    itemName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
        lineHeight: 18,
        marginBottom: 4,
    },
    itemMeta: { fontSize: 12, color: "#64748b" },
    itemTotal: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0069AF",
        marginTop: 4,
    },
});

export default OrderReviewHeader;

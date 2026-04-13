import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderReviewHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contentRow} activeOpacity={0.7}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Order Review</Text>
                    <Text style={styles.subtitle}>Your Order has 3 Items</Text>
                </View>

                <MaterialCommunityIcons
                    name="menu-down"
                    size={32}
                    color="#0f172a"
                />
            </TouchableOpacity>
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
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        color: "#475569",
    },
});

export default OrderReviewHeader;

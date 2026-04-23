import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CourierDetails = ({ shipping }) => {
    const trackingNumber = "7234567890123456";

    const handleTrackingPress = () => {
        // Logic to open courier tracking website
        console.log(`Tracking number: ${trackingNumber}`);
    };

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <MaterialCommunityIcons
                    name="truck-outline"
                    size={18}
                    color="#0071bc"
                />
                <Text style={styles.headerTitle}>Courier Details</Text>
            </View>

            {/* Courier Partner */}
            <View style={styles.infoGroup}>
                <Text style={styles.label}>Courier Partner</Text>
                <Text style={styles.value}>{shipping?.shippingMethodName}</Text>
            </View>

            {/* Tracking Number */}
            <View style={styles.infoGroup}>
                <Text style={styles.label}>Tracking Number</Text>
                <TouchableOpacity onPress={handleTrackingPress}>
                    <Text style={styles.trackingValue}>Not assigned yet</Text>
                </TouchableOpacity>
            </View>

            {/* Delivery Agent */}
            <View style={styles.infoGroup}>
                <Text style={styles.label}>Delivery Agent</Text>
                <Text style={styles.value}>-</Text>
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
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    infoGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 12,
        color: "#94a3b8", // Muted slate color for labels
        marginBottom: 6,
        fontWeight: "500",
    },
    value: {
        fontSize: 14,
        fontWeight: "800", // Bold value text
        color: "#000",
    },
    trackingValue: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0071bc", // Specific blue for tracking link
        textDecorationLine: "none",
    },
});

export default CourierDetails;

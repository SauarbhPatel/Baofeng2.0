import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const PickupAddressBox = ({ pickupAddress }) => {
    const name =
        [pickupAddress?.firstName, pickupAddress?.lastName]
            .filter(Boolean)
            .join(" ") || "—";

    const address =
        [pickupAddress?.addressLine1, pickupAddress?.addressLine2]
            .filter(Boolean)
            .join(", ") || "—";

    const phone = pickupAddress?.phone || "—";

    return (
        <View style={styles.container}>
            {/* Section Header with Icon */}
            <View style={styles.header}>
                <Feather name="home" size={22} color="#0f172a" />
                <Text style={styles.title}>Pickup Address</Text>
            </View>

            {/* Address Details */}
            <View style={styles.content}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.addressText}>{address}</Text>
                <Text style={styles.phoneText}>{phone}</Text>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
    },
    content: { gap: 0 },
    nameText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1e293b",
    },
    addressText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 22,
    },
    phoneText: {
        fontSize: 14,
        color: "#64748b",
    },
});

export default PickupAddressBox;

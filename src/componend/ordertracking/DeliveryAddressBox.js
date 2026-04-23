import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const DeliveryAddressBox = ({ lable, address }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Ionicons name="location-outline" size={18} color="#0071bc" />
                <Text style={styles.headerTitle}>
                    {lable || "Delivery Address"}
                </Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.nameText}>
                    {[address?.firstName, address?.lastName].join(" ")}
                </Text>

                <Text style={styles.addressLine}>
                    {[
                        address?.addressLine1,
                        address?.addressLine2,
                        address?.area,
                    ].join(", ")}
                </Text>
                <Text style={styles.addressLine}>
                    {[
                        address?.city,
                        address?.state?.name,
                        address?.country?.name,
                        address?.postalCode,
                    ].join(", ")}
                </Text>
            </View>

            <View style={styles.contactRow}>
                <Feather name="phone" size={14} color="#94a3b8" />
                <Text style={styles.phoneText}>{address?.phone}</Text>
            </View>
            <View style={styles.contactRow}>
                <MaterialIcons name="email" size={14} color="#94a3b8" />
                <Text style={styles.phoneText}>{address?.email}</Text>
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
    addressContainer: {
        marginBottom: 15,
    },
    nameText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
    },
    addressLine: {
        fontSize: 12,
        color: "#64748b", // Slate gray for secondary text
        lineHeight: 20,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    phoneText: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "500",
    },
});

export default DeliveryAddressBox;

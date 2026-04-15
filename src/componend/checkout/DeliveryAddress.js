import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddressCard from "./AddressCard";
import AddAddress from "../../screens/form/AddAddress";

const DeliveryAddress = () => {
    const [showAdd, setShowAdd] = useState(false);

    return (
        <View style={styles.wrapper}>
            {/* Alert Header */}
            {!showAdd && (
                <>
                    {/* <View style={styles.alertRow}>
                <MaterialCommunityIcons name="star" size={18} color="#ef4444" />
                <Text style={styles.alertText}>No saved found</Text>
            </View> */}

                    {/* Main Container */}
                    <View style={styles.container}>
                        <Text style={styles.title}>Delivery Address</Text>
                        <AddressCard
                            onSelect={() => {}}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />

                        <TouchableOpacity
                            style={styles.dashedButton}
                            activeOpacity={0.7}
                            onPress={() => setShowAdd(true)}
                        >
                            <View style={styles.iconCircle}>
                                <MaterialCommunityIcons
                                    name="plus"
                                    size={20}
                                    color="#0275d8"
                                />
                            </View>
                            <Text style={styles.addText}>Add Address</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {showAdd && <AddAddress />}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    alertRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    alertText: {
        fontSize: 14,
        color: "#1e293b",
        fontWeight: "500",
    },
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    dashedButton: {
        height: 120,
        borderWidth: 1,
        borderColor: "#0275d8",
        borderStyle: "dashed",
        borderRadius: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    iconCircle: {
        width: 25,
        height: 25,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: "#0275d8",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    addText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0275d8",
    },
});

export default DeliveryAddress;

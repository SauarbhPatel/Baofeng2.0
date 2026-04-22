import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddressCard from "./AddressCard";

const DeliveryAddress = ({
    addresses = [],
    selectedAddress,
    onSelect,
    navigation,
    reLoad = () => {},
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delivery Address</Text>

            {addresses.map((addr) => (
                <AddressCard
                    key={addr._id}
                    address={addr}
                    isSelected={selectedAddress?._id === addr._id}
                    onSelect={() => onSelect(addr)}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            ))}

            {/* Add new address button */}
            <TouchableOpacity
                style={styles.dashedButton}
                activeOpacity={0.7}
                onPress={() =>
                    navigation.push("AddAddress", { onSaved: reLoad() })
                }
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
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    dashedButton: {
        height: 80,
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
        marginBottom: 6,
    },
    addText: { fontSize: 14, fontWeight: "600", color: "#0275d8" },
});

export default DeliveryAddress;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const AddressCard = ({
    name = "Alex Jhone",
    address = "Baofeng, Seyhan, Haryana",
    pincode = "203412 India",
    phone = "8976526349",
    isSelected = false,
    onSelect,
    onEdit,
    onDelete,
}) => {
    return (
        <View style={styles.cardContainer}>
            {/* Radio Selection & Name Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.radioRow}
                    onPress={onSelect}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            styles.radioButton,
                            isSelected && styles.radioSelected,
                        ]}
                    >
                        {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.nameText}>{name}</Text>
                </TouchableOpacity>

                {/* Delete Action */}
                <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
                    <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color="#ACB7D2"
                    />
                </TouchableOpacity>
            </View>

            {/* Address Details & Edit Action */}
            <View style={styles.bodyRow}>
                <View style={styles.addressInfo}>
                    <Text style={styles.addressText}>{address}</Text>
                    <Text style={styles.addressText}>{pincode}</Text>
                    <Text style={styles.addressText}>{phone}</Text>
                </View>

                {/* Edit Action */}
                <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
                    <Feather name="edit-3" size={20} color="#005fa3" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    radioRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    radioButton: {
        width: 15,
        height: 15,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
    },
    radioSelected: {
        borderColor: "#005fa3",
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: "#005fa3",
    },
    nameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
    },
    deleteBtn: {
        padding: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ACB7D2",
        backgroundColor: "#fff",
    },
    bodyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    addressInfo: {
        flex: 1,
    },
    addressText: {
        fontSize: 14,
        color: "#94a3b8",
        lineHeight: 22,
    },
    editBtn: {
        padding: 4,
    },
});

export default AddressCard;

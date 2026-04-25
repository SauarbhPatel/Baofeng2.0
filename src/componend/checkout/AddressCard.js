import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { deleteAddress } from "../../api/commonApi";

const AddressCard = ({
    address,
    isSelected = false,
    onSelect,
    onEdit,
    onDelete,
}) => {
    const name =
        address?.fullName ||
        `${address?.firstName || ""} ${address?.lastName || ""}`.trim();
    const line1 = address?.addressLine1 || "";
    const line2 = address?.addressLine2 ? `, ${address.addressLine2}` : "";
    const city = address?.city || "";
    const state = address?.state?.name || "";
    const pincode = address?.postalCode || "";
    const phone = address?.phone || "";

    const [isDeleteLoading, setDeleteLoading] = useState(false);
    // ── Delete address ────────────────────────────────────────
    const handleDelete = (item) => {
        Alert.alert("Delete Address", `Delete address for ${item.fullName}?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => confirmDelete(item),
            },
        ]);
    };

    const confirmDelete = async (item) => {
        try {
            setDeleteLoading(true);
            const res = await deleteAddress(item._id);
            setDeleteLoading(false);

            if (res?.success) {
                onDelete();
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed to delete address.",
                );
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("deleteAddress error:", err);
        }
    };

    return (
        <View style={[styles.cardContainer, isSelected && styles.cardSelected]}>
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
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(address)}
                >
                    {isDeleteLoading ? (
                        <ActivityIndicator size={20} color={"red"} />
                    ) : (
                        <MaterialCommunityIcons
                            name="delete-outline"
                            size={20}
                            color="#ACB7D2"
                        />
                    )}
                </TouchableOpacity>
            </View>

            {/* Address Details & Edit */}
            <View style={styles.bodyRow}>
                <View style={styles.addressInfo}>
                    <Text style={styles.addressText}>
                        {line1}
                        {line2}
                    </Text>
                    <Text style={styles.addressText}>
                        {city}, {state} — {pincode}
                    </Text>
                    <Text style={styles.addressText}>{phone}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
                    <Feather name="edit-3" size={20} color="#005fa3" />
                </TouchableOpacity>
            </View>

            {/* Default badge */}
            {address?.isDefault && (
                <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        marginBottom: 15,
    },
    cardSelected: { borderColor: "#005fa3", backgroundColor: "#f0f7ff" },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    radioRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    radioButton: {
        width: 15,
        height: 15,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
    },
    radioSelected: { borderColor: "#005fa3" },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: "#005fa3",
    },
    nameText: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
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
        marginTop: 6,
    },
    addressInfo: { flex: 1 },
    addressText: { fontSize: 14, color: "#94a3b8", lineHeight: 22 },
    editBtn: { padding: 4 },
    defaultBadge: {
        marginTop: 8,
        alignSelf: "flex-start",
        backgroundColor: "#dbeafe",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    defaultText: { fontSize: 11, color: "#1d4ed8", fontWeight: "600" },
});

export default AddressCard;

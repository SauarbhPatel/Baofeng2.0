import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddAddress = () => {
    const [addressType, setAddressType] = useState("Home");

    const RadioButton = ({ label }) => (
        <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setAddressType(label)}
        >
            <View
                style={[
                    styles.radioCircle,
                    addressType === label && styles.radioSelected,
                ]}
            >
                {addressType === label && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.title}>Billing Address</Text>

            {/* Address Type Selection */}
            <View style={styles.typeSelectorCard}>
                <View style={styles.radioRow}>
                    <RadioButton label="Home" />
                    <RadioButton label="Office" />
                    <RadioButton label="Other" />
                </View>
                <View style={[styles.radioRow, { marginBottom: 0 }]}>
                    <RadioButton label="Billing" />
                    <RadioButton label="Delivery" />
                    <RadioButton label="Both" />
                </View>
            </View>

            {/* Input Fields Stack */}
            <View style={styles.formContainer}>
                <AddressInput placeholder="First Name" />
                <AddressInput placeholder="Last Name" />
                <AddressInput
                    placeholder=""
                    multiline
                    style={{ height: 100 }}
                />
                <AddressInput placeholder="Zip/Postal Code" />
                <AddressInput placeholder="City" />

                {/* Dropdown Style Input */}
                <TouchableOpacity style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="State/Province"
                        editable={false}
                    />
                    <Ionicons name="chevron-down" size={20} color="#64748b" />
                </TouchableOpacity>

                <AddressInput placeholder="Country" />
                <AddressInput placeholder="GST Number(Optional)" />
                <AddressInput placeholder="Email (Optional)" />
                <AddressInput placeholder="GST Number(Optional)" />
                <AddressInput placeholder="Email (Optional)" />
                <AddressInput
                    placeholder="Mobile Number Of Delivery Receiver"
                    keyboardType="phone-pad"
                />
            </View>
        </ScrollView>
    );
};

// Reusable Input Component
const AddressInput = ({ placeholder, style, ...props }) => (
    <View style={[styles.inputWrapper, style]}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            {...props}
        />
    </View>
);

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
    content: {},
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    typeSelectorCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        marginBottom: 20,
    },
    radioRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        gap: 15,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        minWidth: 80,
    },
    radioCircle: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    radioSelected: { borderColor: "#0070c0" },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#0070c0",
    },
    radioLabel: { fontSize: 13, color: "#334155", fontWeight: "500" },
    formContainer: { gap: 15 },
    inputWrapper: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        paddingHorizontal: 15,
        height: 55,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: "#1e293b",
    },
});

export default AddAddress;

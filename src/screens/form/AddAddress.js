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
import { SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";

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
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.title}>Add Address</Text>

                    {/* Input Fields Stack */}
                    <View style={styles.formContainer}>
                        <AddressInput
                            title={"First name *"}
                            // placeholder="First Name"
                        />
                        <AddressInput
                            title={"Last name *"}
                            // placeholder="First Name"
                        />
                        <AddressInput
                            title={"Phone *"}
                            keyboardType="phone-pad"
                        />
                        <AddressInput
                            title={"Email"}
                            // placeholder="First Name"
                        />
                        <View>
                            <Text style={styles.label}>Select Country *</Text>
                            <TouchableOpacity style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                />
                                <Ionicons
                                    name="chevron-down"
                                    size={20}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.label}>Select State *</Text>
                            <TouchableOpacity style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                />
                                <Ionicons
                                    name="chevron-down"
                                    size={20}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.label}>Select City *</Text>
                            <TouchableOpacity style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                />
                                <Ionicons
                                    name="chevron-down"
                                    size={20}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                        <AddressInput title={"Area"} />

                        <AddressInput title="Address line 1 *" />
                        <AddressInput title="Address line 2" />
                        <AddressInput title="Zip/Postal Code " />
                        <AddressInput title="GST number" />

                        <View style={styles.typeSelectorCard}>
                            <View style={styles.radioRow}>
                                <RadioButton label="Set as default address" />
                            </View>
                            <View
                                style={[styles.radioRow, { marginBottom: 0 }]}
                            >
                                <RadioButton label="Also save as billing address" />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.updateButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.updateButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Reusable Input Component
const AddressInput = ({ title, placeholder, style, ...props }) => (
    <View>
        {title && <Text style={styles.label}>{title}</Text>}
        <View style={[styles.inputWrapper, style]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                {...props}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    content: {
        paddingTop: 15,
    },
    card: {
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
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#94a3b8",
        marginBottom: 8,
    },
    inputWrapper: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#0f172a",
    },
    updateButton: {
        backgroundColor: "#0064a3",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    updateButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default AddAddress;

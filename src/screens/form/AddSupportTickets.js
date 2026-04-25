import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    FlatList,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import { SkeletonBox } from "../../componend/common/SkeletonLoader";
import {
    getCountries,
    getStatesByCountry,
    checkPincode,
    createAddress,
} from "../../api/commonApi";

// ── Dropdown Modal ─────────────────────────────────────────────
const DropdownModal = ({
    visible,
    onClose,
    title,
    data,
    onSelect,
    keyField = "_id",
    labelField = "name",
}) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#64748b" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item[keyField]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text style={styles.modalItemText}>
                                {item[labelField]}
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={16}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    </Modal>
);

const AddSupportTickets = ({ navigation, route }) => {
    const onSaved = route?.params?.onSaved;

    // ── Form state ─────────────────────────────────────────────
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        area: "",
        city: "",
        postalCode: "",
        gstNumber: "",
    });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [isDefault, setIsDefault] = useState(false);
    const [alsoSaveAsBilling, setAlsoSaveAsBilling] = useState(true);

    // ── Data state ─────────────────────────────────────────────
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);

    // ── Pincode state ──────────────────────────────────────────
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeResult, setPincodeResult] = useState(null);

    // ── UI state ───────────────────────────────────────────────
    const [countryModal, setCountryModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const setField = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>Open Ticket</Text>

                        <View style={styles.formContainer}>
                            {/* Name Row */}
                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <FormField
                                        label="Name *"
                                        value={form.firstName}
                                        onChangeText={(v) =>
                                            setField("firstName", v)
                                        }
                                        placeholder=""
                                    />
                                </View>
                                {/* <View style={{ flex: 1 }}>
                                    <FormField
                                        label="Last Name"
                                        value={form.lastName}
                                        onChangeText={(v) =>
                                            setField("lastName", v)
                                        }
                                        placeholder=""
                                    />
                                </View> */}
                            </View>
                            <FormField
                                label="Email *"
                                value={form.email}
                                onChangeText={(v) => setField("email", v)}
                                placeholder=""
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <FormField
                                label="Phone *"
                                value={form.phone}
                                onChangeText={(v) => setField("phone", v)}
                                placeholder=""
                                keyboardType="phone-pad"
                                maxLength={10}
                            />

                            <FormField
                                label="Subject"
                                value={form.email}
                                onChangeText={(v) => setField("email", v)}
                                placeholder=""
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* Country Dropdown */}
                            <View>
                                <Text style={styles.label}>Department *</Text>
                                {loadingCountries ? (
                                    <SkeletonBox
                                        width="100%"
                                        height={50}
                                        borderRadius={12}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => setCountryModal(true)}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownText,
                                                !selectedCountry &&
                                                    styles.placeholder,
                                            ]}
                                        >
                                            {selectedCountry?.name ||
                                                "Select department"}
                                        </Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={20}
                                            color="#64748b"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View>
                                <Text style={styles.label}>
                                    Related Service *
                                </Text>
                                {loadingStates ? (
                                    <SkeletonBox
                                        width="100%"
                                        height={50}
                                        borderRadius={12}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdown,
                                            !selectedCountry &&
                                                styles.dropdownDisabled,
                                        ]}
                                        onPress={() =>
                                            selectedCountry &&
                                            setStateModal(true)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownText,
                                                !selectedState &&
                                                    styles.placeholder,
                                            ]}
                                        >
                                            {selectedState?.name ||
                                                (selectedCountry
                                                    ? "Select Related Service"
                                                    : "Select Related Service")}
                                        </Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={20}
                                            color="#64748b"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {/* State Dropdown */}
                            <View>
                                <Text style={styles.label}>Priority *</Text>
                                {loadingStates ? (
                                    <SkeletonBox
                                        width="100%"
                                        height={50}
                                        borderRadius={12}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdown,
                                            !selectedCountry &&
                                                styles.dropdownDisabled,
                                        ]}
                                        onPress={() =>
                                            selectedCountry &&
                                            setStateModal(true)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownText,
                                                !selectedState &&
                                                    styles.placeholder,
                                            ]}
                                        >
                                            {selectedState?.name ||
                                                (selectedCountry
                                                    ? "Select Priority"
                                                    : "Select Priority")}
                                        </Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={20}
                                            color="#64748b"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <FormField
                                label="Message"
                                value={form.addressLine2}
                                onChangeText={(v) =>
                                    setField("addressLine2", v)
                                }
                                placeholder=""
                                multiline={true}
                                numberOfLines={6}
                            />

                            {/* Options */}
                            <View style={styles.optionsCard}>
                                <View
                                    style={{
                                        backgroundColor: "#E0F2FE",
                                        padding: 12,
                                        paddingHorizontal: 16,
                                        borderRadius: 10,
                                        alignSelf: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#0284C7",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Choose File
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                saving && styles.btnDisabled,
                            ]}
                            // onPress={handleSave}
                            disabled={saving}
                            activeOpacity={0.8}
                        >
                            {saving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    Submit
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Country Modal */}
            <DropdownModal
                visible={countryModal}
                onClose={() => setCountryModal(false)}
                title="Select Country"
                data={countries}
                // onSelect={handleCountrySelect}
            />

            {/* State Modal */}
            <DropdownModal
                visible={stateModal}
                onClose={() => setStateModal(false)}
                title="Select State"
                data={states}
                // onSelect={setSelectedState}
            />
        </SafeAreaView>
    );
};

// ── Reusable components ────────────────────────────────────────
const FormField = ({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    ...rest
}) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.inputWrapper, multiline && { height: 120 }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            multiline={multiline}
            {...rest}
        />
    </View>
);

const CheckRow = ({ label, checked, onToggle }) => (
    <TouchableOpacity style={styles.checkRow} onPress={onToggle}>
        <View style={[styles.checkBox, checked && styles.checkBoxActive]}>
            {checked && <Ionicons name="checkmark" size={13} color="#fff" />}
        </View>
        <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    content: { paddingTop: 15, paddingBottom: 30 },
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
        marginBottom: 20,
    },
    formContainer: { gap: 16 },
    row: { flexDirection: "row", gap: 10 },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#94a3b8",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    inputWrapper: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#0f172a",
        fontWeight: "500",
    },
    dropdown: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownDisabled: { opacity: 0.5 },
    dropdownText: { fontSize: 15, color: "#0f172a", fontWeight: "500" },
    placeholder: { color: "#94a3b8" },
    pincodeRow: { flexDirection: "row", alignItems: "center" },
    pincodeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
    },
    badgeSuccess: {
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    badgeFail: {
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    pincodeText: { fontSize: 12, fontWeight: "600", flex: 1 },
    optionsCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        gap: 12,
        borderStyle: "dashed",
    },
    checkRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
    },
    checkBoxActive: { backgroundColor: "#0069AF", borderColor: "#0069AF" },
    checkLabel: { fontSize: 14, color: "#334155", fontWeight: "500", flex: 1 },
    saveButton: {
        backgroundColor: "#0064a3",
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    btnDisabled: { opacity: 0.6 },
    saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "60%",
        paddingBottom: 30,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    modalTitle: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
    modalItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalItemText: { fontSize: 15, color: "#1e293b", fontWeight: "500" },
    separator: { height: 1, backgroundColor: "#f1f5f9", marginHorizontal: 20 },
});

export default AddSupportTickets;

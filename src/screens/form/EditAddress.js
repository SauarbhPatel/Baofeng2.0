import React, { useEffect, useState } from "react";
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
    SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";
import { SkeletonBox } from "../../componend/common/SkeletonLoader";
import {
    getCountries,
    getStatesByCountry,
    updateAddress,
    checkPincode,
} from "../../api/commonApi";

// ─────────────────────────────────────────────────────────────
// Dropdown modal — reused for Country & State pickers
// ─────────────────────────────────────────────────────────────
const DropdownModal = ({ visible, onClose, title, data, onSelect }) => (
    <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
    >
        <View style={styles.dropOverlay}>
            <View style={styles.dropSheet}>
                <View style={styles.dropHeader}>
                    <Text style={styles.dropTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={22} color="#64748b" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropItem}
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text style={styles.dropItemText}>{item.name}</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={16}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.dropSep} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    </Modal>
);

// ─────────────────────────────────────────────────────────────
// Reusable labeled text input
// ─────────────────────────────────────────────────────────────
const FormField = ({
    label,
    value,
    onChangeText,
    placeholder = "",
    ...rest
}) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            {...rest}
        />
    </View>
);

// ─────────────────────────────────────────────────────────────
// EditAddress screen
//
// Route params expected:
//   address  — the full address object to pre-fill
//   onSaved  — callback fired after a successful update
// ─────────────────────────────────────────────────────────────
const EditAddress = ({ navigation, route }) => {
    const { address, onSaved } = route?.params || {};

    // ── Form state ──────────────────────────────────────────
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

    // ── Data state ──────────────────────────────────────────
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [loadingStates, setLoadingStates] = useState(false);

    // ── Picker visibility ───────────────────────────────────
    const [countryModal, setCountryModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);

    // ── Save state ──────────────────────────────────────────
    const [saving, setSaving] = useState(false);

    // ── Pincode check state ─────────────────────────────────
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeResult, setPincodeResult] = useState(null);

    const handlePincodeCheck = async (pin) => {
        if (pin.length !== 6) return;
        try {
            setPincodeLoading(true);
            setPincodeResult(null);
            const res = await checkPincode(pin);
            if (res?.success) setPincodeResult(res.data);
        } catch {
            // silent fail
        } finally {
            setPincodeLoading(false);
        }
    };

    // ── Pre-fill from route param ───────────────────────────
    useEffect(() => {
        if (!address) return;
        setForm({
            firstName: address.firstName || "",
            lastName: address.lastName || "",
            phone: address.phone || "",
            email: address.email || "",
            addressLine1: address.addressLine1 || "",
            addressLine2: address.addressLine2 || "",
            area: address.area || "",
            city: address.city || "",
            postalCode: address.postalCode || "",
            gstNumber: address.gstNumber || "",
        });
        // Pre-select country & state stored on the address
        if (address.country) {
            setSelectedCountry({
                _id: address.country.countryId,
                name: address.country.name,
            });
        }
        if (address.state) {
            setSelectedState({
                _id: address.state.stateId,
                name: address.state.name,
            });
        }
    }, [address]);

    // ── Fetch countries on mount ────────────────────────────
    useEffect(() => {
        fetchCountries();
    }, []);

    // When a country is already pre-selected, also fetch its states
    useEffect(() => {
        if (address.country.countryId) {
            fetchStates(address.country.countryId);
        }
        if (address.postalCode) {
            handlePincodeCheck(address.postalCode);
        }
    }, [address]);

    const fetchCountries = async () => {
        try {
            setLoadingCountries(true);
            const res = await getCountries();
            if (res?.success && res?.data?.records) {
                setCountries(res.data.records);
            }
        } catch (err) {
            console.error("fetchCountries error:", err);
        } finally {
            setLoadingCountries(false);
        }
    };

    const fetchStates = async (countryId) => {
        try {
            setLoadingStates(true);
            const res = await getStatesByCountry(countryId);
            if (res?.success && Array.isArray(res?.data)) {
                setStates(res.data);
            }
        } catch (err) {
            console.error("fetchStates error:", err);
        } finally {
            setLoadingStates(false);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setSelectedState(null);
        setStates([]);
        fetchStates(country._id);
    };

    const setField = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // ── Validate & submit ───────────────────────────────────
    const handleSave = async () => {
        if (!form.firstName.trim())
            return Alert.alert("Required", "Please enter first name.");
        if (!form.phone.trim())
            return Alert.alert("Required", "Please enter phone number.");
        if (!form.addressLine1.trim())
            return Alert.alert("Required", "Please enter address line 1.");
        if (!form.city.trim())
            return Alert.alert("Required", "Please enter city.");
        if (!selectedCountry)
            return Alert.alert("Required", "Please select a country.");
        if (!selectedState)
            return Alert.alert("Required", "Please select a state.");
        if (!form.postalCode.trim())
            return Alert.alert("Required", "Please enter postal code.");

        try {
            setSaving(true);
            const payload = {
                addressData: {
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim(),
                    addressLine1: form.addressLine1.trim(),
                    addressLine2: form.addressLine2.trim(),
                    area: form.area.trim(),
                    city: form.city.trim(),
                    state: {
                        stateId: selectedState._id,
                        name: selectedState.name,
                    },
                    country: {
                        countryId: selectedCountry._id,
                        name: selectedCountry.name,
                    },
                    postalCode: form.postalCode.trim(),
                    gstNumber: form.gstNumber.trim(),
                    addressType: address?.addressType || "SHIPPING",
                    isDefault: address?.isDefault || false,
                },
                alsoSaveAsBilling: false,
            };

            const res = await updateAddress(address._id, payload);

            if (res?.success) {
                Alert.alert("Updated ✓", "Address updated successfully.", [
                    {
                        text: "OK",
                        onPress: () => {
                            onSaved?.();
                            navigation.goBack();
                        },
                    },
                ]);
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed to update address.",
                );
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("updateAddress error:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        <Text style={styles.screenTitle}>Edit Address</Text>

                        <View style={styles.formContainer}>
                            {/* ── Name row ── */}
                            <View style={styles.nameRow}>
                                <View style={{ flex: 1 }}>
                                    <FormField
                                        label="First Name *"
                                        value={form.firstName}
                                        onChangeText={(v) =>
                                            setField("firstName", v)
                                        }
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <FormField
                                        label="Last Name"
                                        value={form.lastName}
                                        onChangeText={(v) =>
                                            setField("lastName", v)
                                        }
                                    />
                                </View>
                            </View>

                            <FormField
                                label="Phone *"
                                value={form.phone}
                                onChangeText={(v) => setField("phone", v)}
                                keyboardType="phone-pad"
                            />

                            <FormField
                                label="Email"
                                value={form.email}
                                onChangeText={(v) => setField("email", v)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* ── Country ── */}
                            <View>
                                <Text style={styles.label}>Country *</Text>
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
                                                "Select country"}
                                        </Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={20}
                                            color="#64748b"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* ── State ── */}
                            <View>
                                <Text style={styles.label}>State *</Text>
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
                                            !selectedCountry && {
                                                opacity: 0.5,
                                            },
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
                                                    ? "Select state"
                                                    : "Select country first")}
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
                                label="City *"
                                value={form.city}
                                onChangeText={(v) => setField("city", v)}
                            />

                            <FormField
                                label="Area"
                                value={form.area}
                                onChangeText={(v) => setField("area", v)}
                            />

                            <FormField
                                label="Address Line 1 *"
                                value={form.addressLine1}
                                onChangeText={(v) =>
                                    setField("addressLine1", v)
                                }
                            />

                            <FormField
                                label="Address Line 2"
                                value={form.addressLine2}
                                onChangeText={(v) =>
                                    setField("addressLine2", v)
                                }
                            />

                            {/* ── Postal Code + serviceability check ── */}
                            <View>
                                <Text style={styles.label}>
                                    Zip / Postal Code *
                                </Text>
                                <View style={styles.pincodeRow}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { flex: 1, marginRight: 8 },
                                        ]}
                                        value={form.postalCode}
                                        onChangeText={(v) => {
                                            setField("postalCode", v);
                                            setPincodeResult(null);
                                            if (v.length === 6)
                                                handlePincodeCheck(v);
                                        }}
                                        placeholder="560066"
                                        placeholderTextColor="#94a3b8"
                                        keyboardType="number-pad"
                                        maxLength={6}
                                    />
                                    {pincodeLoading && (
                                        <ActivityIndicator
                                            size="small"
                                            color="#0069AF"
                                        />
                                    )}
                                </View>
                                {pincodeResult && (
                                    <View
                                        style={[
                                            styles.pincodeBadge,
                                            pincodeResult.serviceable
                                                ? styles.badgeSuccess
                                                : styles.badgeFail,
                                        ]}
                                    >
                                        <Feather
                                            name={
                                                pincodeResult.serviceable
                                                    ? "check-circle"
                                                    : "x-circle"
                                            }
                                            size={14}
                                            color={
                                                pincodeResult.serviceable
                                                    ? "#16a34a"
                                                    : "#dc2626"
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.pincodeText,
                                                {
                                                    color: pincodeResult.serviceable
                                                        ? "#16a34a"
                                                        : "#dc2626",
                                                },
                                            ]}
                                        >
                                            {pincodeResult.serviceable
                                                ? `Delivery available${pincodeResult.codAllowed ? " · COD allowed" : " · Prepaid only"}`
                                                : "Delivery not available for this pincode"}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <FormField
                                label="GST Number (optional)"
                                value={form.gstNumber}
                                onChangeText={(v) => setField("gstNumber", v)}
                                autoCapitalize="characters"
                            />
                        </View>

                        {/* ── Save button ── */}
                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                saving && styles.btnDisabled,
                                !pincodeResult?.serviceable &&
                                    styles.btnDisabled,
                            ]}
                            onPress={handleSave}
                            disabled={!pincodeResult?.serviceable || saving}
                            activeOpacity={0.8}
                        >
                            {saving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    Save Changes
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Country picker */}
            <DropdownModal
                visible={countryModal}
                onClose={() => setCountryModal(false)}
                title="Select Country"
                data={countries}
                onSelect={handleCountrySelect}
            />

            {/* State picker */}
            <DropdownModal
                visible={stateModal}
                onClose={() => setStateModal(false)}
                title="Select State"
                data={states}
                onSelect={setSelectedState}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    scrollContent: { paddingTop: 15, paddingBottom: 30 },

    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },

    screenTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 20,
    },

    formContainer: { gap: 16 },

    nameRow: { flexDirection: "row", gap: 10 },

    // ── Field label + input ─────────────────────────────────
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#94a3b8",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    input: {
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

    // ── Dropdown trigger ────────────────────────────────────
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
    // ── Save button ─────────────────────────────────────────
    saveButton: {
        backgroundColor: "#0064a3",
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    btnDisabled: { opacity: 0.6 },
    saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },

    // ── Dropdown modal ──────────────────────────────────────
    dropOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    dropSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "60%",
        paddingBottom: 30,
    },
    dropHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    dropTitle: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
    dropItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    dropItemText: { fontSize: 15, color: "#1e293b", fontWeight: "500" },
    dropSep: { height: 1, backgroundColor: "#f1f5f9", marginHorizontal: 20 },
});

export default EditAddress;

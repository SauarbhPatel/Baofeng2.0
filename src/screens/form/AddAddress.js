// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     ScrollView,
//     TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native";
// import MainHeader from "../../componend/common/MainHeader";

// const AddAddress = () => {
//     const [addressType, setAddressType] = useState("Home");

//     const RadioButton = ({ label }) => (
//         <TouchableOpacity
//             style={styles.radioContainer}
//             onPress={() => setAddressType(label)}
//         >
//             <View
//                 style={[
//                     styles.radioCircle,
//                     addressType === label && styles.radioSelected,
//                 ]}
//             >
//                 {addressType === label && <View style={styles.radioInner} />}
//             </View>
//             <Text style={styles.radioLabel}>{label}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />

//             <ScrollView contentContainerStyle={styles.content}>
//                 <View style={styles.card}>
//                     <Text style={styles.title}>Add Address</Text>

//                     {/* Input Fields Stack */}
//                     <View style={styles.formContainer}>
//                         <AddressInput
//                             title={"First name *"}
//                             // placeholder="First Name"
//                         />
//                         <AddressInput
//                             title={"Last name *"}
//                             // placeholder="First Name"
//                         />
//                         <AddressInput
//                             title={"Phone *"}
//                             keyboardType="phone-pad"
//                         />
//                         <AddressInput
//                             title={"Email"}
//                             // placeholder="First Name"
//                         />
//                         <View>
//                             <Text style={styles.label}>Select Country *</Text>
//                             <TouchableOpacity style={styles.inputWrapper}>
//                                 <TextInput
//                                     style={styles.input}
//                                     editable={false}
//                                 />
//                                 <Ionicons
//                                     name="chevron-down"
//                                     size={20}
//                                     color="#64748b"
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View>
//                             <Text style={styles.label}>Select State *</Text>
//                             <TouchableOpacity style={styles.inputWrapper}>
//                                 <TextInput
//                                     style={styles.input}
//                                     editable={false}
//                                 />
//                                 <Ionicons
//                                     name="chevron-down"
//                                     size={20}
//                                     color="#64748b"
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <AddressInput
//                             title={"City *"}
//                             // placeholder="First Name"
//                         />
//                         <AddressInput title={"Area"} />

//                         <AddressInput title="Address line 1 *" />
//                         <AddressInput title="Address line 2" />
//                         <AddressInput title="Zip/Postal Code " />
//                         <AddressInput title="GST number" />

//                         <View style={styles.typeSelectorCard}>
//                             <View style={styles.radioRow}>
//                                 <RadioButton label="Set as default address" />
//                             </View>
//                             <View
//                                 style={[styles.radioRow, { marginBottom: 0 }]}
//                             >
//                                 <RadioButton label="Also save as billing address" />
//                             </View>
//                         </View>
//                     </View>
//                     <TouchableOpacity
//                         style={styles.updateButton}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={styles.updateButtonText}>Save</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// // Reusable Input Component
// const AddressInput = ({ title, placeholder, style, ...props }) => (
//     <View>
//         {title && <Text style={styles.label}>{title}</Text>}
//         <View style={[styles.inputWrapper, style]}>
//             <TextInput
//                 style={styles.input}
//                 placeholder={placeholder}
//                 placeholderTextColor="#94a3b8"
//                 {...props}
//             />
//         </View>
//     </View>
// );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
//     content: {
//         paddingTop: 15,
//     },
//     card: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//         marginBottom: 15,
//     },
//     typeSelectorCard: {
//         backgroundColor: "#fff",
//         borderRadius: 15,
//         padding: 15,
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         marginBottom: 20,
//     },
//     radioRow: {
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         marginBottom: 10,
//         gap: 15,
//     },
//     radioContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         minWidth: 80,
//     },
//     radioCircle: {
//         height: 18,
//         width: 18,
//         borderRadius: 9,
//         borderWidth: 1.5,
//         borderColor: "#cbd5e1",
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 8,
//     },
//     radioSelected: { borderColor: "#0070c0" },
//     radioInner: {
//         height: 10,
//         width: 10,
//         borderRadius: 5,
//         backgroundColor: "#0070c0",
//     },
//     radioLabel: { fontSize: 13, color: "#334155", fontWeight: "500" },
//     formContainer: { gap: 15 },
//     label: {
//         fontSize: 12,
//         fontWeight: "600",
//         color: "#94a3b8",
//         marginBottom: 8,
//     },
//     inputWrapper: {
//         height: 50,
//         backgroundColor: "#ffffff",
//         borderWidth: 1.5,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         paddingHorizontal: 15,
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     input: {
//         flex: 1,
//         fontSize: 16,
//         color: "#0f172a",
//     },
//     updateButton: {
//         backgroundColor: "#0064a3",
//         height: 50,
//         borderRadius: 12,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },
//     updateButtonText: {
//         color: "#ffffff",
//         fontSize: 15,
//         fontWeight: "700",
//     },
// });

// export default AddAddress;

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

const AddAddress = ({ navigation, route }) => {
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
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [loadingStates, setLoadingStates] = useState(false);

    // ── Pincode state ──────────────────────────────────────────
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeResult, setPincodeResult] = useState(null);

    // ── UI state ───────────────────────────────────────────────
    const [countryModal, setCountryModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [saving, setSaving] = useState(false);

    // ── Fetch countries on mount ───────────────────────────────
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            setLoadingCountries(true);
            const res = await getCountries();
            if (res?.success && res?.data?.records) {
                setCountries(res.data.records);
                // Auto-select if only one country
                if (res.data.records.length === 1) {
                    handleCountrySelect(res.data.records[0]);
                }
            }
        } catch (err) {
            console.error("fetchCountries error:", err);
        } finally {
            setLoadingCountries(false);
        }
    };

    const handleCountrySelect = async (country) => {
        setSelectedCountry(country);
        setSelectedState(null);
        setStates([]);
        try {
            setLoadingStates(true);
            const res = await getStatesByCountry(country._id);
            if (res?.success && Array.isArray(res?.data)) {
                setStates(res.data);
            }
        } catch (err) {
            console.error("fetchStates error:", err);
        } finally {
            setLoadingStates(false);
        }
    };

    // ── Pincode check ──────────────────────────────────────────
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

    const setField = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // ── Validate & Save ────────────────────────────────────────
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
                    phone: "+91" + form.phone.trim(),
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
                    addressType: route?.params?.addressType,
                    isDefault,
                },
                alsoSaveAsBilling,
            };

            console.log(payload);

            const res = await createAddress(payload);
            if (res?.success) {
                Alert.alert("Saved ✓", "Address saved successfully.", [
                    {
                        text: "OK",
                        onPress: () => {
                            onSaved?.();
                            navigation.goBack();
                        },
                    },
                ]);
            } else {
                Alert.alert("Error", res?.message || "Failed to save address.");
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("createAddress error:", err);
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
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>Add Address</Text>

                        <View style={styles.formContainer}>
                            {/* Name Row */}
                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <FormField
                                        label="First Name *"
                                        value={form.firstName}
                                        onChangeText={(v) =>
                                            setField("firstName", v)
                                        }
                                        placeholder=""
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <FormField
                                        label="Last Name"
                                        value={form.lastName}
                                        onChangeText={(v) =>
                                            setField("lastName", v)
                                        }
                                        placeholder=""
                                    />
                                </View>
                            </View>

                            <FormField
                                label="Phone *"
                                value={form.phone}
                                onChangeText={(v) => setField("phone", v)}
                                placeholder=""
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                            <FormField
                                label="Email"
                                value={form.email}
                                onChangeText={(v) => setField("email", v)}
                                placeholder=""
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* Country Dropdown */}
                            <View>
                                <Text style={styles.label}>
                                    Select Country *
                                </Text>
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

                            {/* State Dropdown */}
                            <View>
                                <Text style={styles.label}>Select State *</Text>
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
                                placeholder=""
                            />
                            <FormField
                                label="Area"
                                value={form.area}
                                onChangeText={(v) => setField("area", v)}
                                placeholder=""
                            />
                            <FormField
                                label="Address Line 1 *"
                                value={form.addressLine1}
                                onChangeText={(v) =>
                                    setField("addressLine1", v)
                                }
                                placeholder=""
                            />
                            <FormField
                                label="Address Line 2"
                                value={form.addressLine2}
                                onChangeText={(v) =>
                                    setField("addressLine2", v)
                                }
                                placeholder=""
                            />

                            {/* Postal Code with inline check */}
                            <View>
                                <Text style={styles.label}>
                                    Zip / Postal Code *
                                </Text>
                                <View style={styles.pincodeRow}>
                                    <TextInput
                                        style={[
                                            styles.inputWrapper,
                                            { flex: 1, marginRight: 8 },
                                        ]}
                                        value={form.postalCode}
                                        onChangeText={(v) => {
                                            setField("postalCode", v);
                                            setPincodeResult(null);
                                            if (v.length === 6)
                                                handlePincodeCheck(v);
                                        }}
                                        placeholder=""
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
                                placeholder=""
                                autoCapitalize="characters"
                            />

                            {/* Options */}
                            <View style={styles.optionsCard}>
                                <CheckRow
                                    label="Set as default address"
                                    checked={isDefault}
                                    onToggle={() => setIsDefault(!isDefault)}
                                />
                                <CheckRow
                                    label={`Also save as ${route?.params?.addressType.toLocaleLowerCase()} address`}
                                    checked={alsoSaveAsBilling}
                                    onToggle={() =>
                                        setAlsoSaveAsBilling(!alsoSaveAsBilling)
                                    }
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                saving && styles.btnDisabled,
                            ]}
                            onPress={handleSave}
                            disabled={saving}
                            activeOpacity={0.8}
                        >
                            {saving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    Save Address
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
                onSelect={handleCountrySelect}
            />

            {/* State Modal */}
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

// ── Reusable components ────────────────────────────────────────
const FormField = ({ label, value, onChangeText, placeholder, ...rest }) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.inputWrapper}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
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
        borderColor: "#e2e8f0",
        gap: 12,
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

export default AddAddress;

// import React from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
// } from "react-native";
// import MainHeader from "../../componend/common/MainHeader";

// const EditAccountScreen = () => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <MainHeader bgColor="#ffffff" />
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 {/* Main Card Container */}
//                 <View style={styles.card}>
//                     <Text style={styles.headerTitle}>Edit Account</Text>

//                     {/* Form Fields */}
//                     <View style={styles.formGroup}>
//                         <Text style={styles.label}>First Name</Text>
//                         <TextInput style={styles.input} placeholder="" />
//                     </View>

//                     <View style={styles.formGroup}>
//                         <Text style={styles.label}>Last Name</Text>
//                         <TextInput style={styles.input} placeholder="" />
//                     </View>

//                     <View style={styles.formGroup}>
//                         <Text style={styles.label}>Email Address</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder=""
//                             keyboardType="email-address"
//                         />
//                     </View>

//                     <View style={styles.formGroup}>
//                         <Text style={styles.label}>Your Phone</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder=""
//                             keyboardType="phone-pad"
//                         />
//                     </View>

//                     {/* Update Information Button */}
//                     <TouchableOpacity
//                         style={styles.updateButton}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={styles.updateButtonText}>
//                             Update Information
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#D7E9F2",
//     },
//     scrollContent: {
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
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//         marginBottom: 15,
//     },
//     formGroup: {
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 12,
//         fontWeight: "600",
//         color: "#94a3b8",
//         marginBottom: 8,
//     },
//     input: {
//         height: 50,
//         backgroundColor: "#ffffff",
//         borderWidth: 1.5,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         paddingHorizontal: 15,
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

// export default EditAccountScreen;

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainHeader from "../../componend/common/MainHeader";
import { getConsumerProfile, updateConsumerProfile } from "../../api/commonApi";

const AUTH_USER_KEY = "baofeng_auth_user";

const EditAccountScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        alternateMobile: "",
    });

    // ── Fetch profile on mount ─────────────────────────────────
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await getConsumerProfile();
            if (res?.success && res?.data) {
                const { firstName, lastName, email, phoneNumber } = res.data;
                setForm({
                    firstName: firstName || "",
                    lastName: lastName || "",
                    email: email || "",
                    alternateMobile: phoneNumber || "",
                });
            }
        } catch (err) {
            console.error("fetchProfile error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // ── Submit update ──────────────────────────────────────────
    const handleSubmit = async () => {
        if (!form.firstName.trim() && !form.lastName.trim()) {
            Alert.alert(
                "Validation",
                "Please enter at least a first or last name.",
            );
            return;
        }
        try {
            setSaving(true);
            const res = await updateConsumerProfile({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                alternateMobile: form.alternateMobile.trim(),
            });

            if (res?.success && res?.data) {
                // Update locally stored user so ProfileDetails stays fresh
                const stored = await AsyncStorage.getItem(AUTH_USER_KEY);
                const user = stored ? JSON.parse(stored) : {};
                await AsyncStorage.setItem(
                    AUTH_USER_KEY,
                    JSON.stringify({
                        ...user,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                    }),
                );
                Alert.alert("Saved ✓", "Your profile has been updated.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed to update. Try again.",
                );
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("updateProfile error:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
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
                        <Text style={styles.headerTitle}>Edit Account</Text>

                        {loading ? (
                            <View style={styles.loaderBox}>
                                <ActivityIndicator
                                    size="large"
                                    color="#0069AF"
                                />
                                <Text style={styles.loadingText}>
                                    Loading profile...
                                </Text>
                            </View>
                        ) : (
                            <>
                                <FormField
                                    label="First Name"
                                    value={form.firstName}
                                    onChangeText={(v) =>
                                        handleChange("firstName", v)
                                    }
                                    placeholder="Enter first name"
                                />
                                <FormField
                                    label="Last Name"
                                    value={form.lastName}
                                    onChangeText={(v) =>
                                        handleChange("lastName", v)
                                    }
                                    placeholder="Enter last name"
                                />
                                <FormField
                                    label="Email Address"
                                    value={form.email}
                                    onChangeText={(v) =>
                                        handleChange("email", v)
                                    }
                                    placeholder="Enter email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <FormField
                                    label="Your Phone"
                                    value={form.alternateMobile}
                                    onChangeText={(v) =>
                                        handleChange("alternateMobile", v)
                                    }
                                    placeholder="Enter Your Phone"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.updateButton,
                                        saving && styles.btnDisabled,
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={saving}
                                    activeOpacity={0.8}
                                >
                                    {saving ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.updateButtonText}>
                                            Update Information
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// ── Reusable field ─────────────────────────────────────────────
const FormField = ({ label, value, onChangeText, placeholder, ...rest }) => (
    <View style={styles.formGroup}>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 20,
    },
    loaderBox: { alignItems: "center", paddingVertical: 40, gap: 12 },
    loadingText: { fontSize: 14, color: "#64748b" },
    formGroup: { marginBottom: 16 },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#94a3b8",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    input: {
        height: 52,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#0f172a",
        fontWeight: "500",
    },
    updateButton: {
        backgroundColor: "#0064a3",
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    btnDisabled: { opacity: 0.6 },
    updateButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
});

export default EditAccountScreen;

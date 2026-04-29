// import React, { useState, useEffect } from "react";
// import {
//     StyleSheet,
//     ScrollView,
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Modal,
//     FlatList,
//     ActivityIndicator,
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
// } from "react-native";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";
// import MainHeader from "../../componend/common/MainHeader";
// import { createSupportTicket, uploadFilesToS3 } from "../../api/commonApi";

// const AUTH_USER_KEY = "baofeng_auth_user";

// const DEPARTMENTS = [
//     { label: "Support", value: "SUPPORT" },
//     { label: "Billing", value: "BILLING" },
//     { label: "Technical", value: "TECHNICAL" },
// ];
// const PRIORITIES = [
//     { label: "High", value: "HIGH" },
//     { label: "Medium", value: "MEDIUM" },
//     { label: "Low", value: "LOW" },
// ];

// // ── Dropdown Modal ─────────────────────────────────────────────
// const DropdownModal = ({
//     visible,
//     onClose,
//     title,
//     items,
//     selected,
//     onSelect,
// }) => (
//     <Modal
//         visible={visible}
//         transparent
//         animationType="fade"
//         onRequestClose={onClose}
//     >
//         <View style={s.modalOverlay}>
//             <View style={s.modalSheet}>
//                 <View style={s.modalHeader}>
//                     <Text style={s.modalTitle}>{title}</Text>
//                     <TouchableOpacity onPress={onClose}>
//                         <Ionicons name="close" size={24} color="#64748b" />
//                     </TouchableOpacity>
//                 </View>
//                 <FlatList
//                     data={items}
//                     keyExtractor={(item) => item.value}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity
//                             style={s.modalItem}
//                             onPress={() => {
//                                 onSelect(item);
//                                 onClose();
//                             }}
//                         >
//                             <Text style={s.modalItemText}>{item.label}</Text>
//                             {selected === item.value && (
//                                 <Ionicons
//                                     name="checkmark"
//                                     size={18}
//                                     color="#0069AF"
//                                 />
//                             )}
//                         </TouchableOpacity>
//                     )}
//                     ItemSeparatorComponent={() => <View style={s.separator} />}
//                 />
//             </View>
//         </View>
//     </Modal>
// );

// // ── Label + field wrapper ──────────────────────────────────────
// const Field = ({ label, children }) => (
//     <View style={s.fieldWrap}>
//         <Text style={s.label}>{label}</Text>
//         {children}
//     </View>
// );

// const AddSupportTickets = ({ navigation, route }) => {
//     const onSaved = route?.params?.onSaved;

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//         department: "",
//         priority: "",
//     });
//     const [deptModal, setDeptModal] = useState(false);
//     const [prioModal, setPrioModal] = useState(false);
//     const [attachment, setAttachment] = useState(null); // { name, uri, type }
//     const [uploading, setUploading] = useState(false);
//     const [saving, setSaving] = useState(false);

//     // ── Load user from AsyncStorage ────────────────────────────
//     useEffect(() => {
//         (async () => {
//             try {
//                 const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
//                 if (!raw) return;
//                 const user = JSON.parse(raw);
//                 const fullName = [user.firstName, user.lastName]
//                     .filter(Boolean)
//                     .join(" ");
//                 setForm((p) => ({
//                     ...p,
//                     name: fullName || p.name,
//                     email: user.email || p.email,
//                     phone: user.phoneNumber || p.phone,
//                 }));
//             } catch {}
//         })();
//     }, []);

//     const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

//     // ── Pick file / image ──────────────────────────────────────
//     const pickFile = async () => {
//         Alert.alert("Attach File", "Choose source", [
//             {
//                 text: "Camera",
//                 onPress: async () => {
//                     const { status } =
//                         await ImagePicker.requestCameraPermissionsAsync();
//                     if (status !== "granted")
//                         return Alert.alert("Permission denied");
//                     const res = await ImagePicker.launchCameraAsync({
//                         quality: 0.8,
//                     });
//                     if (!res.canceled && res.assets?.[0]) {
//                         const a = res.assets[0];
//                         setAttachment({
//                             uri: a.uri,
//                             name: a.fileName || "photo.jpg",
//                             type: a.mimeType || "image/jpeg",
//                         });
//                     }
//                 },
//             },
//             {
//                 text: "Gallery",
//                 onPress: async () => {
//                     const { status } =
//                         await ImagePicker.requestMediaLibraryPermissionsAsync();
//                     if (status !== "granted")
//                         return Alert.alert("Permission denied");
//                     const res = await ImagePicker.launchImageLibraryAsync({
//                         quality: 0.8,
//                     });
//                     if (!res.canceled && res.assets?.[0]) {
//                         const a = res.assets[0];
//                         setAttachment({
//                             uri: a.uri,
//                             name: a.fileName || "photo.jpg",
//                             type: a.mimeType || "image/jpeg",
//                         });
//                     }
//                 },
//             },
//             {
//                 text: "Document",
//                 onPress: async () => {
//                     const res = await DocumentPicker.getDocumentAsync({
//                         type: "*/*",
//                         copyToCacheDirectory: true,
//                     });
//                     if (!res.canceled && res.assets?.[0]) {
//                         const a = res.assets[0];
//                         setAttachment({
//                             uri: a.uri,
//                             name: a.name,
//                             type: a.mimeType,
//                         });
//                     }
//                 },
//             },
//             { text: "Cancel", style: "cancel" },
//         ]);
//     };

//     // ── Upload attachment → return filename ────────────────────
//     const uploadAttachment = async () => {
//         if (!attachment) return "";
//         try {
//             setUploading(true);
//             const fd = new FormData();
//             fd.append("files", {
//                 uri: attachment.uri,
//                 name: attachment.name,
//                 type: attachment.type,
//             });
//             const res = await uploadFilesToS3(fd);
//             if (res?.success && res?.data?.[0]) return res.data[0];
//             return "";
//         } catch {
//             return "";
//         } finally {
//             setUploading(false);
//         }
//     };

//     // ── Validate & Submit ──────────────────────────────────────
//     const handleSubmit = async () => {
//         if (!form.name.trim())
//             return Alert.alert("Required", "Name is required.");
//         if (!form.subject.trim())
//             return Alert.alert("Required", "Subject is required.");
//         if (!form.message.trim())
//             return Alert.alert("Required", "Message is required.");
//         if (!form.department)
//             return Alert.alert("Required", "Please select a department.");
//         if (!form.priority)
//             return Alert.alert("Required", "Please select a priority.");

//         try {
//             setSaving(true);
//             const docUrl = await uploadAttachment();
//             const payload = {
//                 name: form.name.trim(),
//                 email: form.email.trim(),
//                 phone: form.phone.trim(),
//                 subject: form.subject.trim(),
//                 department: form.department,
//                 priority: form.priority,
//                 message: form.message.trim(),
//                 document: docUrl,
//                 status: "OPEN",
//             };
//             const res = await createSupportTicket(payload);
//             if (res?.success) {
//                 Alert.alert(
//                     "Success ✓",
//                     `Ticket ${res.data?.ticketNumber} created.`,
//                     [
//                         {
//                             text: "OK",
//                             onPress: () => {
//                                 onSaved?.();
//                                 navigation.goBack();
//                             },
//                         },
//                     ],
//                 );
//             } else {
//                 Alert.alert(
//                     "Error",
//                     res?.message || "Failed to create ticket.",
//                 );
//             }
//         } catch {
//             Alert.alert("Error", "Network error. Please try again.");
//         } finally {
//             setSaving(false);
//         }
//     };

//     const selectedDept = DEPARTMENTS.find((d) => d.value === form.department);
//     const selectedPrio = PRIORITIES.find((p) => p.value === form.priority);

//     return (
//         <SafeAreaView style={s.container}>
//             <MainHeader bgColor="#ffffff" navigation={navigation} />
//             {/* <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : undefined}
//                 style={{ flex: 1 }}
//             > */}
//             <ScrollView
//                 contentContainerStyle={s.content}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={s.card}>
//                     <Text style={s.cardTitle}>Open Ticket</Text>

//                     {/* Name */}
//                     <Field label="Your Name">
//                         <TextInput
//                             style={s.input}
//                             value={form.name}
//                             onChangeText={(v) => set("name", v)}
//                             placeholder="Full name"
//                             placeholderTextColor="#94a3b8"
//                         />
//                     </Field>

//                     {/* Email + Phone row */}
//                     <View style={s.row}>
//                         <View style={{ flex: 1 }}>
//                             <Field label="Email">
//                                 <TextInput
//                                     style={s.input}
//                                     value={form.email}
//                                     onChangeText={(v) => set("email", v)}
//                                     placeholder="Email"
//                                     keyboardType="email-address"
//                                     autoCapitalize="none"
//                                     placeholderTextColor="#94a3b8"
//                                 />
//                             </Field>
//                         </View>
//                         <View style={{ flex: 1 }}>
//                             <Field label="Phone">
//                                 <TextInput
//                                     style={s.input}
//                                     value={form.phone}
//                                     onChangeText={(v) => set("phone", v)}
//                                     placeholder="Phone"
//                                     keyboardType="phone-pad"
//                                     placeholderTextColor="#94a3b8"
//                                 />
//                             </Field>
//                         </View>
//                     </View>

//                     {/* Subject */}
//                     <Field label="Subject">
//                         <TextInput
//                             style={s.input}
//                             value={form.subject}
//                             onChangeText={(v) => set("subject", v)}
//                             placeholder="Brief description of the issue"
//                             placeholderTextColor="#94a3b8"
//                         />
//                     </Field>

//                     {/* Department + Priority row */}
//                     <View style={s.row}>
//                         <View style={{ flex: 1 }}>
//                             <Field label="Department">
//                                 <TouchableOpacity
//                                     style={s.dropdown}
//                                     onPress={() => setDeptModal(true)}
//                                 >
//                                     <Text
//                                         style={[
//                                             s.dropdownText,
//                                             !form.department && s.placeholder,
//                                         ]}
//                                     >
//                                         {selectedDept?.label || "Select"}
//                                     </Text>
//                                     <Feather
//                                         name="chevron-down"
//                                         size={16}
//                                         color="#94a3b8"
//                                     />
//                                 </TouchableOpacity>
//                             </Field>
//                         </View>
//                         <View style={{ flex: 1 }}>
//                             <Field label="Priority">
//                                 <TouchableOpacity
//                                     style={s.dropdown}
//                                     onPress={() => setPrioModal(true)}
//                                 >
//                                     <Text
//                                         style={[
//                                             s.dropdownText,
//                                             !form.priority && s.placeholder,
//                                         ]}
//                                     >
//                                         {selectedPrio?.label || "Select"}
//                                     </Text>
//                                     <Feather
//                                         name="chevron-down"
//                                         size={16}
//                                         color="#94a3b8"
//                                     />
//                                 </TouchableOpacity>
//                             </Field>
//                         </View>
//                     </View>

//                     {/* Message */}
//                     <Field label="Message">
//                         <TextInput
//                             style={s.textarea}
//                             value={form.message}
//                             onChangeText={(v) => set("message", v)}
//                             placeholder="Describe your issue in detail..."
//                             placeholderTextColor="#94a3b8"
//                             multiline
//                             numberOfLines={5}
//                             textAlignVertical="top"
//                         />
//                     </Field>

//                     {/* Attachment */}
//                     <Field label="Attachment (optional)">
//                         {attachment ? (
//                             <View style={s.attachedRow}>
//                                 <Feather
//                                     name="paperclip"
//                                     size={14}
//                                     color="#0069AF"
//                                 />
//                                 <Text style={s.attachedName} numberOfLines={1}>
//                                     {attachment.name}
//                                 </Text>
//                                 <TouchableOpacity
//                                     onPress={() => setAttachment(null)}
//                                 >
//                                     <Feather
//                                         name="x"
//                                         size={16}
//                                         color="#ef4444"
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         ) : (
//                             <TouchableOpacity
//                                 style={s.attachBtn}
//                                 onPress={pickFile}
//                             >
//                                 <Feather
//                                     name="upload"
//                                     size={16}
//                                     color="#0069AF"
//                                 />
//                                 <Text style={s.attachBtnText}>
//                                     Upload File / Image
//                                 </Text>
//                             </TouchableOpacity>
//                         )}
//                     </Field>

//                     {/* Submit */}
//                     <TouchableOpacity
//                         style={[
//                             s.submitBtn,
//                             (saving || uploading) && s.btnDisabled,
//                         ]}
//                         onPress={handleSubmit}
//                         disabled={saving || uploading}
//                         activeOpacity={0.85}
//                     >
//                         {saving || uploading ? (
//                             <ActivityIndicator size="small" color="#fff" />
//                         ) : (
//                             <>
//                                 <Feather name="send" size={16} color="#fff" />
//                                 <Text style={s.submitBtnText}>
//                                     Submit Ticket
//                                 </Text>
//                             </>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//             {/* </KeyboardAvoidingView> */}

//             <DropdownModal
//                 visible={deptModal}
//                 onClose={() => setDeptModal(false)}
//                 title="Select Department"
//                 items={DEPARTMENTS}
//                 selected={form.department}
//                 onSelect={(item) => set("department", item.value)}
//             />
//             <DropdownModal
//                 visible={prioModal}
//                 onClose={() => setPrioModal(false)}
//                 title="Select Priority"
//                 items={PRIORITIES}
//                 selected={form.priority}
//                 onSelect={(item) => set("priority", item.value)}
//             />
//         </SafeAreaView>
//     );
// };

// const s = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#D7E9F2" },
//     content: { paddingTop: 15, paddingBottom: 30 },
//     card: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 16,
//         marginHorizontal: 10,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     cardTitle: {
//         fontSize: 20,
//         fontWeight: "800",
//         color: "#0f172a",
//         marginBottom: 20,
//     },
//     row: { flexDirection: "row", gap: 10 },
//     fieldWrap: { marginBottom: 16 },
//     label: {
//         fontSize: 11,
//         fontWeight: "700",
//         color: "#94a3b8",
//         letterSpacing: 0.5,
//         marginBottom: 8,
//         textTransform: "uppercase",
//     },
//     input: {
//         height: 50,
//         backgroundColor: "#fff",
//         borderWidth: 1.5,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         paddingHorizontal: 14,
//         fontSize: 14,
//         color: "#0f172a",
//         fontWeight: "500",
//     },
//     dropdown: {
//         height: 50,
//         backgroundColor: "#fff",
//         borderWidth: 1.5,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         paddingHorizontal: 14,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//     },
//     dropdownText: { fontSize: 14, color: "#0f172a", fontWeight: "500" },
//     placeholder: { color: "#94a3b8" },
//     textarea: {
//         minHeight: 120,
//         backgroundColor: "#fff",
//         borderWidth: 1.5,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         padding: 14,
//         fontSize: 14,
//         color: "#0f172a",
//         fontWeight: "500",
//     },
//     attachBtn: {
//         height: 50,
//         backgroundColor: "#EFF9FF",
//         borderRadius: 12,
//         borderWidth: 1.5,
//         borderColor: "#B0E0FD",
//         borderStyle: "dashed",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 8,
//     },
//     attachBtnText: { fontSize: 14, fontWeight: "600", color: "#0069AF" },
//     attachedRow: {
//         height: 50,
//         backgroundColor: "#EFF9FF",
//         borderRadius: 12,
//         borderWidth: 1.5,
//         borderColor: "#B0E0FD",
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 14,
//         gap: 8,
//     },
//     attachedName: {
//         flex: 1,
//         fontSize: 13,
//         color: "#0069AF",
//         fontWeight: "600",
//     },
//     submitBtn: {
//         height: 52,
//         backgroundColor: "#0069AF",
//         borderRadius: 14,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 8,
//         marginTop: 6,
//     },
//     btnDisabled: { opacity: 0.6 },
//     submitBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

//     // Modal
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.45)",
//         justifyContent: "flex-end",
//     },
//     modalSheet: {
//         backgroundColor: "#fff",
//         borderTopLeftRadius: 24,
//         borderTopRightRadius: 24,
//         maxHeight: "60%",
//         paddingBottom: 30,
//     },
//     modalHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: "#f1f5f9",
//     },
//     modalTitle: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
//     modalItem: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//     },
//     modalItemText: { fontSize: 15, color: "#1e293b", fontWeight: "500" },
//     separator: { height: 1, backgroundColor: "#f1f5f9", marginHorizontal: 20 },
// });

// export default AddSupportTickets;

import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import MainHeader from "../../componend/common/MainHeader";
import {
    createSupportTicket,
    updateSupportTicket,
    uploadFilesToS3,
} from "../../api/commonApi";

const AUTH_USER_KEY = "baofeng_auth_user";

const DEPARTMENTS = [
    { label: "Support", value: "SUPPORT" },
    { label: "Billing", value: "BILLING" },
    { label: "Technical", value: "TECHNICAL" },
];
const PRIORITIES = [
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
];
const STATUSES = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Closed", value: "CLOSED" },
];

// ── Dropdown Modal ─────────────────────────────────────────────
const DropdownModal = ({
    visible,
    onClose,
    title,
    items,
    selected,
    onSelect,
}) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={s.modalOverlay}>
            <View style={s.modalSheet}>
                <View style={s.modalHeader}>
                    <Text style={s.modalTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#64748b" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={s.modalItem}
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text style={s.modalItemText}>{item.label}</Text>
                            {selected === item.value && (
                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color="#0069AF"
                                />
                            )}
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={s.separator} />}
                />
            </View>
        </View>
    </Modal>
);

const Field = ({ label, children }) => (
    <View style={s.fieldWrap}>
        <Text style={s.label}>{label}</Text>
        {children}
    </View>
);

const AddSupportTickets = ({ navigation, route }) => {
    // ── Edit vs Create mode ────────────────────────────────────
    const ticket = route?.params?.ticket || null; // passed for edit
    const onSaved = route?.params?.onSaved || null;
    const isEdit = !!ticket;

    const [form, setForm] = useState({
        name: ticket?.name || "",
        email: ticket?.email || "",
        phone: ticket?.phone || "",
        subject: ticket?.subject || route?.params?.subject || "",
        message: ticket?.message || route?.params?.message || "",
        department: ticket?.department || "",
        priority: ticket?.priority || "",
        status: ticket?.status || "OPEN",
    });

    const [deptModal, setDeptModal] = useState(false);
    const [prioModal, setPrioModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    // ── Auto-fill user from AsyncStorage (create mode only) ───
    useEffect(() => {
        if (isEdit) return; // edit: data comes from ticket
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
                if (!raw) return;
                const user = JSON.parse(raw);
                const fullName = [user.firstName, user.lastName]
                    .filter(Boolean)
                    .join(" ");
                setForm((p) => ({
                    ...p,
                    name: fullName || p.name,
                    email: user.email || p.email,
                    phone: user.phoneNumber || p.phone,
                }));
            } catch {}
        })();
    }, []);

    const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

    // ── Pick file ──────────────────────────────────────────────
    const pickFile = async () => {
        Alert.alert("Attach File", "Choose source", [
            {
                text: "Camera",
                onPress: async () => {
                    const { status } =
                        await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== "granted")
                        return Alert.alert("Permission denied");
                    const res = await ImagePicker.launchCameraAsync({
                        quality: 0.8,
                    });
                    if (!res.canceled && res.assets?.[0]) {
                        const a = res.assets[0];
                        setAttachment({
                            uri: a.uri,
                            name: a.fileName || "photo.jpg",
                            type: a.mimeType || "image/jpeg",
                        });
                    }
                },
            },
            {
                text: "Gallery",
                onPress: async () => {
                    const { status } =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted")
                        return Alert.alert("Permission denied");
                    const res = await ImagePicker.launchImageLibraryAsync({
                        quality: 0.8,
                    });
                    if (!res.canceled && res.assets?.[0]) {
                        const a = res.assets[0];
                        setAttachment({
                            uri: a.uri,
                            name: a.fileName || "photo.jpg",
                            type: a.mimeType || "image/jpeg",
                        });
                    }
                },
            },
            {
                text: "Document",
                onPress: async () => {
                    const res = await DocumentPicker.getDocumentAsync({
                        type: "*/*",
                        copyToCacheDirectory: true,
                    });
                    if (!res.canceled && res.assets?.[0]) {
                        const a = res.assets[0];
                        setAttachment({
                            uri: a.uri,
                            name: a.name,
                            type: a.mimeType,
                        });
                    }
                },
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    // ── Upload → return filename ───────────────────────────────
    const uploadAttachment = async () => {
        if (!attachment) return ticket?.document || "";
        try {
            setUploading(true);
            const fd = new FormData();
            fd.append("files", {
                uri: attachment.uri,
                name: attachment.name,
                type: attachment.type,
            });
            const res = await uploadFilesToS3(fd);
            if (res?.success && res?.data?.[0]) return res.data[0];
            return ticket?.document || "";
        } catch {
            return ticket?.document || "";
        } finally {
            setUploading(false);
        }
    };

    // ── Submit ─────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!form.name.trim())
            return Alert.alert("Required", "Name is required.");
        if (!form.subject.trim())
            return Alert.alert("Required", "Subject is required.");
        if (!form.message.trim())
            return Alert.alert("Required", "Message is required.");
        if (!form.department)
            return Alert.alert("Required", "Please select a department.");
        if (!form.priority)
            return Alert.alert("Required", "Please select a priority.");

        try {
            setSaving(true);
            const docUrl = await uploadAttachment();

            const payload = {
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                subject: form.subject.trim(),
                department: form.department,
                priority: form.priority,
                message: form.message.trim(),
                document: docUrl,
                status: form.status,
            };

            let res;
            if (isEdit) {
                res = await updateSupportTicket(ticket._id, payload);
            } else {
                payload.status = "OPEN";
                res = await createSupportTicket(payload);
            }

            if (res?.success) {
                const ticketNum =
                    res.data?.ticketNumber || ticket?.ticketNumber || "";
                Alert.alert(
                    isEdit ? "Updated ✓" : "Created ✓",
                    `Ticket ${ticketNum} ${isEdit ? "updated" : "created"} successfully.`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                onSaved?.();
                                if (route?.params?.from == "OrderScreen") {
                                    return navigation.replace("SupportTickets");
                                }

                                navigation.goBack();
                            },
                        },
                    ],
                );
            } else {
                Alert.alert("Error", res?.message || "Something went wrong.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const selectedDept = DEPARTMENTS.find((d) => d.value === form.department);
    const selectedPrio = PRIORITIES.find((p) => p.value === form.priority);
    const selectedStatus = STATUSES.find((s) => s.value === form.status);

    return (
        <SafeAreaView style={s.container}>
            <MainHeader bgColor="#ffffff" navigation={navigation} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={s.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={s.card}>
                        {/* Title changes based on mode */}
                        <Text style={s.cardTitle}>
                            {isEdit ? "Edit Ticket" : "New Support Ticket"}
                        </Text>
                        {isEdit && (
                            <Text style={s.ticketNumLabel}>
                                {ticket.ticketNumber}
                            </Text>
                        )}

                        {/* Name */}
                        <Field label="Your Name">
                            <TextInput
                                style={s.input}
                                value={form.name}
                                onChangeText={(v) => set("name", v)}
                                placeholder="Full name"
                                placeholderTextColor="#94a3b8"
                            />
                        </Field>

                        {/* Email + Phone */}
                        <View style={s.row}>
                            <View style={{ flex: 1 }}>
                                <Field label="Email">
                                    <TextInput
                                        style={s.input}
                                        value={form.email}
                                        onChangeText={(v) => set("email", v)}
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </Field>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field label="Phone">
                                    <TextInput
                                        style={s.input}
                                        value={form.phone}
                                        onChangeText={(v) => set("phone", v)}
                                        placeholder="Phone"
                                        keyboardType="phone-pad"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </Field>
                            </View>
                        </View>

                        {/* Subject */}
                        <Field label="Subject">
                            <TextInput
                                style={s.input}
                                value={form.subject}
                                onChangeText={(v) => set("subject", v)}
                                placeholder="Brief description of the issue"
                                placeholderTextColor="#94a3b8"
                            />
                        </Field>

                        {/* Department + Priority */}
                        <View style={s.row}>
                            <View style={{ flex: 1 }}>
                                <Field label="Department">
                                    <TouchableOpacity
                                        style={s.dropdown}
                                        onPress={() => setDeptModal(true)}
                                    >
                                        <Text
                                            style={[
                                                s.dropdownText,
                                                !form.department &&
                                                    s.placeholder,
                                            ]}
                                        >
                                            {selectedDept?.label || "Select"}
                                        </Text>
                                        <Feather
                                            name="chevron-down"
                                            size={16}
                                            color="#94a3b8"
                                        />
                                    </TouchableOpacity>
                                </Field>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Field label="Priority">
                                    <TouchableOpacity
                                        style={s.dropdown}
                                        onPress={() => setPrioModal(true)}
                                    >
                                        <Text
                                            style={[
                                                s.dropdownText,
                                                !form.priority && s.placeholder,
                                            ]}
                                        >
                                            {selectedPrio?.label || "Select"}
                                        </Text>
                                        <Feather
                                            name="chevron-down"
                                            size={16}
                                            color="#94a3b8"
                                        />
                                    </TouchableOpacity>
                                </Field>
                            </View>
                        </View>

                        {/* Message */}
                        <Field label="Message">
                            <TextInput
                                style={s.textarea}
                                value={form.message}
                                onChangeText={(v) => set("message", v)}
                                placeholder="Describe your issue in detail..."
                                placeholderTextColor="#94a3b8"
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                            />
                        </Field>

                        {/* Attachment */}
                        <Field label="Attachment (optional)">
                            {attachment ? (
                                <View style={s.attachedRow}>
                                    <Feather
                                        name="paperclip"
                                        size={14}
                                        color="#0069AF"
                                    />
                                    <Text
                                        style={s.attachedName}
                                        numberOfLines={1}
                                    >
                                        {attachment.name}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setAttachment(null)}
                                    >
                                        <Feather
                                            name="x"
                                            size={16}
                                            color="#ef4444"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={s.attachBtn}
                                    onPress={pickFile}
                                >
                                    <Feather
                                        name="upload"
                                        size={16}
                                        color="#0069AF"
                                    />
                                    <Text style={s.attachBtnText}>
                                        {isEdit && ticket?.document
                                            ? `Replace: ${ticket.document}`
                                            : "Upload File / Image"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </Field>

                        {/* Submit */}
                        <TouchableOpacity
                            style={[
                                s.submitBtn,
                                isEdit && s.submitBtnEdit,
                                (saving || uploading) && s.btnDisabled,
                            ]}
                            onPress={handleSubmit}
                            disabled={saving || uploading}
                            activeOpacity={0.85}
                        >
                            {saving || uploading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <Feather
                                        name={isEdit ? "check" : "send"}
                                        size={16}
                                        color="#fff"
                                    />
                                    <Text style={s.submitBtnText}>
                                        {isEdit
                                            ? "Save Changes"
                                            : "Submit Ticket"}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <DropdownModal
                visible={deptModal}
                onClose={() => setDeptModal(false)}
                title="Select Department"
                items={DEPARTMENTS}
                selected={form.department}
                onSelect={(item) => set("department", item.value)}
            />
            <DropdownModal
                visible={prioModal}
                onClose={() => setPrioModal(false)}
                title="Select Priority"
                items={PRIORITIES}
                selected={form.priority}
                onSelect={(item) => set("priority", item.value)}
            />
            <DropdownModal
                visible={statusModal}
                onClose={() => setStatusModal(false)}
                title="Select Status"
                items={STATUSES}
                selected={form.status}
                onSelect={(item) => set("status", item.value)}
            />
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D7E9F2" },
    content: { paddingTop: 15, paddingBottom: 30 },
    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 16,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 4,
    },
    ticketNumLabel: {
        fontSize: 13,
        color: "#0069AF",
        fontWeight: "700",
        marginBottom: 20,
    },
    row: { flexDirection: "row", gap: 10 },
    fieldWrap: { marginBottom: 16 },
    label: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 8,
        textTransform: "uppercase",
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#0f172a",
        fontWeight: "500",
    },
    dropdown: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownText: { fontSize: 14, color: "#0f172a", fontWeight: "500" },
    placeholder: { color: "#94a3b8" },
    textarea: {
        minHeight: 120,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: "#0f172a",
        fontWeight: "500",
    },
    attachBtn: {
        height: 50,
        backgroundColor: "#EFF9FF",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#B0E0FD",
        borderStyle: "dashed",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    attachBtnText: { fontSize: 13, fontWeight: "600", color: "#0069AF" },
    attachedRow: {
        height: 50,
        backgroundColor: "#EFF9FF",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#B0E0FD",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 8,
    },
    attachedName: {
        flex: 1,
        fontSize: 13,
        color: "#0069AF",
        fontWeight: "600",
    },
    submitBtn: {
        height: 52,
        backgroundColor: "#0069AF",
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 6,
    },
    submitBtnEdit: { backgroundColor: "#059669" }, // green for save
    btnDisabled: { opacity: 0.6 },
    submitBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
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
        paddingVertical: 16,
    },
    modalItemText: { fontSize: 15, color: "#1e293b", fontWeight: "500" },
    separator: { height: 1, backgroundColor: "#f1f5f9", marginHorizontal: 20 },
});

export default AddSupportTickets;

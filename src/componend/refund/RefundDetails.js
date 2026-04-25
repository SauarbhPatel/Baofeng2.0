// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
// } from "react-native";
// import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// const RefundDetails = () => {
//     const [selectedMethod, setSelectedMethod] = useState("Original Card");

//     const methods = [
//         { id: "Bank Transfer", icon: "🏦", sub: "2-4 business days" },
//         { id: "UPI / Wallet", icon: "📱", sub: "Within 24 hours" },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.headerRow}>
//                 {/* <Text style={styles.headerEmoji}>📝</Text> */}
//                 <Text style={styles.headerTitle}>📝 {"  "}Refund Details</Text>
//             </View>

//             {/* Return Policy Info Box */}
//             <View style={styles.policyBox}>
//                 <View style={styles.blueAccent} />
//                 <Text style={styles.policyText}>
//                     <Text style={styles.boldBlue}>Return Policy: </Text>
//                     We accept returns within{" "}
//                     <Text style={styles.boldBlue}>7 days</Text> of delivery.
//                     Items must be unused, in original packaging. Full refund
//                     will be processed within{" "}
//                     <Text style={styles.boldBlue}>3-5 business days</Text> after
//                     item inspection.
//                 </Text>
//             </View>

//             {/* Form Fields */}
//             {/* Return , Exchange */}
//             <View style={styles.fieldGroup}>
//                 <Text style={styles.label}>Select Type *</Text>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.placeholderText}>Select type</Text>
//                     <Feather name="chevron-down" size={20} color="#94a3b8" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.fieldGroup}>
//                 <Text style={styles.label}>Reason for Refund *</Text>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.placeholderText}>Select a reason</Text>
//                     <Feather name="chevron-down" size={20} color="#94a3b8" />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.fieldGroup}>
//                 <Text style={styles.label}>Describe the issue *</Text>
//                 <TextInput
//                     style={styles.textArea}
//                     placeholder="Please describe the issue in detail to help us process your refund faster..."
//                     multiline
//                     numberOfLines={4}
//                 />
//             </View>

//             {/* Media Uploader */}
//             <View style={styles.fieldGroup}>
//                 <Text style={styles.label}>
//                     Upload Photos / Video (optional)
//                 </Text>
//                 <TouchableOpacity style={styles.uploadBox}>
//                     <Text style={styles.headerEmoji}>📸</Text>

//                     <Text style={styles.uploadText}>
//                         Drag & drop files or{" "}
//                         <Text style={styles.browseText}>Browse</Text>
//                     </Text>
//                     <Text style={styles.uploadSubText}>
//                         JPG, PNG, MP4 up to 20MB
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Refund Methods Grid */}
//             <Text style={styles.label}>Refund Method *</Text>
//             <View style={styles.methodGrid}>
//                 {methods.map((method) => (
//                     <TouchableOpacity
//                         key={method.id}
//                         onPress={() => setSelectedMethod(method.id)}
//                         style={[
//                             styles.methodCard,
//                             selectedMethod === method.id &&
//                                 styles.activeMethodCard,
//                         ]}
//                     >
//                         <Text style={styles.headerEmoji}>{method.icon}</Text>
//                         <Text style={styles.methodTitle}>{method.id}</Text>
//                         <Text style={styles.methodSub}>{method.sub}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>

//             {/* Action Buttons */}
//             <TouchableOpacity style={styles.submitBtn}>
//                 <MaterialCommunityIcons name="restore" size={20} color="#fff" />
//                 <Text style={styles.submitBtnText}>Submit Refund Request</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.cancelBtn}>
//                 <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#FFFFFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//     headerEmoji: { fontSize: 20, marginRight: 10 },
//     headerTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
//     policyBox: {
//         backgroundColor: "#f0f7ff",
//         borderRadius: 12,
//         flexDirection: "row",
//         // padding: 16,
//         marginBottom: 25,
//     },
//     blueAccent: {
//         width: 3,
//         backgroundColor: "#0071bc",
//         // marginRight: 12,
//         borderRadius: 2,
//     },
//     policyText: {
//         fontSize: 12,
//         color: "#475569",
//         flex: 1,
//         lineHeight: 20,
//         padding: 10,
//     },
//     boldBlue: { fontWeight: "700", color: "#0071bc" },
//     fieldGroup: { marginBottom: 20 },
//     label: {
//         fontSize: 15,
//         fontWeight: "700",
//         color: "#1e293b",
//         marginBottom: 10,
//     },
//     dropdown: {
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         padding: 14,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "#f8fafc",
//     },
//     placeholderText: { color: "#94a3b8" },
//     textArea: {
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 12,
//         padding: 14,
//         height: 100,
//         backgroundColor: "#f8fafc",
//         textAlignVertical: "top",
//     },
//     uploadBox: {
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 16,
//         padding: 30,
//         alignItems: "center",
//         backgroundColor: "#f8fafc",
//         borderStyle: "dashed",
//     },
//     uploadText: { marginTop: 12, fontSize: 15, color: "#64748b" },
//     browseText: { color: "#0071bc", fontWeight: "700" },
//     uploadSubText: { marginTop: 4, fontSize: 12, color: "#94a3b8" },
//     methodGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//         marginBottom: 5,
//     },
//     methodCard: {
//         width: "48%",
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 16,
//         padding: 16,
//         alignItems: "center",
//         marginBottom: 12,
//     },
//     activeMethodCard: { borderColor: "#0071bc", borderWidth: 2 },
//     methodTitle: {
//         fontSize: 14,
//         fontWeight: "800",
//         color: "#0f172a",
//         marginTop: 8,
//     },
//     methodSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
//     submitBtn: {
//         backgroundColor: "#0071bc",
//         borderRadius: 12,
//         paddingVertical: 16,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 10,
//         marginBottom: 12,
//     },
//     submitBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
//     cancelBtn: {
//         borderWidth: 1.5,
//         borderColor: "#0071bc",
//         borderRadius: 12,
//         paddingVertical: 16,
//         alignItems: "center",
//     },
//     cancelBtnText: { color: "#0071bc", fontSize: 15, fontWeight: "700" },
// });

// export default RefundDetails;
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    Image,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
    getReasons,
    createReturnExchange,
    uploadFilesToS3,
} from "../../api/commonApi";

const RETURN_EXCHANGE_WORKFLOW = {
    returnExchangeWorkflowId: "69dcdb9059f31047b812aa79",
    returnExchangeWorkflowName: "Standard refund path",
};

const REFUND_METHODS = [
    { id: "Bank Transfer", icon: "🏦", sub: "2-4 business days" },
    { id: "UPI", icon: "📱", sub: "Within 24 hours" },
];

const RefundDetails = ({ order, navigation, selectedIndex }) => {
    const [requestFor, setRequestFor] = useState("RETURN"); // RETURN | EXCHANGE
    const [reasons, setReasons] = useState([]);
    const [loadingReasons, setLoadingReasons] = useState(false);
    const [selectedReason, setSelectedReason] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedRefundMethod, setSelectedRefundMethod] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Bank details
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [ifscCode, setIfscCode] = useState("");

    // UPI
    const [upiId, setUpiId] = useState("");

    // Media
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadingVideos, setUploadingVideos] = useState(false);

    const fetchReasons = async (type) => {
        try {
            setLoadingReasons(true);
            const res = await getReasons(type);
            if (res?.success && res?.data) {
                setReasons(res.data);
            }
        } catch (err) {
            console.error("fetchReasons error:", err);
        } finally {
            setLoadingReasons(false);
        }
    };

    useEffect(() => {
        fetchReasons(requestFor);
        setSelectedReason(null);
        setSelectedRefundMethod(null);
    }, [requestFor]);

    const handlePickImages = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow gallery access.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsMultipleSelection: true,
        });
        if (!result.canceled && result.assets?.length > 0) {
            await uploadFiles(
                result.assets,
                "image",
                setUploadingImages,
                setUploadedImages,
            );
        }
    };

    const handlePickVideos = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow gallery access.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 0.8,
            allowsMultipleSelection: true,
            videoMaxDuration: 60,
        });
        if (!result.canceled && result.assets?.length > 0) {
            await uploadFiles(
                result.assets,
                "video",
                setUploadingVideos,
                setUploadedVideos,
            );
        }
    };

    const uploadFiles = async (assets, type, setLoading, setUrls) => {
        try {
            setLoading(true);
            const formData = new FormData();
            assets.forEach((f) => {
                const isVideo = type === "video";
                const ext = isVideo ? "mp4" : "jpg";
                const mime = isVideo ? "video/mp4" : "image/jpeg";
                formData.append("files", {
                    uri: f.uri,
                    name: f.fileName || `${type}_${Date.now()}.${ext}`,
                    type: f.mimeType || mime,
                });
            });
            const res = await uploadFilesToS3(formData);
            if (res?.success && res?.data?.urls) {
                setUrls((prev) => [...prev, ...res.data.urls]);
            } else {
                Alert.alert("Error", "Upload failed. Try again.");
            }
        } catch (err) {
            Alert.alert("Error", "Upload failed. Try again.");
            console.error("uploadFiles error:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (idx) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== idx));
    };

    const removeVideo = (idx) => {
        setUploadedVideos((prev) => prev.filter((_, i) => i !== idx));
    };

    const validate = () => {
        if (!selectedReason) {
            Alert.alert("Required", "Please select a reason.");
            return false;
        }
        if (!description.trim()) {
            Alert.alert("Required", "Please describe the issue.");
            return false;
        }
        if (requestFor === "RETURN") {
            if (!selectedRefundMethod) {
                Alert.alert("Required", "Please select a refund method.");
                return false;
            }
            if (selectedRefundMethod === "Bank Transfer") {
                if (
                    !accountNumber.trim() ||
                    !accountName.trim() ||
                    !ifscCode.trim()
                ) {
                    Alert.alert("Required", "Please fill all bank details.");
                    return false;
                }
            }
            if (selectedRefundMethod === "UPI") {
                if (!upiId.trim()) {
                    Alert.alert("Required", "Please enter UPI ID.");
                    return false;
                }
            }
        }
        return true;
    };

    const buildPayload = () => {
        const firstItem = order?.items?.[selectedIndex];
        const shippingAddr = order?.shippingAddress;

        const base = {
            reason: {
                reasonId: selectedReason.id,
                reasonName: selectedReason.reason,
            },
            order: {
                orderId: order?._id,
                orderNumber: order?.orderNumber,
            },
            returnExchangeWorkflow: RETURN_EXCHANGE_WORKFLOW,
            product: {
                productId: firstItem?.productId,
                productName: firstItem?.productName,
                sellingPrice: firstItem?.unitPrice,
                quantity: firstItem?.quantity,
            },
            description: description.trim(),
            requestFor,
            pickupAddress: {
                firstName: shippingAddr?.firstName || "",
                lastName: shippingAddr?.lastName || "",
                addressLine1: shippingAddr?.addressLine1 || "",
                addressLine2: shippingAddr?.addressLine2 || "",
                phone: shippingAddr?.phone || "",
            },
            media: {
                imgUrls: uploadedImages,
                videoUrls: uploadedVideos,
            },
        };

        if (requestFor === "RETURN") {
            // Map display name → API code
            const methodMap = {
                "Bank Transfer": "BANK_TRANSFER",
                "Original Card": "ORIGINAL_CARD",
                "Store Credit": "STORE_CREDIT",
                UPI: "UPI",
            };
            base.refundMethod =
                methodMap[selectedRefundMethod] || selectedRefundMethod;

            if (selectedRefundMethod === "Bank Transfer") {
                base.bankDetails = {
                    accountNumber: accountNumber.trim(),
                    accountName: accountName.trim(),
                    ifscCode: ifscCode.trim(),
                };
            } else if (selectedRefundMethod === "UPI") {
                base.upi = upiId.trim();
            }
        }

        return base;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            setSubmitting(true);
            const payload = buildPayload();
            const res = await createReturnExchange(payload);
            if (res?.success) {
                Alert.alert(
                    "Request Submitted ✓",
                    `Your ${requestFor === "RETURN" ? "return" : "exchange"} request (${res.data?.returnNumber}) has been submitted.`,
                    [{ text: "OK", onPress: () => navigation?.goBack() }],
                );
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed to submit. Try again.",
                );
            }
        } catch (err) {
            Alert.alert("Error", "Network error. Please try again.");
            console.error("createReturnExchange error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* ── Type Toggle ── */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>📝{"  "}Request Details</Text>
            </View>

            {/* ── Policy Box ── */}
            <View style={styles.policyBox}>
                <View style={styles.blueAccent} />
                <Text style={styles.policyText}>
                    <Text style={styles.boldBlue}>Return Policy: </Text>
                    Returns accepted within{" "}
                    <Text style={styles.boldBlue}>7 days</Text> of delivery.
                    Items must be unused, in original packaging.
                    {requestFor === "RETURN"
                        ? " Full refund processed within 3-5 business days after inspection."
                        : " Exchange dispatched within 2-3 business days after item pickup."}
                </Text>
            </View>
            <View style={styles.typeToggleRow}>
                {["RETURN", "EXCHANGE"].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeBtn,
                            requestFor === type && styles.typeBtnActive,
                        ]}
                        onPress={() => setRequestFor(type)}
                    >
                        <Text
                            style={[
                                styles.typeBtnText,
                                requestFor === type && styles.typeBtnTextActive,
                            ]}
                        >
                            {type === "RETURN" ? "🔄 Return" : "🔃 Exchange"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ── Reason Dropdown ── */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                    Reason for {requestFor === "RETURN" ? "Return" : "Exchange"}{" "}
                    *
                </Text>
                {loadingReasons ? (
                    <ActivityIndicator
                        color="#0071bc"
                        style={{ alignSelf: "flex-start", marginTop: 8 }}
                    />
                ) : (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.reasonsScroll}
                    >
                        {reasons.map((r) => (
                            <TouchableOpacity
                                key={r.id}
                                style={[
                                    styles.reasonChip,
                                    selectedReason?.id === r.id &&
                                        styles.reasonChipActive,
                                ]}
                                onPress={() => setSelectedReason(r)}
                            >
                                <Text
                                    style={[
                                        styles.reasonChipText,
                                        selectedReason?.id === r.id &&
                                            styles.reasonChipTextActive,
                                    ]}
                                >
                                    {r.reason}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* ── Description ── */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Describe the issue *</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Please describe the issue in detail..."
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#94a3b8"
                />
            </View>

            {/* ── Media Upload ── */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                    Upload Photos & Videos (optional)
                </Text>

                <View style={styles.uploadBtnRow}>
                    {/* Photo button */}
                    <TouchableOpacity
                        style={[
                            styles.uploadBtn,
                            uploadingImages && styles.uploadBtnDisabled,
                        ]}
                        onPress={handlePickImages}
                        disabled={uploadingImages}
                    >
                        {uploadingImages ? (
                            <ActivityIndicator color="#0071bc" size="small" />
                        ) : (
                            <>
                                <Text style={styles.uploadBtnEmoji}>📸</Text>
                                <Text style={styles.uploadBtnText}>
                                    Add Photos
                                </Text>
                                <Text style={styles.uploadBtnSub}>
                                    JPG, PNG
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Video button */}
                    <TouchableOpacity
                        style={[
                            styles.uploadBtn,
                            uploadingVideos && styles.uploadBtnDisabled,
                        ]}
                        onPress={handlePickVideos}
                        disabled={uploadingVideos}
                    >
                        {uploadingVideos ? (
                            <ActivityIndicator color="#0071bc" size="small" />
                        ) : (
                            <>
                                <Text style={styles.uploadBtnEmoji}>🎥</Text>
                                <Text style={styles.uploadBtnText}>
                                    Add Videos
                                </Text>
                                <Text style={styles.uploadBtnSub}>
                                    MP4, max 60s
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Image previews */}
                {uploadedImages.length > 0 && (
                    <>
                        <Text style={styles.mediaGroupLabel}>
                            Photos ({uploadedImages.length})
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.mediaRow}
                        >
                            {uploadedImages.map((uri, idx) => (
                                <View key={idx} style={styles.thumbWrapper}>
                                    <Image
                                        source={{ uri }}
                                        style={styles.mediaThumb}
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity
                                        style={styles.removeBtn}
                                        onPress={() => removeImage(idx)}
                                    >
                                        <Feather
                                            name="x"
                                            size={12}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}

                {/* Video previews */}
                {uploadedVideos.length > 0 && (
                    <>
                        <Text style={styles.mediaGroupLabel}>
                            Videos ({uploadedVideos.length})
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.mediaRow}
                        >
                            {uploadedVideos.map((uri, idx) => (
                                <View key={idx} style={styles.thumbWrapper}>
                                    {/* Video thumbnail — dark bg with play icon */}
                                    <View style={styles.videoThumb}>
                                        <Feather
                                            name="film"
                                            size={22}
                                            color="#fff"
                                        />
                                        <Text
                                            style={styles.videoLabel}
                                            numberOfLines={1}
                                        >
                                            Video {idx + 1}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.removeBtn}
                                        onPress={() => removeVideo(idx)}
                                    >
                                        <Feather
                                            name="x"
                                            size={12}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}
            </View>

            {/* ── Refund Method (RETURN only) ── */}
            {requestFor === "RETURN" && (
                <>
                    <Text style={styles.label}>Refund Method *</Text>
                    <View style={styles.methodGrid}>
                        {REFUND_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() =>
                                    setSelectedRefundMethod(method.id)
                                }
                                style={[
                                    styles.methodCard,
                                    selectedRefundMethod === method.id &&
                                        styles.activeMethodCard,
                                ]}
                            >
                                <Text style={styles.methodEmoji}>
                                    {method.icon}
                                </Text>
                                <Text style={styles.methodTitle}>
                                    {method.id}
                                </Text>
                                <Text style={styles.methodSub}>
                                    {method.sub}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bank Details */}
                    {selectedRefundMethod === "Bank Transfer" && (
                        <View style={styles.extraFieldsCard}>
                            <Text style={styles.extraFieldsTitle}>
                                🏦 Bank Details for Refund
                            </Text>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>
                                    Account Number *
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={accountNumber}
                                    onChangeText={setAccountNumber}
                                    placeholder="Enter account number"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>
                                    Account Holder Name *
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={accountName}
                                    onChangeText={setAccountName}
                                    placeholder="Enter account holder name"
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>IFSC Code *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={ifscCode}
                                    onChangeText={(v) =>
                                        setIfscCode(v.toUpperCase())
                                    }
                                    placeholder="e.g. SBIN0001234"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="characters"
                                />
                            </View>
                        </View>
                    )}

                    {/* UPI */}
                    {selectedRefundMethod === "UPI" && (
                        <View style={styles.extraFieldsCard}>
                            <Text style={styles.extraFieldsTitle}>
                                📱 UPI Details
                            </Text>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.label}>UPI ID *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={upiId}
                                    onChangeText={setUpiId}
                                    placeholder="e.g. name@upi"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>
                    )}
                </>
            )}

            {/* ── Submit ── */}
            <TouchableOpacity
                style={[styles.submitBtn, submitting && styles.btnDisabled]}
                onPress={handleSubmit}
                disabled={submitting}
            >
                {submitting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <MaterialCommunityIcons
                            name="restore"
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.submitBtnText}>
                            Submit{" "}
                            {requestFor === "RETURN" ? "Return" : "Exchange"}{" "}
                            Request
                        </Text>
                    </>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation?.goBack()}
            >
                <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    headerTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a" },

    // Type toggle
    typeToggleRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    typeBtn: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        backgroundColor: "#f8fafc",
    },
    typeBtnActive: {
        backgroundColor: "#0071bc",
        borderColor: "#0071bc",
    },
    typeBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748b",
    },
    typeBtnTextActive: {
        color: "#fff",
    },

    // Policy
    policyBox: {
        backgroundColor: "#f0f7ff",
        borderRadius: 12,
        flexDirection: "row",
        marginBottom: 20,
    },
    blueAccent: {
        width: 3,
        backgroundColor: "#0071bc",
        borderRadius: 2,
    },
    policyText: {
        fontSize: 12,
        color: "#475569",
        flex: 1,
        lineHeight: 20,
        padding: 10,
    },
    boldBlue: { fontWeight: "700", color: "#0071bc" },

    // Fields
    fieldGroup: { marginBottom: 16 },
    label: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 10,
    },

    // Reasons
    reasonsScroll: {
        gap: 8,
        paddingBottom: 4,
    },
    reasonChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        backgroundColor: "#f8fafc",
    },
    reasonChipActive: {
        backgroundColor: "#0071bc",
        borderColor: "#0071bc",
    },
    reasonChipText: {
        fontSize: 13,
        fontWeight: "500",
        color: "#475569",
    },
    reasonChipTextActive: {
        color: "#fff",
    },

    // Text area
    textArea: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        height: 100,
        backgroundColor: "#f8fafc",
        textAlignVertical: "top",
        fontSize: 14,
        color: "#1e293b",
    },

    // Upload
    uploadBtnRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },
    uploadBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderStyle: "dashed",
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: "center",
        backgroundColor: "#f8fafc",
        gap: 4,
    },
    uploadBtnDisabled: { opacity: 0.5 },
    uploadBtnEmoji: { fontSize: 26, marginBottom: 2 },
    uploadBtnText: { fontSize: 13, fontWeight: "600", color: "#334155" },
    uploadBtnSub: { fontSize: 11, color: "#94a3b8" },
    mediaGroupLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748b",
        marginBottom: 8,
        marginTop: 4,
    },
    mediaRow: { gap: 10, paddingBottom: 4 },
    thumbWrapper: { position: "relative" },
    mediaThumb: {
        width: 72,
        height: 72,
        borderRadius: 10,
        backgroundColor: "#f1f5f9",
    },
    videoThumb: {
        width: 72,
        height: 72,
        borderRadius: 10,
        backgroundColor: "#1e293b",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    videoLabel: {
        fontSize: 9,
        color: "#94a3b8",
        textAlign: "center",
        paddingHorizontal: 4,
    },
    removeBtn: {
        position: "absolute",
        top: 2,
        right: 2,
        backgroundColor: "#ef4444",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    // Refund methods
    methodGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    methodCard: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        padding: 14,
        alignItems: "center",
        marginBottom: 10,
    },
    activeMethodCard: { borderColor: "#0071bc", borderWidth: 2 },
    methodEmoji: { fontSize: 22, marginBottom: 6 },
    methodTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0f172a",
        marginTop: 2,
        textAlign: "center",
    },
    methodSub: {
        fontSize: 11,
        color: "#94a3b8",
        marginTop: 2,
        textAlign: "center",
    },

    // Extra fields card
    extraFieldsCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        marginBottom: 16,
    },
    extraFieldsTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        backgroundColor: "#ffffff",
        fontSize: 14,
        color: "#1e293b",
    },

    // Buttons
    submitBtn: {
        backgroundColor: "#0071bc",
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    btnDisabled: { opacity: 0.6 },
    submitBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
    cancelBtn: {
        borderWidth: 1.5,
        borderColor: "#0071bc",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
    },
    cancelBtnText: { color: "#0071bc", fontSize: 15, fontWeight: "700" },
});

export default RefundDetails;

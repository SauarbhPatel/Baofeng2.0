import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const RefundDetails = () => {
    const [selectedMethod, setSelectedMethod] = useState("Original Card");

    const methods = [
        { id: "Bank Transfer", icon: "🏦", sub: "2-4 business days" },
        { id: "Original Card", icon: "💳", sub: "5-7 business days" },
        { id: "Store Credit", icon: "🎁", sub: "Instant + 5% bonus" },
        { id: "UPI / Wallet", icon: "📱", sub: "Within 24 hours" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                {/* <Text style={styles.headerEmoji}>📝</Text> */}
                <Text style={styles.headerTitle}>📝 {"  "}Refund Details</Text>
            </View>

            {/* Return Policy Info Box */}
            <View style={styles.policyBox}>
                <View style={styles.blueAccent} />
                <Text style={styles.policyText}>
                    <Text style={styles.boldBlue}>Return Policy: </Text>
                    We accept returns within{" "}
                    <Text style={styles.boldBlue}>7 days</Text> of delivery.
                    Items must be unused, in original packaging. Full refund
                    will be processed within{" "}
                    <Text style={styles.boldBlue}>3-5 business days</Text> after
                    item inspection.
                </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Reason for Refund *</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.placeholderText}>Select a reason</Text>
                    <Feather name="chevron-down" size={20} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Describe the issue *</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Please describe the issue in detail to help us process your refund faster..."
                    multiline
                    numberOfLines={4}
                />
            </View>

            {/* Media Uploader */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                    Upload Photos / Video (optional)
                </Text>
                <TouchableOpacity style={styles.uploadBox}>
                    <Text style={styles.headerEmoji}>📸</Text>

                    <Text style={styles.uploadText}>
                        Drag & drop files or{" "}
                        <Text style={styles.browseText}>Browse</Text>
                    </Text>
                    <Text style={styles.uploadSubText}>
                        JPG, PNG, MP4 up to 20MB
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Refund Methods Grid */}
            <Text style={styles.label}>Refund Method *</Text>
            <View style={styles.methodGrid}>
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        onPress={() => setSelectedMethod(method.id)}
                        style={[
                            styles.methodCard,
                            selectedMethod === method.id &&
                                styles.activeMethodCard,
                        ]}
                    >
                        <Text style={styles.headerEmoji}>{method.icon}</Text>
                        <Text style={styles.methodTitle}>{method.id}</Text>
                        <Text style={styles.methodSub}>{method.sub}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Action Buttons */}
            <TouchableOpacity style={styles.submitBtn}>
                <MaterialCommunityIcons name="restore" size={20} color="#fff" />
                <Text style={styles.submitBtnText}>Submit Refund Request</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn}>
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
    headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    headerEmoji: { fontSize: 20, marginRight: 10 },
    headerTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
    policyBox: {
        backgroundColor: "#f0f7ff",
        borderRadius: 12,
        flexDirection: "row",
        // padding: 16,
        marginBottom: 25,
    },
    blueAccent: {
        width: 3,
        backgroundColor: "#0071bc",
        // marginRight: 12,
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
    fieldGroup: { marginBottom: 20 },
    label: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f8fafc",
    },
    placeholderText: { color: "#94a3b8" },
    textArea: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        padding: 14,
        height: 100,
        backgroundColor: "#f8fafc",
        textAlignVertical: "top",
    },
    uploadBox: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        padding: 30,
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderStyle: "dashed",
    },
    uploadText: { marginTop: 12, fontSize: 15, color: "#64748b" },
    browseText: { color: "#0071bc", fontWeight: "700" },
    uploadSubText: { marginTop: 4, fontSize: 12, color: "#94a3b8" },
    methodGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    methodCard: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        marginBottom: 12,
    },
    activeMethodCard: { borderColor: "#0071bc", borderWidth: 2 },
    methodTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0f172a",
        marginTop: 8,
    },
    methodSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
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

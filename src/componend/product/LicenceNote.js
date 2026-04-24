import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
    uploadFilesToS3,
    saveUploadedDoc,
    getUploadedDocs,
} from "../../api/commonApi";

const LicenceNote = ({ complianceDocuments = [], onDocsStatusChange }) => {
    // Map of code → { loading, uploadedUrl, docName }
    const [docState, setDocState] = useState({});
    const [initLoading, setInitLoading] = useState(true);

    // ── On mount — check which docs are already uploaded ───────
    useEffect(() => {
        loadExistingDocs();
    }, []);

    const loadExistingDocs = async () => {
        try {
            setInitLoading(true);
            const res = await getUploadedDocs();

            if (res?.success && res?.data?.uploadedDocs) {
                const uploaded = res.data.uploadedDocs;
                // Build a map: wpcLicenseNumber → latest uploaded URL
                const map = {};
                uploaded.forEach((doc) => {
                    map[doc.wpcLicenseNumber] = doc.wpcDocumentUrl;
                });

                console.log("map", map);
                // Initialise docState from existing uploads
                const initial = {};
                complianceDocuments.forEach((item) => {
                    const code = item.code?.trim() || item.complianceId;
                    initial[code] = {
                        loading: false,
                        uploadedUrl: map[code] || null,
                        docName: item.documentName,
                    };
                });
                console.log("initial", initial);

                setDocState(initial);
                // Notify parent
                const allDone = complianceDocuments.every(
                    (item) => !!map[item.code?.trim() || item.complianceId],
                );
                onDocsStatusChange?.(allDone);
            }
        } catch (err) {
            console.error("loadExistingDocs error:", err);
        } finally {
            setInitLoading(false);
        }
    };

    const updateDoc = (code, patch) => {
        setDocState((prev) => {
            const next = { ...prev, [code]: { ...prev[code], ...patch } };
            // Re-check if all docs are uploaded
            const allDone = complianceDocuments.every(
                (item) =>
                    !!next[item.code?.trim() || item.complianceId]?.uploadedUrl,
            );
            onDocsStatusChange?.(allDone);
            return next;
        });
    };

    // ── Upload flow ────────────────────────────────────────────
    const handleUpload = (code, documentName) => {
        return pickDocument(code);
        Alert.alert(
            "Upload Document",
            `Choose how to upload "${documentName}"`,
            [
                { text: "📁  File / PDF", onPress: () => pickDocument(code) },
                { text: "🖼️  Gallery", onPress: () => pickFromGallery(code) },
                { text: "📷  Camera", onPress: () => pickFromCamera(code) },
                { text: "Cancel", onPress: () => null, style: "cancel" },
            ],
        );
    };

    const uploadAndSave = async (code, uri, fileName, mimeType) => {
        try {
            updateDoc(code, { loading: true });

            // 1. Upload to S3
            const formData = new FormData();
            formData.append("files", { uri, name: fileName, type: mimeType });
            const s3Res = await uploadFilesToS3(formData);

            if (!s3Res?.success || !s3Res?.data?.urls?.[0]) {
                throw new Error("S3 upload failed");
            }
            const fileUrl = s3Res.data.urls[0];

            // 2. Save doc record
            const saveRes = await saveUploadedDoc({
                wpcLicenseNumber: code,
                wpcDocumentUrl: fileUrl,
            });

            if (!saveRes?.success) throw new Error("Save doc failed");

            updateDoc(code, { loading: false, uploadedUrl: fileUrl });
            Alert.alert("Uploaded ✓", `Document uploaded successfully.`);
        } catch (err) {
            updateDoc(code, { loading: false });
            Alert.alert("Error", "Upload failed. Please try again.");
            console.error("uploadAndSave error:", err);
        }
    };

    const pickDocument = async (code) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "image/*"],
                copyToCacheDirectory: true,
            });
            if (!result.canceled && result.assets?.[0]) {
                const f = result.assets[0];
                await uploadAndSave(
                    code,
                    f.uri,
                    f.name,
                    f.mimeType || "application/pdf",
                );
            }
        } catch {
            Alert.alert("Error", "Could not open file picker.");
        }
    };

    const pickFromGallery = async (code) => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow gallery access.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.8,
        });
        if (!result.canceled && result.assets?.[0]) {
            const f = result.assets[0];
            await uploadAndSave(
                code,
                f.uri,
                f.fileName || `img_${Date.now()}.jpg`,
                "image/jpeg",
            );
        }
    };

    const pickFromCamera = async (code) => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow camera access.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
        if (!result.canceled && result.assets?.[0]) {
            const f = result.assets[0];
            await uploadAndSave(
                code,
                f.uri,
                `capture_${Date.now()}.jpg`,
                "image/jpeg",
            );
        }
    };

    if (initLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.contentCard}>
                    <ActivityIndicator color="#DC8282" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentCard}>
                <Text style={styles.noteHeader}>
                    <MaterialCommunityIcons
                        name="shield-alert-outline"
                        size={20}
                        color="#3A1200"
                    />
                    {"  "} Licence note before purchase
                </Text>
                <Text
                    style={{ lineHeight: 18, fontSize: 13, marginBottom: 15 }}
                >
                    This model may require WPC user licence depending on your
                    region and intended use. Please confirm compliance before
                    dispatch.
                </Text>

                {complianceDocuments?.map((item) => {
                    const code = item.code || item.complianceId;
                    const state = docState[code?.trim()] || {};
                    const isUploaded = !!state.uploadedUrl;
                    console.log(state);

                    return (
                        <View key={code} style={styles.dashedBox}>
                            <Text style={styles.licenceTitle}>
                                {item?.documentName}
                            </Text>

                            {isUploaded ? (
                                // ── Already uploaded — View + Replace ───────
                                <View style={styles.uploadedRow}>
                                    <Feather
                                        name="check-circle"
                                        size={16}
                                        color="#16a34a"
                                    />
                                    <Text style={styles.uploadedText}>
                                        Document uploaded
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.viewBtn}
                                        onPress={() =>
                                            Linking.openURL(state.uploadedUrl)
                                        }
                                    >
                                        <Feather
                                            name="eye"
                                            size={14}
                                            color="#0069AF"
                                        />
                                        <Text style={styles.viewBtnText}>
                                            View
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.replaceBtn}
                                        onPress={() =>
                                            handleUpload(
                                                code?.trim(),
                                                item.documentName,
                                            )
                                        }
                                        disabled={state.loading}
                                    >
                                        {state.loading ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#DC8282"
                                            />
                                        ) : (
                                            <>
                                                <Feather
                                                    name="refresh-cw"
                                                    size={13}
                                                    color="#DC8282"
                                                />
                                                <Text
                                                    style={
                                                        styles.replaceBtnText
                                                    }
                                                >
                                                    Replace
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                // ── Not uploaded yet ────────────────────────
                                <TouchableOpacity
                                    style={[
                                        styles.uploadBtn,
                                        state.loading && styles.btnDisabled,
                                    ]}
                                    onPress={() =>
                                        handleUpload(
                                            code?.trim(),
                                            item.documentName,
                                        )
                                    }
                                    disabled={state.loading}
                                >
                                    {state.loading ? (
                                        <ActivityIndicator
                                            color="#DC8282"
                                            size="small"
                                        />
                                    ) : (
                                        <>
                                            <Feather
                                                name="upload"
                                                size={16}
                                                color="#DC8282"
                                            />
                                            <Text style={styles.uploadBtnText}>
                                                Upload Document
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>
                        If you do not have WPC user Licence click
                    </Text>
                    <TouchableOpacity
                        style={styles.hereBtn}
                        onPress={() =>
                            Linking.openURL(
                                "https://www.nsws.gov.in/portal/approval-details/ministry-of-communications/department-of-telecommunications/wpc-network-fixed-land-mobile-hf-vhf-uhf-below-806-mhz",
                            )
                        }
                    >
                        <Text style={styles.hereText}>HERE</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}> to apply.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 15, marginHorizontal: 10 },
    contentCard: {
        backgroundColor: "#FFF2EE",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "#FFF2EE",
    },
    noteHeader: {
        fontSize: 16,
        color: "#3A1200",
        marginBottom: 10,
        fontWeight: "700",
    },
    noteLabel: { color: "#ff5a5a", fontWeight: "bold" },
    boldText: { fontWeight: "bold" },
    dashedBox: {
        // borderWidth: 1.5,
        // borderColor: "#64748b",
        // borderStyle: "dashed",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        gap: 10,
    },
    licenceTitle: { fontSize: 16, fontWeight: "bold", color: "#000" },

    // ── Uploaded state ─────────────────────────────────────────
    uploadedRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexWrap: "wrap",
    },
    uploadedText: {
        flex: 1,
        fontSize: 13,
        color: "#16a34a",
        fontWeight: "600",
    },
    viewBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#eff6ff",
        borderWidth: 1,
        borderColor: "#93c5fd",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    viewBtnText: { fontSize: 12, color: "#0069AF", fontWeight: "700" },
    replaceBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#fff1f2",
        borderWidth: 1,
        borderColor: "#fecdd3",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    replaceBtnText: { fontSize: 12, color: "#DC8282", fontWeight: "700" },

    // ── Upload button ──────────────────────────────────────────
    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#DC8282",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
        justifyContent: "center",
        minHeight: 42,
    },
    btnDisabled: { opacity: 0.6 },
    uploadBtnText: { color: "#DC8282", fontWeight: "600", fontSize: 14 },

    // ── Footer ─────────────────────────────────────────────────
    footerRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
    footerText: { fontSize: 14, color: "#334155" },
    hereBtn: {
        borderWidth: 1,
        borderColor: "#DC8282",
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginHorizontal: 4,
        backgroundColor: "#fff",
    },
    hereText: { color: "#DC8282", fontWeight: "bold", fontSize: 12 },
});

export default LicenceNote;

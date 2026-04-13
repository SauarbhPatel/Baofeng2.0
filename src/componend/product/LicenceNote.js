import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const LicenceNote = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentCard}>
                <Text style={styles.noteHeader}>
                    <Text style={styles.noteLabel}>NOTE : </Text>
                    User Needs <Text style={styles.boldText}>WPC</Text> User
                    Licence
                </Text>

                <View style={styles.dashedBox}>
                    <Text style={styles.licenceTitle}>Licence</Text>

                    <TouchableOpacity style={styles.addToCartBtn}>
                        <Feather name="upload" size={16} color="#DC8282" />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>
                        If you do not have WPC user Licence click
                    </Text>
                    <TouchableOpacity style={styles.hereBtn}>
                        <Text style={styles.hereText}>HERE</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}> to apply.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginHorizontal: 10,
    },
    contentCard: {
        backgroundColor: "#fff1f2",
        borderRadius: 24,
        padding: 15,
        borderWidth: 1,
        borderColor: "#fecdd3",
    },
    noteHeader: {
        fontSize: 16,
        color: "#1e293b",
        marginBottom: 16,
    },
    noteLabel: {
        color: "#ff5a5a",
        fontWeight: "bold",
    },
    boldText: {
        fontWeight: "bold",
    },
    dashedBox: {
        borderWidth: 1.5,
        borderColor: "#64748b",
        borderStyle: "dashed",
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    licenceTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    addToCartBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#DC8282",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 6,
    },
    addToCartText: {
        color: "#DC8282",
        fontWeight: "600",
        fontSize: 14,
    },
    footerRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#334155",
    },
    hereBtn: {
        borderWidth: 1,
        borderColor: "#DC8282",
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginHorizontal: 4,
        backgroundColor: "#fff",
    },
    hereText: {
        color: "#DC8282",
        fontWeight: "bold",
        fontSize: 12,
    },
});

export default LicenceNote;

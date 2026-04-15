import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const NeedHelp = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>🤝 {"  "}Need Help?</Text>
            </View>

            <Text style={styles.description}>
                Our support team is available{" "}
                <Text style={styles.boldText}>Mon-Sat, 9 AM to 7 PM</Text> to
                assist you with your refund.
            </Text>

            <TouchableOpacity
                style={styles.contactButton}
                onPress={() =>
                    Linking.openURL("mailto:support@baofengradios.com")
                }
            >
                <Feather name="mail" size={18} color="#0f172a" />
                <Text style={styles.contactText}>
                    support@baofengradios.com
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.contactButton}
                onPress={() => Linking.openURL("tel:+917011831918")}
            >
                <Feather name="phone" size={18} color="#0f172a" />
                <Text style={styles.contactText}>+91 701 183 1918</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    emoji: {
        fontSize: 20,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    description: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 22,
        marginBottom: 24,
    },
    boldText: {
        fontWeight: "600",
        color: "#475569",
    },
    contactButton: {
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    contactText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0f172a",
        marginLeft: 14,
    },
});

export default NeedHelp;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PaymentMethod = () => {
    const [method, setMethod] = useState("razorpay");

    const MethodOption = ({ id, title, description, logo, isCOD }) => (
        <TouchableOpacity
            style={[styles.methodCard, method === id && styles.activeCard]}
            onPress={() => setMethod(id)}
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <View
                    style={[styles.radio, method === id && styles.radioActive]}
                >
                    {method === id && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.methodTitle}>{title}</Text>
                {isCOD ? (
                    <View style={styles.codBadge}>
                        <Text style={styles.codText}>COD</Text>
                    </View>
                ) : (
                    <Image
                        source={{ uri: logo }}
                        style={styles.razorLogo}
                        resizeMode="contain"
                    />
                )}
            </View>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>

            {/* Razorpay Option */}
            <MethodOption
                id="razorpay"
                title="Razorpay"
                description="You will be redirected to the razorpay website after submitting your order"
                logo="https://avatars.githubusercontent.com/u/7713209?s=280&v=4"
            />

            {/* COD Option */}
            <MethodOption
                id="cod"
                title="COD"
                description="You will be redirected to the COD after submitting your order"
                isCOD
            />

            {/* Secure Note */}
            <View style={styles.secureContainer}>
                <View style={styles.lockIconCircle}>
                    <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color="#0275d8"
                    />
                </View>
                <Text style={styles.secureText}>
                    We protect your payment information using encryption to
                    provide bank-level security.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 15,
    },
    methodCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1.5,
        borderColor: "#cbd5e1",
        marginBottom: 15,
    },
    activeCard: {
        borderColor: "#3b82f6",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    radio: {
        height: 18,
        width: 18,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#94a3b8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    radioActive: {
        borderColor: "#0275d8",
        backgroundColor: "#0275d8",
    },
    radioInner: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    razorLogo: {
        width: 40,
        height: 40,
        marginLeft: "auto",
    },
    codBadge: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        paddingHorizontal: 4,
        marginLeft: "auto",
    },
    codText: {
        fontSize: 12,
        fontWeight: "900",
    },
    description: {
        color: "#64748b",
        fontSize: 14,
        lineHeight: 22,
    },
    secureContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingRight: 20,
    },
    lockIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#0275d8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    secureText: {
        flex: 1,
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
});

export default PaymentMethod;

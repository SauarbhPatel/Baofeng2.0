import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const CouponInput = () => {
    const [coupon, setCoupon] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Have a coupon?</Text>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Add coupon"
                    placeholderTextColor="#94a3b8"
                    value={coupon}
                    onChangeText={setCoupon}
                />

                <View style={styles.divider} />

                <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => console.log("Applying:", coupon)}
                >
                    <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
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
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#334155",
        marginBottom: 12,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#1e293b",
    },
    divider: {
        width: 1,
        height: "60%",
        backgroundColor: "#e2e8f0",
    },
    applyBtn: {
        paddingHorizontal: 24,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    applyText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb", // Professional blue color
    },
});

export default CouponInput;

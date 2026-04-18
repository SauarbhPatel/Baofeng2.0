// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
// } from "react-native";
// import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// const BillingSummary = ({ navigation }) => {
//     const [isChecked, setIsChecked] = useState(true);
//     const [note, setNote] = useState("");

//     return (
//         <View style={styles.container}>
//             {/* Header Toggle */}
//             <TouchableOpacity style={styles.headerRow} activeOpacity={0.7}>
//                 <Text style={styles.headerTitle}>Billing Summary</Text>
//                 <MaterialCommunityIcons
//                     name="menu-down"
//                     size={28}
//                     color="#0f172a"
//                 />
//             </TouchableOpacity>

//             <View style={styles.divider} />

//             {/* Grand Total Section */}
//             <View style={styles.totalRow}>
//                 <Text style={styles.totalLabel}>Grand Total</Text>
//                 <Text style={styles.totalValue}>₹3,439.00</Text>
//             </View>

//             {/* Notes Input */}
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder="Type here..."
//                     placeholderTextColor="#94a3b8"
//                     multiline
//                     value={note}
//                     onChangeText={setNote}
//                 />
//             </View>

//             {/* Policy Acknowledgment */}
//             <View style={styles.policyRow}>
//                 <TouchableOpacity
//                     onPress={() => setIsChecked(!isChecked)}
//                     style={[
//                         styles.checkbox,
//                         isChecked && styles.checkboxActive,
//                     ]}
//                 >
//                     {isChecked && (
//                         <Feather name="check" size={14} color="#fff" />
//                     )}
//                 </TouchableOpacity>
//                 <Text style={styles.policyText}>
//                     Please check to acknowledge our{" "}
//                     <Text style={styles.linkText}>Privacy & Terms Policy</Text>
//                 </Text>
//             </View>

//             {/* Payment Action */}
//             <TouchableOpacity
//                 style={styles.paymentBtn}
//                 activeOpacity={0.8}
//                 onPress={() => navigation.push("OrderConfirmation")}
//             >
//                 <Text style={styles.paymentBtnText}>Continue to Payment</Text>
//             </TouchableOpacity>

//             {/* Trust Badges */}
//             <View style={styles.badgeRow}>
//                 <View style={styles.badgeItem}>
//                     <Feather name="lock" size={14} color="#94a3b8" />
//                     <Text style={styles.badgeText}>Secure SSL Encryption</Text>
//                 </View>
//                 <View style={styles.badgeItem}>
//                     <Feather name="shield" size={14} color="#94a3b8" />
//                     <Text style={styles.badgeText}>Purchase Protection</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     headerRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 16,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     divider: {
//         height: 1,
//         backgroundColor: "#e2e8f0",
//         marginBottom: 10,
//     },
//     totalRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     totalLabel: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     totalValue: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     inputContainer: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#cbd5e1",
//         height: 100,
//         padding: 12,
//         marginBottom: 20,
//     },
//     textInput: {
//         fontSize: 16,
//         color: "#1e293b",
//         textAlignVertical: "top",
//     },
//     policyRow: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         marginBottom: 24,
//         paddingRight: 10,
//     },
//     checkbox: {
//         width: 20,
//         height: 20,
//         borderRadius: 4,
//         borderWidth: 1.5,
//         borderColor: "#0275d8",
//         marginRight: 10,
//         marginTop: 2,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     checkboxActive: {
//         backgroundColor: "#0275d8",
//     },
//     policyText: {
//         fontSize: 14,
//         color: "#475569",
//         lineHeight: 22,
//         flex: 1,
//     },
//     linkText: {
//         color: "#3b82f6",
//         fontWeight: "500",
//     },
//     paymentBtn: {
//         backgroundColor: "#0275d8",
//         borderRadius: 10,
//         height: 50,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 24,
//     },
//     paymentBtnText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "700",
//     },
//     badgeRow: {
//         flexDirection: "row",
//         justifyContent: "center",
//         gap: 16,
//     },
//     badgeItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 4,
//     },
//     badgeText: {
//         fontSize: 11,
//         color: "#94a3b8",
//         fontWeight: "500",
//     },
// });

// export default BillingSummary;

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const BillingSummary = ({
    orderData,
    selectedShipping,
    onPlaceOrder,
    placingOrder = false,
}) => {
    const [isChecked, setIsChecked] = useState(true);
    const [note, setNote] = useState("");

    const subtotal = orderData?.subtotal || 0;
    const shippingFee = selectedShipping?.charges?.codFee || 0;
    const grandTotal = subtotal + shippingFee;

    return (
        <View style={styles.container}>
            {/* Header Toggle */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Billing Summary</Text>
            </View>

            <View style={styles.divider} />

            {/* Price rows */}
            <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceValue}>
                    ₹{subtotal.toLocaleString("en-IN")}
                </Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Shipping</Text>
                <Text style={styles.priceValue}>
                    ₹{shippingFee.toLocaleString("en-IN")}
                </Text>
            </View>
            <View style={styles.divider} />

            {/* Grand Total */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>
                    ₹{grandTotal.toLocaleString("en-IN")}
                </Text>
            </View>

            {/* Notes Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Order notes (optional)..."
                    placeholderTextColor="#94a3b8"
                    multiline
                    value={note}
                    onChangeText={setNote}
                />
            </View>

            {/* Policy Acknowledgment */}
            <View style={styles.policyRow}>
                <TouchableOpacity
                    onPress={() => setIsChecked(!isChecked)}
                    style={[
                        styles.checkbox,
                        isChecked && styles.checkboxActive,
                    ]}
                >
                    {isChecked && (
                        <Feather name="check" size={14} color="#fff" />
                    )}
                </TouchableOpacity>
                <Text style={styles.policyText}>
                    Please check to acknowledge our{" "}
                    <Text style={styles.linkText}>Privacy & Terms Policy</Text>
                </Text>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity
                style={[
                    styles.paymentBtn,
                    (!isChecked || placingOrder) && styles.btnDisabled,
                ]}
                activeOpacity={0.8}
                onPress={onPlaceOrder}
                disabled={!isChecked || placingOrder}
            >
                {placingOrder ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.paymentBtnText}>
                        Continue to Payment
                    </Text>
                )}
            </TouchableOpacity>

            {/* Trust Badges */}
            <View style={styles.badgeRow}>
                <View style={styles.badgeItem}>
                    <Feather name="lock" size={14} color="#94a3b8" />
                    <Text style={styles.badgeText}>Secure SSL Encryption</Text>
                </View>
                <View style={styles.badgeItem}>
                    <Feather name="shield" size={14} color="#94a3b8" />
                    <Text style={styles.badgeText}>Purchase Protection</Text>
                </View>
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
    headerRow: { marginBottom: 16 },
    headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    divider: { height: 1, backgroundColor: "#e2e8f0", marginBottom: 10 },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    priceLabel: { fontSize: 14, color: "#64748b" },
    priceValue: { fontSize: 14, fontWeight: "600", color: "#1e293b" },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    totalLabel: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    totalValue: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        height: 90,
        padding: 12,
        marginBottom: 20,
    },
    textInput: { fontSize: 15, color: "#1e293b", textAlignVertical: "top" },
    policyRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
        paddingRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#0275d8",
        marginRight: 10,
        marginTop: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#0275d8" },
    policyText: { fontSize: 14, color: "#475569", lineHeight: 22, flex: 1 },
    linkText: { color: "#3b82f6", fontWeight: "500" },
    paymentBtn: {
        backgroundColor: "#0275d8",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    btnDisabled: { opacity: 0.5 },
    paymentBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    badgeRow: { flexDirection: "row", justifyContent: "center", gap: 16 },
    badgeItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    badgeText: { fontSize: 11, color: "#94a3b8", fontWeight: "500" },
});

export default BillingSummary;

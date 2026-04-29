// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// const ShippingMethod = () => {
//     const [selectedMethod, setSelectedMethod] = useState("first_class");

//     const methods = [
//         {
//             id: "first_class",
//             price: "₹2.99",
//             label: "Delhivery 1st Class With Tracking(5 – 13 days)",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/USPS_Logo.svg/1200px-USPS_Logo.svg.png", // Use your local USPS/Carrier asset
//         },
//         {
//             id: "priority",
//             price: "₹9.00",
//             label: "Ecomm PRIORITY With Tracking(5 – 10 days)",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/USPS_Logo.svg/1200px-USPS_Logo.svg.png",
//             isFaster: true,
//         },
//     ];

//     return (
//         <View style={styles.mainContainer}>
//             <Text style={styles.title}>Shipping Method</Text>

//             {methods.map((item) => {
//                 const isActive = selectedMethod === item.id;
//                 return (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[
//                             styles.methodCard,
//                             isActive && styles.activeCard,
//                         ]}
//                         onPress={() => setSelectedMethod(item.id)}
//                         activeOpacity={0.9}
//                     >
//                         <View style={styles.row}>
//                             <View
//                                 style={[
//                                     styles.radioOuter,
//                                     isActive && styles.radioActive,
//                                 ]}
//                             >
//                                 {isActive && <View style={styles.radioInner} />}
//                             </View>

//                             <Text style={styles.priceText}>{item.price}</Text>
//                             <View style={styles.logoContainer}>
//                                 <Image
//                                     source={{ uri: item.logo }}
//                                     style={styles.carrierLogo}
//                                     resizeMode="contain"
//                                 />
//                                 {item.isFaster && (
//                                     <View style={styles.fasterBadge}>
//                                         <Text style={styles.fasterText}>
//                                             faster
//                                         </Text>
//                                     </View>
//                                 )}
//                             </View>
//                         </View>

//                         {/* Description Text */}
//                         <Text style={styles.descText}>{item.label}</Text>
//                     </TouchableOpacity>
//                 );
//             })}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "700",
//         color: "#0f172a",
//         marginBottom: 15,
//     },
//     methodCard: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 15,
//         borderWidth: 1.5,
//         borderColor: "#cbd5e1",
//         marginBottom: 15,
//     },
//     activeCard: {
//         borderColor: "#3b82f6",
//         backgroundColor: "#eff6ff",
//     },
//     row: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     radioOuter: {
//         height: 18,
//         width: 18,
//         borderRadius: 11,
//         borderWidth: 1.5,
//         borderColor: "#94a3b8",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 12,
//     },
//     radioActive: {
//         borderColor: "#0275d8",
//         backgroundColor: "#0275d8",
//     },
//     radioInner: {
//         height: 8,
//         width: 8,
//         borderRadius: 4,
//         backgroundColor: "#fff",
//     },
//     priceText: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "#000",
//     },
//     logoContainer: {
//         marginLeft: "auto",
//         alignItems: "flex-end",
//     },
//     carrierLogo: {
//         width: 50,
//         height: 30,
//     },
//     fasterBadge: {
//         backgroundColor: "#0275d8",
//         paddingHorizontal: 6,
//         paddingVertical: 2,
//         borderRadius: 4,
//         marginTop: -8, // Matches the overlay look in the design
//     },
//     fasterText: {
//         color: "#fff",
//         fontSize: 10,
//         fontWeight: "700",
//     },
//     descText: {
//         color: "#64748b",
//         fontSize: 14,
//         lineHeight: 22,
//     },
// });

// export default ShippingMethod;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ShippingMethod = ({
    shippingMethods = [],
    selectedShipping,
    onSelect,
}) => {
    if (!shippingMethods.length) return null;

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Shipping Method</Text>

            {shippingMethods.map((method) => {
                const isActive = selectedShipping?.id === method.id;
                return (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodCard,
                            isActive && styles.activeCard,
                        ]}
                        onPress={() => onSelect(method)}
                        activeOpacity={0.9}
                    >
                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.radioOuter,
                                    isActive && styles.radioActive,
                                ]}
                            >
                                {isActive && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.priceText}>
                                ₹
                                {method.charges?.perKgCharge +
                                    method.charges?.remoteAreaSurcharge}
                            </Text>
                            <View style={styles.logoContainer}>
                                {method.image ? (
                                    <Image
                                        source={{ uri: method.image }}
                                        style={styles.carrierLogo}
                                        resizeMode="contain"
                                    />
                                ) : null}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.methodName}>
                                {method.shippingMethodName}
                            </Text>
                            <Text style={styles.descText}>
                                {method.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
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
        marginBottom: 12,
    },
    activeCard: { borderColor: "#3b82f6", backgroundColor: "#eff6ff" },
    row: { flexDirection: "row", alignItems: "center", gap: 10 },
    radioOuter: {
        height: 18,
        width: 18,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#94a3b8",
        justifyContent: "center",
        alignItems: "center",
    },
    radioActive: { borderColor: "#0275d8", backgroundColor: "#0275d8" },
    radioInner: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    logoContainer: { width: 55, marginLeft: "auto", alignItems: "flex-end" },
    carrierLogo: { width: 50, height: 30 },
    methodName: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
    descText: { color: "#64748b", fontSize: 12, marginTop: 2 },
    priceText: { fontSize: 16, fontWeight: "700", color: "#000" },
});

export default ShippingMethod;

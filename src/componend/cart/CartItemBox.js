// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// const CartItemBox = ({ clearCart = () => {} }) => {
//     const cartItems = [
//         {
//             id: "1",
//             name: "Baofeng BF-888s Licence Free Walkie Talkie Frequency 446-...",
//             price: "₹1,185.59",
//             image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//         },
//         {
//             id: "2",
//             name: "Baofeng BF-888s Licence Free Walkie Talkie Frequency 446-...",
//             price: "₹1,185.59",
//             image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//         },
//         {
//             id: "3",
//             name: "Baofeng BF-888s Licence Free Walkie Talkie Frequency 446-...",
//             price: "₹1,185.59",
//             image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//         },
//     ];

//     const renderItem = ({ item }) => (
//         <View style={styles.cartCard}>
//             <View style={styles.itemRow}>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         source={item.image}
//                         style={styles.productImage}
//                         resizeMode="contain"
//                     />
//                 </View>

//                 <View style={styles.detailsContainer}>
//                     <Text style={styles.productName} numberOfLines={2}>
//                         {item.name}
//                     </Text>
//                     <Text style={styles.unitPriceLabel}>
//                         Unit Price:{" "}
//                         <Text style={styles.priceValue}>{item.price}</Text>
//                     </Text>
//                 </View>
//             </View>

//             <View style={styles.actionRow}>
//                 <View style={styles.deliveryBadge}>
//                     <Feather name="truck" size={16} color="#15803d" />
//                     <Text style={styles.deliveryText}>HOME DELIVERY</Text>
//                 </View>

//                 <TouchableOpacity style={styles.deleteBtn}>
//                     <Feather name="trash-2" size={20} color="#94a3b8" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.headerTitle}>My cart (3)</Text>

//             <View style={styles.mainContent}>
//                 <View style={styles.listHeader}>
//                     <Text style={styles.sectionLabel}>Cart Items</Text>
//                     <TouchableOpacity
//                         style={styles.clearBtn}
//                         onPress={clearCart}
//                     >
//                         <MaterialCommunityIcons
//                             name="delete-sweep-outline"
//                             size={18}
//                             color="#ef4444"
//                         />
//                         <Text style={styles.clearText}>Clear Cart</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <FlatList
//                     data={cartItems}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id}
//                     contentContainerStyle={styles.listPadding}
//                     showsVerticalScrollIndicator={false}
//                     scrollEnabled={false}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "#1e293b",
//         paddingHorizontal: 10,
//         marginBottom: 15,
//     },
//     mainContent: {
//         backgroundColor: "#F3FBFF",
//         borderRadius: 24,
//         padding: 15,
//         marginHorizontal: 10,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#EBF7FD",
//         paddingBottom: 10,
//     },
//     listHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     sectionLabel: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#0f172a",
//     },
//     clearBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 4,
//     },
//     clearText: {
//         color: "#ef4444",
//         fontSize: 14,
//         fontWeight: "600",
//     },
//     cartCard: {
//         backgroundColor: "#fff",
//         borderRadius: 20,
//         padding: 16,
//         marginBottom: 16,
//         borderWidth: 1,
//         borderColor: "#E7E5E4",
//     },
//     itemRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 16,
//     },
//     imageContainer: {
//         width: 80,
//         height: 80,
//         backgroundColor: "#f8fafc",
//         borderRadius: 12,
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 12,
//     },
//     productImage: {
//         width: 60,
//         height: 60,
//     },
//     detailsContainer: {
//         flex: 1,
//     },
//     productName: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#1e293b",
//         lineHeight: 20,
//         marginBottom: 8,
//     },
//     unitPriceLabel: {
//         fontSize: 12,
//         color: "#64748b",
//     },
//     priceValue: {
//         fontWeight: "bold",
//         color: "#1e293b",
//     },
//     actionRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     deliveryBadge: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#f0fdf4",
//         paddingHorizontal: 10,
//         paddingVertical: 6,
//         borderRadius: 8,
//         gap: 6,
//     },
//     deliveryText: {
//         color: "#15803d",
//         fontSize: 12,
//         fontWeight: "700",
//     },
//     deleteBtn: {
//         padding: 4,
//     },
//     listPadding: {},
// });

// export default CartItemBox;

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCart } from "../../api/commonApi";

const CART_TOKEN_KEY = "baofeng_cart_token";

const CartItemBox = ({ clearCart = () => {}, cartItems = [] }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClearCart = () => {
        clearCart();
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartCard}>
            <View style={styles.itemRow}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.mainImageUrl }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.productName}
                    </Text>
                    <Text style={styles.unitPriceLabel}>
                        Unit Price:{" "}
                        <Text style={styles.priceValue}>
                            ₹{item.unitSellingPrice?.toLocaleString("en-IN")}
                        </Text>
                    </Text>
                    <Text style={styles.qtyLabel}>Qty: {item.quantity}</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <View style={styles.deliveryBadge}>
                    <Feather name="truck" size={16} color="#15803d" />
                    <Text style={styles.deliveryText}>HOME DELIVERY</Text>
                </View>
                <TouchableOpacity style={styles.deleteBtn}>
                    <Feather name="trash-2" size={20} color="#94a3b8" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>My cart ({cartItems.length})</Text>

            <View style={styles.mainContent}>
                <View style={styles.listHeader}>
                    <Text style={styles.sectionLabel}>Cart Items</Text>
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={handleClearCart}
                    >
                        <MaterialCommunityIcons
                            name="delete-sweep-outline"
                            size={18}
                            color="#ef4444"
                        />
                        <Text style={styles.clearText}>Clear Cart</Text>
                    </TouchableOpacity>
                </View>

                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.itemId}
                        contentContainerStyle={styles.listPadding}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    mainContent: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionLabel: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
    clearBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    clearText: { color: "#ef4444", fontSize: 14, fontWeight: "600" },
    cartCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E7E5E4",
    },
    itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    productImage: { width: 60, height: 60 },
    detailsContainer: { flex: 1 },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
        lineHeight: 20,
        marginBottom: 8,
    },
    unitPriceLabel: { fontSize: 12, color: "#64748b" },
    priceValue: { fontWeight: "bold", color: "#1e293b" },
    qtyLabel: { fontSize: 12, color: "#64748b", marginTop: 4 },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    deliveryBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    deliveryText: { color: "#15803d", fontSize: 12, fontWeight: "700" },
    deleteBtn: { padding: 4 },
    listPadding: {},
    emptyText: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: 14,
        paddingVertical: 20,
    },
    // Error state
    errorText: { color: "#ef4444", textAlign: "center", marginBottom: 10 },
    retryBtn: {
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#0069AF",
        borderRadius: 8,
    },
    retryText: { color: "#fff", fontWeight: "600" },
});

export default CartItemBox;

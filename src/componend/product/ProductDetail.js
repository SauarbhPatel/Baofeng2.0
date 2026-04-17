// // import React, { useState } from "react";
// // import {
// //     View,
// //     Text,
// //     StyleSheet,
// //     TouchableOpacity,
// //     TextInput,
// // } from "react-native";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { MaterialCommunityIcons } from "@expo/vector-icons";

// // const ProductDetail = () => {
// //     const [quantity, setQuantity] = useState(3);

// //     return (
// //         <View style={styles.container}>
// //             {/* Top Action Buttons */}
// //             <View style={styles.actionRow}>
// //                 <TouchableOpacity style={[styles.btn, styles.buyNowBtn]}>
// //                     <Text style={styles.buyNowText}>Buy Now</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={[styles.btn, styles.addToCartBtn]}>
// //                     <Text style={styles.addToCartText}>Add to Cart</Text>
// //                 </TouchableOpacity>
// //             </View>

// //             {/* Product Title and Info */}
// //             <Text style={styles.productTitle}>Baofeng BF-888s</Text>
// //             <Text style={styles.productDescription}>
// //                 Baofeng BF-888s Licence Free Walkie Talkie Frequency
// //                 446-446.20mHz and Output Power 0.5W with Talking Range Upto
// //                 1.5Kms pack-of-2
// //             </Text>

// //             {/* Ratings */}
// //             <View style={styles.ratingRow}>
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                     <MaterialCommunityIcons
// //                         key={star}
// //                         name="star"
// //                         size={24}
// //                         color="#FFC107"
// //                     />
// //                 ))}
// //             </View>

// //             {/* Brand Tag */}
// //             <View style={styles.brandTag}>
// //                 <Text style={styles.brandLabel}>Brand : </Text>
// //                 <Text style={styles.brandName}>BAOFENG</Text>
// //             </View>

// //             <View style={styles.divider} />

// //             <View style={styles.priceRow}>
// //                 <Text style={styles.mrpText}>
// //                     MRP: ₹{" "}
// //                     <Text style={{ textDecorationLine: "line-through" }}>
// //                         {" "}
// //                         2499
// //                     </Text>{" "}
// //                     <Text style={styles.discountText}>(Discount 28.01%)</Text>
// //                 </Text>
// //                 <Text style={styles.separator}> | </Text>
// //                 <Text style={styles.saleText}>Sale</Text>
// //             </View>
// //             <Text style={styles.finalPrice}>
// //                 <Text style={styles.saleText}>Price:</Text> ₹ 1799
// //             </Text>
// //             <View style={styles.divider} />

// //             <Text style={styles.taxInfo}>
// //                 Tax Inclusive. Shipping calculated at checkout
// //             </Text>

// //             {/* Delivery Check */}
// //             <View style={styles.deliveryRow}>
// //                 <Text style={styles.deliveryLabel}>COD Delivery:</Text>
// //                 <View style={styles.inputWrapper}>
// //                     <TextInput
// //                         placeholder="Enter Delivery Code"
// //                         style={styles.deliveryInput}
// //                         placeholderTextColor="#94a3b8"
// //                     />
// //                     <TouchableOpacity style={styles.checkBtn}>
// //                         <Text style={styles.checkText}>Check</Text>
// //                     </TouchableOpacity>
// //                 </View>
// //             </View>
// //             <View style={styles.divider} />

// //             {/* Quantity and Stock */}
// //             <View style={styles.stockRow}>
// //                 <View style={styles.quantityContainer}>
// //                     <TouchableOpacity
// //                         onPress={() => setQuantity(Math.max(1, quantity - 1))}
// //                         style={styles.qtyBtn}
// //                     >
// //                         <MaterialCommunityIcons
// //                             name="minus"
// //                             size={24}
// //                             color="#000"
// //                         />
// //                     </TouchableOpacity>
// //                     <Text style={styles.qtyText}>{quantity}</Text>
// //                     <TouchableOpacity
// //                         onPress={() => setQuantity(quantity + 1)}
// //                         style={styles.qtyBtn}
// //                     >
// //                         <MaterialCommunityIcons
// //                             name="plus"
// //                             size={24}
// //                             color="#000"
// //                         />
// //                     </TouchableOpacity>
// //                 </View>
// //                 <Text style={styles.stockText}>
// //                     12 <Text style={styles.instockText}>Instock</Text>
// //                 </Text>
// //             </View>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         borderRadius: 32,
// //         marginBottom: 15,
// //         marginHorizontal: 10,
// //     },
// //     actionRow: {
// //         flexDirection: "row",
// //         gap: 12,
// //         marginBottom: 24,
// //     },
// //     btn: {
// //         flex: 1,
// //         height: 54,
// //         borderRadius: 16,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         borderWidth: 2,
// //     },
// //     buyNowBtn: {
// //         backgroundColor: "#0066b2",
// //         borderColor: "#0066b2",
// //     },
// //     addToCartBtn: {
// //         backgroundColor: "transparent",
// //         borderColor: "#0066b2",
// //     },
// //     buyNowText: {
// //         color: "#fff",
// //         fontSize: 18,
// //         fontWeight: "bold",
// //     },
// //     addToCartText: {
// //         color: "#0066b2",
// //         fontSize: 18,
// //         fontWeight: "bold",
// //     },
// //     productTitle: {
// //         fontSize: 30,
// //         fontWeight: "900",
// //         color: "#000",
// //         marginBottom: 8,
// //     },
// //     productDescription: {
// //         fontSize: 15,
// //         color: "#64748b",
// //         lineHeight: 22,
// //         fontWeight: "600",
// //         marginBottom: 12,
// //     },
// //     ratingRow: {
// //         flexDirection: "row",
// //         marginBottom: 16,
// //     },
// //     brandTag: {
// //         backgroundColor: "#fff",
// //         alignSelf: "flex-start",
// //         flexDirection: "row",
// //         paddingHorizontal: 16,
// //         paddingVertical: 10,
// //         borderRadius: 15,
// //         alignItems: "center",
// //     },
// //     brandLabel: {
// //         color: "#64748b",
// //         fontSize: 16,
// //     },
// //     brandName: {
// //         color: "#0066b2",
// //         fontWeight: "900",
// //         fontStyle: "italic",
// //     },
// //     divider: {
// //         height: 1,
// //         backgroundColor: "#cbd5e1",
// //         marginVertical: 15,
// //         opacity: 0.5,
// //     },
// //     priceRow: {
// //         flexDirection: "row",
// //         alignItems: "center",
// //         marginBottom: 4,
// //     },
// //     mrpText: {
// //         fontSize: 15,
// //         color: "#64748b",
// //         fontWeight: "600",
// //     },
// //     discountText: {
// //         color: "#22c55e",
// //         fontWeight: "bold",
// //     },
// //     separator: {
// //         color: "#64748b",
// //         marginHorizontal: 8,
// //     },
// //     saleText: {
// //         fontSize: 15,
// //         color: "#64748b",
// //         fontWeight: "600",
// //     },
// //     finalPrice: {
// //         fontSize: 20,
// //         fontWeight: "800",
// //         color: "#000",
// //     },
// //     taxInfo: {
// //         fontSize: 13,
// //         color: "#4DA0ED",
// //         fontWeight: "500",
// //     },
// //     deliveryRow: {
// //         marginTop: 10,
// //         flexDirection: "row",
// //         alignItems: "center",
// //         justifyContent: "space-between",
// //     },
// //     deliveryLabel: {
// //         fontSize: 16,
// //         fontWeight: "700",
// //         color: "#000",
// //     },
// //     inputWrapper: {
// //         flexDirection: "row",
// //         // backgroundColor: "#f1f5f9",
// //         flex: 1,
// //         marginLeft: 10,
// //         alignItems: "center",
// //         paddingLeft: 15,
// //         height: 48,
// //         borderWidth: 1,
// //         borderColor: "#E2E2E2",
// //         borderRadius: 25,
// //     },
// //     deliveryInput: {
// //         flex: 1,
// //         fontSize: 14,
// //         color: "#000",
// //     },
// //     checkBtn: {
// //         backgroundColor: "#0066b2",
// //         height: "80%",
// //         paddingHorizontal: 20,
// //         borderRadius: 25,
// //         justifyContent: "center",
// //         margin: 5,
// //     },
// //     checkText: {
// //         color: "#fff",
// //         fontWeight: "600",
// //         fontSize: 13,
// //     },
// //     stockRow: {
// //         flexDirection: "row",
// //         alignItems: "center",
// //         borderRadius: 20,
// //         padding: 12,
// //         borderWidth: 1,
// //         borderColor: "#E2E2E2",
// //     },
// //     quantityContainer: {
// //         flexDirection: "row",
// //         backgroundColor: "#fff",
// //         borderRadius: 12,
// //         alignItems: "center",
// //         paddingHorizontal: 10,
// //         height: 45,
// //         flex: 1,
// //         justifyContent: "space-between",
// //     },
// //     qtyBtn: {
// //         padding: 5,
// //     },
// //     qtyText: {
// //         fontSize: 20,
// //         fontWeight: "bold",
// //     },
// //     stockText: {
// //         flex: 1,
// //         textAlign: "center",
// //         fontSize: 20,
// //         fontWeight: "bold",
// //     },
// //     instockText: {
// //         color: "#22c55e",
// //     },
// // });

// // export default ProductDetail;

// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     TextInput,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const ProductDetail = ({ product = {} }) => {
//     const [quantity, setQuantity] = useState(1);

//     const {
//         title = "",
//         description = "",
//         brandName = "BAOFENG",
//         listing = {},
//         stock = 0,
//         isInStock = false,
//     } = product;

//     const { unitSellingPrice = 0, unitMrp = 0 } = listing;

//     const discountPercent =
//         unitMrp > 0
//             ? (((unitMrp - unitSellingPrice) / unitMrp) * 100).toFixed(2)
//             : 0;

//     return (
//         <View style={styles.container}>
//             {/* Top Action Buttons */}
//             <View style={styles.actionRow}>
//                 <TouchableOpacity style={[styles.btn, styles.buyNowBtn]}>
//                     <Text style={styles.buyNowText}>Buy Now</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.btn, styles.addToCartBtn]}>
//                     <Text style={styles.addToCartText}>Add to Cart</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Product Title */}
//             <Text style={styles.productTitle}>{title}</Text>
//             <Text style={styles.productDescription}>{description}</Text>

//             {/* Ratings */}
//             <View style={styles.ratingRow}>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <MaterialCommunityIcons
//                         key={star}
//                         name="star"
//                         size={24}
//                         color="#FFC107"
//                     />
//                 ))}
//             </View>

//             {/* Brand Tag */}
//             <View style={styles.brandTag}>
//                 <Text style={styles.brandLabel}>Brand : </Text>
//                 <Text style={styles.brandName}>{brandName}</Text>
//             </View>

//             <View style={styles.divider} />

//             {/* Price Row */}
//             <View style={styles.priceRow}>
//                 <Text style={styles.mrpText}>
//                     MRP: ₹{" "}
//                     <Text style={{ textDecorationLine: "line-through" }}>
//                         {unitMrp}
//                     </Text>{" "}
//                     {discountPercent > 0 && (
//                         <Text style={styles.discountText}>
//                             (Discount {discountPercent}%)
//                         </Text>
//                     )}
//                 </Text>
//                 <Text style={styles.separator}> | </Text>
//                 <Text style={styles.saleText}>Sale</Text>
//             </View>
//             <Text style={styles.finalPrice}>
//                 <Text style={styles.saleText}>Price:</Text> ₹ {unitSellingPrice}
//             </Text>

//             <View style={styles.divider} />

//             <Text style={styles.taxInfo}>
//                 Tax Inclusive. Shipping calculated at checkout
//             </Text>

//             {/* Delivery Check */}
//             <View style={styles.deliveryRow}>
//                 <Text style={styles.deliveryLabel}>COD Delivery:</Text>
//                 <View style={styles.inputWrapper}>
//                     <TextInput
//                         placeholder="Enter Delivery Code"
//                         style={styles.deliveryInput}
//                         placeholderTextColor="#94a3b8"
//                     />
//                     <TouchableOpacity style={styles.checkBtn}>
//                         <Text style={styles.checkText}>Check</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <View style={styles.divider} />

//             {/* Quantity and Stock */}
//             <View style={styles.stockRow}>
//                 <View style={styles.quantityContainer}>
//                     <TouchableOpacity
//                         onPress={() => setQuantity(Math.max(1, quantity - 1))}
//                         style={styles.qtyBtn}
//                     >
//                         <MaterialCommunityIcons
//                             name="minus"
//                             size={24}
//                             color="#000"
//                         />
//                     </TouchableOpacity>
//                     <Text style={styles.qtyText}>{quantity}</Text>
//                     <TouchableOpacity
//                         onPress={() =>
//                             setQuantity(Math.min(stock, quantity + 1))
//                         }
//                         style={styles.qtyBtn}
//                     >
//                         <MaterialCommunityIcons
//                             name="plus"
//                             size={24}
//                             color="#000"
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.stockText}>
//                     {stock}{" "}
//                     <Text
//                         style={
//                             isInStock
//                                 ? styles.instockText
//                                 : styles.outofstockText
//                         }
//                     >
//                         {isInStock ? "Instock" : "Out of Stock"}
//                     </Text>
//                 </Text>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         borderRadius: 32,
//         marginBottom: 15,
//         marginHorizontal: 10,
//     },
//     actionRow: {
//         flexDirection: "row",
//         gap: 12,
//         marginBottom: 24,
//     },
//     btn: {
//         flex: 1,
//         height: 54,
//         borderRadius: 16,
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 2,
//     },
//     buyNowBtn: {
//         backgroundColor: "#0066b2",
//         borderColor: "#0066b2",
//     },
//     addToCartBtn: {
//         backgroundColor: "transparent",
//         borderColor: "#0066b2",
//     },
//     buyNowText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//     addToCartText: { color: "#0066b2", fontSize: 18, fontWeight: "bold" },
//     productTitle: {
//         fontSize: 30,
//         fontWeight: "900",
//         color: "#000",
//         marginBottom: 8,
//     },
//     productDescription: {
//         fontSize: 15,
//         color: "#64748b",
//         lineHeight: 22,
//         fontWeight: "600",
//         marginBottom: 12,
//     },
//     ratingRow: { flexDirection: "row", marginBottom: 16 },
//     brandTag: {
//         backgroundColor: "#fff",
//         alignSelf: "flex-start",
//         flexDirection: "row",
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         borderRadius: 15,
//         alignItems: "center",
//     },
//     brandLabel: { color: "#64748b", fontSize: 16 },
//     brandName: { color: "#0066b2", fontWeight: "900", fontStyle: "italic" },
//     divider: {
//         height: 1,
//         backgroundColor: "#cbd5e1",
//         marginVertical: 15,
//         opacity: 0.5,
//     },
//     priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
//     mrpText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
//     discountText: { color: "#22c55e", fontWeight: "bold" },
//     separator: { color: "#64748b", marginHorizontal: 8 },
//     saleText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
//     finalPrice: { fontSize: 20, fontWeight: "800", color: "#000" },
//     taxInfo: { fontSize: 13, color: "#4DA0ED", fontWeight: "500" },
//     deliveryRow: {
//         marginTop: 10,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//     },
//     deliveryLabel: { fontSize: 16, fontWeight: "700", color: "#000" },
//     inputWrapper: {
//         flexDirection: "row",
//         flex: 1,
//         marginLeft: 10,
//         alignItems: "center",
//         paddingLeft: 15,
//         height: 48,
//         borderWidth: 1,
//         borderColor: "#E2E2E2",
//         borderRadius: 25,
//     },
//     deliveryInput: { flex: 1, fontSize: 14, color: "#000" },
//     checkBtn: {
//         backgroundColor: "#0066b2",
//         height: "80%",
//         paddingHorizontal: 20,
//         borderRadius: 25,
//         justifyContent: "center",
//         margin: 5,
//     },
//     checkText: { color: "#fff", fontWeight: "600", fontSize: 13 },
//     stockRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderRadius: 20,
//         padding: 12,
//         borderWidth: 1,
//         borderColor: "#E2E2E2",
//     },
//     quantityContainer: {
//         flexDirection: "row",
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         alignItems: "center",
//         paddingHorizontal: 10,
//         height: 45,
//         flex: 1,
//         justifyContent: "space-between",
//     },
//     qtyBtn: { padding: 5 },
//     qtyText: { fontSize: 20, fontWeight: "bold" },
//     stockText: {
//         flex: 1,
//         textAlign: "center",
//         fontSize: 20,
//         fontWeight: "bold",
//     },
//     instockText: { color: "#22c55e" },
//     outofstockText: { color: "#ef4444" },
// });

// export default ProductDetail;

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkPincode, addToCart } from "../../api/commonApi";

const CART_TOKEN_KEY = "baofeng_cart_token";

const ProductDetail = ({ product = {} }) => {
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState("");
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeResult, setPincodeResult] = useState(null); // { serviceable, codAllowed }
    const [cartLoading, setCartLoading] = useState(false);

    const {
        title = "",
        description = "",
        brandName = "BAOFENG",
        listing = {},
        stock = 0,
        isInStock = false,
        productId = "",
    } = product;

    const { unitSellingPrice = 0, unitMrp = 0, listingMongoId = "" } = listing;

    const discountPercent =
        unitMrp > 0
            ? (((unitMrp - unitSellingPrice) / unitMrp) * 100).toFixed(2)
            : 0;

    // ── COD / Pincode check ────────────────────────────────────
    const handlePincodeCheck = async () => {
        if (pincode.length !== 6) {
            Alert.alert(
                "Invalid Pincode",
                "Please enter a valid 6-digit pincode.",
            );
            return;
        }
        try {
            setPincodeLoading(true);
            setPincodeResult(null);
            const res = await checkPincode(pincode);
            if (res?.success) {
                setPincodeResult(res.data);
            } else {
                Alert.alert("Error", "Could not check pincode. Try again.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setPincodeLoading(false);
        }
    };

    // ── Add to Cart ────────────────────────────────────────────
    const handleAddToCart = async () => {
        if (!productId || !listingMongoId) {
            Alert.alert("Error", "Product information missing.");
            return;
        }
        try {
            setCartLoading(true);
            // Read existing cart token from AsyncStorage
            const savedToken = await AsyncStorage.getItem(CART_TOKEN_KEY);

            const payload = {
                productId,
                listingId: listingMongoId,
                quantity,
                ...(savedToken ? { cartToken: savedToken } : {}),
            };

            const res = await addToCart(payload);

            if (res?.success && res?.data?.cartToken) {
                // Persist cart token for subsequent adds
                await AsyncStorage.setItem(CART_TOKEN_KEY, res.data.cartToken);
                Alert.alert(
                    "Added to Cart ✓",
                    `${res.data.items?.length || 1} item(s) in your cart.`,
                );
            } else {
                Alert.alert("Error", "Could not add to cart. Try again.");
            }
        } catch {
            Alert.alert("Error", "Network error. Please try again.");
        } finally {
            setCartLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Action Buttons */}
            <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.btn, styles.buyNowBtn]}>
                    <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        styles.addToCartBtn,
                        cartLoading && styles.btnDisabled,
                    ]}
                    onPress={handleAddToCart}
                    disabled={cartLoading}
                >
                    {cartLoading ? (
                        <ActivityIndicator color="#0066b2" size="small" />
                    ) : (
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Product Title */}
            <Text style={styles.productTitle}>{title}</Text>
            <Text style={styles.productDescription}>{description}</Text>

            {/* Ratings */}
            <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialCommunityIcons
                        key={star}
                        name="star"
                        size={24}
                        color="#FFC107"
                    />
                ))}
            </View>

            {/* Brand Tag */}
            <View style={styles.brandTag}>
                <Text style={styles.brandLabel}>Brand : </Text>
                <Text style={styles.brandName}>{brandName}</Text>
            </View>

            <View style={styles.divider} />

            {/* Price Row */}
            <View style={styles.priceRow}>
                <Text style={styles.mrpText}>
                    MRP: ₹{" "}
                    <Text style={{ textDecorationLine: "line-through" }}>
                        {unitMrp}
                    </Text>{" "}
                    {discountPercent > 0 && (
                        <Text style={styles.discountText}>
                            (Discount {discountPercent}%)
                        </Text>
                    )}
                </Text>
                <Text style={styles.separator}> | </Text>
                <Text style={styles.saleText}>Sale</Text>
            </View>
            <Text style={styles.finalPrice}>
                <Text style={styles.saleText}>Price:</Text> ₹ {unitSellingPrice}
            </Text>

            <View style={styles.divider} />
            <Text style={styles.taxInfo}>
                Tax Inclusive. Shipping calculated at checkout
            </Text>

            {/* ── COD Delivery Check ────────────────────────── */}
            <View style={styles.deliveryRow}>
                <Text style={styles.deliveryLabel}>COD Delivery:</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Enter Pincode"
                        style={styles.deliveryInput}
                        placeholderTextColor="#94a3b8"
                        keyboardType="number-pad"
                        maxLength={6}
                        value={pincode}
                        onChangeText={(t) => {
                            setPincode(t);
                            setPincodeResult(null);
                        }}
                    />
                    <TouchableOpacity
                        style={[
                            styles.checkBtn,
                            pincodeLoading && styles.btnDisabled,
                        ]}
                        onPress={handlePincodeCheck}
                        disabled={pincodeLoading}
                    >
                        {pincodeLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.checkText}>Check</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Pincode result badge */}
            {pincodeResult && (
                <View
                    style={[
                        styles.pincodeBadge,
                        pincodeResult.serviceable
                            ? styles.pincodeBadgeSuccess
                            : styles.pincodeBadgeFail,
                    ]}
                >
                    <Feather
                        name={
                            pincodeResult.serviceable
                                ? "check-circle"
                                : "x-circle"
                        }
                        size={14}
                        color={
                            pincodeResult.serviceable ? "#16a34a" : "#dc2626"
                        }
                    />
                    <Text
                        style={[
                            styles.pincodeBadgeText,
                            pincodeResult.serviceable
                                ? styles.pincodeBadgeTextSuccess
                                : styles.pincodeBadgeTextFail,
                        ]}
                    >
                        {pincodeResult.serviceable
                            ? `Delivery available${pincodeResult.codAllowed ? " · COD allowed" : " · Prepaid only"}`
                            : "Delivery not available for this pincode"}
                    </Text>
                </View>
            )}

            <View style={styles.divider} />

            {/* Quantity and Stock */}
            <View style={styles.stockRow}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        style={styles.qtyBtn}
                    >
                        <MaterialCommunityIcons
                            name="minus"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            setQuantity(Math.min(stock, quantity + 1))
                        }
                        style={styles.qtyBtn}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.stockText}>
                    {stock}{" "}
                    <Text
                        style={
                            isInStock
                                ? styles.instockText
                                : styles.outofstockText
                        }
                    >
                        {isInStock ? "Instock" : "Out of Stock"}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 32,
        marginBottom: 15,
        marginHorizontal: 10,
    },
    actionRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
    btn: {
        flex: 1,
        height: 54,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },
    buyNowBtn: { backgroundColor: "#0066b2", borderColor: "#0066b2" },
    addToCartBtn: { backgroundColor: "transparent", borderColor: "#0066b2" },
    btnDisabled: { opacity: 0.6 },
    buyNowText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    addToCartText: { color: "#0066b2", fontSize: 18, fontWeight: "bold" },
    productTitle: {
        fontSize: 30,
        fontWeight: "900",
        color: "#000",
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 15,
        color: "#64748b",
        lineHeight: 22,
        fontWeight: "600",
        marginBottom: 12,
    },
    ratingRow: { flexDirection: "row", marginBottom: 16 },
    brandTag: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: "center",
    },
    brandLabel: { color: "#64748b", fontSize: 16 },
    brandName: { color: "#0066b2", fontWeight: "900", fontStyle: "italic" },
    divider: {
        height: 1,
        backgroundColor: "#cbd5e1",
        marginVertical: 15,
        opacity: 0.5,
    },
    priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    mrpText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
    discountText: { color: "#22c55e", fontWeight: "bold" },
    separator: { color: "#64748b", marginHorizontal: 8 },
    saleText: { fontSize: 15, color: "#64748b", fontWeight: "600" },
    finalPrice: { fontSize: 20, fontWeight: "800", color: "#000" },
    taxInfo: { fontSize: 13, color: "#4DA0ED", fontWeight: "500" },
    // ── Delivery row ──────────────────────────────────────────
    deliveryRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    deliveryLabel: { fontSize: 16, fontWeight: "700", color: "#000" },
    inputWrapper: {
        flexDirection: "row",
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
        paddingLeft: 15,
        height: 48,
        borderWidth: 1,
        borderColor: "#E2E2E2",
        borderRadius: 25,
    },
    deliveryInput: { flex: 1, fontSize: 14, color: "#000" },
    checkBtn: {
        backgroundColor: "#0066b2",
        height: "80%",
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: "center",
        margin: 5,
    },
    checkText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    // ── Pincode result badge ───────────────────────────────────
    pincodeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    pincodeBadgeSuccess: {
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    pincodeBadgeFail: {
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    pincodeBadgeText: { fontSize: 13, fontWeight: "600", flex: 1 },
    pincodeBadgeTextSuccess: { color: "#16a34a" },
    pincodeBadgeTextFail: { color: "#dc2626" },
    // ── Stock / Qty ────────────────────────────────────────────
    stockRow: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: "#E2E2E2",
    },
    quantityContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        paddingHorizontal: 10,
        height: 45,
        flex: 1,
        justifyContent: "space-between",
    },
    qtyBtn: { padding: 5 },
    qtyText: { fontSize: 20, fontWeight: "bold" },
    stockText: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    instockText: { color: "#22c55e" },
    outofstockText: { color: "#ef4444" },
});

export default ProductDetail;

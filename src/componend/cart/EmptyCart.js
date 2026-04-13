import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const EmptyCart = () => {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.pageTitle}>My cart</Text>

            <LinearGradient
                colors={["#f8fbff", "#eef6ff"]}
                style={styles.mainCard}
            >
                <View style={styles.illustrationWrapper}>
                    <View style={styles.circleBg}>
                        <Image
                            source={require("../../assets/images/empty_cart.png")}
                            style={styles.cartImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.mainTitle}>
                        You Cart is{" "}
                        <Text style={styles.highlightText}>Empty</Text>
                    </Text>

                    <Text style={styles.description}>
                        Must add items on the cart before you proceed checkout
                    </Text>

                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={["#0069AF", "#0069AF"]}
                            style={styles.button}
                        >
                            <Feather
                                name="shopping-bag"
                                size={18}
                                color="#fff"
                            />
                            <Text style={styles.buttonText}>
                                RETURN TO SHOP
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    mainCard: {
        marginHorizontal: 10,
        borderRadius: 28,
        overflow: "hidden",
    },
    illustrationWrapper: {
        flex: 1.2,
        justifyContent: "center",
        alignItems: "center",
    },
    circleBg: {
        height: 280,
        justifyContent: "center",
        alignItems: "center",
    },
    cartImage: {
        width: 200,
        height: 200,
    },
    contentSection: {
        flex: 1,
        backgroundColor: "#f8fbff",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingTop: 20,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#334155",
        textAlign: "center",
        marginBottom: 10,
    },
    highlightText: {
        color: "#ff8e53",
    },
    description: {
        fontSize: 15,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 15,
        fontWeight: "500",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 35,
        borderRadius: 30,
        gap: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});

export default EmptyCart;

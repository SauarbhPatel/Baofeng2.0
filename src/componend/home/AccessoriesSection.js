import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
const ACCESSORIES_DATA = [
    {
        id: "1",
        name: "Walkie Talkie Charger",
        image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
    },
    {
        id: "2",
        name: "Walkie Talkie Battery",
        image: require("../../assets/images/645968528d146d72ba078b258c8da6878940f2d2.png"),
    },
    {
        id: "3",
        name: "Walkie Talkie Charger",
        image: require("../../assets/images/39f35aedd5ce467bcd35726dd695c50ea455c00c.png"),
    },
    {
        id: "4",
        name: "Walkie Talkie Battery",
        image: require("../../assets/images/b6b708e9ce280094349963b78fbf1b69b1f20650.png"),
    },
];

const AccessoriesSection = ({ onViewAll }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#0B399D", "#0069AF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.blueCard}
            >
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Accessories</Text>
                    <TouchableOpacity
                        onPress={onViewAll}
                        style={styles.viewAllBtn}
                    >
                        <Text style={styles.viewAllText}>View All</Text>
                        <Feather name="arrow-right" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.grid}>
                    {ACCESSORIES_DATA.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemCard}
                            activeOpacity={0.8}
                        >
                            <View style={styles.whiteBox}>
                                <Image
                                    source={item.image}
                                    style={styles.productImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.itemName} numberOfLines={2}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    blueCard: {
        borderRadius: 24,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    itemCard: {
        width: "48%",
        marginBottom: 20,
    },
    whiteBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
    },
    productImage: {
        width: "85%",
        height: "85%",
    },
    itemName: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        lineHeight: 18,
    },
});

export default AccessoriesSection;

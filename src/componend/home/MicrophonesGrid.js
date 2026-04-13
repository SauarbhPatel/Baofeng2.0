import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import HomeBanner1 from "./HomeBanner1";
const { width: screenWidth } = Dimensions.get("window");

const products = [
    {
        id: "1",
        title: "Baofeng UV-5R Black Speaker Microphone",
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
    {
        id: "2",
        title: "Baofeng UV-5R Black Speaker Microphone",
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
    {
        id: "3",
        title: "Baofeng UV-5R Black Speaker Microphone",
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
    {
        id: "4",
        title: "Baofeng UV-5R Black Speaker Microphone",
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
];

const MicrophonesGrid = () => {
    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.circleWrapper}>
                <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <LinearGradient
            colors={["#0B399D", "#0069AF"]}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Microphones</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Feather name="arrow-right" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <HomeBanner1
                imageSource={require("../../assets/images/banner4.png")}
                dynamicScreenWidth={screenWidth - 60}
            />

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                scrollEnabled={false}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius: 24,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
    },
    heroBanner: {
        width: "100%",
        height: 180,
        marginBottom: 30,
        justifyContent: "center",
    },
    heroOverlay: {
        paddingLeft: 20,
    },
    heroSubText: {
        color: "#ccc",
        fontSize: 22,
        fontWeight: "300",
    },
    heroMainText: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        lineHeight: 32,
    },
    row: {
        justifyContent: "space-around",
        marginBottom: 25,
    },
    cardContainer: {
        width: "45%",
        alignItems: "center",
    },
    circleWrapper: {
        backgroundColor: "#dce6f2",
        width: 130,
        height: 130,
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.2)",
    },
    productImage: {
        width: "75%",
        height: "75%",
    },
    productTitle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        paddingHorizontal: 5,
    },
});

export default MicrophonesGrid;

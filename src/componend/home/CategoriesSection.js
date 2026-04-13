import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Sample Data - replace image URIs with your local require() calls
const CATEGORIES = [
    {
        id: "1",
        name: "Chargers",
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
    },
    {
        id: "2",
        name: "BF-888s",
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
    {
        id: "3",
        name: "UV-13PRO",
        image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
    },
    // Add more items as needed
];

const CategoriesSection = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryCard} activeOpacity={0.7}>
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Shop By Categories</Text>
            <FlatList
                data={CATEGORIES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    listPadding: {
        paddingHorizontal: 5,
    },
    categoryCard: {
        alignItems: "center",
        marginHorizontal: 8,
        width: width * 0.3, // Adjust width to show ~3 items on screen
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1, // Keep it square
        backgroundColor: "#F8F9FB",
        borderRadius: 25, // High rounding to match your premium UI
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    categoryImage: {
        width: "70%",
        height: "70%",
    },
    categoryName: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "600",
        color: "#90A4AE", // Muted blue-grey color from your screenshot
        textAlign: "center",
    },
});

export default CategoriesSection;

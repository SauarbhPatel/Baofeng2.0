import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

const VariantCard = () => {
    const [selectedVariant, setSelectedVariant] = useState("Pack Of 2");

    const variants = [
        {
            id: "1",
            label: "Pack Of 1",
            image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
        },
        {
            id: "2",
            label: "Pack Of 2",
            image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
        },
        {
            id: "3",
            label: "Pack Of 3",
            image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
        },
        {
            id: "4",
            label: "Pack Of 4",
            image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
        },
        {
            id: "5",
            label: "Pack Of 6",
            image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
        },
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {variants.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectedVariant(item.label)}
                    style={styles.variantWrapper}
                >
                    {/* Image Container */}
                    <View
                        style={[
                            styles.imageContainer,
                            selectedVariant === item.label &&
                                styles.selectedContainer,
                        ]}
                    >
                        <Image
                            source={item.image}
                            style={styles.radioImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Label */}
                    <Text
                        style={[
                            styles.label,
                            selectedVariant === item.label &&
                                styles.selectedLabel,
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 10,
        // paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
    },
    variantWrapper: {
        alignItems: "center",
        marginRight: 16,
        // width: 90,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#f8fafc", // Default light background
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    selectedContainer: {
        backgroundColor: "#0056b3",
        borderColor: "#0056b3",
    },
    radioImage: {
        width: 40,
        height: 40,
    },
    label: {
        fontSize: 12,
        fontWeight: "500",
        color: "#475569", // Default slate color
        textAlign: "center",
    },
    selectedLabel: {
        color: "#0f172a", // Darker emphasis for selected label
        fontWeight: "800",
    },
});

export default VariantCard;

import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const ProductGallery = () => {
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        {
            id: "1",
            source: require("../../assets/images/product/product_main.png"),
        },
        {
            id: "2",
            source: require("../../assets/images/product/small1.png"),
        },
        {
            id: "3",
            source: require("../../assets/images/product/small2.png"),
        },
        {
            id: "4",
            source: require("../../assets/images/product/small3.png"),
        },
        {
            id: "5",
            source: require("../../assets/images/product/small4.png"),
        },
    ];

    const renderThumbnail = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => setActiveImage(index)}
            activeOpacity={0.8}
            style={[
                styles.thumbnailWrapper,
                activeImage === index && styles.activeThumbnail,
            ]}
        >
            <Image source={item.source} style={styles.thumbnailImage} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Main Featured Image */}
            <View style={styles.mainImageContainer}>
                <Image
                    source={images[activeImage].source}
                    style={styles.mainImage}
                    resizeMode="cover"
                />
            </View>

            {/* Thumbnail Strip */}
            <View style={styles.thumbnailContainer}>
                <FlatList
                    data={images}
                    renderItem={renderThumbnail}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listPadding}
                />
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
    mainImageContainer: {
        width: "100%",
        height: width * 0.9,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    mainImage: {
        width: "100%",
        height: "100%",
    },
    thumbnailContainer: {
        marginTop: 16,
    },
    listPadding: {
        paddingRight: 20,
    },
    thumbnailWrapper: {
        width: 75,
        height: 75,
        borderRadius: 12,
        marginRight: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "transparent",
    },
    activeThumbnail: {
        borderColor: "#0275d8", // Highlight color for active image
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default ProductGallery;

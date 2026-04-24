import { LinearGradient } from "expo-linear-gradient";

import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ProductGallery = ({ mainImageUrl, galleryImageUrls = [] }) => {
    const [activeImage, setActiveImage] = useState(0);

    // Build images array: main image first, then gallery
    const images = [
        { id: "main", source: mainImageUrl },
        ...galleryImageUrls.map((url, i) => ({
            id: `gallery_${i}`,
            source: url,
        })),
    ].filter((img) => !!img.source);

    const renderThumbnail = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => setActiveImage(index)}
            activeOpacity={0.8}
            style={[
                styles.thumbnailWrapper,
                activeImage === index && styles.activeThumbnail,
            ]}
        >
            <Image
                source={{ uri: item.source }}
                style={styles.thumbnailImage}
            />
        </TouchableOpacity>
    );

    if (!images.length) return null;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#EAEEFF", "#FFFFFF"]}
                style={styles.mainCard}
            >
                {/* Main Featured Image */}
                <View style={styles.mainImageContainer}>
                    <Image
                        source={{ uri: images[activeImage]?.source }}
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
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        marginBottom: 15,
        marginHorizontal: 10,
        // borderWidth: 1,
        overflow: "hidden",
    },
    mainCard: { padding: 10, borderRadius: 8, flex: 1 },
    mainImageContainer: {
        width: "100%",
        height: width * 0.9,
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#EAEEFF",
    },
    mainImage: {
        width: "100%",
        height: "100%",
    },
    thumbnailContainer: {
        marginTop: 16,
    },
    listPadding: {
        // paddingRight: 20,
        gap: 10,
    },
    thumbnailWrapper: {
        width: 75,
        height: 75,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#EAEEFF",
    },
    activeThumbnail: {
        borderColor: "#0275d8",
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default ProductGallery;

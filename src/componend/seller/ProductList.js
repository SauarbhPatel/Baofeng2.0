import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ProductList = ({ lable }) => {
    // Sample data based on your design
    const products = [
        {
            id: "1",
            title: "BAOFENG BF-888S LICENCE",
            price: "₹129.00",
            oldPrice: "₹159.00",
            rating: 3,
            isNew: false,
            image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
        },
        {
            id: "2",
            title: "BAOFENG BF-888S LICENCE",
            price: "₹129.00",
            oldPrice: "₹159.00",
            rating: 3,
            isNew: true,
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
        },
        {
            id: "3",
            title: "BAOFENG BF-888S LICENCE",
            price: "₹129.00",
            oldPrice: "₹159.00",
            rating: 3,
            isNew: true,
            image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
        },
    ];

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star"
                    size={14}
                    color={i <= rating ? "#facc15" : "#cbd5e1"}
                    style={{ marginHorizontal: 1 }}
                />,
            );
        }
        return stars;
    };

    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
            {/* "NEW" Badge */}
            {item.isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                    <View style={styles.badgeTail} />
                </View>
            )}

            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>

            {/* Product Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>{item.price}</Text>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                </View>
                <View style={styles.ratingRow}>{renderStars(item.rating)}</View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.actionFooter}>
                <TouchableOpacity style={styles.iconAction}>
                    <Feather name="shopping-cart" size={20} color="#94a3b8" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyNowBtn}>
                    <Text style={styles.buyNowText}>BUY NOW</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconAction}>
                    <FontAwesome name="heart" size={20} color="#94a3b8" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {lable ? <Text style={styles.listHeader}>{lable}</Text> : null}
            <FlatList
                data={products}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listHeader: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    listContent: {
        paddingBottom: 20,
    },
    productCard: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    newBadge: {
        position: "absolute",
        top: 15,
        left: 15,
        backgroundColor: "#1EA2D3",
        paddingHorizontal: 12,
        paddingVertical: 4,
        zIndex: 10,
        borderRadius: 4,
    },
    newBadgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "900",
    },
    imageContainer: {
        height: 250,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        alignItems: "center",
        paddingBottom: 15,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: 5,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    currentPrice: {
        fontSize: 13,
        fontWeight: "800",
        color: "#0064a3",
    },
    oldPrice: {
        fontSize: 12,
        color: "#cbd5e1",
        textDecorationLine: "line-through",
    },
    ratingRow: {
        flexDirection: "row",
    },
    actionFooter: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        height: 40,
    },
    iconAction: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#f1f5f9",
    },
    buyNowBtn: {
        flex: 3,
        backgroundColor: "#0064a3", // Design primary blue
        justifyContent: "center",
        alignItems: "center",
    },
    buyNowText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 12,
    },
});

export default ProductList;

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const products = [
    {
        id: "1",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
    },
    {
        id: "2",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: true,
        active: false,
        image: require("../../assets/images/645968528d146d72ba078b258c8da6878940f2d2.png"),
    },
    {
        id: "3",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
    },
    {
        id: "4",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/287a20ea431c80761203c9f3c075d7b29b6401f1.png"),
    },
    {
        id: "5",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/287a20ea431c80761203c9f3c075d7b29b6401f1.png"),
    },
    {
        id: "6",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/b6b708e9ce280094349963b78fbf1b69b1f20650.png"),
    },
    {
        id: "7",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
    },
    {
        id: "8",
        name: "BAOFENG BF-888S LICENCE",
        price: "₹129.00",
        oldPrice: "₹150.00",
        isNew: false,
        active: false,
        image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
    },
    // Add more items to fill the grid...
];

const SimilarProducts = () => {
    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            {item.isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                </View>
            )}

            <Image
                source={item?.image}
                style={styles.productImage}
                resizeMode="contain"
            />

            <Text style={styles.productName} numberOfLines={1}>
                {item.name}
            </Text>

            <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>{item.price}</Text>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="cart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.buyBtn,
                        item.active
                            ? styles.buyBtnActive
                            : styles.buyBtnInactive,
                    ]}
                >
                    <Text
                        style={[
                            styles.buyBtnText,
                            item.active
                                ? styles.buyTextActive
                                : styles.buyTextInactive,
                        ]}
                    >
                        BUY NOW
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="heart"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>
                <Text style={styles.blueText}>Similar</Text> Products
            </Text>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        paddingTop: 15,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    sectionTitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 15,
        color: "#1e293b",
    },
    blueText: {
        fontWeight: "700",
        color: "#0284c7",
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#fff",
        width: "48%",
        borderRadius: 8,
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        alignItems: "center",
        position: "relative",
    },
    newBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "#0ea5e9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 1,
    },
    newBadgeText: {
        color: "#fff",
        fontSize: 8,
    },
    productImage: {
        width: 100,
        height: 120,
        marginBottom: 10,
    },
    productName: {
        fontSize: 10,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 4,
        textAlign: "center",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
    },
    currentPrice: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#0284c7",
    },
    oldPrice: {
        fontSize: 9,
        color: "#94a3b8",
        textDecorationLine: "line-through",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        borderColor: "#F4F4F4",
    },
    buyBtn: {
        paddingVertical: 6,
        paddingHorizontal: 5,
        flex: 0.8,
        alignItems: "center",
    },
    buyBtnActive: {
        backgroundColor: "#0284c7",
    },
    buyBtnInactive: {
        backgroundColor: "transparent",
    },
    buyBtnText: {
        fontSize: 10,
        fontWeight: "800",
    },
    buyTextActive: {
        color: "#fff",
    },
    buyTextInactive: {
        color: "#0284c7",
    },
});

export default SimilarProducts;

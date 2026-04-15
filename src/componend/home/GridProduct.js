// import React from "react";
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     TouchableOpacity,
//     FlatList,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// const products = [
//     {
//         id: "1",
//         title: "Walkie Talkie Charger",
//         views: 2,
//         image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
//     },
//     {
//         id: "2",
//         title: "Walkie Talkie Battery",
//         views: 1,
//         image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
//     },
//     {
//         id: "3",
//         title: "Walkie Talkie Charger",
//         views: 3,
//         image: require("../../assets/images/39f35aedd5ce467bcd35726dd695c50ea455c00c.png"),
//     },
//     {
//         id: "4",
//         title: "Walkie Talkie Battery",
//         views: 1,
//         image: require("../../assets/images/645968528d146d72ba078b258c8da6878940f2d2.png"),
//     },
// ];

// const GridProduct = ({
//     gradientColors = ["#FFFFFF", "#D7E9F2"],
//     lable = "",
// }) => {
//     const renderItem = ({ item }) => (
//         <View style={styles.cardContainer}>
//             <View style={styles.imageWrapper}>
//                 <Image
//                     source={item.image}
//                     style={styles.productImage}
//                     resizeMode="contain"
//                 />
//             </View>
//             <Text style={styles.productTitle}>{item.title}</Text>
//             <Text style={styles.viewCount}>{item.views} viewed</Text>
//         </View>
//     );

//     return (
//         <LinearGradient colors={gradientColors} style={styles.mainContainer}>
//             <View style={styles.header}>
//                 <Text style={styles.headerTitle}>{lable}</Text>
//                 <TouchableOpacity style={styles.viewAllButton}>
//                     <Text style={styles.viewAllText}>View All</Text>
//                     <Feather name="arrow-right" size={14} color="#0275d8" />
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 data={products}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 numColumns={2}
//                 columnWrapperStyle={styles.row}
//                 scrollEnabled={false}
//             />
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         borderRadius: 24,
//         padding: 20,
//         marginHorizontal: 10,
//         borderWidth: 0.5,
//         borderColor: "#C7DBE5",
//         marginBottom: 15,
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: "600",
//         color: "#1e293b",
//     },
//     viewAllButton: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     viewAllText: {
//         color: "#0275d8",
//         fontSize: 14,
//         marginRight: 5,
//         fontWeight: "500",
//     },
//     row: {
//         justifyContent: "space-between",
//         marginBottom: 20,
//     },
//     cardContainer: {
//         width: "48%",
//     },
//     imageWrapper: {
//         backgroundColor: "#FFFFFF",
//         borderRadius: 15,
//         height: 120,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 12,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: "#EDF1FA",
//     },
//     productImage: {
//         width: "85%",
//         height: "85%",
//     },
//     productTitle: {
//         color: "#334155",
//         fontSize: 15,
//         fontWeight: "700",
//         lineHeight: 18,
//     },
//     viewCount: {
//         fontSize: 13,
//         color: "#94a3b8",
//         marginTop: 4,
//     },
// });

// export default GridProduct;

import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { GridProductSkeleton } from "../common/SkeletonLoader";

const products = [
    {
        id: "1",
        title: "Walkie Talkie Charger",
        views: 2,
        image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
    },
    {
        id: "2",
        title: "Walkie Talkie Battery",
        views: 1,
        image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
    },
    {
        id: "3",
        title: "Walkie Talkie Charger",
        views: 3,
        image: require("../../assets/images/39f35aedd5ce467bcd35726dd695c50ea455c00c.png"),
    },
    {
        id: "4",
        title: "Walkie Talkie Battery",
        views: 1,
        image: require("../../assets/images/645968528d146d72ba078b258c8da6878940f2d2.png"),
    },
];

const GridProduct = ({
    gradientColors = ["#FFFFFF", "#D7E9F2"],
    lable = "",
    loading = false,
}) => {
    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.imageWrapper}>
                <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.viewCount}>{item.views} viewed</Text>
        </View>
    );

    return (
        <LinearGradient colors={gradientColors} style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{lable}</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Feather name="arrow-right" size={14} color="#0275d8" />
                </TouchableOpacity>
            </View>

            {/* ── Skeleton shimmer while loading ── */}
            {loading ? (
                <View style={styles.skeletonGrid}>
                    {[1, 2, 3, 4].map((i) => (
                        <GridProductSkeleton key={i} />
                    ))}
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false}
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 24,
        padding: 20,
        marginHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "#C7DBE5",
        marginBottom: 15,
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
        color: "#1e293b",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#0275d8",
        fontSize: 14,
        marginRight: 5,
        fontWeight: "500",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    skeletonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardContainer: {
        width: "48%",
    },
    imageWrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#EDF1FA",
    },
    productImage: {
        width: "85%",
        height: "85%",
    },
    productTitle: {
        color: "#334155",
        fontSize: 15,
        fontWeight: "700",
        lineHeight: 18,
    },
    viewCount: {
        fontSize: 13,
        color: "#94a3b8",
        marginTop: 4,
    },
});

export default GridProduct;

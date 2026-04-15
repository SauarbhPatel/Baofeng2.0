// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     Image,
//     TouchableOpacity,
//     Dimensions,
// } from "react-native";

// const { width } = Dimensions.get("window");

// // Sample Data - replace image URIs with your local require() calls
// const CATEGORIES = [
//     {
//         id: "1",
//         name: "Chargers",
//         image: require("../../assets/images/bb81bc903cd264300ba5b10b1013095c65f4abe2.png"),
//     },
//     {
//         id: "2",
//         name: "BF-888s",
//         image: require("../../assets/images/79afc99f229c34e6f460664cfe72f0958a020179.png"),
//     },
//     {
//         id: "3",
//         name: "UV-13PRO",
//         image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
//     },
//     // Add more items as needed
// ];

// const CategoriesSection = ({ navigation }) => {
//     const renderItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.categoryCard}
//             activeOpacity={0.7}
//             onPress={() => navigation.push("ProductListing")}
//         >
//             <View style={styles.imageContainer}>
//                 <Image
//                     source={item.image}
//                     style={styles.categoryImage}
//                     resizeMode="contain"
//                 />
//             </View>
//             <Text style={styles.categoryName}>{item.name}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.sectionTitle}>Shop By Categories</Text>
//             <FlatList
//                 data={CATEGORIES}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.listPadding}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         // marginVertical: 20,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: "600",
//         color: "#000000",
//         paddingHorizontal: 10,
//         marginBottom: 15,
//     },
//     listPadding: {
//         paddingHorizontal: 5,
//     },
//     categoryCard: {
//         alignItems: "center",
//         marginHorizontal: 8,
//         width: width * 0.3, // Adjust width to show ~3 items on screen
//     },
//     imageContainer: {
//         width: "100%",
//         aspectRatio: 1, // Keep it square
//         backgroundColor: "#F8F9FB",
//         borderRadius: 25, // High rounding to match your premium UI
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#EDF1FA",
//     },
//     categoryImage: {
//         width: "70%",
//         height: "70%",
//     },
//     categoryName: {
//         marginTop: 10,
//         fontSize: 14,
//         fontWeight: "600",
//         color: "#90A4AE", // Muted blue-grey color from your screenshot
//         textAlign: "center",
//     },
// });

// export default CategoriesSection;
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { getCategories } from "../../api/commonApi";
import { CategorySkeleton } from "../common/SkeletonLoader";

const { width } = Dimensions.get("window");

const SKELETON_COUNT = 4;

const CategoriesSection = ({ navigation, refreshKey }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [refreshKey]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getCategories();
            if (res?.success && res?.data?.records) {
                setCategories(res.data.records);
            } else {
                setError("Failed to load categories");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Categories fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.7}
            onPress={() => navigation.push("ProductListing")}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image || item.icon }}
                    style={styles.categoryImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.categoryName} numberOfLines={2}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    // ── Skeleton shimmer while loading ──────────────────────────
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonRow}>
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <CategorySkeleton key={i} />
                    ))}
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    onPress={fetchCategories}
                    style={styles.retryBtn}
                >
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Shop By Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
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
        width: width * 0.3,
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "#F8F9FB",
        borderRadius: 25,
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
        color: "#90A4AE",
        textAlign: "center",
    },

    // ── Skeleton styles ─────────────────────────────────────────
    skeletonTitle: {
        width: 180,
        height: 20,
        borderRadius: 8,
        backgroundColor: "#CBD5E1",
        marginHorizontal: 10,
        marginBottom: 15,
        opacity: 0.5,
    },
    skeletonRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },

    // ── Error styles ────────────────────────────────────────────
    errorContainer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 13,
        marginBottom: 8,
    },
    retryBtn: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: "#0069AF",
        borderRadius: 8,
    },
    retryText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
});

export default CategoriesSection;

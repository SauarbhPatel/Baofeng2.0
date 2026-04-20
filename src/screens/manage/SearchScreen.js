import React from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 62) / 2;

const SearchScreen = ({ navigation }) => {
    const categories = [
        {
            id: "1",
            title: "Walkie Talkie",
            image: require("../../assets/images/87cec5832a2596c4a20d401293a7147d999baf36.jpg"),
        },
        {
            id: "2",
            title: "License Free",
            image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
        },
        {
            id: "3",
            title: "BF-888s",
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
        },
        {
            id: "4",
            title: "Licence Radios",
            image: require("../../assets/images/80a393c5cdab6738f710630569415fac9d3914b6.jpg"),
        },
        {
            id: "5",
            title: "Business Radios",
            image: require("../../assets/images/39f35aedd5ce467bcd35726dd695c50ea455c00c.png"),
        },
        {
            id: "6",
            title: "HAM Corner",
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
        },
        {
            id: "7",
            title: "Walkie Talkie",
            image: require("../../assets/images/87cec5832a2596c4a20d401293a7147d999baf36.jpg"),
        },
        {
            id: "8",
            title: "License Free",
            image: require("../../assets/images/b6b708e9ce280094349963b78fbf1b69b1f20650.png"),
        },
        {
            id: "9",
            title: "BF-888s",
            image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
        },
        {
            id: "10",
            title: "Licence Radios",
            image: require("../../assets/images/80a393c5cdab6738f710630569415fac9d3914b6.jpg"),
        },
        {
            id: "11",
            title: "Business Radios",
            image: require("../../assets/images/0d4d04bbdbc51109d57116b5c30abdc44b3d51a8.png"),
        },
        {
            id: "12",
            title: "HAM Corner",
            image: require("../../assets/images/5f2a99b44308a725a2ebf76ef7bcfb48db1bd821.png"),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.headerTitle}>Search Result</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Feather
                        name="search"
                        size={20}
                        color="#94a3b8"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        placeholder="Licenses Free Walkie talkie"
                        placeholderTextColor="#94a3b8"
                        style={styles.searchInput}
                    />
                </View>

                {/* Categories Grid */}
                <View style={styles.gridContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>
                            Licenses Free Walkie talkie
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#525252",
                                marginTop: -10,
                            }}
                        >
                            72 Product Found
                        </Text>
                    </View>

                    {/* Products List */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
    scrollContent: {
        padding: 15,
        paddingHorizontal: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
        // textAlign: "center",
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#CEDCE3",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#1e293b",
    },
    gridContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    categoryCard: {
        width: COLUMN_WIDTH,
        height: 180,
        justifyContent: "flex-end",
        overflow: "hidden",
        borderRadius: 16,
    },
    cardImage: {
        borderRadius: 16,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.65)",
        height: "100%",
        width: "100%",
        borderRadius: 16,
        justifyContent: "flex-end",
        padding: 12,
        overflow: "hidden",
    },
    categoryTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    underline: {
        width: 25,
        height: 3,
        backgroundColor: "#3B82F6",
        marginTop: 4,
        borderRadius: 2,
    },
});

export default SearchScreen;

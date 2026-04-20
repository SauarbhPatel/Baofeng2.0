import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MainHeader = ({ bgColor }) => {
    return (
        <>
            <StatusBar backgroundColor={"#0069b3"} barStyle={"dark-content"} />
            <View
                style={[
                    styles.headerOuterContainer,
                    bgColor && { backgroundColor: bgColor },
                ]}
            >
                <View style={styles.headerContent}>
                    {/* Logo Text */}
                    <Image
                        style={{
                            width: 140,
                            height: 35,
                            resizeMode: "contain",
                        }}
                        source={require("../../assets/logo/app_logo.png")}
                    />

                    {/* Search Bar Container */}
                    <View style={styles.searchBarWrapper}>
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color="#A0AEC0"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#A0AEC0"
                            editable={false}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerOuterContainer: {
        backgroundColor: "#F0F3FE",
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
    },
    logoText: {
        fontSize: 22,
        fontWeight: "900",
        fontStyle: "italic",
        color: "#0567AB", // Baofeng brand blue
        letterSpacing: -0.5,
        marginRight: 15,
    },
    searchBarWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        height: 40,
        borderRadius: 25, // Fully rounded capsule shape
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        // Slight shadow for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#2D3748",
        paddingVertical: 0, // Fixes vertical alignment on some Android versions
    },
});

export default MainHeader;

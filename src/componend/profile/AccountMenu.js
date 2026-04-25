import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __setToken } from "../../api/constant";

const AUTH_TOKEN_KEY = "baofeng_auth_token";
const AUTH_USER_KEY = "baofeng_auth_user";

const AccountMenu = ({ navigation }) => {
    const menuItems = [
        { id: "1", title: "Edit Account", path: "EditAccount" },
        { id: "2", title: "Change Password", path: "ChangePassword" },
        { id: "3", title: "Address Book", path: "Address" },
        { id: "4", title: "Wishlist", path: "MyWishlist" },
        { id: "5", title: "Followed Sellers", path: "FollowedSellers" },
        { id: "6", title: "My Returns" },
        { id: "8", title: "Support", path: "SupportTickets" },
        { id: "9", title: "Logout", isDestructive: true },
    ];

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Clear stored credentials
                            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
                            await AsyncStorage.removeItem(AUTH_USER_KEY);
                            // Clear in-memory API token
                            __setToken(null);
                            // Navigate back to login
                            navigation?.replace("AuthNavigator");
                        } catch (err) {
                            console.error("Logout error:", err);
                        }
                    },
                },
            ],
            { cancelable: true },
        );
    };

    const handlePress = (item) => {
        if (item.isDestructive) {
            return handleLogout();
        }
        if (item?.path) {
            return navigation.push(item?.path);
        }
    };

    return (
        <View style={styles.container}>
            {menuItems.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => handlePress(item)}
                >
                    <Text
                        style={[
                            styles.menuText,
                            item.isDestructive && styles.logoutText,
                        ]}
                    >
                        {item.title}
                    </Text>

                    <View
                        style={[
                            styles.arrowContainer,
                            item.isDestructive && { opacity: 0 },
                        ]}
                    >
                        <AntDesign
                            name="arrow-right"
                            size={14}
                            color="#0f172a"
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
    menuItem: {
        backgroundColor: "#F0EFF28F",
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F0EFF2",
    },
    menuText: { fontSize: 14, fontWeight: "600", color: "#334155" },
    logoutText: { color: "#ef4444" },
    arrowContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F3FBFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2EDF3",
    },
});

export default AccountMenu;

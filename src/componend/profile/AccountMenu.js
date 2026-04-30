import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __setToken } from "../../api/constant";

const AUTH_TOKEN_KEY = "baofeng_auth_token";
const AUTH_USER_KEY = "baofeng_auth_user";

const AccountMenu = ({ navigation }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const menuItems = [
        { id: "1", title: "Edit Account", path: "EditAccount" },
        // { id: "2", title: "Change Password", path: "ChangePassword" },
        { id: "3", title: "Address Book", path: "Address" },
        { id: "4", title: "Wishlist", path: "MyWishlist" },
        { id: "5", title: "Followed Sellers", path: "FollowedSellers" },
        { id: "6", title: "My Returns", path: "MyReturns" },
        { id: "8", title: "Support", path: "SupportTickets" },
        { id: "9", title: "Logout", isDestructive: true },
    ];

    const confirmLogout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            await AsyncStorage.removeItem(AUTH_USER_KEY);
            __setToken(null);
            setShowLogoutModal(false);
            navigation?.replace("AuthNavigator");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const handlePress = (item) => {
        if (item.isDestructive) {
            setShowLogoutModal(true);
            return;
        }
        if (item?.path) navigation.push(item.path);
    };

    return (
        <>
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

            {/* ── Logout Confirmation Modal ── */}
            <Modal
                visible={showLogoutModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={m.overlay}>
                    <View style={m.card}>
                        {/* Icon */}
                        <View style={m.iconBox}>
                            <MaterialCommunityIcons
                                name="logout"
                                size={32}
                                color="#ef4444"
                            />
                        </View>

                        {/* Text */}
                        <Text style={m.title}>Logout</Text>
                        <Text style={m.subtitle}>
                            Are you sure you want to logout from your account?
                        </Text>

                        {/* Buttons */}
                        <View style={m.btnRow}>
                            <TouchableOpacity
                                style={m.cancelBtn}
                                onPress={() => setShowLogoutModal(false)}
                                activeOpacity={0.8}
                            >
                                <Text style={m.cancelText}>Stay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={m.logoutBtn}
                                onPress={confirmLogout}
                                activeOpacity={0.8}
                            >
                                <MaterialCommunityIcons
                                    name="logout"
                                    size={16}
                                    color="#fff"
                                />
                                <Text style={m.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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

const m = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 28,
        width: "100%",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    iconBox: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: "#FFF1F2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 21,
        marginBottom: 28,
    },
    btnRow: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFF",
    },
    cancelText: { fontSize: 15, fontWeight: "700", color: "#64748b" },
    logoutBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#ef4444",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    logoutText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});

export default AccountMenu;

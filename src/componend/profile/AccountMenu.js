import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AccountMenu = () => {
    const menuItems = [
        { id: "1", title: "Edit Account" },
        { id: "2", title: "Change Passwrd" },
        { id: "3", title: "Address Book" },
        { id: "4", title: "Wishlist" },
        { id: "5", title: "My Orders" },
        { id: "6", title: "My Returns" },
        { id: "7", title: "Logout", isDestructive: true },
    ];

    return (
        <View style={styles.container}>
            {menuItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.menuItem}>
                    <Text
                        style={[
                            styles.menuText,
                            item.isDestructive && styles.logoutText,
                        ]}
                    >
                        {item.title}
                    </Text>

                    {/* Arrow Indicator */}
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
    menuText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },
    logoutText: {
        color: "#475569",
    },
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

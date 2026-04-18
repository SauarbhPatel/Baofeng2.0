import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_USER_KEY = "baofeng_auth_user";

const ProfileDetails = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
            if (raw) setUser(JSON.parse(raw));
        } catch (err) {
            console.error("ProfileDetails load user error:", err);
        }
    };

    const fullName =
        user?.firstName || user?.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : "Baofeng User";

    const phone = user?.phoneNumber
        ? `+${user.countryCode?.replace("+", "")} ${user.phoneNumber}`
        : "";

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={require("../../assets/images/user.png")}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>

            {/* User Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{fullName}</Text>
                {!!phone && (
                    <View>
                        <Text style={styles.phoneText}>{phone}</Text>
                    </View>
                )}
                {!!user?.email && (
                    <Text style={styles.emailText}>{user.email}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 30,
        paddingTop: 0,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 60,
        backgroundColor: "#2d6a7f",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: { width: "100%", height: "100%" },
    infoContainer: { alignItems: "center" },
    nameText: { fontSize: 16, color: "#1e293b", fontWeight: "700" },
    phoneText: { fontSize: 12, color: "#202021", marginTop: 4 },
    emailText: { fontSize: 12, color: "#64748b", marginTop: 2 },
});

export default ProfileDetails;

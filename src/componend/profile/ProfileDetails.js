import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const ProfileDetails = () => {
    const userData = {
        name: "Chand Miyan Khan",
        phone: "+ 91801022676",
        avatar: require("../../assets/images/user.png"),
    };

    return (
        <View style={styles.container}>
            {/* Profile Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={userData.avatar}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>

            {/* User Information */}
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{userData.name}</Text>

                <TouchableOpacity
                    style={styles.phoneRow}
                    onPress={() => Linking.openURL(`tel:${userData.phone}`)}
                >
                    <Text style={styles.phoneText}>{userData.phone}</Text>
                </TouchableOpacity>
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
    avatar: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        alignItems: "center",
    },
    nameText: {
        fontSize: 16,
        color: "#1e293b",
    },
    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    phoneText: {
        fontSize: 12,
        color: "#202021",
    },
});

export default ProfileDetails;

import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MainHeader from "../../componend/common/MainHeader";
import ProfileDetails from "../../componend/profile/ProfileDetails";
import AccountMenu from "../../componend/profile/AccountMenu";
import AuthPrompt from "../../componend/profile/AuthPrompt";

const AUTH_TOKEN_KEY = "baofeng_auth_token";

const ProfileScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(false);

    // Re-check login status every time screen comes into focus
    // (handles the case where user logs in/out on another tab)
    useFocusEffect(
        useCallback(() => {
            const checkAuth = async () => {
                try {
                    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
                    setIsLogin(!!token);
                } catch {
                    setIsLogin(false);
                }
            };
            checkAuth();
        }, []),
    );

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                {isLogin ? (
                    <>
                        <ProfileDetails />
                        <AccountMenu navigation={navigation} />
                    </>
                ) : (
                    <AuthPrompt
                        onLoginPress={() =>
                            navigation.navigate("AuthNavigator", {
                                screen: "Login",
                            })
                        }
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
});

export default ProfileScreen;

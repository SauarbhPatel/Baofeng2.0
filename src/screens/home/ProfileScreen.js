import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import ProfileDetails from "../../componend/profile/ProfileDetails";
import AccountMenu from "../../componend/profile/AccountMenu";
import AuthPrompt from "../../componend/profile/AuthPrompt";

const ProfileScreen = ({ navigation }) => {
    const isLogin = true;
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                {isLogin ? (
                    <>
                        <ProfileDetails />
                        <AccountMenu />
                    </>
                ) : (
                    <>
                        <AuthPrompt />
                    </>
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

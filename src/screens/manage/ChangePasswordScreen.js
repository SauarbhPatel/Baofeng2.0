import React from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import MainHeader from "../../componend/common/MainHeader";

const ChangePasswordScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Main Card Container */}
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>Change Password</Text>

                    {/* Form Fields */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Enter New password</Text>
                        <TextInput style={styles.input} placeholder="" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Re-Enter New password</Text>
                        <TextInput style={styles.input} placeholder="" />
                    </View>

                    {/* Change Password Button */}
                    <TouchableOpacity
                        style={styles.updateButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.updateButtonText}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
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
        paddingTop: 15,
    },
    card: {
        backgroundColor: "#F3FBFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 15,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#94a3b8",
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#0f172a",
    },
    updateButton: {
        backgroundColor: "#0064a3",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    updateButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default ChangePasswordScreen;

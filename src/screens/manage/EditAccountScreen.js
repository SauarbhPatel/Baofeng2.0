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

const EditAccountScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Main Card Container */}
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>Edit Account</Text>

                    {/* Form Fields */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput style={styles.input} placeholder="" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput style={styles.input} placeholder="" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Your Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Update Information Button */}
                    <TouchableOpacity
                        style={styles.updateButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.updateButtonText}>
                            Update Information
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
        backgroundColor: "#D7E9F2", // Light blue screen background
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 25,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#94a3b8", // Muted slate color for labels
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        borderColor: "#e2e8f0", // Subtle border
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#0f172a",
    },
    updateButton: {
        backgroundColor: "#0064a3", // Deep blue button color
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    updateButtonText: {
        color: "#ffffff",
        fontSize: 17,
        fontWeight: "700",
    },
});

export default EditAccountScreen;

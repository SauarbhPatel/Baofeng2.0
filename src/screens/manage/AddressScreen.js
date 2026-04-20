import React, { useState } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MainHeader from "../../componend/common/MainHeader";

const AddressScreen = () => {
    const [selectedId, setSelectedId] = useState(2);

    const addresses = [
        {
            id: 1,
            name: "Alex Jhone",
            address: "Baofeng, Seyhan, Haryana\n203412 India\n8976526349",
        },
        {
            id: 2,
            name: "Alex Jhone",
            address: "Baofeng, Seyhan, Haryana\n203412 India\n8976526349",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <Text style={styles.headerTitle}>Addresses</Text>

                    {/* Address Type Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, styles.activeTab]}
                        >
                            <Text style={styles.activeTabText}>
                                My Billing Addreess
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, styles.inactiveTab]}
                        >
                            <Text style={styles.inactiveTabText}>
                                My Shipping Addreess
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Address List */}
                    {addresses.map((item) => (
                        <View
                            key={item.id}
                            style={[
                                styles.addressCard,
                                selectedId === item.id && styles.selectedBorder,
                            ]}
                        >
                            <View style={styles.addressHeader}>
                                <TouchableOpacity
                                    style={styles.radioContainer}
                                    onPress={() => setSelectedId(item.id)}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            selectedId === item.id
                                                ? "circle-slice-8"
                                                : "circle-outline"
                                        }
                                        size={22}
                                        color={
                                            selectedId === item.id
                                                ? "#0064a3"
                                                : "#cbd5e1"
                                        }
                                    />
                                    <Text style={styles.addressName}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "#ACB7D2",
                                        padding: 4,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Feather
                                        name="trash-2"
                                        size={16}
                                        color="#ACB7D2"
                                        style={styles.actionIcon}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.addressBody}>
                                <Text style={styles.addressText}>
                                    {item.address}
                                </Text>
                                <TouchableOpacity>
                                    <Feather
                                        name="edit-3"
                                        size={18}
                                        color="#0064a3"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Add New Address Button */}
                    <TouchableOpacity style={styles.addButton}>
                        <Feather name="plus-circle" size={24} color="#0064a3" />
                        <Text style={styles.addButtonText}>
                            Add New Address
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
        paddingBottom: 30,
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
    tabContainer: {
        flexDirection: "row",
        marginBottom: 15,
        gap: 10,
    },
    tab: {
        flex: 1,
        height: 45,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
    },
    activeTab: {
        backgroundColor: "#0064a3",
        borderColor: "#0064a3",
    },
    inactiveTab: {
        backgroundColor: "#ffffff",
        borderColor: "#0064a3",
    },
    activeTabText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 12,
    },
    inactiveTabText: {
        color: "#0064a3",
        fontWeight: "700",
        fontSize: 12,
    },
    addressCard: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
    },
    selectedBorder: {
        borderColor: "#0064a3",
    },
    addressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    addressName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginLeft: 10,
    },
    addressBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    addressText: {
        fontSize: 14,
        color: "#94a3b8",
        lineHeight: 20,
        fontWeight: "500",
    },
    addButton: {
        height: 100,
        borderWidth: 1.5,
        borderColor: "#0064a3",
        borderStyle: "dashed",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "#fff",
    },
    addButtonText: {
        color: "#0064a3",
        fontWeight: "700",
        fontSize: 16,
        marginTop: 8,
    },
});

export default AddressScreen;

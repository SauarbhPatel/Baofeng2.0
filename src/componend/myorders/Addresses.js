import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo,
} from "@expo/vector-icons";

const Addresses = ({
    deliveryAddress = {
        name: "GT 88",
        location: "New Delhi, Delhi, INDIA - 110025",
        phone: "8851746286",
    },
    billingAddress = {
        name: "Sec 49",
        location: "Gurgaon, Haryana, INDIA - 248001",
        phone: "8851746286",
    },
    sellerDetail = {
        name: "Rucas Royal",
        location: "Sec 49, Gurgaon, Haryana, INDIA - 248001",
        phone: "8851746286",
        email: "seoabaris@gmail.com",
    },
}) => {
    const AddressBlock = ({ title, data, icon, type }) => (
        <View style={styles.addressCard}>
            <View style={styles.headerRow}>
                <View
                    style={[
                        styles.iconWrapper,
                        {
                            backgroundColor:
                                type === "delivery"
                                    ? "#eff6ff"
                                    : type === "billing"
                                      ? "#f0fdf4"
                                      : "#fff7ed",
                        },
                    ]}
                >
                    {icon}
                </View>
                <Text style={styles.blockTitle}>{title}</Text>
            </View>

            <View style={styles.contentBody}>
                <Text style={styles.nameText}>{data.name}</Text>
                <Text style={styles.locationText}>{data.location}</Text>
                <Text style={styles.contactText}>Phone: {data.phone}</Text>
                {data.email && (
                    <Text style={styles.contactText}>Email: {data.email}</Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Addresses</Text>

            {/* Delivery Address Block */}
            <AddressBlock
                title="Delivery Address"
                data={deliveryAddress}
                type="delivery"
                icon={
                    <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        size={18}
                        color="#3b82f6"
                    />
                }
            />

            {/* Billing Address Block */}
            <AddressBlock
                title="Billing Address"
                data={billingAddress}
                type="billing"
                icon={
                    <MaterialCommunityIcons
                        name="file-document-outline"
                        size={18}
                        color="#22c55e"
                    />
                }
            />

            {/* Seller Detail Block */}
            <AddressBlock
                title="Seller Detail"
                data={sellerDetail}
                type="seller"
                icon={<Entypo name="shop" size={16} color="#f97316" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 15,
    },
    addressCard: {
        backgroundColor: "#f8fafc", // Signature light gray sub-background
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 12,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
    },
    contentBody: {
        paddingLeft: 2,
    },
    nameText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 4,
    },
    locationText: {
        fontSize: 14,
        color: "#64748b",
        lineHeight: 20,
        fontWeight: "500",
        marginBottom: 6,
    },
    contactText: {
        fontSize: 13,
        color: "#94a3b8",
        fontWeight: "600",
        marginTop: 2,
    },
});

export default Addresses;

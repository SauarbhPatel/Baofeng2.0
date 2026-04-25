import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectItemBox = ({ order, selectedIndex, setSelectedIndex }) => {
    const items = order?.items || [];

    if (!items.length) return null;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>
                    📦 {"  "}Select Item to Refund
                </Text>
            </View>

            {items.map((item, index) => {
                const isSelected = selectedIndex === index;
                const deliveredDate = order?.deliveredAt
                    ? new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                      })
                    : null;

                return (
                    <TouchableOpacity
                        key={item.listingId || index}
                        style={[
                            styles.itemCard,
                            isSelected && styles.selectedCard,
                        ]}
                        onPress={() => setSelectedIndex(index)}
                    >
                        <View style={styles.imagePlaceholder}>
                            {item.mainImageUrl ? (
                                <Image
                                    source={{ uri: item.mainImageUrl }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="radio"
                                    size={32}
                                    color="#a16207"
                                />
                            )}
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.productName} numberOfLines={2}>
                                {item.productName}
                            </Text>
                            <Text style={styles.orderInfo}>
                                Order #{order?.orderNumber} · Qty:{" "}
                                {item.quantity}
                            </Text>

                            {deliveredDate && (
                                <View style={styles.statusBadge}>
                                    <View style={styles.dot} />
                                    <Text style={styles.statusText}>
                                        Delivered {deliveredDate}
                                    </Text>
                                </View>
                            )}

                            <Text style={styles.priceText}>
                                ₹{item.unitPrice?.toLocaleString("en-IN")}
                            </Text>
                        </View>

                        {isSelected && (
                            <View style={styles.checkCircle}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={16}
                                    color="#fff"
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },
    itemCard: {
        backgroundColor: "#f8fbff",
        borderRadius: 20,
        padding: 16,
        flexDirection: "row",
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedCard: {
        borderColor: "#0071bc",
    },
    imagePlaceholder: {
        width: 65,
        height: 65,
        backgroundColor: "#e2e8f0",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        overflow: "hidden",
    },
    itemImage: {
        width: "100%",
        height: "100%",
    },
    detailsContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 4,
    },
    orderInfo: {
        fontSize: 12,
        color: "#94a3b8",
        marginBottom: 6,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff7ed",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 50,
        marginBottom: 8,
        gap: 6,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 4,
        backgroundColor: "#ea580c",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#ea580c",
    },
    priceText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0071bc",
    },
    checkCircle: {
        position: "absolute",
        bottom: 12,
        right: 16,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#0071bc",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SelectItemBox;

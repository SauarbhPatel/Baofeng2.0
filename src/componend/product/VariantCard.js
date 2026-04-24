import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

const VariantCard = ({
    variantAttributes = [],
    onVariantSelect,
    productVariationSlug,
}) => {
    // Use the first attribute's values as the variant list (e.g. pack-of)
    const variants = variantAttributes?.[0]?.values || [];

    if (!variants.length) return null;

    const handleSelect = (item) => {
        onVariantSelect && onVariantSelect(item);
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {variants.map((item) => {
                const isSelected =
                    productVariationSlug == item?.productVariationSlug;
                return (
                    <TouchableOpacity
                        key={item.value}
                        onPress={() => handleSelect(item)}
                        style={styles.variantWrapper}
                    >
                        <View
                            style={[
                                styles.imageContainer,
                                isSelected && styles.selectedContainer,
                            ]}
                        >
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.radioImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                isSelected && styles.selectedLabel,
                            ]}
                        >
                            {item.value
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
    },
    variantWrapper: {
        alignItems: "center",
        marginRight: 16,
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    selectedContainer: {
        backgroundColor: "#0056b3",
        borderColor: "#0056b3",
    },
    radioImage: {
        width: 62,
        height: 62,
        borderRadius: 7,
    },
    label: {
        fontSize: 12,
        fontWeight: "500",
        color: "#475569",
        textAlign: "center",
    },
    selectedLabel: {
        color: "#0f172a",
        fontWeight: "800",
    },
});

export default VariantCard;

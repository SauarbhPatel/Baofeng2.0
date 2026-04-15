import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function FilterSection() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([
        "Walkie Talkie",
        "BF-888s",
        "Licence Radios",
    ]);
    const [selectedBrands, setSelectedBrands] = useState(["BAOFENG"]);

    const toggleSelection = (item, state, setState) => {
        if (state.includes(item)) {
            setState(state.filter((i) => i !== item));
        } else {
            setState([...state, item]);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.filterTrigger}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesome5 name="filter" size={20} color="#0070c0" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Header */}

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 10 }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#F3FBFF",
                                    borderRadius: 24,
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#EBF7FD",
                                    marginTop: 20,
                                }}
                            >
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>
                                        Price Range
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Ionicons
                                            name="close-circle"
                                            size={28}
                                            color="#ff8a8a"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Price Range Inputs */}
                                <View style={styles.priceBox}>
                                    <View style={styles.priceRow}>
                                        <View style={styles.priceInputBox}>
                                            <Text style={styles.priceLabel}>
                                                Min Price
                                            </Text>
                                            <TextInput
                                                style={styles.priceInput}
                                                value="1399"
                                                keyboardType="numeric"
                                                onFocus={() => "Focus"}
                                                onBlur={() => "onBlur"}
                                            />
                                        </View>
                                        <View style={styles.priceInputBox}>
                                            <Text style={styles.priceLabel}>
                                                Max Price
                                            </Text>
                                            <TextInput
                                                style={styles.priceInput}
                                                value="25330"
                                                keyboardType="numeric"
                                                onFocus={() => "Focus"}
                                                onBlur={() => "onBlur"}
                                            />
                                        </View>
                                    </View>
                                    {/* Slider Placeholder */}
                                    <View style={styles.sliderTrack}>
                                        <View style={styles.sliderActive} />
                                        <View style={styles.sliderThumb} />
                                    </View>
                                </View>

                                {/* Categories Section */}
                                <Text style={styles.sectionTitle}>
                                    Categories
                                </Text>
                                <View style={styles.listContainer}>
                                    {[
                                        "Walkie Talkie",
                                        "License Free",
                                        "BF-888s",
                                        "Licence Radios",
                                        "Business Radios",
                                        "Microphones",
                                        "HAM Corner",
                                        "Cables",
                                    ].map((cat) => (
                                        <CheckBox
                                            key={cat}
                                            label={cat}
                                            isActive={selectedCategories.includes(
                                                cat,
                                            )}
                                            onPress={() =>
                                                toggleSelection(
                                                    cat,
                                                    selectedCategories,
                                                    setSelectedCategories,
                                                )
                                            }
                                        />
                                    ))}
                                    <TouchableOpacity
                                        style={styles.viewMoreBtn}
                                    >
                                        <Text style={styles.viewMoreText}>
                                            View More...
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#F3FBFF",
                                    borderRadius: 24,
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#EBF7FD",
                                    marginTop: 16,
                                    marginBottom: 30,
                                }}
                            >
                                <View style={styles.brandContainer}>
                                    <Text style={styles.sectionTitle}>
                                        Brands
                                    </Text>
                                    <CheckBox
                                        label="BAOFENG"
                                        isActive={selectedBrands.includes(
                                            "BAOFENG",
                                        )}
                                        onPress={() =>
                                            toggleSelection(
                                                "BAOFENG",
                                                selectedBrands,
                                                setSelectedBrands,
                                            )
                                        }
                                    />
                                    <CheckBox
                                        label="iBAOFENG"
                                        isActive={selectedBrands.includes(
                                            "iBAOFENG",
                                        )}
                                        onPress={() =>
                                            toggleSelection(
                                                "iBAOFENG",
                                                selectedBrands,
                                                setSelectedBrands,
                                            )
                                        }
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Custom Checkbox Component
const CheckBox = ({ label, isActive, onPress }) => (
    <TouchableOpacity style={styles.checkRow} onPress={onPress}>
        <View
            style={[styles.checkSquare, isActive && styles.checkSquareActive]}
        >
            {isActive && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>
        <Text style={[styles.checkLabel, isActive && styles.checkLabelActive]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { paddingTop: 0 },
    filterTrigger: {
        width: 50,
        height: 44,
        backgroundColor: "#F3FBFF",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EBF7FD",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        borderWidth: 1,
    },
    modalContent: {
        maxHeight: "100%",
        maxWidth: "85%",
        // padding: 24,
        // borderRadius: 35,
        // backgroundColor: "#F3FBFF",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
    priceBox: {
        gap: 10,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        padding: 10,
    },
    priceRow: {
        flexDirection: "row",
        gap: 15,
    },
    priceInputBox: {
        flex: 1,
    },
    priceLabel: { fontSize: 10, color: "#94a3b8", marginBottom: 4 },
    priceInput: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
    },
    sliderTrack: {
        height: 4,
        backgroundColor: "#e2e8f0",
        borderRadius: 2,
        marginVertical: 10,
        position: "relative",
    },
    sliderActive: {
        position: "absolute",
        left: "20%",
        right: "30%",
        height: 4,
        backgroundColor: "#64748b",
    },
    sliderThumb: {
        position: "absolute",
        left: "48%",
        top: -6,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#475569",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 15,
    },
    listContainer: { paddingLeft: 4 },
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    checkSquare: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
    },
    checkSquareActive: { backgroundColor: "#0070c0", borderColor: "#0070c0" },
    checkLabel: { fontSize: 12, color: "#64748b", fontWeight: "500" },
    checkLabelActive: { color: "#0070c0", fontWeight: "700" },
    viewMoreBtn: {
        backgroundColor: "#0070c0",
        paddingVertical: 8,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
        // width: "60%",
        alignSelf: "center",
        paddingHorizontal: 15,
    },
    viewMoreText: { color: "#fff", fontWeight: "700", fontSize: 12 },
    brandContainer: {
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderRadius: 20,
    },
});

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const MustRead = ({ bulletPoints }) => {
    const [isShow, setShow] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                <MaterialCommunityIcons
                    name="shield-alert-outline"
                    size={20}
                    color="#3A1200"
                />
                {"  "}
                Must Read
            </Text>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 10,
                }}
                activeOpacity={0.9}
                onPress={() => setShow(!isShow)}
            >
                <AntDesign
                    name={isShow ? "caret-up" : "caret-down"}
                    size={18}
                />
            </TouchableOpacity>

            <View style={styles.contentBox}>
                {(isShow ? bulletPoints : bulletPoints?.slice(0, 1))?.map(
                    (item) => (
                        <View style={styles.bulletRow} key={item}>
                            <Text style={styles.bullet}>•</Text>
                            <Text
                                style={styles.bulletText}
                                {...(!isShow && { numberOfLines: 2 })}
                            >
                                {item}
                                {!isShow ? "..." : null}
                            </Text>
                        </View>
                    ),
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 16,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#FF8F73",
        backgroundColor: "#FF8F73",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    contentBox: {
        gap: 16,
    },
    bulletRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    bullet: {
        fontSize: 20,
        color: "#000",
        marginRight: 8,
        lineHeight: 24,
    },
    bulletText: {
        flex: 1,
        fontSize: 13,
        color: "#1e293b",
        lineHeight: 24,
        fontWeight: "500",
        textAlign: "left",
    },
});

export default MustRead;

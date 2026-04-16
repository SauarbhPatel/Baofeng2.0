import { View, Text, StyleSheet } from "react-native";

const MustRead = ({ bulletPoints }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Must Read</Text>

            <View style={styles.contentBox}>
                {bulletPoints?.map((item) => (
                    <View style={styles.bulletRow} key={item}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 15,
        marginBottom: 16,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#FFA500",
        backgroundColor: "#FFEDCC",
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

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MustRead = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Must Read</Text>

            <View style={styles.contentBox}>
                {/* Bullet Point 1 */}
                <View style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                        iBAOFENG BF-888s Frequency 400-470Mhz with Power 2W
                        Comes under WPC Short Range UHF User Licence. Buyer must
                        share User Licence before order dispatch.
                    </Text>
                </View>

                {/* Bullet Point 2 */}
                <View style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                        The Baofeng BF-888S comes with 16 pre-programmed
                        channels that are ready to use right out of the box. It
                        can communicate directly with any BF-88E operating on
                        the same channel. Each channel includes 100 subchannels,
                        providing a wide range of frequency options. This
                        extensive selection ensures clear communication without
                        interference, even in areas where multiple radios are in
                        use. The desired channel can be easily selected using
                        the rotary knob locate...
                    </Text>
                </View>
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

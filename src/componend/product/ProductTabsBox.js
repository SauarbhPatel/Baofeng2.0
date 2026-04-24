import { View, FlatList, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useRef, useEffect } from "react";

const TAB_WIDTH = 110; // adjust based on your UI

const ProductTabsBox = ({ list = [], activeTab = 0, isSticky = false }) => {
    const listRef = useRef(null);

    // Auto scroll to active tab
    useEffect(() => {
        if (listRef.current && activeTab != null) {
            listRef.current.scrollToIndex({
                index: activeTab,
                animated: true,
                viewPosition: 0.5, // centers the tab
            });
        }
    }, [activeTab]);

    //console.log("activeTab", activeTab);

    // Fade + slide animation when sticky
    const fadeStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isSticky ? 1 : 0, { duration: 1000 }),
            transform: [
                {
                    translateY: withTiming(isSticky ? 0 : -10, {
                        duration: 1000,
                    }),
                },
            ],
        };
    }, [isSticky]);

    return (
        list?.length > 0 && (
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        width: "100%",
                        top: 86,
                        zIndex: 1000,
                        paddingVertical: 10,
                        backgroundColor: "#fff",
                    },
                    fadeStyle,
                ]}
            >
                <FlatList
                    ref={listRef}
                    horizontal
                    data={list}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                backgroundColor:
                                    activeTab == index ? "#0069AF" : "#f3f8ff",
                                padding: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        activeTab === index ? "white" : "black",
                                    fontWeight: "600",
                                    fontSize: 13,
                                }}
                            >
                                {item?.sectionTitle}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => item?.sectionTitle + "tabs"}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        gap: 10,
                    }}
                    getItemLayout={(_, index) => ({
                        index,
                        length: TAB_WIDTH + 10,
                        offset: (TAB_WIDTH + 10) * index,
                    })}
                />
            </Animated.View>
        )
    );
};

export default ProductTabsBox;

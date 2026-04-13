import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// Screens
import HomeScreen from "../screens/home/HomeScreen";
import CategoriesScreen from "../screens/home/CategoriesScreen";
import OrdersScreen from "../screens/home/OrdersScreen";
import CartScreen from "../screens/home/CartScreen";
import ProfileScreen from "../screens/home/ProfileScreen";

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                headerStyle: styles.header,
                headerTintColor: "#0069AF",
                headerTitleStyle: styles.headerTitle,
                tabBarLabel:
                    route.name === "Home"
                        ? "Home"
                        : route.name === "Categories"
                          ? "Categories"
                          : route.name === "Orders"
                            ? "Orders"
                            : route.name === "Cart"
                              ? "Cart"
                              : "Profile",
                tabBarActiveTintColor: "#0069AF",
                tabBarInactiveTintColor: "#999999",
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerTitleAlign: "center",
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Baofeng 2.0",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={size - 4} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="grid" size={size - 4} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name="shopping-bag"
                            size={size - 4}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name="shopping-cart"
                            size={size - 4}
                            color={color}
                        />
                    ),
                    // tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size - 4} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0066CC",
    },
    tabBar: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
        elevation: 8,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: "700",
        marginBottom: 5,
    },
});

export default HomeNavigator;

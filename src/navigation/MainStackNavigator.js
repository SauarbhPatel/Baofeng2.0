import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectDetailsScreen from "../screens/details/ProjectDetailsScreen";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import CheckoutScreen from "../screens/manage/CheckoutScreen";
const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Root tabs */}
            <Stack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={{
                    animationEnabled: false,
                }}
            />
            {/* Root tabs */}
            <Stack.Screen
                name="HomeNavigator"
                component={HomeNavigator}
                options={{
                    animationEnabled: false,
                }}
            />
            {/* Tier 2 — detail screens */}
            <Stack.Screen
                name="ProjectDetails"
                component={ProjectDetailsScreen}
            />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
    );
}

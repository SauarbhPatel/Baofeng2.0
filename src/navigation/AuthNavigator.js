import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpScreen from "../screens/auth/OtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: true }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    animationEnabled: true,
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    animationEnabled: true,
                }}
            />
            <Stack.Screen
                name="Otp"
                component={OtpScreen}
                options={{
                    animationEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
}

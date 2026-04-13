import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainStackNavigator from "./MainStackNavigator";

export default function RootNavigator() {
    // const { isAuthenticated } = useAppContext();

    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

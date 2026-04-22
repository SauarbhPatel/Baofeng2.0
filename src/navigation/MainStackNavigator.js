import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectDetailsScreen from "../screens/details/ProjectDetailsScreen";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import CheckoutScreen from "../screens/manage/CheckoutScreen";
import ProductListingScreen from "../screens/manage/ProductListingScreen";
import OrderConfirmationScreen from "../screens/details/OrderConfirmationScreen";
import OrderTrackingScreen from "../screens/details/OrderTrackingScreen";
import RefundRequestScreen from "../screens/details/RefundRequestScreen";
import EditAccountScreen from "../screens/manage/EditAccountScreen";
import ChangePasswordScreen from "../screens/manage/ChangePasswordScreen";
import SearchScreen from "../screens/manage/SearchScreen";
import AddressScreen from "../screens/manage/AddressScreen";
import AddAddress from "../screens/form/AddAddress";
import MyWishlistScreen from "../screens/manage/MyWishlistScreen";
import FollowedSellersScreen from "../screens/manage/FollowedSellersScreen";
import SellerDetailsScreen from "../screens/details/SellerDetailsScreen";
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
            <Stack.Screen
                name="ProductListing"
                component={ProductListingScreen}
            />
            <Stack.Screen
                name="OrderConfirmation"
                component={OrderConfirmationScreen}
            />
            <Stack.Screen
                name="OrderTracking"
                component={OrderTrackingScreen}
            />
            <Stack.Screen
                name="RefundRequest"
                component={RefundRequestScreen}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen
                name="SellerDetails"
                component={SellerDetailsScreen}
            />
            {/* Profile Menu */}
            <Stack.Screen name="EditAccount" component={EditAccountScreen} />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
            />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="MyWishlist" component={MyWishlistScreen} />
            <Stack.Screen
                name="FollowedSellers"
                component={FollowedSellersScreen}
            />

            {/* Form */}
            <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
    );
}

import { useEffect } from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __setToken } from "../../api/constant";

const AUTH_TOKEN_KEY = "baofeng_auth_token";

const SplashScreen = ({ navigation }) => {
    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            if (token) {
                // Restore token into the in-memory API header
                __setToken(token);
            }
        } catch (err) {
            console.error("SplashScreen token restore error:", err);
        } finally {
            // Always navigate after check — logged in or not
            setTimeout(() => {
                navigation.replace("HomeNavigator");
            }, 1800);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor={"#0069b3"} barStyle={"light-content"} />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../../assets/logo/ios-icon.png")}
                    style={{ width: 280.0, height: 160.0 }}
                    contentFit="contain"
                />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;

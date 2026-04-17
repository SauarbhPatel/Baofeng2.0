import { useEffect } from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { Image } from "expo-image";

const SplashScreen = ({ navigation }) => {
    const checkLogin = async () => {
        // const data = await __getLocalStorageData("login");
        // if (data) {
        //     const login = JSON.parse(data);
        //     __setLocalization(login);
        //     __setToken(login.token);
        // }
        setTimeout(() => {
            navigation.push("HomeNavigator");
            // navigation.push("Login");
        }, 2000);
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
                {appLogo()}
            </View>
        </SafeAreaView>
    );

    function appLogo() {
        return (
            <Image
                source={require("../../assets/logo/ios-icon.png")}
                // source={{
                // uri: "https://baofengradios.s3.ap-south-1.amazonaws.com/image-1763203968899.png",
                // }}
                style={{ width: 280.0, height: 160.0 }}
                contentFit="contain"
            />
        );
    }
};

export default SplashScreen;

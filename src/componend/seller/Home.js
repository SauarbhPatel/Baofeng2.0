import React from "react";
import { Dimensions, View } from "react-native";
import HomeBanner1 from "../home/HomeBanner1";
import ProductList from "./ProductList";
const { width } = Dimensions.get("window");

const Home = () => {
    return (
        <View>
            <HomeBanner1
                dynamicScreenWidth={width - 50}
                borderRadius={0}
                imageSource={require("../../assets/images/follwed/4798ecee32736c34642ea671411b262ec103e1f1.png")}
            />
            <HomeBanner1
                dynamicScreenWidth={width - 50}
                borderRadius={0}
                imageSource={require("../../assets/images/follwed/banner2.png")}
            />
            <HomeBanner1
                dynamicScreenWidth={width - 50}
                borderRadius={0}
                imageSource={require("../../assets/images/follwed/banner3.png")}
            />
            <ProductList lable="New Arrival Products" />
        </View>
    );
};

export default Home;

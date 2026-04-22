import React from "react";
import { Dimensions, View } from "react-native";
import HomeBanner1 from "../home/HomeBanner1";
import ProductList from "./ProductList";
const { width } = Dimensions.get("window");

const TopSelling = () => {
    return (
        <View>
            <ProductList lable="Top Selling Products" />
        </View>
    );
};

export default TopSelling;

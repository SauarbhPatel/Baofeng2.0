import React from "react";
import { Dimensions, View } from "react-native";
import HomeBanner1 from "../home/HomeBanner1";
import ProductList from "./ProductList";
const { width } = Dimensions.get("window");

const AllProducts = () => {
    return (
        <View>
            <ProductList lable="All Products" />
        </View>
    );
};

export default AllProducts;

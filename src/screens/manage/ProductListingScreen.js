import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import ProductGallery from "../../componend/product/ProductGallary";
import ProductDetail from "../../componend/product/ProductDetail";
import LicenceNote from "../../componend/product/LicenceNote";
import MustRead from "../../componend/product/MustRead";
import ProductTabs from "../../componend/product/ProductTabs";
import SimilarProducts from "../../componend/product/SimilarProducts";
import CustomerReviews from "../../componend/product/CustomerReviews";
import HomeBanner1 from "../../componend/home/HomeBanner1";
import FilterSection from "../../componend/product/FilterSection";

const ProductListingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <FilterSection />
                <SimilarProducts />
                <HomeBanner1
                    imageSource={require("../../assets/images/banner6.png")}
                />
                <HomeBanner1
                    imageSource={require("../../assets/images/banner7.png")}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D7E9F2",
    },
});

export default ProductListingScreen;

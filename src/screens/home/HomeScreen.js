import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import HomeBanner1 from "../../componend/home/HomeBanner1";
import CategoriesSection from "../../componend/home/CategoriesSection";
import AccessoriesSection from "../../componend/home/AccessoriesSection";
import GridProduct from "../../componend/home/GridProduct";
import HorizontalProducts from "../../componend/home/HorizontalProducts";
import MicrophonesGrid from "../../componend/home/MicrophonesGrid";
import InstagramSection from "../../componend/home/InstagramSection";
import NewsAndUpdate from "../../componend/home/NewsAndUpdate";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <HomeBanner1
                    imageSource={require("../../assets/images/blue_banner_base.png")}
                />
                <CategoriesSection />
                <AccessoriesSection />
                <HorizontalProducts
                    bgColor="#D9EAF3"
                    productBorder="#0069AF"
                    navigation={navigation}
                />

                <HomeBanner1
                    imageSource={require("../../assets/images/banner2.png")}
                />
                <HorizontalProducts bgColor="#ECDFC6" productBorder="#EBF7FD" />
                <HomeBanner1
                    imageSource={require("../../assets/images/banner3.png")}
                />
                <GridProduct
                    gradientColors={["#FFFFFF", "#D7E9F2"]}
                    lable="Licence Radios"
                />
                <HorizontalProducts bgColor="#D9EAF3" productBorder="#EBF7FD" />
                <MicrophonesGrid />
                <HorizontalProducts bgColor="#0069AF" productBorder="#EBF7FD" />
                <InstagramSection />
                <NewsAndUpdate />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});

export default HomeScreen;

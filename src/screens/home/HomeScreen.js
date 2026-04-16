import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    RefreshControl,
} from "react-native";
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
    const [refreshing, setRefreshing] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshKey((prev) => prev + 1);
        setTimeout(() => setRefreshing(false), 1500);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#0069AF"]} // Android spinner color
                        tintColor="#0069AF" // iOS spinner color
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <HomeBanner1
                    imageSource={require("../../assets/images/blue_banner_base.png")}
                />
                <CategoriesSection
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <AccessoriesSection
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <HorizontalProducts
                    bgColor="#D9EAF3"
                    productBorder="#0069AF"
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <HomeBanner1
                    imageSource={require("../../assets/images/banner2.png")}
                />
                <HorizontalProducts
                    bgColor="#ECDFC6"
                    productBorder="#EBF7FD"
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <HomeBanner1
                    imageSource={require("../../assets/images/banner3.png")}
                />
                <GridProduct
                    gradientColors={["#FFFFFF", "#D7E9F2"]}
                    lable="Licence Radios"
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <HorizontalProducts
                    bgColor="#D9EAF3"
                    productBorder="#EBF7FD"
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <MicrophonesGrid
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <HorizontalProducts
                    bgColor="#0069AF"
                    productBorder="#EBF7FD"
                    navigation={navigation}
                    refreshKey={refreshKey}
                />
                <InstagramSection navigation={navigation} />
                <NewsAndUpdate navigation={navigation} />
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

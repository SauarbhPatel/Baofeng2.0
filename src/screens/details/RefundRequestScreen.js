import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import RefundStatusTracker from "../../componend/refund/RefundStatusTracker";
import SelectItemBox from "../../componend/refund/SelectItemBox";
import RefundDetails from "../../componend/refund/RefundDetails";
import RefundSummary from "../../componend/refund/RefundSummary";
import WhatHappensNext from "../../componend/refund/WhatHappensNext";
import NeedHelp from "../../componend/refund/NeedHelp";

const RefundRequestScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 15 }}
            >
                <RefundStatusTracker />
                <SelectItemBox />
                <RefundDetails />
                <RefundSummary />
                <WhatHappensNext />
                <NeedHelp />
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

export default RefundRequestScreen;

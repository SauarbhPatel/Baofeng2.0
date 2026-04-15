import { StyleSheet, ScrollView } from "react-native";

import { SafeAreaView } from "react-native";
import MainHeader from "../../componend/common/MainHeader";
import OrderBox from "../../componend/ordertracking/OrderBox";
import TrackingHistory from "../../componend/ordertracking/TrackingHistory";
import OrderItems from "../../componend/ordertracking/OrderItems";
import DeliveryAddressBox from "../../componend/ordertracking/DeliveryAddressBox";
import CourierDetails from "../../componend/ordertracking/CourierDetails";
import OrderSummary from "../../componend/ordertracking/OrderSummary";
import NeedHelp from "../../componend/ordertracking/NeedHelp";

const OrderTrackingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MainHeader bgColor="#ffffff" />

            <ScrollView
                contentContainerStyle={{ paddingTop: 15 }}
                showsVerticalScrollIndicator={false}
            >
                <OrderBox />
                <TrackingHistory />
                <OrderItems />
                <DeliveryAddressBox />
                <CourierDetails />
                <OrderSummary />
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

export default OrderTrackingScreen;

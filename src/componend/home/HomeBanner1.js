import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";

const resolveAssetSource = Image.resolveAssetSource;
const { width: screenWidth } = Dimensions.get("window");

const HomeBanner1 = ({
    onMainPress,
    imageSource,
    dynamicScreenWidth = screenWidth - 20,
    borderRadius = 20,
}) => {
    const getDynamicHeight = (source, targetWidth) => {
        const { width, height } = resolveAssetSource(source);
        const ratio = targetWidth / width;
        return height * ratio;
    };

    const targetWidth = dynamicScreenWidth;
    const dynamicHeight = getDynamicHeight(imageSource, targetWidth);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onMainPress}
            style={[styles.wrapper, { width: targetWidth }]}
        >
            <Image
                source={imageSource}
                style={{
                    width: "100%",
                    height: dynamicHeight,
                    borderRadius: borderRadius,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "center",
        marginBottom: 15,
    },
});

export default HomeBanner1;

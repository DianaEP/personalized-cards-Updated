import { View, Text, StyleSheet} from "react-native";
import { useImageContext } from "../../../../store/ImageContext"
import { ACTIONS } from "../../../../store/reducerImagePicker";
import Slider from "@react-native-community/slider";
import { colors } from "../../../../UI/theme";
import { useState } from "react";
import Animated, { FadeInDown, FadeOutDown, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { platformStyle } from "../../../../UI/shadowStyle";
import { height, width } from "../../../../util/screenDimension";


const FontSizeSlider: React.FC = () => {
    const { state, dispatch } = useImageContext();

    const handleFontSizeState = (value: number) => {
        dispatch({ type: ACTIONS.SET_TEXT_FONT_SIZE, payload: value})
        // console.log(state.textFontSize);
    }

    
    
    return(
        <Animated.View style={styles.sliderContainer} entering={FadeInDown.delay(150)} exiting={FadeOutDown}>
            <Text style={styles.sliderText}>Adjust Font Size</Text>
            <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={50}  
                minimumTrackTintColor={colors.titleText}
                maximumTrackTintColor={colors.bodyText}
                thumbTintColor={colors.border}
                value={state.textFontSize}
                // onValueChange={handleThumbChange}
                onSlidingComplete={handleFontSizeState}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        backgroundColor: colors.background,
        // borderColor: colors.border,
        // borderWidth: 1,
        borderRadius: 5,
        position: 'absolute',
        top: height > 700 ? 270 : 200,
        left: 0,
        width: '100%',
        height: 'auto', 
        padding: width > 360 ? 30 : 20,
        ...platformStyle.shadow,  
    },
    sliderText: {
        color: colors.bodyText,
        fontSize: width > 360 ? 20 : 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: width > 360 ? 20 : 10
    },
    slider: {
        width: '100%',
        height: 40
    }
})

export default FontSizeSlider;
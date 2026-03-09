import { StyleSheet, Text, View } from "react-native";
// import  ColorPicker, { HueSlider, OpacitySlider, Panel1 } from "reanimated-color-picker"
import { colors } from "../../../../UI/theme";
import { useImageContext } from "../../../../store/ImageContext";
import { ACTIONS } from "../../../../store/reducerImagePicker";
import Animated, { Easing, FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp} from "react-native-reanimated";
import { platformStyle } from "../../../../UI/shadowStyle";
import { height, width } from "../../../../util/screenDimension";


const ColorPickerPanel: React.FC = () => {
  const { state, dispatch} = useImageContext();

  const handleColorChange = (color: string): void => {
    if(state.targetColor === 'text') {
      dispatch({ type: ACTIONS.SET_CHOSEN_COLOR, payload: color})
    }else if( state.targetColor === 'svg'){
      dispatch({type: ACTIONS.SET_SVG_COLOR, payload: color})
    }
  }

  const chosenColor = state.targetColor === 'text' ? state.chosenColor : state.svgColor;
  const label=state.targetColor === 'text' ? 'Text Color' : 'SVG Color';

  return (
    <Animated.View style={styles.colorPickerContainer} entering={FadeInDown.delay(150)} exiting={FadeOutDown}>
      <Text style={styles.colorPickerText}>{label}</Text>
      {/* <ColorPicker
        value={chosenColor}
        sliderThickness={20}
        thumbSize={25}
        onComplete={(color) => handleColorChange(color.hex)}
      >
        <HueSlider />
        <Panel1 />
        <OpacitySlider />
      </ColorPicker> */}
    </Animated.View>
  );
}
export default ColorPickerPanel;

const styles = StyleSheet.create({
  colorPickerContainer: {
    backgroundColor: colors.background,
    // borderColor: colors.border,
    // borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: height > 700 ? 90 : 8,
    left: 0,
    width: '100%',
    height: 'auto', 
    padding: 20,
    ...platformStyle.shadow,  
},
colorPickerText: {
  color: colors.bodyText,
  fontSize: width > 360 ? 20 : 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: width > 360 ? 20 : 10
}

});

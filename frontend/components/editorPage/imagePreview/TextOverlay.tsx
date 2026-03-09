import { Platform, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Position } from "../../../util/interfaces";
import { useImageContext } from "../../../store/ImageContext";
import { ACTIONS } from "../../../store/reducerImagePicker";
import { fonts, useCustomFonts } from "../../../UI/fonts";

interface TextDimension {
  width: number;
  height: number;
}

interface TextOverlayProps {
  containerWidth: number | null;
  containerHeight: number | null;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  containerWidth,
  containerHeight
}) => {
  const fontsLoaded = useCustomFonts();

  const { state, dispatch } = useImageContext();
  const [textDimension, setTextDimension] = useState<TextDimension>({ width: 0, height: 0});
  
  const translateX = useSharedValue(state.textPosition.x);
  const translateY = useSharedValue(state.textPosition.y);
  
  const startTranslateX = useSharedValue(state.textPosition.x);
  const startTranslateY = useSharedValue(state.textPosition.y);

 
  useEffect(() => {
    console.log('Updated position:', state.textPosition);
    if (state.textPosition) {
      translateX.value = state.textPosition.x;
      translateY.value = state.textPosition.y;
    }
  }, [state.textPosition]);
   
  const handleSetTextPosition = (position: Position) => {
    dispatch({ type: ACTIONS.SET_TEXT_POSITION, payload: position})
  }
  
  const onTextLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setTextDimension({ width, height})
  }

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet'
      const { width, height } = textDimension;
      let minX = 0;
      let maxX = containerWidth ? containerWidth - width : 0;
      let minY = 0;
      let maxY = containerHeight ? containerHeight - height: 0;
      translateX.value = Math.min(maxX, Math.max(minX, startTranslateX.value + event.translationX));
      translateY.value = Math.min(maxY, Math.max(minY, startTranslateY.value + event.translationY));

    })
    .onEnd(() => {
      'worklet'
      runOnJS(handleSetTextPosition)({ x: translateX.value, y: translateY.value})
    })


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(translateX.value)},
        {translateY: withSpring(translateY.value)}
      ]
    }
  })

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
}



  // console.log(state.textFontSize);

  return (
    <>
      {state.textOnImage && (
        <GestureDetector gesture={panGesture}>
          <Animated.View 
            style={[styles.wrapper, animatedStyle]}
            onLayout={onTextLayout}
          >
            <Text
              // key={state.textFont}
              style={[styles.overlayText, {color: state.chosenColor}, {fontFamily: state.textFont}, {fontSize: state.textFontSize}]}
            >
              {state.textOnImage}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
}
export default TextOverlay;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  overlayText: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : undefined,
    padding: 3,
  }
});

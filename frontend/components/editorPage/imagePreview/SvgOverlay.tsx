import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ASSETS_SVG } from "../../../util/dataSvg";
import Animated, {  runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import React, { useEffect } from "react";
import { Position } from "../../../util/interfaces";
import { ACTIONS } from "../../../store/reducerImagePicker";
import { useImageContext } from "../../../store/ImageContext";

interface SvgOverlayProps {
  rotation: number;
  setRotation: (rotation: number) => void;
}

const SvgOverlay: React.FC<SvgOverlayProps> = ({
  rotation,
  setRotation
}) => {

  const { state, dispatch} = useImageContext();
  
  const translateX = useSharedValue(state.svgPosition.x ); 
  const translateY = useSharedValue(state.svgPosition.y );
  const scaleValue = useSharedValue(state.svgScale);
  const rotationValue = useSharedValue(rotation);

  const startScale = useSharedValue(1);
  const startTranslateX = useSharedValue(state.svgPosition.x);
  const startTranslateY = useSharedValue(state.svgPosition.y);

  const isPinching = useSharedValue(false);

  useEffect(() => {
      console.log('Updated position:', state.svgPosition);
      if (state.svgPosition) {
        translateX.value = state.svgPosition.x;
        translateY.value = state.svgPosition.y;
      }
      if(state.svgScale){
        scaleValue.value = state.svgScale;
      }
    }, [state.svgPosition, state.svgScale]);
  
  const handleSetSvgPosition = (position: Position): void => {
    dispatch({ type: ACTIONS.SET_SVG_POSITION, payload: position})
  }
  const handleSetSvgScale = (scale: number): void => {
    dispatch({type: ACTIONS.SET_SVG_SCALE, payload: scale})
  }

  // Moving SVG
  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isPinching.value) return;
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet';
      if (isPinching.value) return;
    
      translateX.value = startTranslateX.value + event.translationX;
      translateY.value = startTranslateY.value + event.translationY;

    })
    .onEnd(() => {
      'worklet';
      runOnJS(handleSetSvgPosition)({ x: translateX.value, y: translateY.value });
    })
 

  // Scale SVG
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      isPinching.value = true;
      startScale.value = scaleValue.value;
    })
    .onUpdate((event) => {
      'worklet';
     
      const newScale = Math.max(0.5, Math.min(startScale.value * event.scale, 1)); // Constrain scaling to 0.1 to 1
      scaleValue.value = newScale;

    })
    .onEnd(() => {
      'worklet';
      isPinching.value = false;
      runOnJS(handleSetSvgScale)(scaleValue.value);  
    })

  // Rotate SVG
  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      'worklet'
      rotationValue.value = event.rotation
    })
    .onEnd(() => {
      runOnJS(setRotation)(rotationValue.value) 
    })
 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scaleValue.value) },
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
        { rotate : withSpring(rotationValue.value + 'rad')}
      ],
    };
  });

  
  const selectedSvgItem = ASSETS_SVG.find((item) => item.id === state.selectedSvgId);
  const SvgOnImage = selectedSvgItem ? selectedSvgItem.svg : null;

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture, rotateGesture);
  return (
    <>
      {selectedSvgItem && (
        
          <GestureDetector gesture={composedGesture}>
            <View style={styles.wrapper}>
              <Animated.View style={[styles.overlaySvg, animatedStyle]}>
                {SvgOnImage && (
                  <SvgOnImage color={state.svgColor}/>
                )}
              </Animated.View>

            </View>

          </GestureDetector>
         
      )}
    </>
  );
}
export default SvgOverlay;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingBottom: 0,
    marginBottom: 0,
    width: 340, 
    height: 300,
  },
  overlaySvg: {
    zIndex: 5, 
  },
 
});

// CODE FOR SVG BORDER, AS IS WORKING PROPERLY FOR THE INITIAL POSITION ONCE YOU ROTATE THE IMAGE THE SVG DOES NOT RESPECT THE BORDER ANYMORE
   // const originalSize = 100;  
      // const scaledWidth = originalSize * scaleValue.value;
      // const scaledHeight = originalSize * scaleValue.value;

      // let minX = 0;
      // let maxX = containerWidth ? containerWidth - scaledWidth : 0;
      // let minY = 0;
      // let maxY = containerHeight ? containerHeight - scaledHeight: 0;

      // let newTranslateX = startTranslateX.value + event.translationX;
      // let newTranslateY = startTranslateY.value + event.translationY;
    
      // if(scaleValue.value >=1){
      //   newTranslateX = Math.min(maxX, Math.max(minX, startTranslateX.value + event.translationX));
      //   newTranslateY = Math.min(maxY, Math.max(minY, startTranslateY.value + event.translationY));
      // }


      // translateX.value = newTranslateX;
      // translateY.value = newTranslateY;
 

import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../UI/theme";
import { fonts } from "../../../../UI/fonts";
import Button from "../../../../UI/buttons/Button";
import { ACTIONS } from "../../../../store/reducerImagePicker";
import { useImageContext } from "../../../../store/ImageContext";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { platformStyle } from "../../../../UI/shadowStyle";
import { height, width } from "../../../../util/screenDimension";



const EditorText: React.FC = () => {
    const { state, dispatch } = useImageContext();
    const appliedColor = state.chosenColor || colors.titleText;

    const handleTextChange = (text: string) => {
        dispatch({ type: ACTIONS.SET_OVERLAY_TEXT, payload: text})
    };

     // Apply text to image
    const handleAddText = (): void => {
        dispatch({ type: ACTIONS.ADD_TEXT_ON_IMAGE})
        dispatch({ type: ACTIONS.TOGGLE_EDITOR_TEXT})
    }
        

    
    return(
        <Animated.View style={styles.container} entering={FadeInDown.delay(150)} exiting={FadeOutDown}>
            <TextInput 
                style={[styles.input, {color: appliedColor}]}
                value={state.overlayText} 
                onChangeText={handleTextChange}
                placeholder="Enter your text here"
                placeholderTextColor={colors.bodyText}
                selectionColor={colors.bodyText}
            />
            <Button textOnly onPress={handleAddText}>Add</Button>
            
            
        </Animated.View>
    )
}
export default EditorText;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: colors.background,
        // borderColor: colors.border,
        // borderWidth: 1,
        borderRadius: 5,
        position: 'absolute',
        top: height > 700 ? 295 : 220,
        left: 0,
        width: '100%',
        height: 'auto', 
        padding: width > 360 ? 30 : 20,
       ...platformStyle.shadow,  
    },
    input: {
        fontFamily: fonts.body,
        fontSize: width > 360 ? 18 : 16,
        width: '60%',
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        paddingLeft: 10,
        
    }
    
    
})
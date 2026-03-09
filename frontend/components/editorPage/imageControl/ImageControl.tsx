import { Alert, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../UI/theme";
import IconButton from "../../../UI/buttons/IconButton";
import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { ACTIONS } from "../../../store/reducerImagePicker";
import { useImageContext } from "../../../store/ImageContext";
import { fonts } from "../../../UI/fonts";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import React from "react";
import { height, width } from "../../../util/screenDimension";
import SimpleModal from "@/UI/SimpleModal";

interface ImageControlProps {
    saveFinalImage: () => Promise<void>;
}

const ImageControl: React.FC<ImageControlProps> = ({saveFinalImage}) => {


    
    const { state, dispatch} = useImageContext(); 
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();

    const verifyPermissions =  async(): Promise<boolean> => {
        if(cameraPermissionStatus?.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionStatus?.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature', [{text: 'Okay'}]);
            return false;
        } 
        return true;  
    }
    
    const pickImage = async(fromCamera: boolean = true): Promise<void> => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        
        let photo;;
        
        if(fromCamera){
            // Open the camera
            photo = await launchCameraAsync({ 
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                mediaTypes: ['images'],
            });    
        }else{
            // Open the gallery
            photo = await launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                mediaTypes: ['images'],
            });
        }
        if(photo.canceled){
            console.log("User canceled the image selection");
            return;
        }
        dispatch({ type: ACTIONS.SET_PHOTO, payload: photo.assets[0].uri})
    }

    const checkPhotoValidation = () : boolean => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return false;
        }
        return true;
    }
    const checkTextValidation = () : boolean => {
        if(!state.textOnImage){
            Alert.alert("Sorry!", "You need to add some text first.");
            return false;
        }
        return true;
    }

    const toggleSvgModal = (): void => {
        if(!checkPhotoValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_SVG_MODAL})
    }


    const toggleColorPicker= (): void => {
        if(!checkPhotoValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_COLOR_PICKER})
    }

    const setTargetColor = (): void => {
        
        dispatch({ type: ACTIONS.SET_TARGET_COLOR, payload: state.targetColor === 'text' ? 'svg' : 'text'})     
    }

    const toggleTextFont = (): void => {
        if(!checkPhotoValidation() || !checkTextValidation()) return;
        dispatch({ type: ACTIONS.SET_TEXT_FONT, payload: state.textFont === fonts.body2 ? fonts.handwriting : fonts.body2})
    }

    const toggleFontSizeSlider = ():void => {
        if(!checkPhotoValidation() || !checkTextValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_FONT_SIZE_SLIDER})
    }

    const toggleEditorText = ():void => {
        if(!checkPhotoValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_EDITOR_TEXT})
    }

    const colorButton = colors.border;
    const sizeButton = width > 400 ? 28 : 24;

    return(
        <View style={styles.imageButtons}>
            <View style={styles.wrapperIcons}>
                <View style={styles.icons}>
                    
                    <IconButton 
                        icon='camera' 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Camera'
                        onPress={() => pickImage(true)}
                    />
                   
                    <IconButton 
                        icon="image" 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Photos'
                        onPress={() => pickImage(false)}
                    />
                    <IconButton 
                        icon='grid' 
                        size={sizeButton} 
                        color={colorButton}
                        label='SVG' 
                        onPress={toggleSvgModal}
                    />
                </View>
                <View style={styles.icons}>

                    <IconButton 
                        icon='add-outline' 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Add Text'
                        onPress={toggleEditorText}
                    />
                    <IconButton 
                        icon='text' 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Font'
                        onPress={toggleTextFont}
                    />
                    <IconButton 
                        icon='resize' 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Font Size'
                        onPress={toggleFontSizeSlider}
                    />
                </View>
            </View>
            <View style={styles.wrapperIcons}>
                <View style={styles.iconsColors}>
                    <IconButton 
                        icon='color-palette' 
                        size={sizeButton} 
                        color={colorButton} 
                        label='Color Picker'
                        onPress={toggleColorPicker}
                    />
                    <IconButton 
                        icon='swap-horizontal' 
                        size={sizeButton} 
                        color={colorButton}
                        label='Switch Color' 
                        onPress={setTargetColor}
                    />
                </View>
            </View>
            {state.photoTaken &&  state.selectedSvgId && state.textOnImage &&(
                <View style={styles.wrapperIcons}>
                    <View style={styles.iconsColors}>
                    <IconButton
                            icon='save-alt' 
                            size={sizeButton} 
                            color={colors.primary} 
                            label="Save"
                            onPress={saveFinalImage}
                            materialIcon
                        />
                    </View>
                </View>
            )}

         
        </View>
    )
}
export default ImageControl;

const styles = StyleSheet.create({
  imageButtons: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    columnGap: width > 400 ? 15 : 10,
    marginVertical: height > 700 ? 20 : 5,   
  },
  wrapperIcons: {
    flexDirection: 'column',
    rowGap: width > 400 ? 15 : 10
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: width > 400 ? 25 : 20
  },
  iconsColors: {
    flexDirection: 'column',
    rowGap: width > 400 ? 15 : 10
  },
});

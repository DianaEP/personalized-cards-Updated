import { Image, StyleSheet, Text } from "react-native";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";
import React from "react";
import { useImageContext } from "../../../store/ImageContext";
import { width } from "../../../util/screenDimension";

// interface ImagePreviewProps {
//   photoTaken: string | null;
// }

const ImagePreview: React.FC = () => {
    const { state } = useImageContext()
    
    if(!state.photoTaken){
        return <Text style={styles.text}>No image taken yet.</Text>
    }

    return <Image style={styles.image} source={{uri: state.photoTaken}}/>
}
export default ImagePreview;

const styles = StyleSheet.create({
  text: {
      color: colors.bodyText,
      fontFamily: fonts.body,
      fontSize: width > 400 ? 18 : 14,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

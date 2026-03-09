import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../UI/theme";
import ImagePicker from "../../components/editorPage/ImagePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";

const Editor: React.FC =() => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImagePicker/>
    </GestureHandlerRootView>
  );
}
export default Editor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
  
  },
  
});
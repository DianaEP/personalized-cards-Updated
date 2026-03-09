import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../UI/theme';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { fonts } from '../../../../UI/fonts';
import React from 'react';



const Card: React.FC = () =>  {
  const { id } = useLocalSearchParams();

  // console.log(id);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Card ID: {id}</Text>
    </View>
  );
}
export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.bodyText,
     fontFamily: fonts.body,
  }
});

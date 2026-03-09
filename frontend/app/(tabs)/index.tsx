import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../UI/theme';
import Button from '../../UI/buttons/Button';
import { useRouter } from 'expo-router';
import { fonts, useCustomFonts } from '../../UI/fonts';
import TextAnimation from '../../components/animations/TextAnimation';
import PostcardsAnimation from '../../components/animations/PostcardsAnimations';
import { height, width } from '../../util/screenDimension';



const App: React.FC = () => {
 
  const fontsLoaded = useCustomFonts();
  const router = useRouter();
  
  function handleCreateCard(){
    router.push('/editor');
  }

  if (!fontsLoaded) {
      return null; 
  }

  const description =
  width > 360
    ? "Create personalized postcards with your photos, messages, and unique touches. Send your memories across the world with warmth and meaning. Choose from beautiful designs and add a handwritten touch!"
    : "Create personalized postcards with your photos, messages, and unique touches. Send your memories across the world with warmth and meaning.";
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TextAnimation/>
      <PostcardsAnimation/>
      <Text style={styles.text}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleCreateCard}>Get Started</Button>

      </View>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.bodyText,
    fontFamily: fonts.body,
    fontSize: width > 360 ? 18 : 14, 
    lineHeight: height > 630 ? 24 : 18,
    marginHorizontal: height > 630 ? 25 : 15,
  },
  buttonContainer: {
    width: '90%',
    margin: width > 360 ? 22: 15,
  }
});

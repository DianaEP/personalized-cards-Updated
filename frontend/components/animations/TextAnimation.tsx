import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../UI/theme";
import { fonts, useCustomFonts } from "../../UI/fonts";
import { height } from "../../util/screenDimension";
import { useAuth } from "../../store/AuthContext";



const TextAnimation: React.FC = () => {
     const fontsLoaded: boolean = useCustomFonts();
     const { user } = useAuth();
     console.log(user?.name);
     

    // Text animation state
    const typingProgress = useSharedValue<number>(0);
    const [displayedText, setDisplayedText] = useState<string>('');
    const text = `Welcome, ${user?.name}!`;
    
    

    const startTypingEffect = () => {
        let index = 0;

        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (index < text.length) {
                    const currentChar = text[index];

                    setDisplayedText((prevText) => prevText + currentChar);
                    typingProgress.value = withTiming(index + 1, { duration: 100, easing: Easing.out(Easing.cubic) });
                    
                    index++;
                } else {
                    clearInterval(typingInterval); 
                }
            }, 150); 
        },1000)
    }

    useEffect(() => {
        typingProgress.value = 0;
        setDisplayedText('')
        startTypingEffect();
    },[])

    
    
    const typingStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            typingProgress.value,
            [0, text.length],
            [colors.primary, colors.bodyText]
        ),
        // fontFamily: typingProgress.value === text.length ? 'Pacifico_400Regular' : 'system-font',
    }));


    if (!fontsLoaded) {
        return null; 
    }
    
return (
       
            <Animated.View style={styles.textWrapper}>
                <Animated.Text style={[styles.text, typingStyle]}>
                    {displayedText}
                </Animated.Text>
            </Animated.View>

  
    )
}
export default TextAnimation;

const styles = StyleSheet.create({
    textWrapper:{
        position: 'absolute',
        top: height > 620 ? 25 : 0,
        left: 20,
        width: '90%',
        height: 100,
        zIndex: 1000
    },
    text:{
        fontSize: height > 620 ? 30 : 28,
        textAlign: 'center',
        fontFamily: fonts.handwriting,
        
    }
})













//   // Image animation state
//   const translateX1 = useSharedValue<number>(400);

//   // Pin animation state
//   const translateXPin = useSharedValue<number>(400);
//   const translateYPin = useSharedValue<number>(-200);

// const slideInEffect = () => {
//     translateX1.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.cubic)});
// }

// const dropPinEffect = () => {
//     setTimeout(() => {
//         translateXPin.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic)});
//         translateYPin.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic)});
//     },2000)
// }

// useEffect(() => {
//     slideInEffect();
//     dropPinEffect();
//     startTypingEffect();
// },[])

// const pictureStyle = useAnimatedStyle(() => ({ transform: [{translateX: translateX1.value}] }));
// const pinStyle = useAnimatedStyle(() => ({transform: [{translateY : translateYPin.value}, { translateX: translateXPin.value }] }));

{/* <Animated.View style={[styles.imageWrapper, pictureStyle]}>
                <Image 
                    source={require('../assets/images/umbrellaCropped.jpg')} 
                    style={styles.image}
                    resizeMode="cover" 
                    />

            </Animated.View>

            <Animated.View style={[styles.pinWrapper, pinStyle]}>
                <Image 
                    source={require('../assets/images/pin.png')} 
                    style={styles.pinImage}
                    resizeMode="contain" 
                    />

            </Animated.View> */}

            // imageWrapper:{
            //     position: 'absolute',
            //     width: '90%', 
            //     height: '90%',
            //     borderRadius: 5,
            //     overflow: 'hidden',
            // },
            // image: {
            //     width: '100%',
            //     height: '100%',
            //     borderRadius: 5,
            // },
            // pinWrapper:{
            //     position: 'absolute',
            //     top: 15,
            //     left: '50%',
            //     width: 50,
            //     height: 50,
            // },
            // pinImage:{
            //     width: 40,
            //     height: 50,
            // },

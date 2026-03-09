import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";
import { fonts } from "../fonts";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { platformStyle } from "../shadowStyle";
import React, { ReactNode } from "react";
import { width } from "../../util/screenDimension";

interface ButtonTypes {
    children: ReactNode;
    onPress: () => void;
    textOnly?: boolean;
    card?:boolean;
}


const Button: React.FC<ButtonTypes> = ({children, onPress, textOnly, card}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: withTiming(scale.value, {duration: 300, easing: Easing.out(Easing.cubic)})}]
        }
    })

    const handlePressIn = () => {
        scale.value = 0.95;   
    }

    const  handlePressOut = () => {
        scale.value = 1.03;
        // delay the onPress function to allow the button to animate back to its original size
        setTimeout(() => {
            scale.value = 1;
            onPress();
        }, 100);
        
    }

    return(
        <Pressable 
            onPressIn = {handlePressIn}
            onPressOut={handlePressOut}
            // style={({pressed}) => [pressed && styles.pressed]}
        >
            <Animated.View style={[styles.button, animatedStyle, textOnly && styles.textOnlyButton, card && styles.cardButton]}>
                <Text style={[styles.text, textOnly && styles.textOnly]}>{children}</Text>
            </Animated.View>
        </Pressable>
    )
}
export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: width > 360 ? 30 : 25,
        padding: width > 360 ? 15 : 10,
        width: '100%',
        // margin: width > 360 ? 25: 15,
        ...platformStyle.shadow,  
       
    },
    // pressed: {
        //     opacity: 0.7,
        // },
    textOnlyButton: {
        backgroundColor: 'transparent',
        fontSize: width > 360 ? 20 : 16,
        borderWidth: 0, 
        marginBottom: 0,
        // margin: width > 380 ? 10 : 15,
        elevation: 0,
       
    },
    cardButton: {
        margin: width > 360 ? 10: 5,
    },
    text: {
        color: colors.border,
        fontFamily: fonts.body,
        fontSize: width > 360 ? 18 : 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textOnly: {
        fontSize: width > 360 ? 18 : 16,
        textAlign: 'center'
    }
})
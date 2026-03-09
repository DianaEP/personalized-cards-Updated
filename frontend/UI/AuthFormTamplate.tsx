import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./buttons/Button";
import { Link } from "expo-router";
import { colors } from "./theme";
import { User } from "../util/interfaces";
import { platformStyle } from "./shadowStyle";
import { width } from "../util/screenDimension";
import { fonts, useCustomFonts } from "./fonts";
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Errors } from "../util/validation/validationForm";

interface FromProps{
    user: User;
    onInputChange: (field: keyof User, value: string) => void;
    onSubmit: () => void;
    buttonText: string;
    linkText: string;
    linkUrl: string;
    showNameField: boolean;
    errors: Errors;
}

const AuthFormTemplate: React.FC<FromProps> = ({
    user,
    onInputChange,
    onSubmit,
    buttonText,
    linkText,
    linkUrl,
    showNameField,
    errors
}) =>{
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const fontsLoaded: boolean = useCustomFonts();
    const opacity = useSharedValue(1);
    const translateX = useSharedValue(0);

    const animatedStyle =  useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 600})
        }
    })


    const animatedStyleArrow = useAnimatedStyle(() => {
        return{
            transform: [
                {
                    translateX: withTiming(translateX.value, {duration: 600})
                }
            ]
        }
    })
    const handlePressIn = () => {
        opacity.value = 0;
        translateX.value = buttonText === 'Register' ? 60 : 80;
    }

    // const handlePressOut = () => {
    //     opacity.value = withTiming( 1, { duration: 100})
    // }

    if (!fontsLoaded) {
        return null; 
    }
    
    return(
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>{buttonText}</Text>
            { showNameField && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, {borderColor: focusedInput === 'userName' ? colors.border : colors.line}]}
                        value={user.name}
                        onChangeText={(text) => onInputChange('name', text)}
                        placeholder="Name"
                        placeholderTextColor={colors.bodyText}
                        selectionColor={colors.bodyText}
                        onFocus={() => setFocusedInput('userName')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errors.name && (
                        <Text style={styles.errors}>{errors.name}</Text>
                    )}

                </View>
            )}
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, {borderColor: focusedInput === 'userEmail' ? colors.border : colors.line}]}
                    value={user.email} 
                    onChangeText={(text) => onInputChange('email', text)}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={colors.bodyText}
                    selectionColor={colors.bodyText}
                    onFocus={() => setFocusedInput('userEmail')}
                    onBlur={() => setFocusedInput(null)}
                />
                {errors.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, {borderColor: focusedInput === 'userPassword' ? colors.border : colors.line}]}
                    value={user.password} 
                    onChangeText={(text) => onInputChange('password', text)}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor={colors.bodyText}
                    selectionColor={colors.bodyText}
                    onFocus={() => setFocusedInput('userPassword')}
                    onBlur={() => setFocusedInput(null)}
                />
                {errors.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                )}
            </View>

            {showNameField && (
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, {borderColor: focusedInput === 'userConfirmPassword' ? colors.border : colors.line}]}
                        value={user.confirmPassword} 
                        onChangeText={(text) => onInputChange('confirmPassword', text)}
                        placeholder="Confirm Password"
                        secureTextEntry
                        placeholderTextColor={colors.bodyText}
                        selectionColor={colors.bodyText}
                        onFocus={() => setFocusedInput('userConfirmPassword')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errors.confirmPassword && (
                        <Text style={styles.errors}>{errors.confirmPassword}</Text>
                    )}

                </View>
            )}

            <View style={styles.button}>
                <Button onPress={onSubmit}>{buttonText}</Button>
            </View>

            <View style={styles.account}>
                <Text style={styles.linkText}>{linkText}</Text>

                <Animated.View style={animatedStyleArrow}>
                    <MaterialIcons name={"arrow-right"} size={24} color={colors.bodyText}/> 
                </Animated.View>


                <Animated.View style={[animatedStyle]}>
                    <Link  style={styles.link} href={linkUrl} onPressIn={handlePressIn}>
                        {linkText === "Don't have an account?" ? "Register" : "Login"}
                    </Link>
                </Animated.View>     
            </View>
            
        </View>
    </View>
    )
}

export default AuthFormTemplate;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper:{
        width: '80%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderRadius: 10,
        backgroundColor: colors.background,
         ...platformStyle.shadow,  
    },
    title: {
        fontSize: width > 360 ? 32 : 28,
        fontFamily: fonts.handwriting,
        marginBottom: 10,
    },
    inputContainer:{
        width: '90%',
    },
    input: {
        width: '100%',
        borderRadius: width > 360 ? 30 : 25,
        padding: width > 360 ? 15 : 10,
        fontSize: width > 360 ? 18 : 16,
        fontFamily: fonts.body,
        borderWidth: 1,
        // borderColor: colors.line,
        backgroundColor: colors.background,
    },
    button: {
        width: '90%'
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    linkText: {
        fontFamily: fonts.body,
        color: colors.bodyText

    },
    link: {
        fontFamily: fonts.body,
        color: colors.primary
    },
    errors: {
        fontFamily: fonts.body,
        fontSize: width > 360 ? 11 : 9,
        color: colors.primary,
        paddingLeft: width > 360 ? 15 : 10,
    }
    
  });
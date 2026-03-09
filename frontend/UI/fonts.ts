import { useFonts } from 'expo-font';
import { Lora_400Regular } from '@expo-google-fonts/lora';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

import { Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

type FontsType = {
    title: string;
    body: string;
    body2: string;
    handwriting: string;
}

export const fonts: FontsType ={
    title: 'Poppins_600SemiBold',
    body: 'Inter_400Regular',
    body2: 'Nunito_400Regular',
    handwriting: 'Pacifico_400Regular'
}

export const useCustomFonts = (): boolean => { // (): boolean means it returns a boolean value
    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Inter_400Regular,
        Nunito_400Regular,
        Pacifico_400Regular
    })

    useEffect(() => {
        if(fontsLoaded){

            SplashScreen.hideAsync();
        }else{
           
            SplashScreen.preventAutoHideAsync();
        }
    }, [fontsLoaded])

    return fontsLoaded;
    
}



// ---------------------------------------- USING ASSETS -------------------------------------------------------------------

// import * as Font from "expo-font";
// import { SplashScreen } from "expo-router";
// import { useEffect, useState } from "react";

// type FontsType = {
//     title: string;
//     body: string;
//     body2: string;
//     handwriting: string;
// }

// export const fonts: FontsType ={
//     title: 'Poppins-SemiBold',
//     body: 'Inter-Regular',
//     body2: 'Nunito-Regular',
//     handwriting: 'Pacifico-Regular'
// }

// const loadFonts = async(): Promise<void> => {
//     await Font.loadAsync({
//         "Poppins-SemiBold" : require("../assets/fonts/Poppins-SemiBold.ttf"),
//         "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
//         "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
//         "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf")
//     });
//     await SplashScreen.hideAsync();
// }

// export const useCustomFonts = (): boolean => { // (): boolean means it returns a boolean value
//     const [fontsLoaded, setFontsLoaded] = useState(false);
    
//     useEffect(() => {
//         SplashScreen.preventAutoHideAsync();
//         loadFonts().then(() => setFontsLoaded(true))
//     },[])
//    return fontsLoaded;
    
// }

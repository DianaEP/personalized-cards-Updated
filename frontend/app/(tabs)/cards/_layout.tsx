import { Stack } from "expo-router";
import { colors } from "../../../UI/theme";
import { fonts } from "../../../UI/fonts";
import React from "react";

const Layout: React.FC = () =>{
    return(
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: colors.background
            },
            headerTintColor: colors.titleText,
            headerTitleStyle: {
                fontFamily: fonts.title,
                fontSize: 24,
            },
        }}>
            <Stack.Screen name="index" options={{
                title: 'Your Cards',
            }} />
            <Stack.Screen name="[id]/index" options={{
                title: 'Card Details',
            }} />
        </Stack>
    )
}

export default Layout;
import { Platform, ViewStyle } from "react-native";
import { colors } from "./theme";

export const platformStyle: { shadow: ViewStyle} = { // This type comes from React Native's types and is used for view-related styles (like shadowColor, elevation, etc.).
    shadow: {
        ...Platform.select({
          android: {
            elevation: 4,
          },
          ios: {
            shadowColor: colors.titleText,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        }),
    }
};

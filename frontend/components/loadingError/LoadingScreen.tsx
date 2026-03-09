import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../../UI/theme";
import { fonts } from "../../UI/fonts";

interface LoadingProps{
    message?: string;
}

const LoadingScreen: React.FC<LoadingProps> = ({message}) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            {message && (
                <Text style={styles.text}>{message}</Text>
            )}

        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text: {
        fontFamily: fonts.body,
        color: colors.bodyText
    }
})
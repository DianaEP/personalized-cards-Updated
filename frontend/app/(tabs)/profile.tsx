import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../UI/theme";
import { useAuth } from "../../store/AuthContext";
import Button from "../../UI/buttons/Button";
import { deleteProfile } from "../../util/http/authApi";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "../../UI/fonts";
import { height, width } from "../../util/screenDimension";
import { platformStyle } from "../../UI/shadowStyle";

const Profile: React.FC =() => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const deleteUser = async() => {
        try{
            await deleteProfile();
            Alert.alert("Success", "Your account has been deleted.");
            await AsyncStorage.removeItem('token');
            router.push('/(auth)')
        }catch(error){
            Alert.alert("Error", "Failed to delete account. Please try again.");
        }
    }

    const logoutUser = () => {
        if(user){
            logout();
        }
    }
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.text}>{user?.name}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.text}>{user?.email}</Text>      
            </View>
        </View>
        <View style={styles.buttons}>
            <Button onPress={deleteUser} textOnly>Delete</Button>
            <Button onPress={logoutUser}>Logout</Button>
        </View>
      </View>
    );
  }
  export default Profile;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, 
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: height > 700 ? 50 : 20,
    
    },
    textContainer: {
        // borderColor: colors.line,
        backgroundColor: colors.background, 
        // borderWidth: 1,
        borderRadius: 10,
        width: '90%', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        padding: 40,
        ...platformStyle.shadow
    },
    textWrapper:{
        flexDirection: 'row',
        gap: 10,
    },
    label: {
        fontSize: width > 360 ? 18 : 16,
        fontFamily: fonts.body,
        color: colors.titleText,
    },
    text: {
        fontFamily: fonts.body,
        color: colors.bodyText,
        fontSize: width > 360 ? 18 : 16,
    },
    buttons: {
        width: '90%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    }
  });
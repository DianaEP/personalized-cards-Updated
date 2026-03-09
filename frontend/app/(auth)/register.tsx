import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../UI/theme";
import { useState } from "react";
import { User } from "../../util/interfaces";
import AuthFormTemplate from "../../UI/AuthFormTamplate";
import { useAuth } from "../../store/AuthContext";
import { useRouter } from "expo-router";
import useFormValidation from "../../util/validation/validationHook";
import { Alert } from "react-native";

const Register: React.FC = () =>  {
    const { registerUser } = useAuth();
    const router = useRouter();
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    })

    const { errors, setErrors, validateOnSubmit} = useFormValidation(user, 'register');

    const handleInputChange = (field: keyof User, value: string) => { // keyof User to ensure that the field passed to the handler (field: keyof User) is one of the keys in the User interface
     
      setUser((prevData) => ({
            ...prevData,
            [field]: value
      }))

      if(errors){
        setErrors((prevError) => ({
          ...prevError,
          [field]: ''
      }))
      }
    }

    const handleSubmit = async () => {
        const {confirmPassword, ...userData} =  user;
        console.log(userData);
        
        if(!validateOnSubmit()) return;
        await registerUser(userData);
        // Alert.alert("Success", "User created successfully.");

        router.push('/(tabs)');
    };
  
  return (
    <AuthFormTemplate
        user={user}
        onInputChange={handleInputChange} 
        onSubmit={handleSubmit}
        buttonText="Register"
        linkText="Already have an account?"
        linkUrl="/"
        showNameField={true}
        errors={errors}
    />
  );
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
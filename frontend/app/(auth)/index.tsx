import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../UI/theme";
import { useState } from "react";
import Button from "../../UI/buttons/Button";
import { Link, useRouter } from "expo-router";
import AuthFormTemplate from "../../UI/AuthFormTamplate";
import { User } from "../../util/interfaces";
import { useAuth } from "../../store/AuthContext";
import useFormValidation from "../../util/validation/validationHook";



const Login: React.FC = () =>  {
    const router = useRouter();
    const { user, loginUser } = useAuth();
    const [userData, setUserData] = useState<User>({
        email: '',
        password: ''
    })
    const { errors, setErrors, validateOnSubmit} = useFormValidation(userData, 'login');

    const handleInputChange = (field: keyof User, value: string) => { // keyof User to ensure that the field passed to the handler (field: keyof User) is one of the keys in the User interface
        setUserData((prevData) => ({
            ...prevData,
            [field]: value
        }))

        if(errors[field]){
            setErrors((prevError) => ({
                ...prevError,
                [field]: ''
            }))
        }
    }

    const handleSubmit = async () => {
        if(!validateOnSubmit()) return;
        await loginUser(userData);
        // if(!user) return; 
        router.push('/(tabs)');
        
    }
  
  return (
    <AuthFormTemplate
        user={userData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        buttonText="Login"
        linkText="Don't have an account?"
        linkUrl="/register"
        showNameField={false}
        errors={errors}
    />
  );
}
export default Login;

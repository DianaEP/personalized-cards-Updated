import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";
import { getProtectedData } from "./protectedApi";
import { User } from "../interfaces";




export const register = async( user: User) => {
    try{
        if (!user.email || !user.password || !user.name) {
            throw new Error("All fields are required!");
        }
        const response = await axiosInstance.post('/auth/register', user);

        if(response.data.token){
            await AsyncStorage.setItem('token', response.data.token)
        }
        return response.data;
    }catch(error){
        console.error("Error registering user", error);
        throw error;
    }
}

export const login = async( user: User) => {
    try{
        
        const response = await axiosInstance.post('/auth/login', user);
        if(response.data.token){
            await AsyncStorage.setItem('token', response.data.token)
        }
        return response.data;
    }catch(error){
        console.error("Error registering user", error);
        throw error;
    }
}

export const deleteProfile = async() => {
    try{
        
        const response = await axiosInstance.delete('/auth/delete');
        return response.data;
    }catch(error){
        console.error("Error deleting user profile", error);
        throw error;
    }
}
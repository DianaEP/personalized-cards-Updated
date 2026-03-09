import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
    // emulator path
    baseURL: 'http://10.0.2.2:5000', 
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
})

export default axiosInstance;
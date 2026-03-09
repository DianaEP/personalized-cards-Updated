import { ImageItem } from "../../store/reducerImagePicker";
import axiosInstance from "./axiosInstance"

// Save image (POST)
export const saveImageUri = async( imageData: Omit<ImageItem, 'id'>) => {
    try{
        const response = await axiosInstance.post('/postcards', imageData);
        return response.data;
    }catch(error){
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Get all images(GET)
export const getImages = async () => {
    try{
        const response =  await axiosInstance.get('/postcards');
        return response.data;
    }catch(error){
        console.error('Error fetching image:', error);
        throw error;
    }
}

// Get one image(GET)
export const getImage = async (id: string) => {
    try{
        const response =  await axiosInstance.get(`/postcards/${id}`);
        return response.data;
    }catch(error){
        console.error('Error fetching image:', error);
        throw error;
    }
}



// Update an image(PUT)
export const updateImage = async (id: string, imageData: ImageItem) => {
    try{
        const response =  await axiosInstance.put(`/postcards/${id}`, imageData)
        return response.data;
    }catch(error){
        console.error('Error updating image:', error);
        throw error;
    }

}

//Delete an image(DELETE)
export const deleteImage = async (id: string) => {
    try{
        const response = await axiosInstance.delete(`/postcards/${id}`);
        return response.data;
    }catch(error){
        console.error('Error deleting image:', error);
        throw error;
    }
}

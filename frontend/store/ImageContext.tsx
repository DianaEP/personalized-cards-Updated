import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import { Action, initialState, reducer, State } from "./reducerImagePicker";

interface ImageContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
    isImageLoading: boolean;
    setIsImageLoading:  React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isImageLoading, setIsImageLoading] = useState(false);
    return(
        <ImageContext.Provider value={{ state, dispatch, isImageLoading, setIsImageLoading}}>{children}</ImageContext.Provider>
    )
}

// Custom hook to ensure context is not undefined
export const useImageContext = () => {
    const context = useContext(ImageContext);
    if(!context){
        throw new Error("useImageContext must be used within an ImageContextProvider")
    }
    return context;
}
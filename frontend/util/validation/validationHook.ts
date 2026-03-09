import { useState } from "react";
import { User } from "../interfaces";
import validationForm, { Errors } from "./validationForm";

const useFormValidation = (data: User, formType: string) => {
    const [errors, setErrors] = useState<Errors>({});

    function validateOnSubmit(): boolean{
        const validateErrors = validationForm(data, formType);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return false;
        }
        return true;
    }
    
    return {errors, setErrors, validateOnSubmit}
}

export default useFormValidation;
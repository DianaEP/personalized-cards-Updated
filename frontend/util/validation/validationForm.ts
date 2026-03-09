import { User } from "../interfaces";

export interface Errors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
}

const validationForm = (data: User, formType: string) => {
    const errors: Errors = {} ;
    const isValidEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return regex.test(email)
    };

    if(formType === 'login' || formType === 'register'){
        if(!data.email.trim()){
            errors.email = "Email is required"
        }else if(!isValidEmail(data.email)){
            errors.email = "Email address is invalid"
        }
    }

    if(formType === 'login'){
        if (!data.password?.trim()) {
            errors.password = "Password is required";
        }
    }

    if(formType === 'register'){
        if (!data.password?.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!data.confirmPassword?.trim()) {
            errors.confirmPassword = "Confirm Password is required";
        }

        if(data.password !== data.confirmPassword){
            errors.confirmPassword = "Password don't match!"
        }

        if(!data.name?.trim()){
            errors.name = "Name is required"
        }
    }
    return errors;

}

export default validationForm;
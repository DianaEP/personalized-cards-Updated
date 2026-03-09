export interface Position {
    x: number;
    y: number;
}

export interface User{
    email: string;
    password: string;
    confirmPassword?: string;
    name?: string;
}
// Middleware in Express is a function that runs before the actual route handler.
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, Router } from "express"

const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

// Extend the Request type to include the `user` field
export interface AuthRequest extends Request{
    user?: {id: string, email: string, name: string}
}



const authenticatedUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader =  req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message: "No token provided"});
        return; 
    } 

    const token = authHeader.split(" ")[1]; // split(" ") → ["Bearer", "your_jwt_token_here"] → "your_jwt_token_here" = JWT token
    console.log('Token received:', token); 
    try{
        // asserting that the decoded value will match my expected structure.
        const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string; name: string };
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();

    }catch(error){
        console.log('Error verifying token:', error);
        if (error instanceof jwt.TokenExpiredError) {
           res.status(401).json({ message: 'Token expired' });
           return; 
        }
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}

export default authenticatedUser;


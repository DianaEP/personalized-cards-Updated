import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../db";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import authenticatedUser, { AuthRequest } from "../middleware/authenticateUser";

const authRoutes = Router();
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key'; // → Bad practice use only the .env file

const isValidEmail = (email : string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    return regex.test(email);
}

// REGISTER Route

authRoutes.post("/register", async( req: Request, res: Response): Promise<any> => {
    const {name, email, password} = req.body;

    if( !name || !email || !password || password.length < 6){
        return res.status(400).json({message: "All fields are required or password is too short"})
    }

    if(!isValidEmail(email)){
        return res.status(400).json({message: "Invalid email format"})
    }

    const hashedPassword = await bcrypt.hash(password,10); // bcrypt is a password-hashing library that helps securely store passwords.

    try{
        const db = getDb();
        const existingUser = await db.get("SELECT * from users WHERE email = ?", [email]);
        if(existingUser){
            return res.status(400).json({message: "User already exists!"})
        }

        const userId = uuidv4();
        await db.run("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?,?)",[userId, name, email, hashedPassword]);
        const token = jwt.sign({id: userId, email: email, name: name}, SECRET_KEY, {expiresIn: "1h"});

        const dataResponse = res.status(201).json({message: "User created successfully.", token})
        console.log(dataResponse)
    }catch(error){
        console.error("Error inserting user:", error);
        res.status(500).json({ message: 'Error inserting user', error });
    }
 })

//  LOGIN Route

authRoutes.post("/login", async ( req: Request, res: Response): Promise<any> => {
    const { email, password} = req.body;
    const db =  getDb();

    if(!email || !password){
        return res.status(400).json({error: "Email and password are required"})
    }
    try{
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        if(!user){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({id: user.id, email: user.email, name: user.name}, SECRET_KEY, {expiresIn: "1h"}); //jwt.sign() is a function from the jsonwebtoken library that generates a signed JWT token
        res.json({message: "User login successfully.",token});
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error });
    }

    

})

// DELETE route
authRoutes.delete("/delete", authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
    console.log("Delete route hit");
    const userId = req.user?.id;
    console.log("User ID:", userId);
    if(!userId){
        return res.status(401).json({error: "Unauthorized"})
    }

    const db = getDb();
    try{
        const user = db.get("SELECT * FROM users WHERE id=?", [userId]);
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }

        await db.run('DELETE FROM images WHERE userId=?', [userId]);
        await db.run("DELETE FROM users WHERE id=?", [userId]);

        res.json({ message: "User and related postcards deleted successfully." });
    }catch(error){
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Server error", error });
    }
})

export default authRoutes;


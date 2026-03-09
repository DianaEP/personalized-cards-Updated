import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express"
import authenticatedUser, { AuthRequest } from "../middleware/authenticateUser";

// Protected Route (middleware)
const protectedRoutes = Router();

protectedRoutes.get("/", authenticatedUser,  async(req: AuthRequest, res: Response): Promise<any> => {
        res.json({message: "Protected data", user: req.user});
})

export default protectedRoutes;
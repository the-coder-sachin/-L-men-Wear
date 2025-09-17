import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isLoggedin = async(req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.user.id).select("-password");
            next()
        } catch (error) {
            console.log("token verification failure - "+error);
            res.status(500).json({message: "token verification failure"})
        }
    }
    else{
        res.status(401).json({message: "token not provided"})
    }
}

export const isAdmin = (req, res, next) =>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        res.status(403).json({message: "Not an Admin"})
        console.log(`not an admin`);
        
    }
}
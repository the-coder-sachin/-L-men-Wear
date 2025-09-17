import express from "express";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { isLoggedin } from "../middlewares/auth.mddleware.js";

const userRouter = express.Router();

// @route POST /api/users/register
// @description register new users
// @access (public)

userRouter.post("/register", async (req, res)=>{
    const {name, email, password} = req.body;
     try {
       // Check if user already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res
           .status(409)
           .json({ message: "User with this email already exists." });
       }


       // Create user
       const newUser = new User({
         name,
         email,
         password
       });

       // Save user
       const savedUser = await newUser.save();

       // create JWT payload
       const payload = {user: {id: newUser._id, role: newUser.role}}

       //sign and return the token with user data
       jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "60h"}, (err, token)=>{
        if(err) throw err;

        // send user & token
        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        })
       })

     } catch (error) {
       console.error("Register Error:", error);
       res.status(500).json({ message: "Server error. something went wrong" });
     }
})



// @route POST /api/users/login
// @description login existing users
// @access (public)

userRouter.post("/login", async (req, res)=>{
    const { email, password} = req.body;
     try {
       // Check if user already exists
       const existingUser = await User.findOne({ email });
       if (!existingUser) {
         return res
           .status(409)
           .json({ message: "User with this email does not exists." });
       }

       const isMatch = await existingUser.matchPassword(password)

       if(!isMatch) return res.status(401).json({message: "please enter correct password"})
 
       // create JWT payload
       const payload = {user: {id: existingUser._id, role: existingUser.role}}

       //sign and return the token with user data
       jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "60h"}, (err, token)=>{
        if(err) throw err;

        // send user & token
        res.status(201).json({
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            token
        })
       })
     } catch (error) {
       console.error("Register Error:", error);
       res.status(500).json({ message: "Server error. something went wrong" });
     }
})


// @route GET /api/users/profile
// description fetch logged in user's profile
// @access private route (use middleware for authentication)

userRouter.get("/profile", isLoggedin, async (req, res)=>{
  const {user} = req;
  res.status(200).json({user: user})  
})

// @route PUT /api/users/avtar
// @description upload image (profile)
// @access private
userRouter.put("/:id", isLoggedin, async (req, res)=>{
  try {
    const {id} = req.params;
    const {name, image} = req.body;

    const user = await  User.findByIdAndUpdate(id, {name, image}, {new: true});
    
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    console.log(user);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });

    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"server error"})
  }
})

export default userRouter;
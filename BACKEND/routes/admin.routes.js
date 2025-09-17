import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/auth.mddleware.js";
import { User } from "../models/user.model.js";

export const router = express.Router();


// @route GET api/admin/users
// @description get all the users list
// @access private + admin only

router.get("/", isLoggedin, isAdmin, async(req, res)=>{
    try {
        const users = await User.find({}, "-password").sort({createdAt : -1});
        if(!users || users.length === 0 ){
            return res.status(404).json({messgae: "no users found"})
        }
        res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})



// @route POST api/admin/users
// @description add a new user
// @access private + admin only

router.post("/", isLoggedin, isAdmin, async(req, res)=>{
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({messgae: "user already exists!"})
        }
        const newUser = await User.create({name, email, password, role});
       
        res.status(200).json(newUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})



// @route PUT api/admin/users/:id
// @description update the user
// @access private + admin only

router.put("/:id", isLoggedin, isAdmin, async(req, res)=>{
    try {
        const {name, role} = req.body;
        const id = req.params.id;

        const updatedUser = await User.findOneAndUpdate({_id: id}, {name, role}, {new: true})
              
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})


// @route DELETE api/admin/users/:id
// @description delete the user
// @access private + admin only

router.delete("/:id", isLoggedin, isAdmin, async(req, res)=>{
    try {
        const id = req.params.id;
        

        const deletedUser = await User.findOneAndDelete({_id: id})
        
        if(deletedUser){
            res.status(200).json({user: id, messgae: "user deleted successfully!"})
        }else{
            res.status(400).json({messgae: "user deleted failed"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})


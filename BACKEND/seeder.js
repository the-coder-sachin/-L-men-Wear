import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/product.js";
import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";

dotenv.config();

// connect to database
mongoose.connect(process.env.MONGODB_URI)

// function to seed data 
const seedData = async ()=>{
    try {
        // clear all products & users first
        await Product.deleteMany()
        await User.deleteMany()

        // create a default admin user

        const createdAdmin = await User.create({
            name: "admin user",
            email: "admin@example.com",
            password: 1234567,
            role: "admin"
        })

        // assign default admin user id

        const userId = createdAdmin._id;

        const sampleProducts = products.map(product=>{
            return {...product, user: userId}
        })

        // add sample products to the database

        await Product.insertMany(sampleProducts)

        console.log("products seeded successfully");
        process.exit()
        
    } catch (error) {
        console.error("error seeding data : " , error)
        process.exit(1)        
    }
}

seedData()
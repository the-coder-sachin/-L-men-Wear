import mongoose from "mongoose";
import { shippingDetailsSchema } from "./shippingDetails.schema.js";

const checkoutItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
}, {_id: false});

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    checkoutItems : [checkoutItemSchema],
    shippingDetails: shippingDetailsSchema,
    paymentMethod:{
        type: String
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "paid"],
        default: "pending",
    },
    isFinalized: {
        type: Boolean,
        required: true,
        default:false
    },
    finalizedAt: {
        type: Date 
    }
}, {timestamps: true})

export const Checkout = mongoose.model("Checkout", checkoutSchema)
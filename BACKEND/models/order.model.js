import mongoose from "mongoose";
import { shippingDetailsSchema } from "./shippingDetails.schema.js";

const orderItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    mrp:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    size:{
        type: String,
    },
    color:{
        type: String, 
    },
},{_id:false})

const orderSchema = new mongoose.Schema({
    orderItems : [orderItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shippingDetails:{
        type: shippingDetailsSchema,
        required: false
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "credit card"
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliverAt: {
        type: Date,
    },
    cancelledAt: {
        type: Date,
    },
    shippedAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "paid"],
        default: "pending"
    },
    status: {
        type: String,
        required: true,
        enum: ["processing", "shipped", "delivered", "cancelled", "pending"],
        default: "processing"
    },
},{timestamps: true})

export const Order = mongoose.model("Order", orderSchema)
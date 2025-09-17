import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String,
    image: String,
    size: String,
    color: String,
    price: Number,
    mrp: Number,
    quantity: {type: Number, default: 1},  
}, {_id: false});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: String,
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    }
},{timestamps: true});

export const Cart = mongoose.model("Cart", cartSchema)

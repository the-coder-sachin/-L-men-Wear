import express from "express";

import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Checkout } from "../models/checkout.model.js";
import { Order } from "../models/order.model.js";
import { isLoggedin } from "../middlewares/auth.mddleware.js";

export const router = express.Router()

// @route api/checkout/
// @description create a new checkout session
// @access private

router.post("/", isLoggedin, async(req, res)=>{
    const {checkoutItems, shippingDetails, paymentMethod, totalPrice } = req.body;
    
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message:"your bag is empty"})
    }

    try {
        // create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingDetails,
            paymentMethod,
            totalPrice,
            paymentStatus: "paid",
            isPaid: true,
            paidAt: Date.now(),
            isFinalized: true,
            finalizedAt: Date.now(), 
            isDelivered: false,
        })

        console.log('new checkout created for user: '+ req.user._id);

        res.status(201).json(newCheckout)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"})
    }
})

// @route api/checkout/:id/finalized
// @description finalize the checkout once paid
// @access private

router.post("/:id/finalize", isLoggedin, async(req, res)=>{
    try {

        const {shippingDetails} = req.body;

        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message:"checkout not found"})
        };

        if(checkout.isFinalized){
            return res.status(400).json({message: "checkout is already finalized"})
        }

        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems: checkout.checkoutItems,
            shippingDetails,
            paymentMethod: "credit card",
            totalPrice: checkout.totalPrice,
            isPaid: true,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "paid",
        })

        // mark checkout as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now()

        await checkout.save();

        // now clear the cart for the user

        const cart = Cart.findOneAndDelete({user: checkout.user});

        res.status(201).json(finalOrder)
        

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"})
    }
})
import express from "express";
import { isLoggedin } from "../middlewares/auth.mddleware.js";
import { Order } from "../models/order.model.js";

export const router = express.Router();


// @route api/order/my-orders
// @description get orders list for the user
// @access private

router.get('/my-orders' , isLoggedin, async (req, res)=>{
    try {
        const userId = req.user._id;
        console.log(`${userId} , trying to fetch orders`);
        

        const orders = await Order.find({user: userId}).sort({createdAt : -1});

        console.log(orders);
        

        if(!orders || orders.length === 0){
            return res.status(404).json({message: "no orders found ! keep shopping"})
        }

        res.status(200).json(orders)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
    }
})

// @route api/order/:id
// @description get order details of particular order
// @access private

router.get('/:id' , isLoggedin, async (req, res)=>{
    try {
        const id = req.params.id

        const order = await Order.findById(id).populate("user", "name email");

        if(!order){
            return res.status(404).json({message: "you have not placed any orders yet"})
        }

        res.status(200).json(order)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
    }
})
 

// @route POST api/order/
// @description create an order
// @access private

router.post('/' , isLoggedin, async (req, res)=>{
    try {
        const{orderItems, shippingDetails, totalPrice, paidAt } = req.body;

        const user = req.user._id;

        console.log({
            orderItems:orderItems,
            shippingDetails:shippingDetails,
            totalPrice:totalPrice,
            user:user
        });
        if (!orderItems || orderItems.length === 0) {
          return res.status(400).json({ message: "No order items" });
        }
        if (!shippingDetails || !totalPrice) {
          return res.status(400).json({ message: "Missing order details" });
        }


        const order = await Order.create({orderItems, shippingDetails, totalPrice, user, isPaid: true, paidAt, });

        if(!order){
            return res.status(400).json({message: "failed to create order"})
        }

        res.status(200).json(order)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
    }
})


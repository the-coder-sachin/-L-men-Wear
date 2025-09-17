import express from "express";
import { Order } from "../models/order.model.js";
import { isAdmin, isLoggedin } from "../middlewares/auth.mddleware.js";

export const router = express.Router();


// @route GET api/admin/orders
// @description get all the orders list
// @access private + admin only

router.get("/", isLoggedin, isAdmin, async(req, res)=>{
    try {
        const orders = await Order.find({}).populate("user", "name email");
        if(!orders || orders.length === 0 ){
            return res.status(404).json({messgae: "no orders found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})

// @route PUT api/admin/orders/:id
// @desc Update order status
// @access Private (admin only)

router.put("/:id", isLoggedin, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "No such order found" });
    }

    // Reset timestamps
    order.deliverAt = null;
    order.shippedAt = null;
    order.cancelledAt = null;
    order.isDelivered = false;

    switch (status) {
      case "delivered":
        order.isDelivered = true;
        order.deliverAt = Date.now();
        break;
      case "shipped":
        order.shippedAt = Date.now();
        break;
      case "cancelled":
        order.cancelledAt = Date.now();
        break;
      // other statuses (e.g. pending, processing) don’t need timestamps
    }

    order.status = status;

    const updatedOrder = await order.save();
    await updatedOrder.populate("user", "name email");
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

import { isLoggedin } from "../middlewares/auth.mddleware.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

import express from "express";

export const router = express.Router();

const getCart = async (user, guestId) =>{
    if(user){
        return await Cart.findOne({user})
    }else if(guestId){
        return await Cart.findOne({guestId})
    }else{
        return null
    }
}


router.get("/show/all", async(req, res)=>{
    try {
        const carts = await Cart.find();

        if(carts){
            res.status(200).json(carts)
        }else{
            return res.status(404).json({message:"carts not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
    }
})
router.delete("/delete/all", async(req, res)=>{
    try {
        const carts = await Cart.deleteMany();
        console.log(carts);
        
        if(carts){
            res.status(200).json({message:"deleted"})
        }else{
            return res.status(404).json({message:"carts not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
    }
})

// @route POST /
// @description add product to the cart
// @access public 

router.post("/", async(req, res)=>{
    try {
        const { productId, size, color, quantity, guestId, user } = req.body;

        const product = await Product.findById(productId);         
        
        if(!product){ 
            return res.status(404).json({message: "product not found"})
        }

        // check if user logged in or not
        let cart = await getCart(user, guestId)

        // if the cart exist then update it
        if(cart){
            
            const productIndex = cart.products.findIndex(
                p =>
                    p.productId.toString() === productId && p.size === size && p.color === color
            )

            if(productIndex > -1) {
                // if the product already exists, then update the quantity
                cart.products[productIndex].quantity += quantity; 
            }else{
                // since product is not added already, then add the product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    mrp: product.mrp,
                    size,
                    color,
                    quantity
                })
            }
            // recalculate total price
            cart.totalPrice = cart.products.reduce((acc, item)=> acc + item.price * item.quantity, 0 )

            await cart.save()

            return res.status(200).json(cart)

        }else{
            // we need to create fresh cart for the user or guest

            const newCart = await Cart.create({
              user: user ? user : undefined,
              guestId: guestId ? guestId : "guest_" + new Date().getTime(),
              products: [
                {
                  productId,
                  name: product.name,
                  image: product.images[0],
                  price: product.price,
                  mrp: product.mrp,
                  size,
                  color,
                  quantity,
                },
              ],
              totalPrice: Number(product.price) * Number(quantity),
            });
            
            return res.status(201).json(newCart)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
})


// @route PUT /
// @description update quantity of product to the cart
// @access public 

router.put("/", async(req, res)=>{
    try {
        const { productId, size, color, quantity, guestId, user } = req.body;

        const product = await Product.findById(productId);         
        
        if(!product){ 
            return res.status(404).json({message: "product not found"})
        }
        
        // if the cart exist then update it
        let cart = await getCart(user, guestId)
        if(cart){
            const productIndex = cart.products.findIndex(p=>p.productId.toString() === productId && p.size === size && p.color=== color)

            // update the quantitiy
            if(productIndex > -1){
                if(quantity > 0){
                    cart.products[productIndex].quantity = quantity;
                }else{
                    cart.products.splice(productIndex, 1); // removes the product if quantity is 0

                }
            }
            cart.totalPrice = cart.products.reduce((acc, item)=> acc + item.price * item.quantity , 0)
            
            await cart.save()

            return  res.status(200).json(cart)
        }else{
           return res.status(404).json({message: "cart not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
})


// @route DELETE /
// @description remove product fromm the cart
// @access public 

router.delete("/", async(req, res)=>{
    try {
        const { productId, size, color, guestId, user } = req.body;

        const product = await Product.findById(productId);         
        
        if(!product){ 
            return res.status(404).json({message: "product not found"})
        }
        
        // if the cart exist then update it
        let cart = await getCart(user, guestId)
        if(cart){
            const productIndex = cart.products.findIndex(p=>p.productId.toString() === productId && p.size === size && p.color=== color)

            // remove the product
            if(productIndex > -1){
               cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products?.reduce((acc, item)=> acc + item.price * item.quantity , 0)
            
            await cart.save()

            return  res.status(200).json(cart)
        }else{
           return res.status(404).json({message: "cart not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
})

// @route GET /
// @description get cart for user/guest
// @access public

router.get("/", async (req, res)=>{
    try {
        const {user , guestId } = req.query;

        const cart = await getCart(user, guestId);

        if(cart){
            res.status(200).json(cart)
        }else{
            res.status(404).json({message:"cart not found"})
        }
    } catch (error) {
         console.log(error);
         res.status(500).json({ message: "server error" });
    }
})

// @route POST /merge
// @description merge guest cart to users cart
// @access private

router.post("/merge", isLoggedin, async (req, res)=>{
    try {
        const {guestId} = req.body;

        // find guest's & user's cart
        const guestCart = await Cart.findOne({guestId});
        const userCart = await Cart.findOne({user: req.user._id});

        if(guestCart){
            if(guestCart.products.length === 0){
                return res.status(400).json({message:"guest cart is empty"})
            }

            // if user's cart available then merge it with the guest's cart
            if(userCart){
                guestCart.products.forEach(product=>{
                    const productIndex = userCart.products.findIndex(p=>
                        p.productId.toString() === product.productId.toString() && p.size === product.size && p.color === product.color
                    )

                    if(productIndex> -1){
                        // if items exists in user's cart then update with guest's cart
                        userCart.products[productIndex].quantity += product.quantity
                    }else{
                        // add product to user's cart
                        userCart.products.push(product)
                    }
                })

                userCart.totalPrice = userCart.products.reduce((acc, item)=> acc + item.price * item.quantity, 0)

                await userCart.save()
                // remove guest cart after merging
                try {
                    await Cart.findOneAndDelete({guestId})
                } catch (error) {
                    console.error("error deleting guest cart"+error);
                    res.status(500).json({message:"server error"})
                }
                res.status(200).json(guestCart)
            }else{
                // if the userCart not available then create a new cart for user with guestCart
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save()

                res.status(200).json(guestCart)
            }
        }else{
            if(userCart){
                // if userCart is already merged with guestCart 

                return res.status(200).json(userCart)
            }
            return res.status(404).json({message:"guest cart not found"})
        }

    } catch (error) {
        
    }
})

// DELETE /api/cart/clear
router.delete("/clear", async (req, res) => {
  const { userId, guestId } = req.body;

  try {
    // Delete cart by userId or guestId
    if (userId) {
      await Cart.findOneAndDelete({ userId });
    } else if (guestId) {
      await Cart.findOneAndDelete({ guestId });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart", error: err });
  }
});

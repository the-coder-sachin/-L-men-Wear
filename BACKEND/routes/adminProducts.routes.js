import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/auth.mddleware.js";
import { Product } from "../models/product.model.js";

export const router = express.Router();


// @route GET api/admin/products
// @description get all the products list
// @access private + admin only

router.get("/", isLoggedin, isAdmin, async(req, res)=>{
    try {
        
        const products = await Product.find({}).sort({createdAt : -1}).populate("user", "name email");
        if(!products || products.length === 0 ){
            return res.status(404).json({messgae: "no products found"})
        }
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae:"server error"})
    }
})

// @route POST api/admin/products
// @description add a new product
// @access private + admin only

router.post("/", isLoggedin, isAdmin, async(req, res)=>{
  try {
    const {
      name,
      description,
      price,
      countInStock,
      sku,
      sizes,
      colors,
      images,
      mrp, 
      gender,
      user,
      materials,
    } = req.body;

    console.log('trying to create product');
    

    // You can add validation here to check if the required fields are provided
    if (!name || !description || !price || !countInStock || !sku) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create a new product document
    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      sku,
      sizes,
      colors,
      images,
      mrp, 
      gender,
      materials,
      user
    });

    // Save the product to the database
    const createdProduct = await newProduct.save();

    res.status(201).json( createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})


// @route     PUT /api/admin/products/:id
// @desc      Update a product
// @access    Private (Admin only)

router.put("/:id", isLoggedin, isAdmin, async (req, res) => {
    
    try {
        const id = req.params.id;

        const {
            name,
            description,
            price,
            mrp,
            countInStock,
            sku,
            sizes,
            colors,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight
        } = req.body;



        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "No such product found" });
        }

        // Update only if values are provided, otherwise keep existing ones
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.mrp = mrp ?? product.mrp;
        product.countInStock = countInStock ?? product.countInStock;
        product.sku = sku ?? product.sku;
        product.sizes = sizes ?? product.sizes;
        product.colors = colors ?? product.colors;
        product.material = material ?? product.material;
        product.gender = gender ?? product.gender;
        product.images = images ?? product.images;
        product.isFeatured = typeof isFeatured === 'boolean' ? isFeatured : product.isFeatured;
        product.isPublished = typeof isPublished === 'boolean' ? isPublished : product.isPublished;
        product.tags = tags ?? product.tags;
        product.dimensions = dimensions ?? product.dimensions;
        product.weight = weight ?? product.weight;

        // Save updated product
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route     DELETE /api/admin/products/:id
// @desc      delete a product
// @access    Private (Admin only)

router.delete("/:id", isLoggedin, isAdmin, async (req, res) => {
    try {
        const id = req.params.id;

      

        const product = await Product.findByIdAndDelete(id);


        if (!product) {
            return res.status(404).json({ message: "No such product found" });
        }


        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

import express from "express";
import { Product } from "../models/product.model.js";
import { isAdmin, isLoggedin } from "../middlewares/auth.mddleware.js";

export const router = express.Router();

// @route POST api/products
// @description create new product
// @access private & admin only

router.post("/", isLoggedin, isAdmin, async (req, res)=>{ 
   try {
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
       isFeatured,
       isPublished,
       rating,
       reviewCount,
       tags,
       dimensions,
       weight,
     } = req.body;

     const product = new Product({
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
       isFeatured,
       isPublished,
       rating,
       reviewCount,
       tags,
       dimensions,
       weight,
       user: req.user._id,
     });

     const createdProduct = await product.save();

     res.status(201).json(createdProduct);
   } catch (error) {
    console.log("error creating product" + error);
    res.status(500).json({message: "server error"})
   }

})


// @route        PUT /api/products/:id
// @description  Update an existing product
// @access       Private & Admin only

// router.put("/:id", isLoggedin,  async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       mrp,
//       countInStock,
//       sku,
//       sizes,
//       colors,
//       material,
//       gender,
//       isFeatured,
//       isPublished,
//       rating,
//       reviewCount,
//       tags,
//       dimensions,
//       weight,
//     } = req.body;

//     const id = req.params.id;
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update fields if provided, otherwise retain existing values
//     product.name = name ?? product.name;
//     product.description = description ?? product.description;
//     product.price = price ?? product.price;
//     product.mrp = mrp ?? product.mrp;
//     product.countInStock = countInStock ?? product.countInStock;
//     product.sku = sku ?? product.sku;
//     product.sizes = sizes ?? product.sizes;
//     product.colors = colors ?? product.colors;
//     product.material = material ?? product.material;
//     product.gender = gender ?? product.gender;
//     product.isFeatured = isFeatured ?? product.isFeatured;
//     product.isPublished = isPublished ?? product.isPublished;
//     product.rating = rating ?? product.rating;
//     product.reviewCount = reviewCount ?? product.reviewCount;
//     product.tags = tags ?? product.tags;
//     product.dimensions = dimensions ?? product.dimensions;
//     product.weight = weight ?? product.weight;

//     const updatedProduct = await product.save();

//     res.status(200).json({
//       message: "Product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// @route        DELETE /api/products/:id
// @description  Delete a product by ID
// @access       Private & Admin only

router.delete("/:id", isLoggedin, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route        GET /api/products
// @description  Get all products with optional query filters
// @access       public

router.get("/", async (req, res) => {
  try {
    const {
      collections, // plural here as per your data
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      limit,
    } = req.query;

    let query = {};

    const lim = limit ? Number(limit) : 0;

    // Filter logic based on saved data keys
    if (collections && collections.toLowerCase() !== "all") {
      query.collections = collections;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = new RegExp(`^${gender}$`, "i"); // Matches case-insensitively
    }


    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    
    const products = await Product.find(query).sort(sort).limit(lim);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route        GET /api/products/best-seller
// @description  Get list of best seller products 
// @access       public

router.get("/best-seller", async(req, res)=>{
  try {
    const bestSellers = await Product.find().sort({rating: -1}).limit(1)
    if (!bestSellers || bestSellers.length === 0) {
     return res.status(404).json({ message: "no products found" });
    }

    res.status(200).json(bestSellers[0])
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"})
  }
})


// @route        GET /api/products/new-arrivals
// @description  Get list of newly added products 
// @access       public

router.get("/new-arrivals", async(req, res)=>{
  try {
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(10)
    if (!newArrivals || newArrivals.length === 0) {
     return res.status(404).json({ message: "no products found" });
    }

    res.status(200).json(newArrivals)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"})
  }
})


// @route        GET /api/products/:id
// @description  Get particular product details
// @access       public

router.get("/:id", async(req, res)=>{
  try {
    const id = req.params.id;
    
    const product = await Product.findById(id);

    if(product){
      res.status(200).json(product)
    }else{
      res.status(404).json({message: "product not found"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"})
  }
})



// @route        GET /api/products/similar/:id
// @description  Get similar products 
// @access       public

router.get("/similar/:id", async(req, res)=>{
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({message: "product not found"})
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: { $regex: new RegExp(`^${product.gender}$`, "i") },
    })
      .sort({ rating: -1 })
      .limit(6);

    res.json(similarProducts)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"})
  }
})




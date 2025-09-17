import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    collections: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 1,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    sizes: {
      type: [String],
      required: false,
    },
    colors: {
      type: [String],
      required: false,
    },
    material: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["men", "women", "unisex"],
    },
    images: {
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    tags: [String],
    dimensions: {
      length: Number,
      breadth: Number,
      height: Number,
    },
    weight: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema)
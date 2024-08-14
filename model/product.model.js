const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid'); // Import uuidv4


const ProductSchema = mongoose.Schema(
  {
    productId: { 
      type: String, 
      default: uuidv4, 
      unique: true }, // Automatically generate a unique productId

    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
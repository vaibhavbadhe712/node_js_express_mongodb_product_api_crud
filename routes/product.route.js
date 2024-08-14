const express = require("express");
const Product = require("../model/product.model.js");
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, searchProducts } = require('../controller/product.controller.js');


// search  a product 
router.get('/search', searchProducts);
router.get('/', getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);
// delete a product
router.delete("/:id", deleteProduct);




module.exports = router;
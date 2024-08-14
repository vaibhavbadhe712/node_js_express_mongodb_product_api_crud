const Product = require("../model/product.model");


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchProducts = async (req, res) => {
  try {
    const { name, quantity, price } = req.query;
    const query = {};
    let message = '';

    // Handle name search
    if (name) {
      query.name = new RegExp(name, 'i'); // Case-insensitive search
    }

    // Handle quantity search
    if (quantity) {
      query.quantity = parseInt(quantity, 10);
    }

    // Handle price search
    if (price) {
      query.price = parseFloat(price);
    }

    // Find products matching the criteria
    const products = await Product.find(query);

    // Handle cases where no products match
    if (products.length === 0) {
      if (name && quantity && price) {
        message = 'No products match the given name, quantity, and price.';
      } else if (name && quantity) {
        message = 'No products match the given name and quantity.';
      } else if (name && price) {
        message = 'No products match the given name and price.';
      } else if (quantity && price) {
        message = 'No products match the given quantity and price.';
      } else if (name) {
        message = 'No products match the given name.';
      } else if (quantity) {
        message = 'No products match the given quantity.';
      } else if (price) {
        message = 'No products match the given price.';
      } else {
        message = 'No products found.';
      }
      return res.status(404).json({ message });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Other controller functions (getProducts, getProduct, etc.)


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};

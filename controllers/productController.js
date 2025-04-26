const Product = require('../models/product');

// Add product
exports.createProduct = async (req, res) => {
  try {
    const {
      product_name, category, price,
      description, owner_name, contact_email, location
    } = req.body;

    const product = new Product({
      product_name,
      category,
      price,
      product_image: req.files ? req.files.map(file => file.filename) : [],
      description,
      owner_name,
      contact_email,
      location
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ error: "Product not found" });
    }
  };
  
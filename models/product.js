const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: String,
  category: String,
  price: Number,
  product_image: [String], // URLs or filenames
  description: String,
  owner_name: String,
  contact_email: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

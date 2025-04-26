const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {createProduct,getAllProducts, getProductById} = require('../controllers/productController');

// Configure file storage
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null, 'uploads/'),
    filename:(req,file,cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({storage});

//route for product submission
router.post('/add' ,upload.array('product_image') , createProduct );
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;


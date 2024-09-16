const Product = require("../models/product");
const handleError = require("../utils/handleError");
const User = require("../models/user");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    const productsWithImages = products.map((product) => {
      const productObj = product.toObject({ getters: true });

      const imageUrl = productObj.imageUrl;

      return {
        ...productObj,
        imageUrl,
      };
    });

    res.json({ products: productsWithImages });
  } catch (err) {
    return handleError("Something went wrong", 500, next);
  }
};
const getProduct = async (req, res, next) => {
  const productName = req.params.productName.replaceAll("-", " ");

  try {
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return handleError("Product not found", 404, next);
    }

    const productObj = product.toObject({ getters: true });

    res.json({
      product: {
        ...productObj,
        imageUrl: productObj.imageUrl,
      },
    });
  } catch (err) {
    return handleError("Server error", 500, next);
  }
};

const addProduct = async (req, res, next) => {
  const {
    productName,
    productPrice,
    productCategory,
    productDescription,
    username,
    userId,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleError("User not found", 404, next);
    }

    const newProduct = new Product({
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      imageUrl: req.file ? `/uploads/images/${req.file.filename}` : null,
      username: username,
      userId: userId,
    });

    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    return handleError("Failed to add product", 500, next);
  }
};
const getUserProducts = async (req, res, next) => {
  const username = req.params.username;
  try {
    const products = await Product.find({ username });
    if (products.length === 0) {
      return handleError("Products not found", 404, next);
    }
    const productsWithImages = products.map((product) => {
      const productObj = product.toObject({ getters: true });
      return {
        ...productObj,
        imageUrl: productObj.imageUrl,
      };
    });
    res.json({
      message: `These are ${username}'s products!`,
      products: productsWithImages,
    });
  } catch (error) {
    return handleError("Server error", 500, next);
  }
};
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  getUserProducts,
};

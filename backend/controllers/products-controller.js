const Product = require("../models/product");
const handleError = require("../utils/handleError");
const User = require("../models/user");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const baseUrl = "http://localhost:5000/uploads/images";

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
  const baseUrl = "http://localhost:5000/uploads/images";

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
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const userId = req.user?._id || "66ddc936eff55d4ee1599767";

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
      userId: userId,
      username: "Test",
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    return handleError("Failed to add product", 500, next);
  }
};
module.exports = {
  getProducts,
  getProduct,
  addProduct,
};

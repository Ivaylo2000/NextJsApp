const Product = require("../models/product");
const handleError = require("../utils/handleError");
const User = require("../models/user");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("userId", "username");
    const baseUrl = "http://localhost:5000/uploads/images";

    const productsWithImages = products.map((product) => {
      const productObj = product.toObject({ getters: true });

      const username = productObj.userId ? productObj.userId.username : null;

      return {
        ...productObj,
        imageUrl: productObj.imageUrl ? baseUrl + productObj.imageUrl : null,
        username,
      };
    });

    res.json({ products: productsWithImages });
  } catch (err) {
    return handleError("Something went wrong", 500, next);
  }
};

const getProduct = async (req, res, next) => {
  const productName = req.params.productName.replaceAll("-", " "); // Replace hyphens with spaces

  try {
    const product = await Product.findOne({ name: productName }).populate(
      "userId",
      "username"
    );

    if (!product) {
      return handleError("Product not found", 404, next);
    }

    const productObj = product.toObject({ getters: true });

    const username = productObj.userId ? productObj.userId.username : null;

    res.json({ product: { ...productObj, username } });
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
      username: user.username,
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

const Product = require("../models/product");
const handlerError = require("../utils/handleError");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const baseUrl = "http://localhost:5000/uploads/images";

    const productsWithImages = products.map((product) => {
      const productObj = product.toObject({ getters: true });
      return {
        ...productObj,
        imageUrl: productObj.imageUrl ? baseUrl + productObj.imageUrl : null,
      };
    });

    res.json({ products: productsWithImages });
  } catch (err) {
    return handlerError("Something went wrong", 500, next);
  }
};

const getProduct = async (req, res, next) => {
  const productName = req.params.productName.replaceAll("-", " ");

  try {
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const addProduct = async (req, res, next) => {
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const userId = req.user?._id || "66ddc936eff55d4ee1599767";

  try {
    const newProduct = new Product({
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      imageUrl: req.file ? `/uploads/images/${req.file.filename}` : null,
      userId: userId,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    next(new Error("Failed to add product"));
  }
};
module.exports = {
  getProducts,
  getProduct,
  addProduct,
};

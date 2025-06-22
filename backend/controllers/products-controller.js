const Product = require("../models/product");
const handleError = require("../utils/handleError");
const User = require("../models/user");
const bucket = require("../firebase");
const { v4: uuidv4 } = require("uuid");
const checkAuth = require("./../middleware/auth");
const uploadImageToFirebase = require("../utils/uploadImage");

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

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadImageToFirebase(req.file);
    }

    const newProduct = new Product({
      name: productName.trim(),
      price: productPrice,
      category: productCategory,
      description: productDescription,
      imageUrl: imageUrl,
      username: username,
      userId: userId,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    console.error("Add product error:", err);
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

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return handleError("Product not found", 404, next);
    }

    const productName = product.imageUrl;

    if (!productName) {
      return handleError("Image URL not found", 404, next);
    }

    const file = bucket.file(`products/${productName}`);

    const [exists] = await file.exists();
    if (!exists) {
      return handleError("File not found in bucket", 404, next);
    }

    await file.delete();
    await Product.deleteOne({ _id: productId });

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    return handleError("Server error", 500, next);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  const { productName, productPrice, productDescription } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return handleError("Product not found", 404, next);
    }

    if (req.file) {
      if (product.imageUrl) {
        const oldFile = bucket.file(`products/${product.imageUrl}`);
        await oldFile.delete();
      }

      const imageUrl = await uploadImageToFirebase(req.file);

      product.imageUrl = imageUrl;
    }

    product.name = productName.trim();
    product.price = productPrice;
    product.description = productDescription;

    await product.save();

    res.status(200).json({ message: "Product updated successfully!", product });
  } catch (err) {
    console.error("update product error:", err);
    return handleError("Failed to update product", 500, next);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  getUserProducts,
  deleteProduct,
  updateProduct,
};

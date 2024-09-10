const { check } = require("express-validator");

const validateProduct = [
  check("productName").notEmpty(),

  check("productPrice").notEmpty(),

  check("productCategory").notEmpty(),

  check("productDescription").notEmpty(),

  check("productImageUrl").optional().isURL(),
];

module.exports = validateProduct;

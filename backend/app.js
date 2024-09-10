const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products-routes");
// const usersRoutes = require("./routes/users-routes");
// const cartRoutes = require("./routes/cart-routes");
// const handleError = require("./utils/handleError");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/products", productsRoutes);

mongoose
  .connect(
    `mongodb+srv://ivo:123@nextjsapp.q4ke9.mongodb.net/nextjsapp?retryWrites=true&w=majority&appName=nextjsapp`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;

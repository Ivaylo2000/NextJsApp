const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");

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
app.use("/user", usersRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nextjsapp.q4ke9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=nextjsapp`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;

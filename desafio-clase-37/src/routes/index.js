const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Product = require("../models/product");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/products");
      });
    }
  );
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products", { products });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

router.post("/products/add", async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.redirect("/products");
  }
});

router.post("/products/delete/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    await Product.findByIdAndDelete(productId);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.redirect("/products");
  }
});

// Ruta para agregar productos al carrito
// index.js

router.post("/cart/:productId",  async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.params.productId);

    user.cart.push(product);
    await user.save();

    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.redirect("/products");
  }
});


router.get("/cart", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart").exec();
    res.render("cart", { cartItems: user.cart });
  } catch (err) {
    console.error(err);
    res.redirect("/products");
  }
});

// index.js

router.post("/cart/remove/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart.pull(req.params.productId);
    await user.save();

    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
});



module.exports = router;

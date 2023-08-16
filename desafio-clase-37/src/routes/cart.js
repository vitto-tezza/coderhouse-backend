const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");

router.post("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  User.findById(req.user._id, (err, user) => {
    if (err) {
      console.error(err);
      res.redirect("/products");
    } else {
      user.cart.push(productId);
      user.save();
      res.redirect("/products");
    }
  });
});

router.get("/cart", (req, res) => {
  User.findById(req.user._id)
    .populate("cart")
    .exec((err, user) => {
      if (err) {
        console.error(err);
        res.redirect("/products");
      } else {
        res.render("cart", { cartItems: user.cart });
      }
    });
});

module.exports = router;

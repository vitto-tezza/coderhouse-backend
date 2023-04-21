const express = require("express");
const CartsManager = require("./CartsManager");

const carts = new CartsManager();
const cartsRouter = express.Router();

cartsRouter.get("/carts", async (req, res) => {
  await carts.init();

  res.status(200).send(carts.getCart());
});

cartsRouter.get("/carts/:CId", async (req, res) => {
  const CId = req.params.CId;
  await carts.init();
  const findCarts = carts.getCartByCId(CId);

  res.status(200).send(findCarts);
});

cartsRouter.post("/carts", async (req, res) => {
  await carts.init();

  carts.addCart();

  res.status(200).send({ mensaje: "carrito creado" });
});

cartsRouter.post("/carts/:CId/products", async (req, res) => {
  const { PId } = req.body;
  const CId = parseInt(req.params.CId);
  await carts.init();
  await carts.addProduct(CId, PId);
  res.status(200).send("producto agregado");
});

module.exports = cartsRouter;

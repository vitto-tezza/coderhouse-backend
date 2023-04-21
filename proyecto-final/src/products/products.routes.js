const express = require("express");
const ProductsManager = require("./ProductsManager");

const product = new ProductsManager();
const productsRouter = express.Router();

productsRouter.get("/products", async (req, res) => {
  const limit = req.query.limit;
  await product.init();

  res.status(200).send(product.getProducts(limit));
});

productsRouter.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  await product.init();
  const findProduct = product.getProductsById(id);

  res.status(200).send(findProduct);
});

productsRouter.post("/products", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  await product.init();

  product.addProduct(title, description, price, thumbnail, code, stock);

  res.status(200).send({ mensaje: "producto registrado" });
});

productsRouter.put("/products/:id", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const id = parseInt(req.params.id);
  await product.init();
  await product.editProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  res.status(200).send("producto editado");
});

productsRouter.delete("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await product.init();
  await product.deleteProduct(id);
  res.status(200).send("producto borrado");
});

module.exports = productsRouter;

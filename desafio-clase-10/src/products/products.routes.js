import { Router } from "express";
import ProductsManager from "./ProductsManager.js";
import { __dirname } from "../utils.js";

const productsRouter = Router();
const manager = new ProductsManager(`${__dirname}/data/productsFile.json`);

productsRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  await manager.init();
  const products = manager.getProducts(limit);
  res.render("index", {
   products: products,
  });
});

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  await manager.init();
  const findProduct = manager.getProductsById(id);

  res.status(200).send(findProduct);
});

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  await manager.init();

  manager.addProduct(title, description, price, thumbnail, code, stock);

  res.status(200).send({ mensaje: "producto registrado" });
});

productsRouter.put("/:id", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const id = parseInt(req.params.id);
  await manager.init();
  await manager.editProduct(
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

productsRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await manager.init();
  await manager.deleteProduct(id);
  res.status(200).send("producto borrado");
});

export default productsRouter;

import express from "express";
import { default as Carts } from "./carts.dbclass.js";

const dbclass = new Carts();
const cartsRouter = express.Router();

cartsRouter.get("/cart", async (req, res) => {
  try {
    const process = await dbclass.getCarts();
    res.status(200).send({ status: "OK", data: process });
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err });
  }
});

cartsRouter.get("/cart/:CId", async (req, res) => {
  try {
    const CId = req.params.CId;
    const process = await dbclass.getCartByCId(CId);
    res.status(200).send({ status: "OK", data: process });
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err });
  }
});

cartsRouter.post("/cart", async (req, res) => {
  try {
    await dbclass.addCart();
    res
      .status(200)
      .send({ status: "OK", message: "Carrito creado exitosamente" });
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err });
    console.log(err);
  }
});

cartsRouter.post("/cart/:CId/products", async (req, res) => {
  const { PId } = req.body;
  const CId = req.params.CId;
  try {
    await dbclass.addProduct(CId, PId);
    res.status(200).send("Producto agregado al carrito");
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err.message });
  }
});

cartsRouter.delete("/cart/:CId/products/:PId", async (req, res) => {
  try {
    const { CId, PId } = req.params;
    const process = await dbclass.deleteProduct(CId, PId);
    res.status(200).send({ status: "OK", data: process });
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err });
  }
});

export default cartsRouter;

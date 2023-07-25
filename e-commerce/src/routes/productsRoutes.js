import express from "express";
import Products from "../class/productsClass.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
const products = new Products();

// Ruta para agregar un producto
router.post("/add", async (req, res) => {
  const productData = req.body;
  await products.addProduct(productData);
  const statusCode = products.checkStatus() === 1 ? 200 : 400;
  return res.status(statusCode).json({ message: products.showStatusMsg() });
});

// Ruta para obtener todos los productos
router.get("/get", async (req, res) => {
  const productList = await products.getProducts();
  const statusCode = products.checkStatus() === 1 ? 200 : 400;
  return res
    .status(statusCode)
    .json({ message: products.showStatusMsg(), data: productList });
});

// Ruta para obtener un producto por su ID
router.get("/get/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await products.getProductById(productId);
  const statusCode = products.checkStatus() === 1 ? 200 : 400;
  return res
    .status(statusCode)
    .json({ message: products.showStatusMsg(), data: product });
});

// Ruta para actualizar un producto por su ID
router.put("/update/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  await products.updateProduct(productId, productData);
  const statusCode = products.checkStatus() === 1 ? 200 : 400;
  return res.status(statusCode).json({ message: products.showStatusMsg() });
});

// Ruta para eliminar un producto por su ID
router.delete("/delete/:id", async (req, res) => {
  const productId = req.params.id;
  await products.deleteProduct(productId);
  const statusCode = products.checkStatus() === 1 ? 200 : 400;
  return res.status(statusCode).json({ message: products.showStatusMsg() });
});

export default router;

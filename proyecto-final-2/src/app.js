import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";

import productsRouter from "./api/products/products.router.js";
import cartsRouter from "./api/carts/carts.router.js";

import { __dirname } from "./utils.js";

const PORT = 8080;
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/coder51220";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

try {
  await mongoose.connect(MONGOOSE_URL);

  app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}

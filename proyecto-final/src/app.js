const express = require("express");
const productsRouter = require("./products/products.routes");
const cartsRouter = require("./carts/carts.router");

const PUERTO = 8080;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", productsRouter);
server.use("/api", cartsRouter);

server.listen(PUERTO, () => {
  console.log(`server iniciado en puerto ${PUERTO}`);
});

// URL api.com.ar/products
// method
// headers
// body

const express = require("express");
const ProductManager = require("./ProductManager");
const main = async () => {
  const product = new ProductManager();
  await product.init();

  const PUERTO = 8080;

  const servidor = express();

  servidor.get("/products", (req, res) => {
    const limit = req.query.limit;
    res.send(product.getProducts(limit));

  
  });

  servidor.get("/products/:id", (req, res) => {
    const findProduct = product.getProductsById(parseInt(req.params.id));
    res.send(findProduct);
  });

  servidor.listen(PUERTO, () => {
    console.log(`servidor express activo en puerto ${PUERTO}`);
  });
};

main();

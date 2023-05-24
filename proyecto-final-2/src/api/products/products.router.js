import express from "express";
import productModel from "./product.model.js";
import Products from "./products.dbclass.js";

const productsRouter = express.Router();
const dbclass = new Products();

productsRouter.get("/products_index", async (req, res) => {
  const products = await dbclass.getProducts();
  res.render("products_index", {
    products: products,
  });
});

productsRouter.get("/products", async (req, res) => {
  const { limit = 10, page, sort, query } = req.query;
  let mongoSort;

  if (sort === "ASC") {
    mongoSort = "price";
  } else if (sort === "DESC") {
    mongoSort = "-price";
  }

  try {
    const parsedQuery = query ? JSON.parse(query) : {};
    const process = await productModel.paginate(parsedQuery, {
      limit,
      page,
      sort: mongoSort,
    });

    const { docs, ...rest } = process;
    res.status(200).send({ status: "OK", data: { payload: docs, ...rest } });
  } catch (err) {
    res.status(500).send({ status: "ERR", error: err });
  }
});

productsRouter.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const findProduct = await productModel.findById;

  res.status(200).send(findProduct);
});

export default productsRouter;

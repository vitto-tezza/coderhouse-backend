import mongoose from "mongoose";
import cartModel from "./cart.model.js";
import Products from "../products/products.dbclass.js";

class Carts {
  constructor() {}

  async getCarts() {
    let cartsResponse = [];

    const carts = await cartModel.find();

    carts.forEach((c) => {
      let pIdQty = new Map();

      c.products.forEach((p) => {
        if (pIdQty.get(p) === undefined) {
          pIdQty.set(p, 1);
        } else {
          pIdQty.set(p, pIdQty.get(p) + 1);
        }
      });

      let productsResponse = [];
      for (const entries of pIdQty) {
        productsResponse.push(entries);
      }

      cartsResponse.push({ CId: c.CId, products: productsResponse });
    });

    return cartsResponse.slice();
  }

  async getCartByCId(CId) {
    const cart = await cartModel.findById(CId);

    if (cart) {
      return cart;
    }
  }

  async addCart() {
    const carts = await cartModel.find();
    let lastCId = -1;
    if (carts.length > 0) {
      lastCId = carts[carts.length - 1].CId;
    }
    const newCId = lastCId + 1;
    const newCart = {
      CId: newCId,
      products: [],
    };
    if (newCId == undefined) {
      console.log(err);
    } else {
      try {
        await cartModel.create(newCart);
        console.log("Carrito creado exitosamente");
      } catch (err) {
        console.log(err);
      }
    }
  }

  async addProduct(CId, PId) {
    try {
      const product = await Products.getProductById(id);
      const cart = await cartModel.findById(CId);
      cart.products.push(PId);
      await cart.save();
      console.log(`Producto agregado al carrito ${CId}`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default Carts;

import mongoose from "mongoose";
import productModel from "../models/product.model.js";

class Products {
  constructor() {
    this.status = 0;
    this.statusMsg = "inicializado";
  }

  static requiredFields = ["brand", "model", "description", "price"];

  static #verifyRequiredFields = (obj) => {
    return Products.requiredFields.every(
      (field) =>
        Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null
    );
  };

  static #objEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  checkStatus = () => {
    return this.status;
  };

  showStatusMsg = () => {
    return this.statusMsg;
  };

  addProduct = async (product) => {
    try {
      if (
        !Products.#objEmpty(product) &&
        Products.#verifyRequiredFields(product)
      ) {
        await productModel.create(product);
        this.status = 1;
        this.statusMsg = "Producto registrado en bbdd";
      } else {
        this.status = -1;
        this.statusMsg = `Faltan campos obligatorios (${Products.requiredFields.join(
          ", "
        )})`;
      }
    } catch (err) {
      this.status = -1;
      this.statusMsg = `AddProduct: ${err}`;
    }
  };

  getProducts = async () => {
    try {
      const products = await productModel.find().lean();
      this.status = 1;
      this.statusMsg = "Productos recuperados";
      return products;
    } catch (err) {
      this.status = -1;
      this.statusMsg = `getProducts: ${err}`;
    }
  };

  getProductById = async (id) => {
    try {
      const product = productModel.findById(id);
      this.status = 1;
      return product;
    } catch (err) {
      this.status = -1;
      this.statusMsg = `getProductById: ${err}`;
    }
  };

  updateProduct = async (id, data) => {
    try {
      if (data === undefined || Object.keys(data).length === 0) {
        this.status = -1;
        this.statusMsg = "Se requiere body con data";
      } else {
        const process = await productModel.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          data
        );
        this.status = 1;
        process.modifiedCount === 0
          ? (this.statusMsg = "El ID no existe o no hay cambios por realizar")
          : (this.statusMsg = "Producto actualizado");
      }
    } catch (err) {
      this.status = -1;
      this.statusMsg = `updateProduct: ${err}`;
    }
  };

  deleteProduct = async (id) => {
    try {
      const process = await productModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      this.status = 1;
      process.deletedCount === 0
        ? (this.statusMsg = "El ID no existe")
        : (this.statusMsg = "Producto borrado");
    } catch (err) {
      this.status = -1;
      this.statusMsg = `deleteProduct: ${err}`;
    }
  };
}

export default Products;

const fs = require("fs");
const dbFile = "./db.json";

class ProductManager {
  lastId = 0;

  constructor() {
    this.products = [];
  }

  async init() {
    const data = await fs.promises.readFile(dbFile, "utf-8");
    this.products = JSON.parse(data);
    console.log(this.products);
  }

  async updateDB() {
    return await fs.promises.writeFile(dbFile, JSON.stringify(this.products));
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  getProductsById(id) {
    let findProduct = null;
    console.log({id})
    this.products.map((p) => {
      if (p.id === id) {
        findProduct = p;
      }
    });

    if (findProduct) {
      return findProduct;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const lastProduct = this.products[this.products.length - 1];
    this.lastId = lastProduct ? lastProduct.id : 0;
    const newId = this.lastId + 1;
    const NewProduct = {
      id: newId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    if (
      newId == undefined ||
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      console.log("falta completar algun casillero");
    } else {
      this.products.push(NewProduct);

      await this.updateDB((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}

module.exports = ProductManager;

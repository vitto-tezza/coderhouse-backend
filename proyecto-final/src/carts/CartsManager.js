const fs = require("fs");
const cartsFile = "./carts/cartsFile.json";

class CartsManager {
  constructor() {
    this.carts = [];
  }

  async init() {
    const data = await fs.promises.readFile(cartsFile, "utf-8");
    this.carts = JSON.parse(data);
    console.log(this.carts);
  }

  async updateDB() {
    return await fs.promises.writeFile(cartsFile, JSON.stringify(this.carts));
  }

  getCart() {
    return this.carts.slice();
  }

  getCartByCId(CId) {
    let findCarts = null;
    this.carts.map((p) => {
      if (p.CId === parseInt(CId)) {
        findCarts = p;
      }
    });
    if (findCarts) {
      return findCarts;
    }
  }

  async addCart() {
    let lastCId = -1;
    if (this.carts.length > 0) {
      lastCId = this.carts.length - 1;
    }
    const newCId = lastCId + 1;
    const NewCart = {
      CId: newCId,
      products: [],
    };
    if (newCId == undefined) {
      console.log("indique el id de producto");
    } else {
      this.carts.push(NewCart);

      await this.updateDB((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  async addProduct(CId, PId) {
    let products = this.carts[CId].products;
    products.get
    //this.carts[CId].products.push(PId);

    let productQtyMap = new Map();

    for (let i = 0; i < products.length; i = i + 1) {
      if (productQtyMap.get(products[i]) === undefined) {
        productQtyMap.set(products[i], 1);
      } else {
        productQtyMap.set(products[i], productQtyMap.get(products[i]) + 1);
      }
    }

    await this.updateDB();
    console.log(`Producto agregado al ${CId}`);
  }
}

module.exports = CartsManager;

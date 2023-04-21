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
    this.carts[CId].products.push(PId);

    await this.updateDB();
    console.log(`Producto agregado al ${CId}`);
  }
}

module.exports = CartsManager;

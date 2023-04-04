class ProductManager {
  lastId = 0;

  constructor() {
  

    const savedProducts = fs.readFile()


    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    let findProduct = null;
    this.products.map((p) => {
      if (p.id === id) {
        findProduct = p;
      }
    });
    if (findProduct) {
      console.log(push.findProduct);
    } else {
      console.log("not found");
    }
  }

  getProductsByCode(code) {
    let findProduct = null;
    this.products.map((p) => {
      if (p.code === code) {
        findProduct = p;
      }
    });

    if (findProduct) {
      return findProduct;
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.lastId = this.lastId + 1;
    const NewProduct = {
      id: this.lastId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    if (
      this.lastId == undefined ||
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      console.log("falta completar algun casillero");
    } else {
      const findProduct = this.getProductsByCode(code);
      
      if (findProduct) {
        console.log('F')
      } else {
        this.products.push(NewProduct);
      }
    }
  }
}

const product = new ProductManager();
product.addProduct(
  "algo",
  "es algo que sirve para algo",
  "$700",
  "ruta de imagen",
  100,
  57
);
product.addProduct(
  "algo",
  "es algo que sirve para algo",
  "$700",
  "ruta de imagen",
  101,
  57
);

product.addProduct(
  "algo",
  "es algo que sirve para algo",
  "$700",
  "ruta de imagen",
  100,
  57
);

console.log(product.getProducts())




class productManager {
  static lastId = 0;

  constructor() {
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

  validateCodeUniqueness() {
    const codes = this.products.map((p) => p.code);
    const duplicateCodes = codes.filter(
      (code, index) => codes.indexOf(code) !== index
    );
    if (duplicateCodes.length > 0) {
      console.log("Hay productos con códigos duplicados:", duplicateCodes);
    } else {
      console.log("Todos los códigos son únicos.");
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    productManager.lastId = productManager.lastId + 1;
    const NewProduct = {
      id: productManager.lastId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    if (
      productManager.lastId == undefined ||
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
    }
  }
}

const product = new productManager();
product.addProduct(
  "algo",
  "es algo que sirve para algo",
  "$700",
  "ruta de imagen",
  100,
  57
);
product.addProduct(
  "otra cosa",
  "es algo que sirve para otra cosa",
  "$972",
  "ruta de imagen",
  101,
  8
);
product.getProducts();
//product.getProductsById(1);
product.validateCodeUniqueness();

const all = product.getProducts();
console.log(all);

import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "cart";

const schema = new mongoose.Schema({
  cartId: Number,
  products: [
    {
      productId: Number,
      quantity: Number,
    },
  ],
});

const cartModel = mongoose.model(collection, schema);

export default cartModel;

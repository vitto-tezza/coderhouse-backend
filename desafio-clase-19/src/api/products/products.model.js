import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new mongoose.Schema({
  id: Number,
  brand: { type: String, required: true, index: true },
  model: String,
  description: String,
  price: { type: Number, required: true },
});

schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection, schema);

export default productModel;

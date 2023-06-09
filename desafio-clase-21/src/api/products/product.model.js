import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.pluralize(null);

const collection = "products";

const schema = new mongoose.Schema({
  id: Number,
  brand: String,
  model: String,
  description: String,
  price: Number,
});
schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection, schema);

export default productModel;

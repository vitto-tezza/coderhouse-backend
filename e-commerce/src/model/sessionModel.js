import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personName: { type: String, required: true },
  adress: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
});

const SessModel = mongoose.model("users2", Schema);

export { SessModel };

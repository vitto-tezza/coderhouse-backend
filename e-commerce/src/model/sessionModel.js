import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personName: { type: String, },
  adress: { type: String,  },
  age: { type: Number,  },
  phone: { type: Number,  },
});

const SessModel = mongoose.model("users2", Schema);

export { SessModel };

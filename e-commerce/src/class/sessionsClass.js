import mongoose from "mongoose";
import config from "../config/config.js";
import { SessModel } from "../model/sessionModel.js";
import { createHash } from "../utils/handlePass.js";

// Conectar a la base de datos MongoDB
mongoose
  .connect(config.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Salir del proceso en caso de error
  });

class ContenedorSesiones {
  async findUser(user) {
    try {
      const userFound = await SessModel.findOne({ email: user });
      return userFound;
    } catch (err) {
      console.error("Error al buscar usuario:", err);
      throw err; // Propagamos el error hacia arriba para que se maneje en otro lugar
    }
  }

  async createUser(user) {
    console.log(user);
    try {
      const isNotValidUser = await SessModel.findOne({ email: user.email });

      if (isNotValidUser) {
        console.log(
          "Se ha intentado crear una cuenta con un email ya existente"
        );
        return { err: "El usuario ya existe" };
      } else {
        user.password = createHash(user.password);
        const newUser = new SessModel(user);
        await newUser.save();

        return newUser;
      }
    } catch (err) {
      console.error("Error al crear usuario:", err);
      throw err; // Propagamos el error hacia arriba para que se maneje en otro lugar
    }
  }
}

export default ContenedorSesiones;

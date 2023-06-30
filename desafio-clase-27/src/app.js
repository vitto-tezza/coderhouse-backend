import cors from "cors";
import express from "express";
import config from "./config.js";
import MongoSingleton from "./services/mongo_class.js";
import { productRoutes } from "./routes/product_routes.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin:'*',
    methods: 'get,put,post',
    allowedHeaders:'Content-Type,Authorization',
}));
app.use(express.urlencoded({ extended: true }));
app.use("/", productRoutes());

try {
  MongoSingleton.getInstance();

  app.listen(config.SERVER_PORT, () => {
    console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
  });
} catch (err) {
  console.log(`No se puede iniciar el servidor (${err.message})`);
}

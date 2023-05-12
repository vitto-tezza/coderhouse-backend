import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";

import router from "./api/products/products.routes.js";
import { __dirname } from "./utils.js";

const PORT = parseInt(process.env.PORT) || 3000;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use("/public", express.static(`${__dirname}/public`));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

try {
    await mongoose.connect(MONGOOSE_URL);
    
    app.listen(PORT, () => {
        console.log(`Servidor API/Socket.io iniciado en puerto ${PORT}`);
    });
} catch(err) {
    console.log('No se puede conectar con el servidor de bbdd');
}
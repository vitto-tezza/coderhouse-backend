import http from "http";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import session from "express-session";

import MongoStore from "connect-mongo";

import mainRoutes from "./api/main.routes.js";
import userRoutes from "./api/users/users.routes.js";
import productRoutes from "./api/products/products.routes.js";

import { __dirname } from "./utils.js";

const SERVER_PORT = 3000;
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/coder51220";
const SESSION_SECRET = "abcdefgh12345678";
const BASE_URL = `http://localhost:${SERVER_PORT}`;
const PRODUCTS_PER_PAGE = 10;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: MONGOOSE_URL,
  mongoOptions: {},
  ttl: 30,
});
app.use(
  session({
    store: store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", mainRoutes(io, BASE_URL, PRODUCTS_PER_PAGE));
app.use("/api", userRoutes(io));
app.use("/api", productRoutes(io));

app.use("/public", express.static(`${__dirname}/public`));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

io.on("connection", (socket) => {
  console.log(`Cliente conectado (${socket.id})`);

  socket.emit("server_confirm", "Conexión recibida");

  socket.on("new_product_in_cart", (data) => {
    io.emit("product_added_to_cart", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Cliente desconectado (${socket.id}): ${reason}`);
  });
});

try {
  await mongoose.connect(MONGOOSE_URL);

  server.listen(SERVER_PORT, () => {
    console.log(`Servidor iniciado en puerto ${SERVER_PORT}`);
  });
} catch (err) {
  console.log(`No se puede conectar con el servidor de bbdd (${err.message})`);
}

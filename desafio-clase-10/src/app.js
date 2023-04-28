import express from "express";
import productsRouter from "./products/products.routes.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

const PORT = parseInt(process.env.PORT || 3000);
const WS_PORT = parseInt(process.env.WS_PORT || 8080);

const server = express();
const httpServer = server.listen(WS_PORT, () => {
  console.log(`server socket.io iniciado en puerto ${WS_PORT}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
  },
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", productsRouter);
server.use("/public", express.static(`${__dirname}/public`));

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", "./views");

server.listen(PORT, () => {
  console.log(`server base API/static iniciado en puerto ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado (${socket.id})`);

  socket.emit("server_confirm", "Conexión recibida");

  socket.on("new_message", (data) => {
    io.emit("msg_received", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Cliente desconectado (${socket.id}): ${reason}`);
  });
});



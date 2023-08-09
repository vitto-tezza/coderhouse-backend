"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3900;

const url = "mongodb://127.0.0.1:27017/api_rest_reactnotas";

mongoose.Promise = global.Promise;

const ArticleRouter = require("./routes/article");
const UserRouter = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", UserRouter);
app.use("/api", ArticleRouter);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a la base de datos realizada con éxito");
    app.listen(port, () => {
      console.log("Lanzando la aplicación en el puerto " + port);
    });
  })
  .catch((err) =>
    console.error("Error en la conexión a la base de datos: " + err)
  );

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const app = express();

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// Configuración de Passport
require("./config/passport");

// Configuración de vistas y middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Cargar las rutas
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import cors from "cors";
import express from "express";
import session from "express-session";
import config from "./src/config/config.js";
import MongoSingleton from "./src/class/mongoClass.js";
import productsRoutes from "./src/routes/productsRoutes.js";
import sessionsRoutes from "./src/routes/sessionsRoutes.js";
import passport from "passport";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Agregar las rutas de productos
app.use("/products", productsRoutes);

// Agregar las rutas de sesiones
app.use("/sessions", sessionsRoutes);

try {
  MongoSingleton.getInstance();

  app.listen(config.SERVER_PORT, () => {
    console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
  });
} catch (err) {
  console.log(`No se puede iniciar el servidor (${err.message})`);
}

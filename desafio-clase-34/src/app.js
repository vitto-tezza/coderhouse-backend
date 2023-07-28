import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mockingproductos", userRoutes);

app.get("/", (req, res) => {
  res.send("¡Hola! Este es el servidor backend.");
});

try {
  const port = 3000;

  process.env.NODE_ENV = process.env.NODE_ENV || "development";

  app.listen(port, () => {
    console.log(
      `Servidor iniciado en puerto ${port} en modo ${process.env.NODE_ENV}`
    );
  });
} catch (err) {
  console.log(`No se puede iniciar el servidor (${err.message})`);
}

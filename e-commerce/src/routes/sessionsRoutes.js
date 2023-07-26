import express from "express";
import { Router } from "express";
import passport from "../utils/passport.js";
import authMiddleware from "../middlewares/auth.js";

const routerSesions = Router();

// Ruta principal
routerSesions.get("/", authMiddleware, async (req, res) => {
  req.session.email = req.user.email;
  req.session.personName = req.user.personName;
  req.session.phone = req.user.phone;

  res.redirect("/products/products.html");
});

// Ruta de login
routerSesions.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/", // Redirige a la página principal en caso de éxito
    failureRedirect: "/login-error", // Redirige a la página de error en caso de fallo
    passReqToCallback: true,
  })
);

// Ruta de registro
routerSesions.post(
  "/register",
  passport.authenticate("singup", {
    successRedirect: "/", // Redirige a la página principal en caso de éxito
    failureRedirect: "/register-error",
    passReqToCallback: true,
  })
);

// Deslogueo
routerSesions.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }

    req.session.destroy();
    res.redirect("/");
  });
});

// Obtener el nombre
routerSesions.get("/get-data", async (req, res) => {
  res.send({
    email: req.session.email,
    personName: req.session.personName,
    phone: req.session.phone,
  });
});

export default routerSesions;

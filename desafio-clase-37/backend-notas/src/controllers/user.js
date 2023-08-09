"use strict";

var User = require("../models/user");

var userController = {
  login: async (req, res) => {
    try {
      var params = req.body;

      const user = await User.findOne({
        username: params.username,
        password: params.password,
      });
      if (!user) {
        return res
          .status(401)
          .send({ status: "error", message: "Credenciales inválidas" });
      }


      return res.status(200).send({ status: "success", user });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error en el inicio de sesión",
        error: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      var params = req.body;

      const existingUser = await User.findOne({ username: params.username });
      if (existingUser) {
        return res
          .status(400)
          .send({ status: "error", message: "El usuario ya existe" });
      }

      var newUser = new User({
        username: params.username,
        password: params.password,
      });

      const userSaved = await newUser.save();
      if (!userSaved) {
        return res
          .status(500)
          .send({ status: "error", message: "Error al registrar el usuario" });
      }

      return res.status(201).send({
        status: "success",
        message: "Usuario registrado exitosamente",
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .send({ status: "error", message: "Error al cerrar sesión" });
      }
      res.redirect("/");
    });
  },

  getUsers: async (req, res) => {
    try {
      if (req.session && req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (user && user.role === "admin") {
          const users = await User.find({});
          return res.status(200).send({ status: "success", users });
        }
      }

      return res
        .status(403)
        .send({ status: "error", message: "Acceso no autorizado" });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al obtener usuarios",
        error: error.message,
      });
    }
  },

};

module.exports = userController;

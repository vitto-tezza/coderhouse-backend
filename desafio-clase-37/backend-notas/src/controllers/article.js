"use strict";

var Article = require("../models/article");

var controller = {
  save: async (req, res) => {
    try {
      var params = req.body;

      var article = new Article();

      article.name = params.name;
      article.description = params.description;
      article.price = params.price;

      const articleStored = await article.save();
      if (!articleStored) {
        return res
          .status(404)
          .send({ status: "error", message: "El artículo no se ha guardado" });
      }
      return res.status(200).send({
        status: "success",
        article: articleStored,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al guardar el artículo",
        error: error.message,
      });
    }
  },

  getArticles: async (req, res) => {
    try {
      const articles = await Article.find({}).sort("-date").exec();
      if (!articles || articles.length === 0) {
        return res.status(404).send({
          status: "error",
          message: "No hay artículos para mostrar",
        });
      }
      return res.status(200).send({
        status: "success",
        articles,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al extraer los datos",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      var articleId = req.params.id;

      const articleRemoved = await Article.findOneAndDelete({ _id: articleId });
      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha encontrado el artículo a eliminar",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al eliminar el artículo",
        error: error.message,
      });
    }
  },
};

module.exports = controller;

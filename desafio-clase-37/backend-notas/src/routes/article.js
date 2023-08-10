const express = require("express");
const articleController = require("../controllers/article");

const ArticleRouter = express.Router();

ArticleRouter.post("/save", articleController.save);
ArticleRouter.get("/articles", articleController.getArticles);
ArticleRouter.delete("/delete/:id", articleController.delete);

module.exports = ArticleRouter;

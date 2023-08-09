"use strict";

const express = require("express");
const articleController = require("../controllers/article");
const { requireAuth } = require("../middleware/auth");

const ArticleRouter = express.Router();

//ArticleRouter.use(requireAuth);

ArticleRouter.post("/save", articleController.save);

ArticleRouter.get("/articles", articleController.getArticles);

ArticleRouter.delete("/delete/:id", articleController.delete);

module.exports = ArticleRouter;

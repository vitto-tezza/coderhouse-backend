const express = require("express");
const userController = require("../controllers/user");
const { getArticles } = require("../controllers/article");

const UserRouter = express.Router();

UserRouter.post("/login", getArticles);
UserRouter.post("/register", userController.register);
UserRouter.get("/logout", userController.logout);
UserRouter.get("/users", userController.getUsers);

module.exports = UserRouter;

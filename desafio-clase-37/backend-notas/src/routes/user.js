const express = require("express");
const userController = require("../controllers/user");

const UserRouter = express.Router();

UserRouter.post("/login", userController.login);

UserRouter.post("/register", userController.register);

UserRouter.get("/logout", userController.logout);

UserRouter.get("/users", userController.getUsers);

module.exports = UserRouter;

import { Router } from "express";
import {
  getUsers,
  getUserById,
  saveUser,
} from "../controllers/user.controller.js";

export const userRoutes = () => {
  const router = Router();

  router.get("/", getUsers);
  router.get("/:uid", getUserById);
  router.post("/", saveUser);

  return router;
};

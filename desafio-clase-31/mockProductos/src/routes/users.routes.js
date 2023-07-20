import { Router } from "express";
import { generateProduct } from "../utils.js";

export const userRoutes = () => {
  const router = Router();

  router.get("/", (req, res) => {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push(generateProduct());
    }
    res.send({ status: "OK", payload: users });
  });

  return router;
};

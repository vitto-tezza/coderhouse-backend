import express from "express";

const { Router } = express;

const isAuth = Router();

isAuth.get("/", (req, res) => {
  res.json({ message: "ok" });
});

export default isAuth;

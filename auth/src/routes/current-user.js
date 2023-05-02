import express from "express";
import { currentUser } from "../middlewares/current-user.js";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/auth/current-user", currentUser, (req, res) => {
  res.send({ user: req.currentUser || null });
});

export { currentUserRouter };

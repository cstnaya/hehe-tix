import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import { requestError } from "../middlewares/request-error.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { RequestNotFound } from "../errors/request-not-found.js";
import { findUser } from "../models/user.model.js";

const signinRouter = express.Router();

signinRouter.post(
  "/api/auth/signin",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("You should input valid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  requestError,
  async (req, res) => {
    const { email, password } = req.body;

    // check user exists
    const user = await findUser({ email });
    if (!user) {
      throw new RequestNotFound("User not existed!");
    }

    // check password correct
    const isCorrectPwd = await bcrypt.compare(password, user.password);
    if (!isCorrectPwd) {
      throw new BadRequestError("Password incorrect.");
    }

    // create cookie
    const payload = { id: user.id };

    const userJwt = jwt.sign(payload, process.env.JWT_KEY);

    req.session = { user: userJwt };

    res.status(200).send({ success: true });
  }
);

export { signinRouter };

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import { requestError } from "../middlewares/request-error.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { saveUser, findUser } from "../models/user.model.js";

const SALT = 10;
const signupRouter = express.Router();

signupRouter.post(
  "/api/auth/signup",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("You need to input valid email"),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters"),
  ],
  requestError,
  async (req, res) => {
    const { email, password } = req.body;

    // check if email has been used
    const existedUser = await findUser({ email });
    if (existedUser) {
      throw new BadRequestError("User has existed, please use another email!");
    }

    // store into db
    const hashPassword = await bcrypt.hash(password, SALT);
    const user = await saveUser({ email, password: hashPassword });

    // create jwt
    const payload = { id: user.id };
    const userJwt = jwt.sign(payload, process.env.JWT_KEY);

    // store it in session obj as cookie
    req.session = {
      user: userJwt,
    };

    res.status(201).send(user);
  }
);

export { signupRouter };

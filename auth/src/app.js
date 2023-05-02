import express from "express";
import "express-async-errors";
import { ErrorHandler } from "./middlewares/error-handler.js";
import cookieSession from "cookie-session";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { signupRouter } from "./routes/signup.js";
import { currentUserRouter } from "./routes/current-user.js";

const app = express();

app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(ErrorHandler);

export { app };

import express from "express";
import { createCouponRouter } from "./routes/create.js";
import { ShowAllCouponsRouter } from "./routes/show.js";
import { ErrorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());
app.set("trust proxy", true);

app.use(createCouponRouter);
app.use(ShowAllCouponsRouter);

app.use(ErrorHandler);

export { app };

import express from "express";
import { body } from "express-validator";
import { RequestErrorMiddleware } from "../middlewares/request-error.js";
import { createCoupon } from "../models/coupon.model.js";

// a route for creating new coupon
const createCouponRouter = express.Router();

createCouponRouter.post(
  "/api/coupons",
  [
    body("total").isNumeric().withMessage("number input invalid"),
    body("name")
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("coupon name invalid"),
  ],
  RequestErrorMiddleware,
  async (req, res) => {
    const { total, name } = req.body;

    const coupon = await createCoupon({ total, name });
    res.status(201).send(coupon);
  }
);

export { createCouponRouter };

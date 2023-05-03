import express from "express";
import { showAllCoupons } from "../models/coupon.model.js";

const ShowAllCouponsRouter = express.Router();

ShowAllCouponsRouter.get("/api/coupons", async (req, res) => {
  const coupons = await showAllCoupons();

  res.status(200).send(coupons);
});

export { ShowAllCouponsRouter };

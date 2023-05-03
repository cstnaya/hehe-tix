import { Coupon } from "./coupon.mongo.js";

async function createCoupon(coupon) {
  const newCoupon = new Coupon(coupon);
  await newCoupon.save();

  return newCoupon;
}

async function updateCoupon(couponId, newData) {
  await Coupon.updateOne({ _id: couponId }, newData);
}

async function showAllCoupons() {
  const coupons = await Coupon.find({});
  return coupons;
}

export { updateCoupon, createCoupon, showAllCoupons };

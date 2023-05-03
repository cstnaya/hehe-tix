import { createCoupon, updateCoupon, showAllCoupons } from "../coupon.model.js";
import { Coupon } from "../coupon.mongo.js";

it("creates new coupon data into db", async () => {
  const newCoupon = { total: 10, name: "5/1 勞動節特價優惠" };

  const coupon = await createCoupon(newCoupon);

  expect(coupon.id).toBeDefined();
});

it("updates existed coupon data", async () => {
  const coupon = new Coupon({ total: 1, name: "test coupon" });
  await coupon.save();

  const total = 300;
  await updateCoupon(coupon.id, { total });

  const result = await Coupon.findOne({ _id: coupon.id });

  expect(result.total).toEqual(total);
});

it("show all created coupons", async () => {
  const coupons = [
    { total: 100, name: "coupon 001" },
    { total: 30, name: "coupon 002" },
  ];

  const c1 = new Coupon(coupons[0]);
  await c1.save();

  const c2 = new Coupon(coupons[1]);
  await c2.save();

  const result = await showAllCoupons();
  expect(result.length).toEqual(coupons.length);
});

import request from "supertest";
import { app } from "../../app.js";
import { createCoupon } from "../../models/coupon.model.js";

it("returns all created coupons", async () => {
  const coupons = [
    { total: 11, name: "coupon-1" },
    { total: 566, name: "coupon-2" },
    { total: 9, name: "coupon-3" },
  ];

  await createCoupon(coupons[0]);
  await createCoupon(coupons[1]);
  await createCoupon(coupons[2]);

  const response = await request(app).get("/api/coupons").expect(200);

  expect(response.body.length).toEqual(coupons.length);
});

it("returns empty array in the first time", async () => {
  const response = await request(app).get("/api/coupons").expect(200);
  expect(response.body.length).toEqual(0);
});

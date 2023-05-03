import request from "supertest";
import { app } from "../../app.js";

it("creates new coupon with valid data", async () => {
  const couponData = { total: 15, name: "new coupon tickets" };

  await request(app).post("/api/coupons").send(couponData).expect(201);
});

it("returns 500 when invalid data inputs", async () => {
  await request(app).post("/api/coupons").send({}).expect(400);
});

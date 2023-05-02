import { app } from "../../app.js";
import request from "supertest";

it("returns 404 when enters a non-exist user data", async () => {
  await request(app)
    .post("/api/auth/signin")
    .send({
      email: "asd123@test.com",
      password: "1111111",
    })
    .expect(404);
});

it("returns 200 when valid user login", async () => {
  const email = "test@test.com";
  const password = "111111";

  await request(app).post("/api/auth/signup").send({
    email,
    password,
  });

  const res = await request(app)
    .post("/api/auth/signin")
    .send({ email, password })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

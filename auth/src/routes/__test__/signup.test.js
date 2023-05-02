import request from "supertest";
import { app } from "../../app.js";
import crypto from "crypto";

it("returns 201 successful sign up.", async () => {
  const email = crypto.randomBytes(5).toString("hex") + "@test.com";
  const password = crypto.randomBytes(8).toString("hex");

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  // make sure that the cookie is really setted
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("returns 400 response with invalid email", async () => {
  const email = "asd123";
  const password = "asdffg";

  return request(app)
    .post("/api/auth/signup")
    .send({ email, password })
    .expect(400);
});

it("returns 400 response with invalid password", async () => {
  const email = crypto.randomBytes(4).toString("hex") + "@cry.com";
  const password = "";

  return request(app)
    .post("/api/auth/signup")
    .send({ email, password })
    .expect(400);
});

it("returns 400 when duplicate email was input", async () => {
  const email = crypto.randomBytes(5).toString("hex") + "@test.com";
  const password = crypto.randomBytes(8).toString("hex");

  await request(app)
    .post("/api/auth/signup")
    .send({ email, password })
    .expect(201);

  await request(app)
    .post("/api/auth/signup")
    .send({ email, password })
    .expect(400);
});

import request from "supertest";
import { app } from "../../app.js";

it("set cookie null when logout", async () => {
  await request(app)
    .post("/api/auth/signin")
    .send({ email: "apple@apple.com", password: "12345" });

  const res = await request(app).post("/api/auth/signout").expect(200);

  expect(res.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

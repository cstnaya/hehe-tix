import request from "supertest";
import { app } from "../../app.js";

it("returns current user data from cookie", async () => {
  const signinRes = await request(app)
    .post("/api/auth/signup")
    .send({ email: "abc@abc.com", password: "1234" })
    .expect(201);

  const cookie = signinRes.get("Set-Cookie");

  // browser will keep cookie data for us,
  // however, supertest won't save cookie to next request
  // as a result, middleware can't fetch user data from cookie
  // we need to set cookie from last request to next request manually
  const response = await request(app)
    .get("/api/auth/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.user.id).toBeDefined();
});

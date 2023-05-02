import { saveUser, findUser } from "../user.model";
import bcrypt from "bcrypt";
import { User } from "../user.mongo.js";

const SALT = 10;

it("creates and returns new user from mongoDB", async () => {
  const password = await bcrypt.hash("abc123", SALT);
  const email = "abc11@app.com";
  const userData = { email, password };

  await saveUser(userData);

  const result = await User.findOne({ email });

  expect(result.email).toBeDefined();
  expect(result.id).toBeDefined();
});

it("should return existed user from db", async () => {
  // store user first
  const password = await bcrypt.hash("abc123", SALT);
  const email = "abc11@app.com";

  await User.updateOne({}, { email, password }, { upsert: true });

  const user = await findUser({ email });

  expect(user.email).toBeDefined();
});

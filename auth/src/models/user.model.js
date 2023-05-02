import { User } from "./user.mongo.js";

async function saveUser(userData) {
  // store into db
  const user = new User(userData);
  await user.save();

  return user;
}

async function findUser(data) {
  const user = await User.findOne(data);

  return user;
}

export { saveUser, findUser };

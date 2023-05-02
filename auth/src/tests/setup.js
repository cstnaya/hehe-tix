import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

beforeAll(async () => {
  // create env variables
  process.env.JWT_KEY = "zxcvbn";

  // From the beginning test, we need to setup db
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, {});
});

beforeEach(async () => {
  // remove all existed data after each test.

  // 1. get all collections in db
  const collections = await mongoose.connection.db.collections();

  // 2. remove data in each of them
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.connection.close();
});

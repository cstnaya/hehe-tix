import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongodb;

beforeAll(async () => {
  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongodb.stop();
  await mongoose.connection.close();
});

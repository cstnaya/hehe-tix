import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);

  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
});

import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = 8001;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);

  try {
    mongoose.connect(MONGO_URI, {});
    console.log("db connect successed");
  } catch (e) {
    console.error(e);
  }
});

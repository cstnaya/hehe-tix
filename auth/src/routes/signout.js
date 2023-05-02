import express from "express";

const signoutRouter = express.Router();

signoutRouter.post("/api/auth/signout", (req, res) => {
  console.log("signout!");

  req.session = null;

  res.status(200).send({ success: true });
});

export { signoutRouter };

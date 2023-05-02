import jwt from "jsonwebtoken";

export function currentUser(req, res, next) {
  const currentUser = req.session?.user;

  if (!currentUser) {
    return next();
  }

  try {
    const payload = jwt.verify(currentUser, process.env.JWT_KEY);
    req.currentUser = payload;
  } catch (e) {}

  next();
}

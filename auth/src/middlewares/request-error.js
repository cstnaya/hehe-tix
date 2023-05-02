import { validationResult } from "express-validator";
import { RequestError } from "../errors/request-error.js";

export const requestError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(errors.array());
  }

  next();
};

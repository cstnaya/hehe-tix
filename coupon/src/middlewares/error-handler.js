export function ErrorHandler(err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ errors: err.errorMessages() });
  }

  return res
    .status(500)
    .send({ errors: [{ msg: "Something wrong occurred.  " + err.message }] });
}

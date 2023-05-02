export class BadRequestError extends Error {
  constructor(err) {
    super(err);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.err = err;
  }

  statusCode = 400;

  errorMessages() {
    return [{ msg: thie.err }];
  }
}

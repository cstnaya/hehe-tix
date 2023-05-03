export class RequestError extends Error {
  constructor(errors) {
    super("Input form invalid.");
    Object.setPrototypeOf(this, RequestError.prototype);

    this.errors = errors;
  }

  statusCode = 400;

  errorMessages() {
    return this.errors.map((err) => ({ msg: err.msg, field: err.path }));
  }
}

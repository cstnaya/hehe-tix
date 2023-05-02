export class RequestError extends Error {
  constructor(errors) {
    super("Request form occurred error.");
    Object.setPrototypeOf(this, RequestError.prototype);

    this.errors = errors;
  }

  statusCode = 400;

  errorMessages() {
    return this.errors.map((err) => ({ msg: err.msg, field: err.path }));
  }
}

export class RequestNotFound extends Error {
  constructor(msg) {
    super(msg);
    Object.setPrototypeOf(this, RequestNotFound.prototype);

    this.err = msg;
  }

  statusCode = 404;

  errorMessages() {
    return [{ msg: this.err }];
  }
}

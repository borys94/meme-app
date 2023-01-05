import {CustomError} from "./customError";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(msg = "Route not found") {
    super(msg);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return this.message;
  }
}

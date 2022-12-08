import {CustomError} from "./customError";

export class FirebaseAuthError extends CustomError {
  statusCode = 400;
  code = null;

  constructor(error: any) {
    super(error.message);
    this.code = error.code;

    Object.setPrototypeOf(this, FirebaseAuthError.prototype);
  }

  serializeError() {
    return this.message;
  }
}

import { CustomError } from './serializable-error';

export class NotAuthorizedError extends CustomError {
  static message = 'Not authorized';
  statusCode = 401;

  constructor() {
    super(NotAuthorizedError.message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

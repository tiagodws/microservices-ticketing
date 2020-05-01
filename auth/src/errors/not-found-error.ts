import { CustomError } from './serializable-error';

export class NotFoundError extends CustomError {
  static message = 'Not found';
  statusCode = 404;

  constructor() {
    super(NotFoundError.message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

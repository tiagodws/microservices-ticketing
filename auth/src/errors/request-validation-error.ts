import { ValidationError } from 'express-validator';
import { CustomError } from './serializable-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));
  }
}

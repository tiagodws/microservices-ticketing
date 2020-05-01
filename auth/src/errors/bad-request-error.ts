import { CustomError, CustomErrorObject } from './serializable-error';

export class BadRequestError extends CustomError {
  static message = 'Bad request';
  statusCode = 400;

  constructor(public errors: CustomErrorObject[]) {
    super(BadRequestError.message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}

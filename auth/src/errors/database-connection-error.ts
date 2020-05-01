import { CustomError } from './serializable-error';

export class DatabaseConnectionError extends CustomError {
  static message = 'Error connecting to the database';
  statusCode = 500;

  constructor() {
    super(DatabaseConnectionError.message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

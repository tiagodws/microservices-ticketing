export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): CustomErrorObject[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export interface CustomErrorObject {
  message: string;
  field?: string;
}

import { NextFunction, Request, Response } from 'express';
import { CustomError, CustomErrorObject } from '../errors/serializable-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  const formattedErrors: CustomErrorObject[] = [
    { message: 'Something went wrong' },
  ];
  res.status(500).send({ errors: formattedErrors });
};

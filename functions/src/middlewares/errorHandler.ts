import {Request, Response, NextFunction} from "express";
import {CustomError} from "../errors";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({error: err.serializeError()});
  }

  console.log(err);

  return res.status(400).send({
    error: "Something went wrong",
  });
};

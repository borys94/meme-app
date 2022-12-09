import {NextFunction, Request, Response} from "express";

import {NotAuthorizedError} from "../errors/notAuthorizedError";

export interface ApiError {
  status: "error";
  message: string;
  data?: unknown;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};

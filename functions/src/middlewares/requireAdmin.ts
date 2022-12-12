import {NextFunction, Request, Response} from "express";
import {USER_ROLES} from "../../../shared/models/user";

import {NotAuthorizedError} from "../errors/notAuthorizedError";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser!.role !== USER_ROLES.ADMIN) {
    throw new NotAuthorizedError();
  }

  next();
};

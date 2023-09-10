import { NextFunction, Request, Response } from "express";
import { JwtHelpers } from "../../helpers/jwt-helpers";
import { IValidateUser } from "../modules/auth/auth.interface"
import ApiError from "../error/api-error"
import httpStatus from "http-status"

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        next("Invalid token!");
      }
      
      let token = authorization as string;
      
      
      const user = JwtHelpers.verifyToken(token) as IValidateUser;

      req.user = user;

      if (roles?.length) {
        if(!user.role || !roles.includes(user.role)){
          throw new ApiError(httpStatus.FORBIDDEN,'Forbidden!')
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};


export default auth
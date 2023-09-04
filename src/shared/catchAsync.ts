import { Request, RequestHandler, Response } from "express"
import { NextFunction } from "express-serve-static-core"
import httpStatus from "http-status"

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync
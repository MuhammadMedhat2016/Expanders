import { NextFunction, Request, Response } from 'express';

type RouteHandler = (request: Request, response: Response) => void;

export function asyncCatch(routeHandler: RouteHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await routeHandler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

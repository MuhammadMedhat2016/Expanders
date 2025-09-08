import { NextFunction, Request, Response } from 'express';

export type TypedRequest<
  Params,
  ReqBody,
  ReqQuery,
  Locals extends Record<string, any>
> = Request<Params, {}, ReqBody, ReqQuery, Locals>;

export type TypedResponse<
  ResBody,
  Locals extends Record<string, string>
> = Response<ResBody, Locals>;

export type RouteHandler<
  Params,
  ResBody,
  ReqBody,
  ReqQuery,
  Locals extends Record<string, any>
> = (
  req: TypedRequest<Params, ReqBody, ReqQuery, Locals>,
  res: TypedResponse<ResBody, Locals>,
  next: NextFunction
) => any;

export function asyncCatch<
  Params = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Record<string, string>,
  Locals extends Record<string, any> = Record<string, any>
>(routeHandler: RouteHandler<Params, ResBody, ReqBody, ReqQuery, Locals>) {
  return async function (
    req: TypedRequest<Params, ReqBody, ReqQuery, Locals>,
    res: TypedResponse<ResBody, Locals>,
    next: NextFunction
  ) {
    try {
      await routeHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

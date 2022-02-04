import { Request, Response, NextFunction } from 'express';

interface error {
  message?: string;
  status?: number;
  name?: string;
  stack?: string;
}

export function errorHandler(err: error, req: Request, res: Response, _: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  console.error(err);
  res.status(err.status || 500).send(err.message);
}

export function routerError(req: Request, res: Response, next: NextFunction) {
  const error: error = new Error(`${req.method} ${req.originalUrl} 라우터 에러입니다.`);
  error.status = 404;
  next(error);
}
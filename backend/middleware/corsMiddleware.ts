import { NextFunction, Request, Response } from 'express'

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Authorization,Content-Type,'
  )
  next()
}

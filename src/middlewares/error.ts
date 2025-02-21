import { NextFunction, Request, Response } from "express";

import { statusCodeFromErrors , testError } from "../utils/errorUtils.js";

export default function handleErrorsMiddleware(err:any, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  
  if(testError(err)) {
    const statusCode = statusCodeFromErrors(err.type);
    return res.status(statusCode).send(err.message)
  }

  res.sendStatus(500);
}


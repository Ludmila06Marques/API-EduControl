import { NextFunction, Request, Response } from "express";
import * as userSchema from "../schemas/userSchema.js"
import { failSchema } from "../utils/errorUtils.js";

export function validateSignup(req : Request, res:Response, next:NextFunction) {
  const user = req.body
  console.log(req.body)
  const validation = userSchema.userSchemaSignup.validate(user)
  if (validation.error) {
    throw failSchema('Wrong schema')
  }

  next()
}

export function validateLogin(req : Request, res:Response, next:NextFunction) {
  const user = req.body
  console.log(req.body)
  const validation = userSchema.userSchemaLogin.validate(user)
  if (validation.error) {
    throw failSchema('Wrong schema')
  }

  next()
}




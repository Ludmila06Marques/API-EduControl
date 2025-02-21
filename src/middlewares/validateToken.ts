import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as searchUser from "../services/userService.js"
import { failUnauth } from "../utils/errorUtils.js";
dotenv.config();

export async function validateTokenFunction(req: Request, res: Response, next: NextFunction) {

  const authorization = req.headers["authorization"];
  if (!authorization) throw failUnauth("Falta o headers");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw failUnauth("Falta token");

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token,JWT_SECRET) as { userId: number };
    const user = await searchUser.findUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw failUnauth("token invalido");
  }
}
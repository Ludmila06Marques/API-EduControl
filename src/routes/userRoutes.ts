import { Router } from "express";
import * as userController from "../controllers/userControllers.js"
import * as validator from "../middlewares/validateSchema.js"
import { validateTokenFunction } from "../middlewares/validateToken.js";
const userRouter = Router();

userRouter.post("/login" , validator.validateLogin, userController.login);
userRouter.post("/sign-up" ,validator.validateSignup,userController.signup);
userRouter.get("/user/:id" ,userController.geById);
userRouter.delete("/user/:id", userController.deleteUser)
userRouter.put("/user/:id" , validateTokenFunction, userController.toUpdate);
userRouter.put("/userInfo/:id/" , validateTokenFunction,userController.toUpdateInfo);
userRouter.put("/userName/:id/" , validateTokenFunction,userController.toUpdateName);
userRouter.put("/userCountry/:id/",validateTokenFunction,userController.toUpdateCountry);
userRouter.put("/userPhoto/:id/", validateTokenFunction,userController.toUpdatePhoto);
export default userRouter;
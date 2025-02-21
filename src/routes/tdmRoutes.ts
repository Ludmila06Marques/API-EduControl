import { Router } from "express";
import * as tdmController from "../controllers/tdmController.js"



const optionRouter = Router();

optionRouter.get("/rol" ,tdmController.getAllRol);




export default optionRouter;
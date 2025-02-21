import { Router } from "express";
import userRouter from "./userRoutes.js";

import tdmRouter from "./tdmRoutes.js";

const router = Router();

router.use(userRouter);
router.use(tdmRouter)

export default router;
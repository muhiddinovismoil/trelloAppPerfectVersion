import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import boardRoutes from "./boards.routes.js";
// import tasksRoutes from "./tasks.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/boards", boardRoutes);
// router.use("/boards", tasksRoutes);

export default router;

import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import boardRoutes from "./boards.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/boards", boardRoutes);

export default router;

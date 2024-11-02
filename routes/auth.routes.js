import { Router } from "express";
import { signUser, loginUser } from "../controllers/index.js";
import { registerMiddleware, loginMiddleware } from "../middleware/index.js";
const router = Router();

router.post("/register", registerMiddleware, signUser);
router.post("/login", loginMiddleware, loginUser);

export default router;

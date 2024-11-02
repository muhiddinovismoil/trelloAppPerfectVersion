import { Router } from "express";
import { signUser, loginUser } from "../controllers/index.js";

const router = Router();

router.post("/register", signUser);
router.post("/login", loginUser);

export default router;

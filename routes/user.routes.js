import { Router } from "express";
import {
  getAllData,
  searchData,
  getById,
  updateData,
  removeData,
} from "../controllers/index.js";
const router = Router();

router.get("/", getAllData);
router.get("/search", searchData);
router.get("/:id", getById);
router.put("/:id", updateData);
router.delete("/:id", removeData);

export default router;

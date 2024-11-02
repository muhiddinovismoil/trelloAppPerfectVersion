import { Router } from "express";
import {
    getAllBoards,
    getBoardsById,
    createBoards,
    updateBoardsById,
    deleteBoardsById,
    getAllTasks,
    getTasksById,
    createTasks,
    updateTasksById,
    deleteTasksById,
} from "../controllers/index.js";
import {
    checkBoardMiddleware,
    checkTasksMiddleware,
} from "../middleware/index.js";
const router = Router();

router.get("/", getAllBoards);
router.get("/:boardId", getBoardsById);
router.post("/", checkBoardMiddleware, createBoards);
router.put("/:boardId", updateBoardsById);
router.delete("/:boardId", deleteBoardsById);

// THIS IS TASKS ROUTES
router.get("/:boardId/tasks", getAllTasks);
router.get("/:boardId/tasks/:taskId", getTasksById);
router.post("/:boardId/tasks", checkTasksMiddleware, createTasks);
router.put("/:boardId/tasks/:taskId", updateTasksById);
router.delete("/:boardId/tasks/:taskId", deleteTasksById);

export default router;

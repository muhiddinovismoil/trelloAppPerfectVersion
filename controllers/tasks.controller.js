import {
    createTasksData,
    deleteTasksDataById,
    getTasksData,
    getTasksDataById,
    updateTasksDataById,
} from "../services/index.js";
export async function getAllTasks(req, res, next) {
    try {
        const id = req.params.boardId;
        const data = await getTasksData(id);
        if (!data) {
            return res.status(404).send(`Tasks not found`);
        }
        res.status(200).send({
            status: "Success",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}
export async function getTasksById(req, res, next) {
    try {
        const idBoard = req.params.boardId;
        const id = req.params.taskId;
        const dataById = await getTasksDataById(id, idBoard);
        if (!dataById) {
            return res.status(404).send(`Tasks not found`);
        }
        res.status(200).send({
            status: "success",
            data: dataById,
        });
    } catch (error) {
        next(error);
    }
}
export async function createTasks(req, res, next) {
    try {
        let boardId = req.params.boardId;
        let { title, orders, description, userId, columnId } = req.body;
        const addTask = await createTasksData(
            boardId,
            title,
            orders,
            description,
            userId,
            columnId
        );
        res.status(200).send({
            status: "Successfully created",
            data: addTask,
        });
    } catch (error) {
        next(error);
    }
}
export async function updateTasksById(req, res, next) {
    try {
        const id = req.params.taskId;
        const IDboard = req.params.boardId;
        const { title, orders, description } = req.body;
        const updatedTasks = await updateTasksDataById(
            id,
            IDboard,
            title,
            orders,
            description
        );
        res.status(200).send({
            status: "successfully updated",
            data: updatedTasks,
        });
    } catch (error) {
        next(error);
    }
}
export async function deleteTasksById(req, res, next) {
    try {
        const IDboard = req.params.boardId;
        const IDtask = req.params.taskId;
        const data = await deleteTasksDataById(IDtask, IDboard);
        res.status(200).send({
            status: "Successfully deleted",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

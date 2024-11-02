import pool from "../db/db.js";
export async function getAllTasks(req, res, next) {
    try {
        const idBoard = req.params.boardId;
        const data = await pool.query(`SELECT * FROM tasks WHERE boardId=$1`, [
            idBoard,
        ]);
        res.send({
            status: "Success",
            data: data.rows,
        });
    } catch (error) {
        next(error);
    }
}
export async function getTasksById(req, res, next) {
    try {
        const idBoard = req.params.boardId;
        const id = req.params.taskId;
        const dataById = await pool.query(
            `SELECT * FROM tasks WHERE id=$1 AND boardId=$2`,
            [id, idBoard]
        );
        res.send({
            status: "success",
            data: dataById.rows,
        });
    } catch (error) {
        next(error);
    }
}
export async function createTasks(req, res, next) {
    try {
        let boardId = req.params.boardId;
        let { title, orders, description, userId, columnId } = req.body;
        await pool.query(
            `INSERT INTO
            tasks(title,orders,description,userId,boardId,columnId)
            VALUES($1,$2,$3,$4,$5,$6)`,
            [title, orders, description, userId, boardId, columnId]
        );
        res.send("success");
    } catch (error) {
        next(error);
    }
}
export async function updateTasksById(req, res, next) {
    try {
        const id = req.params.taskId;
        const IDboard = req.params.boardId;
        const { title, orders, description } = req.body;
        const data = await pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
        const oldTitle = data.rows[0].title;
        const oldDescription = data.rows[0].description;
        const oldOrder = data.rows[0].orders;
        await pool.query(
            `UPDATE tasks SET title=$1,orders=$2,description=$3 WHERE id=$4 AND boardId=$5
            `,
            [
                title || oldTitle,
                orders || oldOrder,
                description || oldDescription,
                id,
                IDboard,
            ]
        );
        res.send("successfully updated");
    } catch (error) {
        next(error);
    }
}
export async function deleteTasksById(req, res, next) {
    try {
        const IDboard = req.params.boardId;
        const IDtask = req.params.taskId;
        await pool.query(
            `
            DELETE FROM tasks WHERE id=$1 AND boardId=$2
        `,
            [IDtask, IDboard]
        );
        res.send("successfully deleted");
    } catch (error) {
        next(error);
    }
}

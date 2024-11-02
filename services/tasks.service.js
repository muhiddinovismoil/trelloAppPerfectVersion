import pool from "../db/db.js";
export const getTasksData = async (id) => {
    try {
        const data = await pool.query(`SELECT * FROM tasks WHERE boardId=$1`, [
            id,
        ]);
        return data.rows;
    } catch (error) {
        return error.message;
    }
};
export const getTasksDataById = async (id, idBoard) => {
    try {
        const dataById = await pool.query(
            `SELECT * FROM tasks WHERE id=$1 AND boardId=$2`,
            [id, idBoard]
        );
        return dataById.rows;
    } catch (error) {
        return error.message;
    }
};
export const createTasksData = async (
    boardId,
    title,
    orders,
    description,
    userId,
    columnId
) => {
    try {
        const data = await pool.query(
            `INSERT INTO
            tasks(title,orders,description,userId,boardId,columnId)
            VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
            [title, orders, description, userId, boardId, columnId]
        );
        data.rows[0].id;
    } catch (error) {
        return error.message;
    }
};
export const updateTasksDataById = async (
    id,
    IDboard,
    title,
    orders,
    description
) => {
    try {
        const data = await pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
        const oldData = data.rows[0];
        const update = await pool.query(
            `UPDATE tasks SET title=$1,orders=$2,description=$3 WHERE id=$4 AND boardId=$5
            RETURNING id`,
            [
                title || oldData.title,
                orders || oldData.orders,
                description || oldData.description,
                id,
                IDboard,
            ]
        );
        return update.rows[0].id;
    } catch (error) {
        return error.message;
    }
};
export const deleteTasksDataById = async (IDtask, IDboard) => {
    try {
        const data = await pool.query(
            `
            DELETE FROM tasks WHERE id=$1 AND boardId=$2 RETURNING id
        `,
            [IDtask, IDboard]
        );
        return data.rows[0].id;
    } catch (error) {
        return error.message;
    }
};

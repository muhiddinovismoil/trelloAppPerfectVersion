import pool from "../db/db.js";
export const getBoardsData = async () => {
    try {
        const getBoards = await pool.query(`
            SELECT * FROM boards
        `);
        return getBoards.rows;
    } catch (error) {
        return error.message;
    }
};
export const getBoardsByIdData = async (id) => {
    try {
        const getElementById = await pool.query(
            `
            SELECT * FROM boards WHERE id=$1
            `,
            [id]
        );
        return getElementById.rows;
    } catch (error) {
        return error.message;
    }
};
export const updateBoardsData = async (id, title) => {
    try {
        const getBoardsById = await pool.query(
            `
            SELECT * FROM boards WHERE id=$1`,
            [id]
        );
        const oldTitle = getBoardsById.rows[0].title;
        const updatedData = await pool.query(
            `UPDATE boards SET title=$1 WHERE id=$2 RETURNING id`,
            [title || oldTitle, id]
        );
        return updatedData.rows[0].id;
    } catch (error) {
        return error.message;
    }
};
export const deleteDataById = async (id) => {
    try {
        const data = await pool.query(
            `DELETE FROM boards WHERE id=$1 RETURNING id`,
            [id]
        );
        return data.rows[0].id;
    } catch (error) {
        return error.message;
    }
};

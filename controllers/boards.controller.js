import pool from "../db/db.js";
export async function getAllBoards(req, res, next) {
    try {
        const getBoards = await pool.query(`
                SELECT * FROM boards
            `);
        res.send({
            status: "success",
            data: getBoards.rows,
        });
    } catch (error) {
        next(error);
    }
}
export async function getBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        const getElementById = await pool.query(
            `
            SELECT * FROM boards WHERE id=$1
            `,
            [id]
        );
        res.send(getElementById.rows);
    } catch (error) {
        next(error);
    }
}
export async function createBoards(req, res, next) {
    try {
        const { title, columns } = req.body;
        await pool.query(
            `INSERT INTO boards(title,columns)
            VALUES($1,$2)
            `,
            [title, columns]
        );
        res.status(200).send("success");
    } catch (error) {
        next(error);
    }
}
export async function updateBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        const { title } = req.body;
        const getBoardsById = await pool.query(
            `
            SELECT * FROM boards WHERE id=$1`,
            [id]
        );
        const oldTitle = getBoardsById.rows[0].title;
        await pool.query(`UPDATE boards SET title=$1 WHERE id=$2`, [
            title || oldTitle,
            id,
        ]);
        res.send("success");
    } catch (error) {
        next(error);
    }
}
export async function deleteBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        await pool.query(`DELETE FROM boards WHERE id=$1`, [id]);
        res.send("success");
    } catch (error) {
        next(error);
    }
}

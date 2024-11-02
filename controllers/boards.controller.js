import {
    getBoardsData,
    getBoardsByIdData,
    updateBoardsData,
    deleteDataById,
} from "../services/index.js";
export async function getAllBoards(req, res, next) {
    try {
        const getBoards = await getBoardsData();
        if (!getAllBoards) {
            return res.status(404).send(`NOTHING FOUND`);
        }
        res.status(200).send({
            status: "success",
            data: getBoards,
        });
    } catch (error) {
        next(error);
    }
}
export async function getBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        const dataById = await getBoardsByIdData(id);
        if (!dataById) {
            return res.status(404).send(`Data not found`);
        }
        res.status(200).send({
            status: "success",
            data: dataById,
        });
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
        res.status(200).status(200).send("success");
    } catch (error) {
        next(error);
    }
}
export async function updateBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        const { title } = req.body;
        const updateBoard = await updateBoardsData(id, title);
        if (!updateBoard) {
            return res.status(404).send(`Data not found and cannot be updated`);
        }
        res.status(200).send({
            status: "Updated",
            updatedBoard: updateBoard,
        });
    } catch (error) {
        next(error);
    }
}
export async function deleteBoardsById(req, res, next) {
    try {
        const id = req.params.boardId;
        const data = await deleteDataById(id);
        if (!data) {
            return res.status(404).send(`Data not found and cannot be deleted`);
        }
        res.status(200).send({
            status: "Deleted",
            deletedBoard: data,
        });
    } catch (error) {
        next(error);
    }
}

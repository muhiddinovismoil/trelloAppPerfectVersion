export const checkTasksMiddleware = async (req, res, next) => {
    try {
        const { title, orders, description, userId, columnId } = req.body;
        if (!title || !orders || !description || !userId || !columnId) {
            throw new Error("Error values are not valid");
        }
        if (userId <= 0 || columnId <= 0) {
            throw new Error("Error values are not valid");
        }
        next();
    } catch (error) {
        res.status(400).send("Error values are not valid");
    }
};

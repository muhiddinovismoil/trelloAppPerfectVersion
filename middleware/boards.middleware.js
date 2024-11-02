export const checkBoardMiddleware = async (req, res, next) => {
    try {
        const { title, columns } = req.body;
        if (!title || !columns) {
            throw new Error(
                "Error with values entering your are not completely entered values"
            );
        }
        next();
    } catch (error) {
        res.status(400).send("You are not completely entered values");
    }
};

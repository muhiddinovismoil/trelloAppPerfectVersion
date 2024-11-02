export const registerMiddleware = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("Error values are not valid please check");
        }
        next();
    } catch (error) {
        res.status(400).send("Error values are not valid");
    }
};
export const loginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Error values are not valid");
        }
        next();
    } catch (error) {
        res.status(400).send("Error values are not valid");
    }
};

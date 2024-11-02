import pool from "../db/db.js";
import bcrypt from "bcrypt";

export async function signUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).send("Please enter all fields!");
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newData = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashPassword]
        );
        if (newData.rows.length !== 1)
            return res.status(500).send("Some error on server!");
        res.status(200).send({
            message: "Signup",
            user_id: newData.rows[0].id,
        });
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send("Please enter all fields!");
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [
            email,
        ]);
        if (!user.rows[0]) {
            return res.status(400).send("Parol yoki email xato!");
        }
        const comparedPass = await bcrypt.compare(
            password,
            user.rows[0].password
        );
        if (!comparedPass) {
            return res.status(400).send("Parol yoki email xato!");
        }
        res.status(200).send({
            message: "SignIn",
            token: "Token",
        });
    } catch (error) {
        next(error);
    }
}

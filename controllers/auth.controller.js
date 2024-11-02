import pool from "../db/db.js";
import bcrypt from "bcrypt";
import { registerUser } from "../services/index.js";

export async function signUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const data = await registerUser(name, email, password);
        res.status(200).send({
            message: "Signup",
            user_id: data,
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

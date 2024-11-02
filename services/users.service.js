import pool from "../db/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (name, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newData = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashPassword]
        );
        if (newData.rows.length !== 1) return "Some error on server!";
        return newData.rows[0].id;
    } catch (error) {
        return `ERROR WHILE REGISTERING DATA`;
    }
};
export const getUsersData = async () => {
    try {
        const getData = await pool.query("SELECT * FROM users");
        if (!getData.rows) {
            return `DATA NOT FOUND OR MAYBE DATA NOT CREATED BEFORE`;
        }
        return getData.rows;
    } catch (error) {
        return "ERROR WHILE GETTING DATA";
    }
};
export const searchUsersData = async (q) => {
    try {
        const searchData = await pool.query(
            "SELECT * FROM users WHERE name ILIKE '%$1%'",
            [q]
        );
        if (!searchData.rows) {
            return `ERROR DATA NOT FOUND OR MAYBE DATA NOT CREATED BEFORE`;
        }
        return searchData.rows;
    } catch (error) {
        return "ERROR WHILE GETTING DATA";
    }
};
export const getUsersDataById = async (id) => {
    try {
        const data = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if (!data.rows) {
            return `Malumot topilmadi yoki oldin yaratilmagan`;
        }
        return data.rows[0];
    } catch (error) {
        return "ERROR WHILE GETTING DATA";
    }
};
export const updateUsersData = async (id, name, email, password) => {
    try {
        const data = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if (!data.rows.length) {
            return "User was not found!";
        }
        let oldUser = data.rows[0];
        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }
        const editData = await pool.query(
            "UPDATE users SET name=$1, email=$2, password=$3, updatedAt=$4 WHERE id=$5 RETURNING id",
            [
                name || oldUser.name,
                email || oldUser.email,
                hashPassword || oldUser.password,
                new Date(),
                id,
            ]
        );
        if (editData.rows.length !== 1) return "Some error on server!";
        return editData.rows[0].id;
    } catch (error) {
        return error.message;
    }
};
export const deleteUserData = async (id) => {
    try {
        const oldData = await pool.query("SELECT * FROM users WHERE id=$1", [
            id,
        ]);
        if (!oldData.rows.length) {
            return res.status(404).send("User was not found!");
        }
        const data = await pool.query(
            "DELETE FROM users WHERE id=$1 RETURNING id",
            [id]
        );
        return data.rows[0].id;
    } catch (error) {
        return error.message;
    }
};

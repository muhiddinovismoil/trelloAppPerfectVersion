import pool from "../db/db.js";
import bcrypt from "bcrypt";

export async function getAllData(req, res, next) {
  try {
    const getData = await pool.query("SELECT * FROM users");
    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchData(req, res, next) {
  try {
    const { q } = req.query;
    const searchData = await pool.query(
      "SELECT * FROM users WHERE name ILIKE '%$1%'",
      [q]
    );
    res.status(200).send({
      status: "Success",
      data: searchData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    res.status(200).send({
      status: "Success",
      data: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateData(req, res, next) {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const data = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (!data.rows.length) {
      return res.status(404).send("User was not found!");
    }
    let oldUser = data.rows[0];

    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    console.log(name, email, password, hashPassword);

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

    if (editData.rows.length !== 1)
      return res.status(500).send("Some error on server!");

    res.status(200).send({
      message: "Updated",
      data: editData.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeData(req, res, next) {
  try {
    const id = req.params.id;
    const oldData = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (!oldData.rows.length) {
      return res.status(404).send("User was not found!");
    }

    const data = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING id",
      [id]
    );

    res.status(200).send({
      status: "Deleted",
      user_id: data.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
}

import pool from "./db.js";

export const createTables = async () => {
    try {
        const tables = [
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY, 
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`,
            `CREATE TABLE IF NOT EXISTS columns(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL
            )`,
            `CREATE TABLE IF NOT EXISTS boards(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                columns INT,
                CONSTRAINT fk_columns
                  FOREIGN KEY(columns)
                  REFERENCES columns(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
            )`,

            `CREATE TABLE IF NOT EXISTS tasks(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                orders VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                userId INT NOT NULL,
                boardId INT NOT NULL,
                columnId INT NOT NULL,
                CONSTRAINT fk_users
                  FOREIGN KEY (userId)
                  REFERENCES users(id)
                  ON DELETE SET NULL
                  ON UPDATE CASCADE,
                CONSTRAINT fk_boards
                  FOREIGN KEY(boardId)
                  REFERENCES boards(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE,
                CONSTRAINT fk_columns
                  FOREIGN KEY(columnId)
                  REFERENCES columns(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
            )`,
            `INSERT INTO columns (title) VALUES
                ('Project A'),
                ('Project B'),
                ('Project C'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project D'),
                ('Project E');`,
        ];

        for (let table of tables) {
            await pool.query(table);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

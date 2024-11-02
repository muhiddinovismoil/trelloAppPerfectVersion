import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";
import { createTables } from "./db/tables.js";
import { connectDatabase } from "./db/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/setUp", (req, res) => {
    createTables();
    res.status(201).send("Tables were created");
});
app.use("/api/v1", routes);
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Project is running on port:" + port);
    connectDatabase();
});

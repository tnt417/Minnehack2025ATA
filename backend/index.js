import { getDb, saveDb } from "./database.js";
import express from "express";

const app = express();
const PORT = 3000;

// -- auth --------------------------------------------------

app.get("/", (req, res) => {
    const db = getDb();
    db.users[0].name = "wublin";
    saveDb(db);
    res.send("Hello therrr");
});

app.get("/signup", (req, res) => {
    // todo
});

app.get("/login", (req, res) => {
    // todo
});

// -- data --------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

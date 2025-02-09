import { authUser, getDb, login, saveDb, signup } from "./database.js";
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
    console.log("Signup attempted");
    const email = req.query.email;
    const name = req.query.name;
    const password = req.query.password;
    if (typeof email != "string" || typeof name != "string" || typeof password != "string") {
        res.status(400).send("Invalid input");
        return;
    }

    const success = signup(email, password, name);

    if (success) {
        res.status(200).send("Cool");
    } else {
        res.status(400).send("Account already exists");
    }
});

app.get("/login", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    console.log(`Trying to log in ${email} with ${password}`)
    const userId = login(email, password);
    if (userId) {
        res.status(200).send(`${userId}`);
    } else {
        res.status(400).send("Nope");
    }
});

app.get("/logout", (req, res) => {
    const authToken = req.query.auth;
    const success = authUser(authToken);
    if (success) {
        res.status(200).send("Logged out");
    } else {
        res.status(400).send("Wasn't logged in");
    }
});

// -- data --------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

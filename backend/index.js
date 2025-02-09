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
    const authToken = login(email, password);
    if (authToken) {
        res.status(200).json({auth: authToken});
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

app.get("/current_challenge", (req, res) => {
    const groupId = Number(req.query.groupId);
    console.log(typeof groupId);
    if (typeof groupId === "number"){
        const db = getDb();
        const group = db.groups.find(group => group.id == groupId)
        const challenge = group.challenges[group.challenges.length - 1];
        
        res.status(200).json(challenge)
    }
    else{
        res.status(400).send("Invalid Input")
    }
})

app.get("/leaderboard", (req, res) => {
    const groupId = Number(req.query.groupId);
    if(typeof groupId == "number"){
        const db = getDb();
        const group = db.groups.find(group => group.id == groupId);
        /*for(let i = 0; i < group.challenges.length; i++){
            const challengeArray = [];
            challengeArray.push(group.challenges[i]);
        */
       const challenges = {challenges: group.challenges}
        res.status(200).json(challenges);
        }
        else{
            res.status(400).send("Invalid Input")
        }
    }
    
)
// ---------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


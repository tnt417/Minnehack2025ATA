import { authUser, getDb, login, saveDb, signup } from "./database.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
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

app.get("/past-challenges", (req, res) => {
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


//(auth: your token) -> group id & name & membercount[]
app.get("/my-groups", (req, res) => {
    const auth = req.query.auth;
    if(typeof auth != "string"){
        res.status(400).send("Invalid Input")
    }
    const userId = authUser(auth);
    if(!userId){
        res.status(400).send("Invalid Input");
    }

    const db = getDb();
    const data = [];
    for(let i = 0; i < db.groups.length; i++){
        if(userId in db.groups[i].member_ids){
            data.push({
                id: db.groups[i].id,
                name: db.groups[i].name,
                memberCount: db.groups[i].member_ids.length
            })
        }
    }
    res.status(200).json(data);
}
)


//(auth: your token) -> group id & name & membercount[]
app.get("/all-groups", (req, res) => {
    const auth = req.query.auth;
    if(typeof auth != "string"){
        res.status(400).send("Invalid Input")
        return;
    }

    const userId = authUser(auth);
    if(!userId){
        res.status(400).send("Not logged in");
        return;
    }

    const db  = getDb();
    const data = []
    for(let i = 0; i < db.groups.length; i++){
        // names.push(db.groups[i].name);
        data.push({
            id: db.groups[i].id,
            name: db.groups[i].name,
            memberCount: db.groups[i].member_ids.length
        })
    }
    res.status(200).json(data);
})



//(groupId: string) -> group data json object
app.get("/group-data", (req, res) => {
    const groupId = Number(req.query.groupId);
    if(groupId <= 0){
        res.status(400).send("Invalid Input");
        return;
    }

    const db = getDb();
    const data = [];
    for(let i = 0; i < db.groups.length; i++){
        console.log(typeof db.groups[i].id);
        if(groupId === db.groups[i].id){
            data.push({
                name: db.groups[i].name,
                id: db.groups[i].id,
                memberIds: db.groups[i].member_ids,
                challenges: db.groups[i].challenges
            })
        }
    }
    res.status(200).json(data);
})


//(groupId: string) -> name & scores[]
app.get("/leaderboard", (req, res) => {
    const groupId = req.query.groupId;
    
})

// ---------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
    saveDb(true);
});

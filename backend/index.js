import { authUser, getDb, getNextId, getWinner, login, saveDb, signup } from "./database.js";
import express from "express";
import cors from "cors";
import multer from "multer";

const multUpload = multer({dest: "imgUploads/"});

const app = express();
app.use(cors());
app.use(express.static("imgUploads"));
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
        const userId = authUser(authToken);
        res.status(200).json({auth: authToken, userId: userId});
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
    if (typeof groupId === "number"){
        const db = getDb();
        const group = db.groups.find(group => group.id == groupId)
        const challenge = group.challenges[group.challenges.length - 1];

        res.status(200).json(challenge)
    }
    else{
        res.status(400).send("Invalid Input")
    }
});

app.get("/current-submission", (req, res) => {
    const userId = authUser(req.query.auth);
    const groupId = Number(req.query.groupId);
    const db = getDb();
    if (!(userId > 0)) {
        res.status(400).send("Not logged in");
        return;
    }
    if (!(groupId > 0)) {
        res.status(400).send("Invalid group id");
        return;
    }

    const group = db.groups.find(group => group.id === groupId);
    const challenge = group.challenges[group.challenges.length - 1];
    const submission = challenge.submissions.find(entry => entry.user_id === userId);

    res.json({image_name: submission ? submission.image_name : null});
})

// gets list of all past challenges for history page
app.get("/past-challenges", (req, res) => {
    const groupId = Number(req.query.groupId);
    if(typeof groupId == "number"){
        const db = getDb();
        const group = db.groups.find(group => group.id == groupId);
        const lastChallenge = group.challenges[group.Challenges.length - 1];
        const challenges = group.challenges
            .filter(challenge => challenge !== lastChallenge)
            .map(challenge => {
                const winner = getWinner(challenge);
                const winnerName = db.users.find(user => user.id === winner).name
                return {
                    id: challenge.id,
                    prompt: challenge.prompt,
                    start_date: challenge.start_date,
                    end_date: challenge.end_date,
                    winner: winnerName,
                }
            });

        res.status(200).json(challenges);
    } else {
        res.status(400).send("Invalid Input");
    }
});

// used for showing data for a challenge picked from challenge history
app.get("/past-challenge-result", (req, res) => {
    const groupId = Number(req.query.groupId);
    const challengeId = Number(req.query.challengeId);
    const db = getDb();

    if (!(groupId > 0) || !(challengeId > 0)) {
        res.status(400).send("Invalid input");
        return;
    }

    const challenge = db.groups
        .find(group => group.id === groupId)
        .challenges.find(challenge => challenge.id === challengeId);

    const submissions = challenge.submissions
        .sort((a, b) => a.votes - b.votes)
        .map(submission => {
            const userName = db.users.find(user => user.id === submission.user_id);
            return {
                name: userName,
                votes: submission.votes,
                image_name: submission.image_name
            }
        });

    const data = {
        prompt: challenge.prompt,
        start_date: challenge.start_date,
        end_date: challenge.end_date,
        submissions: submissions,
    };

    res.status(200).json(data);
});

//(auth: your token) -> group id & name & membercount[]
app.get("/my-groups", (req, res) => {
    const auth = req.query.auth;
    if(typeof auth != "string"){
        res.status(400).send("Invalid Input")
    }
    const userId = authUser(auth);

    if(!userId){
        res.status(400).send("Invalid Input");
        return;
    }

    const db = getDb();

    const data = db.groups
        .filter(group => group.member_ids.includes(userId))
        .map(group => ({
            id: group.id,
            name: group.name,
            memberCount: group.member_ids.length
        }));

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
    const data = db.groups
        .filter(group => !group.member_ids.includes(userId))
        .map(group => ({
            id: group.id,
            name: group.name,
            memberCount: group.member_ids.length,
        }));

    res.status(200).json(data);
});

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
    const groupId = Number(req.query.groupId);
    if(!(groupId > 0)) {
        res.status(400).send("Invalid Input");
        return;
    }

    const db = getDb();
    const challenges = db.groups.find(group => group.id === groupId).challenges;

    const wins = {};

    for (const challenge of challenges) {
        const winnerId = String(getWinner(challenge));
        if (winnerId in wins) {
            wins[winnerId] += 1;
        } else {
            wins[winnerId] = 1;
        }
    }

    const data = [];

    for (const [k, v] of Object.entries(wins)) {
        const name = db.users.find(user => user.id === Number(k));
        const score = v;
        data.push({name, score});
    }

    data.sort((a, b) => a.score - b.score);

    res.status(200).json(data);
});

app.get("/prompt-idea", (req, res) => {
    const options = [
        "Nicest looking stick",
        "Best home-cooked meal",
        "Best picture to use for an album cover",
        "A tragic situation",
        "Best place to relax",
        "Most perfectly captured sunset",
        "Most interesting looking cloud",
    ];
    const choice = options[Math.floor(Math.random() * options.length)];
    res.json({prompt: choice});
});

// -- img routes -------------------------------------

app.post("/challenge-submission", multUpload.single("file"), (req, res) => {
    console.log("Picture route hit");
    const db = getDb();
    const fileName = req.file.filename;
    const authToken = Number(req.query.auth);
    const groupId = Number(req.query.groupId);
    const userId = authUser(authToken);

    console.log("Saved file:", fileName);

    if (!(userId > 0)) {
        res.status(400).send("Not logged in");
        return;
    }
    if (!(groupId) > 0) {
        res.status(400).send("Invalid group id");
        return;
    }

    const group = db.groups.find(group => group.id === groupId);
    const challenge = group.challenges[group.challenges.length - 1];

    const existingEntry = challenge.submissions.find(submission => submission.user_id === userId);

    if (existingEntry) {
        existingEntry.image_name = fileName;
    } else {
        challenge.submissions.push({
            user_id: userId,
            votes: 0,
            image_name: fileName,
            id: getNextId(challenge.submissions),
        });
    }

    res.status(200).send("File uploaded");
})


//(groupId: string) -> name & picture & votes[3]
app.get("/challenge-result", (req, res) => {
    const groupId = Number(req.query.groupId);
    if(groupId <= 0){
        res.status(400).send("Invalid Input");
        return;
    }

    const db = getDb();
    const group = db.groups.find(group => group.id === groupId);
    const challenge = group.challenges[group.challenges.length-1];
    const votes = []
     for(let submission of challenge.submissions){
        votes.push(Number(submission.votes))
     }
     votes.sort(function(a, b){return b-a}).slice(0, 3);
     const data = []
     for(let vote of votes){
        for(let submission of challenge.submissions){
            if(submission.votes === vote){
                data.push({
                    id: submission.user_id,
                    picture: submission.image_name,
                    votes: vote
                })
            }
        }
     }

     res.status(200).json(data);

})

// -- fake post routes -------------------------------------------------

app.get("/post-new-group", (req, res) => {
    const auth = req.query.auth;
    const groupName = req.query.groupName;
    const initialPrompt = req.query.initialPrompt;
    const userId = authUser(auth);

    if (!userId) {
        res.status(400).send("Not logged in");
        return;
    }
    if (!typeof groupName === "string" || !typeof initialPrompt === "string") {
        res.status(400).send("Invalid input");
        return;
    }

    const db = getDb();
    const nextId = getNextId(db.groups);

    db.groups.push({
        name: groupName,
        location: "idk",
        id: nextId,
        member_ids: [userId],
        owner_id: userId,
        challenges: [{
            contributors: [],
            prompt: initialPrompt,
            start_date: Date.now(),
            end_date: Date.now() + 604800000,
            id: 1,
            submissions: [],
        }],
    });

    res.status(200).send("Success");
});

app.get("/post-new-prompt", (req, res) => {
    const db = getDb();
    const userId = Number(req.query.auth);
    const groupId = Number(req.query.groupId);
    const prompt = req.query.prompt;

    if (!(userId > 0)) {
        res.status(400).send("Not logged in");
        return;
    }
    if (!(groupId > 0)) {
        res.status(400).send("Invalid group id");
        return;
    }

    const group = db.groups.find(group => group.id === groupId);
    group.challenges.push({
        contributors: [],
        prompt: prompt,
        start_date: Date.now(),
        end_date: Date.now() + 604800000,
        id: getNextId(group.challenges),
        submissions: [],
    });
});

app.get("/post-cast-vote", (req, res) => {
    const db = getDb();
    const userId = Number(req.query.auth);
    const groupId = Number(req.query.groupId);
    const submissionIds = req.query.submissionIds;

    if (!(userId > 0)) {
        res.status(400).send("Not logged in");
        return;
    }
    if (!(groupId > 0)) {
        res.status(400).send("Invalid groupId");
        return;
    }

    const group = db.groups.find(group => group.id === groupId);
    const challenge = group.challenges[group.challenges.length - 1];

    for (const submissionId of submissionIds) {
        const submission = challenge.submissions.find(s => s.id === submissionId);
        submission.votes += 1;
        challenge.contributors.append(userId);
    }

    res.status(200).send("All good");
});

// used for joining on a link, this endpoint does not create a link
app.get("/post-use-join-link", (req, res) => {
    const db = getDb();
    const userId = Number(req.query.auth);
    const groupId = Number(req.query.groupId);

    if (!(userId > 0)) {
        res.status(400).send("Not logged in");
        return;
    }

    if (!(groupId > 0)) {
        res.status(400).send("Invalid groupId");
        return;
    }

    const group = db.groups.find(group => group.id === groupId);
    if (group.member_ids.includes(userId)) {
        res.status(208).send("Already a member");
    } else {
        group.member_ids.push(userId);
        res.status(200).send("Joined group");
    }
});

// ---------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
    saveDb(true);
});

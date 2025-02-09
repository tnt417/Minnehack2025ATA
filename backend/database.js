import fs from "node:fs";

let DbObject = null;

// contains map from auth token to {id, email, password}
let SessionStore = {};

// gets current db in memory, creates it if it doesn't exist yet
export function getDb() {
    if (DbObject) {
        return DbObject
    } else {
        try {
            const data = fs.readFileSync("db.json");
            DbObject = JSON.parse(data.toString());
            return DbObject;
        } catch (err) {
            console.error(`Error getting db: ${err}`);
            process.exit(1);
        }
    }
}

// saves current db in memory
export function saveDb(exitAfterSaving) {
    const jsonString = JSON.stringify(getDb(), null, 2);
    fs.writeFile("db.json", jsonString, err => {
        if (err) {
            console.error(`Error saving data: ${err}`);
            process.exit(1);
        }
        console.log("Database written successfully");

        if(exitAfterSaving)
        {
            process.exit();
        }
    });
}

// returns userId on success, null on failure
export function signup(email, password, name) {
    for (const user of Object.values(getDb())) {
        if (user.email === email) {
            return null; // email already used
        }
    }
    const userId = getNextId(getDb().users);
    getDb().users.push({
        name: name,
        email: email,
        password: password,
        id: userId,
    });
    return userId;
}

// returns auth token on success, null on failure
export function login(email, password) {
    for (const entry of Object.values(SessionStore)) {
        if (entry.email === email) {
            console.log("Already logged in");
            return null;
        }
    }
    for (const user of Object.values(getDb().users)) {
        console.log(`Checking ${user.email} with ${email} and ${user.password} with ${password}`)
        if (user.email === email && user.password === password) {
            const userId = user.id;
            const token = Math.floor(Math.random() * 100000000).toString();
            console.log(`Logging in with ${token}`);
            SessionStore[token] = {
                id: userId,
                email: email,
                password: password,
            };
            return token;
        }
    }
    console.log("No user found");
    return null;
}

// returns 1 on success, null on failure
export function logout(userId) {
    for (const key of Object.keys(SessionStore)) {
        const session = SessionStore[key];
        if (session.id === userId) {
            delete SessionStore[key];
            return 1;
        }
    }
    return null;
}

// takes auth token, returns user id if valid, returns null if invalid
export function authUser(authToken) {
    const user = SessionStore[authToken];
    if (user) {
        return user.id;
    } else {
        return null;
    }
}

// -- internal functions --------------------------

function getNextId(arr) {
    let highestId = 0;
    for (const obj of arr) {
        highestId = Math.max(highestId, obj.id);
    }
    return highestId + 1;
}

// takes in challenge, returns id of user with highest votes
function getWinner(challenge) {
    data = []
    const submissions = challenge.submissions;
    max_id = challenge.submissions[0].user_id;
    max_votes = challenges.submissions[0].votes;
    for(let i = 0; i < challenge.submissions.length; i++){
        if(challenge.submissions[i].votes > max_votes){
            max_votes = challenge.submissions[i].votes;
            max_id = challenge.submissions[i].user_id;
        }
    }

    return max_id;
}
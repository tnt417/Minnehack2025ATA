import fs from "node:fs";

export function getDb() {
    try {
        const data = fs.readFileSync("db.json");
        const dbObject = JSON.parse(data.toString());
        return dbObject;
    } catch (err) {
        console.error(`Error getting db: ${err}`);
        process.exit(1);
    }
}

export function saveDb(db) {
    if (!typeof db === "object") {
        console.error("ERR: passed non-object data to saveDb");
        process.exit(1);
    }
    const jsonString = JSON.stringify(db, null, 2);
    fs.writeFile("db.json", jsonString, err => {
        if (err) {
            console.error(`Error saving data: ${err}`);
            process.exit(1);
        }
    });
    console.log("Database written successfully");
}

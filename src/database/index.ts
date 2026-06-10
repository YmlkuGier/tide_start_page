import Dexie from "dexie";

const db = new Dexie("TideStartPage");

db.version(1).stores({
    searchHistory: "++id"
});

export { db };

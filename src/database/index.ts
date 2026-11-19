import Dexie from "dexie";

// 创建本地数据库
const db = new Dexie("TideStartPage");

db.version(1).stores({
    searchHistory: "++id",
    tabBar: "++id"
});

export { db };

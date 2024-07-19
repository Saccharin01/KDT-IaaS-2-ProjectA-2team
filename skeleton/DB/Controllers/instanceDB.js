const MongoDB = require("../modules/MongoDB/mongoDB.js");
const dotenv = require('dotenv');
const schemaObj = require("../static/schemaSetting.js");

dotenv.config();

const DB_SERVER = process.env.DB_SERVER || "mongodb://localhost:27017/ERP"

async function initializeDB() {
  const db = new MongoDB(DB_SERVER);
  await db.Connect();

  for (const obj in schemaObj) {
    db.InsertSchema(obj, schemaObj[obj]);
  }

  return db;
}

module.exports = initializeDB();
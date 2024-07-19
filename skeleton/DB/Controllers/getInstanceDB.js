// dbInstance.js
const initializeDB = require('./instanceDB');

let dbInstance = null;

async function getDBInstance() {
  if (!dbInstance) {
    dbInstance = await initializeDB();
  }
  return dbInstance;
}

module.exports = getDBInstance;
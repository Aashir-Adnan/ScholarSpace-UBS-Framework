const db = require('./databaseAbstraction');

let pool;

const projectDB = async () => {
  if (!db.initialized) {
    db.initialize();
  }
  if (!pool) {
    pool = db.createPool('main');
  }
  const connection = await db.getConnection(pool);
  return connection;
};

const closePool = async () => {
  await db.closePool(pool);
}

module.exports = {projectDB, closePool};

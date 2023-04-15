const pool = require("./pool");
pool.on("connect", () => {
  console.log("connected to db");
});
function poolQuery(query) {
  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
function createUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS users (username Varchar(30) PRIMARY KEY,  is_active Boolean,type VARCHAR(1), user_id Varchar(30))
    `;
  poolQuery(query);
}

const dropUserTable = () => {
  const query = "drop table if exists users";
  poolQuery(query);
};

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};

pool.on("remove", () => {
  console.log("dced");
  process.exit(0);
});

module.exports = {
  createAllTables,
  dropAllTables,
};

require("make-runnable/custom")({
  printOutputFrame: false,
});

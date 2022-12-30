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
function createInstitutionTable() {
  const query = `CREATE TABLE IF NOT EXISTS institution
    (id SERIAL PRIMARY KEY, 
      kode_sekolah VARCHAR(15) NOT NULL, 
    nama VARCHAR(30) UNIQUE NOT NULL , 
    tipe VARCHAR(40) NOT NULL, 
    alamat VARCHAR(40) NOT NULL, 
    kab_kota VARCHAR(15) NOT NULL, 
    provinsi VARCHAR(15) NOT NULL, 
    kecamatan VARCHAR(15) NOT NULL, 
    kelurahan VARCHAR(15) NOT NULL, 
    no_telp VARCHAR(15) NOT NULL
    )
    `;
  poolQuery(query);
}
function createFacultiesTable() {
  const query = `CREATE TABLE IF NOT EXISTS faculties
    (id SERIAL PRIMARY KEY, 
      id_institusi VARCHAR(15) NOT NULL, 
      nama_fakultas VARCHAR(30) UNIQUE NOT NULL , 
      email_fakultas VARCHAR(40) NOT NULL, 
    )
    `;
  poolQuery(query);
}
function createMajorinstitutionTable() {
  const query = `CREATE TABLE IF NOT EXISTS majors
    (id SERIAL PRIMARY KEY, 
      id_institusi VARCHAR(15) NOT NULL, 
      id_fakultas VARCHAR(30) UNIQUE NOT NULL , 
      nama_prodi VARCHAR(40) NOT NULL, 
      email_prodi VARCHAR(15) NOT NULL, 
    )
    `;
  poolQuery(query);
}

const dropInstitutionTable = () => {
  const query = "drop table if exists institution";
  poolQuery(query);
};
const dropFacultiesTable = () => {
  const query = "drop table if exists faculties";
  poolQuery(query);
};
const dropMajorTable = () => {
  const query = "drop table if exists majors";
  poolQuery(query);
};

const createAllTables = () => {
  createInstitutionTable();
  createFacultiesTable();
  createMajorinstitutionTable();
};

const dropAllTables = () => {
  dropInstitutionTable();
  dropFacultiesTable();
  dropMajorTable();
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

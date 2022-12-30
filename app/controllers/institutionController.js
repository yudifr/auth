//todo refactor from institution lumen
const db = require("../database/pool");
const response = require("../helper/responses");
exports.getInstitution = async (req, res) => {
  var query = "select * from institution  ";
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, error, res);
  }
};

exports.getInstitutionId = async (req, res) => {
  var query = "select * from institution where id = " + req.params.id;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no data", res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.getInstitutionIdByName = async (req, res) => {
  var query =
    "select id from institution where nama = '" + req.params.name + "'";
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no data", res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};

exports.newInstitution = async (req, res) => {
  const {
    jenis,
    nama,
    alamat,
    provinsi,
    kab_kota,
    kecamatan,
    kelurahan,
    no_telp,
  } = req.body;
  var query = `
        INSERT INTO institution
        (jenis,
            nama,
            alamat,
            provinsi,
            kab_kota,
            kecamatan,
            kelurahan,
            no_telp) VALUES(
            '${jenis}','${nama}','${alamat}','${provinsi}','${kab_kota}','${kecamatan}','${kelurahan}','${no_telp}'
              )
              RETURNING id
        `;
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
    // console.log(error)
  }
};
exports.newFaculty = async (req, res) => {
  const { id_institusi, nama_fakultas, email_fakultas } = req.body;
  var query = `
        INSERT INTO faculties
        (id_institusi,
          nama_fakultas,
          email_fakultas) VALUES(
            '${id_institusi}','${nama_fakultas}','${email_fakultas}'
              )
              RETURNING id
        `;
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
    // console.log(error)
  }
};
exports.newMajor = async (req, res) => {
  const { id_institusi, id_fakultas, nama_prodi, email_prodi } = req.body;
  var query = `
        INSERT INTO majors
        (id_institusi,id_fakultas,
          nama_prodi,
          email_prodi) VALUES(
            '${id_institusi}','${id_fakultas}','${nama_prodi}','${email_prodi}'
              )
              RETURNING id
        `;
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
    // console.log(error)
  }
};
exports.updateInstitution = async (req, res) => {
  const { jenis, nama, alamat, kab_kota, provinsi, email, no_telp } = req.body;
  const id = req.params.id;
  var query = `
        UPDATE institution SET
        jenis = '${jenis}',
        nama = '${nama}',
        alamat = '${alamat}',
        kab_kota = '${kab_kota}',
        provinsi = '${provinsi}',
        email = '${email}',
        no_telp = '${no_telp}'
        WHERE id = ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
    // console.log(error);
  }
};

exports.deleteInstitution = async (req, res) => {
  const id = req.params.id;
  var query = `
        delete from institution 
        WHERE id= ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};

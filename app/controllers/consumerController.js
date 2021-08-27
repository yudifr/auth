const db = require('../database/pool');
const response = require('../helper/responses');
exports.getConsumer = (async (req, res) => {
    var query = "select * from consumer  ";
    try {
        const result = await db.query(query);
        return response.ok('ok', result.rows, res);
    } catch (error) {
        return response.badRequest(error, error, res);
    }
});

exports.getConsumerId = (async (req, res) => {
    var query = "select * from consumer where id = " + req.params.id;
    try {
        const result = await db.query(query);
        if (result.rowCount == 0) {
            return response.badRequest('no data', res)
        }
        return response.ok('ok', result.rows, res);

    } catch (error) {
        return response.badRequest(error, res);
    }
});


exports.newConsumer = (async (req, res) => {
    const {
        jenis,
        nama,
        alamat,
        kab_kota,
        provinsi,
        email,
        no_telp
    } = req.body;
    var query = `
        INSERT INTO consumer
        (jenis,
            nama,
            alamat,
            kab_kota,
            provinsi,
            email,
            no_telp) VALUES(
            '${jenis}','${nama}','${alamat}','${kab_kota}','${provinsi}','${email}','${no_telp}'
              )
        `;
    try {
        const result = await db.query(query);
        return response.ok('ok', 'data created', res);
    } catch (error) {
        return response.badRequest(error, res);
        // console.log(error)
    }
});



exports.updateConsumer = (async (req, res) => {
    const {
        
        jenis,
        nama,
        alamat,
        kab_kota,
        provinsi,
        email,
        no_telp
    } = req.body;
    const id = req.params.id;
    var query = `
        UPDATE consumer SET
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
            return response.badRequest('no related data', res)
        }
        return response.ok('ok', result, res);
    } catch (error) {
        return response.badRequest(error, res);
        // console.log(error);
    }
});

exports.deleteConsumer = (async (req, res) => {
    
    const id = req.params.id;
    var query = `
        delete from consumer 
        WHERE id= ${id}
        `;
    try {
        const result = await db.query(query);
        if (result.rowCount == 0) {
            return response.badRequest('no related data', res)
        }
        return response.ok('ok', result, res);
    } catch (error) {
        return response.badRequest(error, res);
    }
});

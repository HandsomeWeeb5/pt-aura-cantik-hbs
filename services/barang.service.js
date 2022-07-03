const dbconfig = require('../config/db.config');
const mysql = require('mysql2');

let sql = `SELECT  b.id_barang,  b.deskripsi_brg,  d.tgl_pemasukan,  j.jenis_barang,  b.waktu,  d.no_dokumen_bc,  b.merek_brg,  b.harga_per_unit,  b.vendor_item,  b.hs_code,  b.barcode_brg,  b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang;`

const database = mysql.createConnection(dbconfig);
database.connect((err) => {
    if (err) throw err;
    console.log("Database Terkoneksi");
})

const getDataBarang = () => {
    return new Promise(async (resolve, reject) => {
        database.query(sql, (err, results) => {
            if (err) throw err;
            resolve(results);
        })
    })
}

module.exports = {
    getDataBarang: getDataBarang
}


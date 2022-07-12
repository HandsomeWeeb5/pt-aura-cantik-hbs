const dbconfig = require('../config/db.config');
const mysql = require('mysql2');
 
let sql__viewAll = `SELECT  b.id_barang,  
    b.deskripsi_brg,  
    DATE_FORMAT(CONVERT_TZ(d.tgl_pemasukan, '+00:00', '+07:00'), "%d-%M-%Y") AS tgl_pemasukan,  
    j.jenis_barang,  
    b.waktu,  
    d.no_dokumen_bc,  
    b.merek_brg,  
    b.harga_per_unit,  
    b.vendor_item,  
    b.hs_code,  
    b.barcode_brg,  
    b.img_barang 
    FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) 
        JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang;`;

let sql__countAllPrice = `
    SELECT SUM(harga_per_unit) AS total_harga FROM tb_barang; 
`;

let sql__countAllItem = `
    SELECT COUNT(*) AS total_item FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang; 
`;

let sql__viewByFilter = `
    SELECT b.id_barang, b.deskripsi_brg, DATE_FORMAT(CONVERT_TZ(d.tgl_pemasukan, '+00:00', '+07:00'), "%d-%M-%Y") AS tgl_pemasukan, j.jenis_barang, b.waktu, d.no_dokumen_bc, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) WHERE d.tgl_pemasukan = ? OR d.no_dokumen_bc = ? OR b.waktu = ? OR b.merek_brg = ? OR b.harga_per_unit = ? OR j.jenis_barang = ? ORDER BY b.id_barang; 
`;

//TODO CALL ubahBarang: 
// 1(?) => id_barang;
// 2(?) => deskripsi_brg;
// 3(?) => no_dokumen_bc;
// 4(?) => nomor_jenis_barang (1 ~ 4);
// 5(?) => merek_barang;
// 6(?) => harga_per_unit;
// 7(?) => vendor_item;
// 8(?) => hs_code;
// 9(?) => barcode_barang;
// 10(?) => gambar_barang;

let sql__deleteById = `CALL hapusBarang(?)`;

let sql__insertItem = `CALL tambahkanBarang(?)`;

let sql__deleteItem = `CALL hapusBarang(?)`;

const database = mysql.createConnection(dbconfig);
database.connect((err) => {
    if (err) throw err;
    console.log("Database Terkoneksi");
});


//*==== HANYA UNTUK DEVELOPMENT SAJA ===== *
const getDataBarang = () => {
    return new Promise(async (resolve, reject) => {
        database.query(sql__viewAll, (err, results) => {
            if (err) throw err;
            //console.log(results);
            resolve(results);
        })
    })
}

const totalHargaDataBarang = () => {
    return new Promise(async (resolve, reject) => {
        database.query(sql__countAllPrice, (err, results) => {
            if (err) throw err;
            resolve(results);
        })
    })
}

const getDataByFilter = (tgl_pemasukan, no_dokumen_bc, waktu, merek_brg, harga_per_unit, jenis_barang) => {  
    return new Promise(async (resolve, reject) => {
        database.query(sql__viewByFilter, [tgl_pemasukan, no_dokumen_bc, waktu, merek_brg, harga_per_unit, jenis_barang], (err, results) => {
            if (err) throw err;
            resolve(results);
        });
    })
}

const countAllItem_in_Table = () => {
    return new Promise(async (resolve, reject) => {
        database.query(sql__countAllItem, (err, results) => {
            if (err) throw err;
            resolve(results);
        });
    });
};

const addNewData = (
    deskripsi_brg,
    no_dokumen_bc,
    jenis_barang,
    merek_barang,
    harga_per_unit,
    vendor_item,
    hs_code,
    barcode_barang,
    img_barang
) => {
    let data = [
        deskripsi_brg,
        no_dokumen_bc,
        jenis_barang,
        merek_barang,
        harga_per_unit,
        vendor_item,
        hs_code,
        barcode_barang,
        img_barang
    ];
    return new Promise(async (resolve, reject) => {
        database.query(sql__insertItem, [ data ], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}; 

module.exports = {
    //getDataPerPage: getDataPerPage,
    getDataByFilter: getDataByFilter,
    getDataBarang: getDataBarang,
    addNewData: addNewData,
    totalHargaDataBarang: totalHargaDataBarang,
    countAllItem_in_Table: countAllItem_in_Table
}

/*
const getDataPerPage = (limit, offset) => {
    return new Promise(async (resolve, reject) => {
        database.query(`
                SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, d.no_dokumen_bc, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) ORDER BY b.id_barang LIMIT ${limit} OFFSET ${offset}; 
                `, (err, results) => {
                    if (err) throw err;
                    if (typeof limit === "string" && typeof offset === "string"){
                        reject(console.log("Input LIMIT & OFFSET must Number"));
                    } else {
                        resolve(results);
                    }
                });
    })
}
*/


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

let sql__viewByDeskripsiBarang = `
SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, d.no_dokumen_bc, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) WHERE b.deskripsi_brg LIKE "%duk%" ORDER BY b.id_barang; 
`

let sql__viewDataCart = `SELECT 
    id_keranjang,
    deskripsi_barang,
    DATE_FORMAT(CONVERT_TZ(tgl_pemasukan, '+00:00', '+07:00'), "%d-%M-%Y") AS tgl_pemasukan,
    jenis_barang,
    merek_barang,
    no_dokumen_bc,
    barcode_barang,
    harga_per_unit
    FROM tb_keranjang`;

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

let sql__insertItem = `CALL tambahkanBarang(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

const getDataByDeskripsiBarang = (keyword) => {
    return new Promise(async (resolve, reject) => {
        database.query(`
        SELECT b.id_barang, b.deskripsi_brg, d.tgl_pemasukan, j.jenis_barang, b.waktu, d.no_dokumen_bc, b.merek_brg, b.harga_per_unit, b.vendor_item, b.hs_code, b.barcode_brg, b.img_barang FROM tb_barang AS b JOIN tb_dokumen AS d ON (b.id_dokumen = d.id_dokumen) JOIN tb_jenis_barang AS j ON (b.id_jenis_brg = j.id_jenis_brg) WHERE b.deskripsi_brg LIKE "%${keyword}%" ORDER BY b.id_barang; 
        `, (err, results) => {
            if (err) throw err;
            resolve(results);
        });
    })
}

const getDataByFilter = (filterData) => {  
    
    let dataArray = Object.keys(filterData).map((key) => {
        return filterData[key];
    });

    return new Promise(async (resolve, reject) => {
        database.query(sql__viewByFilter, dataArray, (err, results) => {
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

const addNewData = (formData) => {

    let dataArray = Object.keys(formData).map((key) => {
        return formData[key];
    });

    return new Promise(async (resolve, reject) => {
        database.query(sql__insertItem, dataArray, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}; 

const deleteMultipleData = (arrayString) => {
    return new Promise(async (resolve, reject) => {
        database.query(`CALL hapusBarangBarang('${arrayString}')`, (err, result) => {
            if (err) throw err;
            resolve(result)
        });
    })
}

const copyDataToDeliveryCart = (arrayString) => {
    return new Promise(async (resolve, reject) => {
        database.query(`CALL kirimBarang('${arrayString}')`, (err, result) => {
            if (err) throw err;
            if(result){
                resolve(result)
            } else {
                reject("Pengiriman Data Gagal");
            }
        });
    })
}

const getDataFromCart = () => {
    return new Promise(async (resolve, reject) => {
        database.query(sql__viewDataCart, (err, result) => {
            if(err) throw err;
            resolve(result);
        });
    })
}

const countAllItem_in_Cart = () => {
    return new Promise(async (resolve, reject) => {
        database.query('SELECT SUM(harga_per_unit) AS total_harga FROM tb_keranjang;', (err, result) => {
            if(err) throw err;
            resolve(result);
        });
    })
};

module.exports = {
    //getDataPerPage: getDataPerPage,
    //TODO DB Services for Pemasukan
    getDataByDeskripsiBarang: getDataByDeskripsiBarang,
    getDataByFilter: getDataByFilter,
    getDataBarang: getDataBarang,
    addNewData: addNewData,
    copyDataToDeliveryCart: copyDataToDeliveryCart,
    deleteMultipleData: deleteMultipleData,
    totalHargaDataBarang: totalHargaDataBarang,
    countAllItem_in_Table: countAllItem_in_Table,
    //TODO Services for Pengeluaran
    getDataFromCart: getDataFromCart,
    countAllItem_in_Cart: countAllItem_in_Cart
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


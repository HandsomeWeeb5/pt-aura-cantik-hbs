const barangService = require('../services/barang.service');

// Import all result from database

const viewDataPerPage = async(req, res) => {
    // let totalItem = await barangService.countAllItem_in_Table();
    let results = await barangService.getDataBarang();
    let total_item = results.length;
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;
    
    res.render('pemasukan', {
        layout: 'index', 
        data: { 
            results,
            total_item,
            total_harga
        }
    });

}

const searchByFilter = async(req, res) => {
    /*
    let results = await barangService.getDataBarang();
    const filters = req.query;
    const filteredItems = results.filter(item => {
        let isValid = true;
        for (key in filters) {
            console.log(key, item[key], filters[key]);
            isValid = isValid && item[key] == filters[key];
        }
        return isValid;
    });
    res.json(filteredItems);
    */
    let tgl_pemasukan = req.body.tgl_pemasukan;
    let no_dokumen_bc = req.body.no_dokumen_bc;
    let waktu = req.body.waktu;
    let merek_brg = req.body.merek_brg;
    let harga_per_unit = req.body.harga_per_unit;
    let jenis_barang = req.body.jenis_barang;


    let results = await barangService.getDataByFilter(tgl_pemasukan, no_dokumen_bc, waktu, merek_brg, harga_per_unit, jenis_barang);
    
    let sumAll = await barangService.countAllItem_in_Table();
    let total_item = sumAll[0].total_item
    
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;

    res.render('pemasukan', {
        layout: 'index',
        data: {
            results,
            total_harga,
            total_item
        }
    })
}

const createNewData = async(req, res, next) => {
    //req.body.img_barang => req.files
    /*
    let deskripsi_brg = req.body.deskripsi_brg;
    let no_dokumen_bc = req.body.no_dokumen_bc;
    let jenis_barang = req.body.jenis_barang;
    let merek_brg = req.body.merek_brg;
    let harga_per_unit = req.body.harga_per_unit;
    let vendor_item = req.body.vendor_item;
    let hs_code = req.body.hs_code;
    let barcode_brg = req.body.barcode_brg;
    let img_barang = req.file.filename;
    */
    let formData = {
        deskripsi_brg: req.body.deskripsi_brg,
        no_dokumen_bc: req.body.no_dokumen_bc,
        jenis_barang: req.body.jenis_barang,
        merek_brg: req.body.merek_brg,
        harga_per_unit: req.body.harga_per_unit,
        vendor_item: req.body.vendor_item,
        hs_code: req.body.hs_code,
        barcode_brg: req.body.barcode_brg,
        img_barang: req.file ? req.file.filename : ""
    }

    try{
       //* Upload both Image and datafrom Form AJAX
        await barangService.addNewData(formData)
        console.log("Penambahan Data ke dalam table sukses");
    } catch (err) {
        throw err;
    } finally {
        res.redirect('/');
    }
    

};

module.exports = {
    viewDataPerPage: viewDataPerPage,
    searchByFilter: searchByFilter,
    createNewData: createNewData
}

/*
router.get("/api/barang", connectDB.query(sql, (err, results) => {
    if (err) throw err;
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let entry = {};
    if(endIndex < results.length){
        entry.next = {
            page: page + 1,
            limit: limit
        };
    };
    if(startIndex > 0){
        entry.previous = {
            page: page - 1,
            limit: limit
        };
    }
    entry.entries = results.slice(startIndex, endIndex);
    res.json(entry);
}))

*/
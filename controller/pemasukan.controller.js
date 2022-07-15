// Import database services modules
const barangService = require('../services/barang.service');

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

    let filterData = {
        tgl_pemasukan: req.body.tgl_pemasukan,
        no_dokumen_bc: req.body.no_dokumen_bc,
        waktu: req.body.waktu,
        merek_brg: req.body.merek_brg,
        harga_per_unit: req.body.harga_per_unit,
        jenis_barang: req.body.jenis_barang
    };
    
    // let results = await barangService.getDataByFilter(tgl_pemasukan, no_dokumen_bc, waktu, merek_brg, harga_per_unit, jenis_barang);

    let results = await barangService.getDataByFilter(filterData);
    
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

const deleteSelectedRowById = async(req, res) => {
    //* Request id_barang's array into server
    let dataObj = req.body.dataArr; //? ==> BUG: req.body.dataArr = ['12', '12'] (Data from Hapus Btn duplicate result)
    // let id = [];
    let arr = [];
    dataObj.map((value) => arr.push(value.id_barang));

    try{
        await barangService.deleteMultipleData(arr);
        console.log("Penghapusan Data-data sukses");
        // console.log("Penambahan data sukses"); 
        //console.log(arr);
        res.redirect('/');
    } catch (err) {
        console.log("Penghapusan Data Gagal");
        throw err;
    }
    
};

const deleteById = async(req, res) => {
    let id = req.params.id;

    try {
        const result = await barangService.deleteDataById(id);
        if(result){
            res.json({ success: true, message: "Penghapusan Sukses" });
        }
    } catch (err){
        console.log("Penghapusan Gagal");
        throw err;
    } finally {
        res.redirect('/');
    }
}

module.exports = {
    viewDataPerPage: viewDataPerPage,
    searchByFilter: searchByFilter,
    createNewData: createNewData,
    deleteSelectedRowById: deleteSelectedRowById,
    deleteById: deleteById
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
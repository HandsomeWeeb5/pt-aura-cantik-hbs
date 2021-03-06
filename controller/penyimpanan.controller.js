// Import database services modules
const barangService = require('../services/barang.service');

const viewDataBarang = async(req, res) => {
    let results = await barangService.getDataBarang();
    let total_item = results.length;
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;
    
    res.render('penyimpanan', {
        layout: 'index', 
        data: { 
            results,
            total_item,
            total_harga
        }
    });

}

const searchByDeskripsiBarang = async(req, res) => {
    let keyword = req.query.search_bar;

    let sumAll = await barangService.countAllItem_in_Table();
    let total_item = sumAll[0].total_item
    
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;

    let results = await barangService.getDataByDeskripsiBarang(keyword);

    res.render('penyimpanan', {
        layout: 'index',
        data: {
            results,
            total_item,
            total_harga
        }
    })
    /*
    res.json({data: {
        results,
        total_item,
        total_harga
    }})
    */
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

    let results = await barangService.getDataByFilter(filterData);
    
    let sumAll = await barangService.countAllItem_in_Table();
    let total_item = sumAll[0].total_item
    
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;

    res.render('penyimpanan', {
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
    let dataObj = req.body.dataArr;
    let arrayString = dataObj.toString();

    try{
        await barangService.deleteMultipleData(arrayString);
        console.log("Penghapusan Data-data sukses");
        // res.json({ success: true });
    } catch (err) {
        console.log("Penghapusan Data Gagal");
        throw err;
    }
    
};

const copySelectedRowToCart = async(req, res) => {
    //* Request id_barang's array into server
    let dataObj = req.body.dataArr;
    let arrayString = dataObj.toString();

    try{
        // console.log(arrayString);
        await barangService.copyDataToDeliveryCart(arrayString);
        console.log("Pengiriman Data-data sukses");
    } catch (err) {
        console.log("Pengiriman Data Sukses");
        throw err;
    }
}

module.exports = {
    viewDataBarang: viewDataBarang,
    searchByDeskripsiBarang: searchByDeskripsiBarang,
    searchByFilter: searchByFilter,
    createNewData: createNewData,
    deleteSelectedRowById: deleteSelectedRowById,
    copySelectedRowToCart: copySelectedRowToCart
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
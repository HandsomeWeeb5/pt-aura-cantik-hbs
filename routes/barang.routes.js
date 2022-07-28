const express = require('express');
const router = express.Router();
const penyimpanan = require('../controller/penyimpanan.controller');
const pencetakan = require('../controller/pencetakan.controller');
const { uploadImage, uploadPDF } = require('../middleware/multer/storage');

const initBarangRoutes = (app) => {
    //TODO Pemasukan Routes
    // URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
    router.get("/", penyimpanan.viewDataBarang);
    router.get("/search", penyimpanan.searchByDeskripsiBarang);
    router.post("/filter", penyimpanan.searchByFilter);
    router.post("/create", uploadImage.single('img_barang'), penyimpanan.createNewData);
    router.post("/delete", penyimpanan.deleteSelectedRowById);
    router.post("/send", penyimpanan.copySelectedRowToCart);
    
    //TODO Pengeluaran Routes
    router.get("/pencetakan", pencetakan.viewDataCartTable);
    // router.get("/api/pengeluaran", pengeluaran.viewDataCartTable);
    // router.get("/api/", penyimpanan.searchByDeskripsiBarang);

    return app.use("/", router);
};

/*
app.get('/pengeluaran', (req, res) => {
    res.render('pengeluaran', {layout: 'index'})
});
*/

module.exports = initBarangRoutes;

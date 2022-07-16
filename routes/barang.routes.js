const express = require('express');
const app = express();
const router = express.Router();
const pemasukan = require('../controller/pemasukan.controller');
const pengeluaran = require('../controller/pengeluaran.controller');
const { uploadImage, uploadPDF } = require('../middleware/multer/storage');
const multer = require('multer');

const initBarangRoutes = (app) => {
    //TODO Pemasukan Routes
    // URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
    router.get("/", pemasukan.viewDataPerPage);
    router.post("/filter", pemasukan.searchByFilter);
    router.post("/create", uploadImage.single('img_barang'), pemasukan.createNewData);
    router.post("/delete", pemasukan.deleteSelectedRowById);
    router.post("/send", pemasukan.copySelectedRowToCart);
    
    //TODO Pengeluaran Routes
    router.get("/pengeluaran", pengeluaran.viewDataCartTable);

    return app.use("/", router);
};

/*
app.get('/pengeluaran', (req, res) => {
    res.render('pengeluaran', {layout: 'index'})
});
*/

module.exports = initBarangRoutes;

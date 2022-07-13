const express = require('express');
const app = express();
const router = express.Router();
const pemasukan = require('../controller/pemasukan.controller');
const { uploadImage, uploadPDF } = require('../middleware/multer/storage');
const multer = require('multer');

const initBarangRoutes = (app) => {
    // URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
    router.get("/", pemasukan.viewDataPerPage);
    router.post("/filter", pemasukan.searchByFilter);
    router.post("/create", uploadImage.single('img_barang'), pemasukan.createNewData);
    // router.delete("/delete", pemasukan.removeDataByIDs)

    return app.use("/", router);
};

module.exports = initBarangRoutes;

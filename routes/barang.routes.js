const express = require('express');
const app = express();
const router = express.Router();
const pemasukan = require('../controller/pemasukan.controller');
const Multer = require('../middleware/multer/storage_multer');

const initBarangRoutes = (app) => {
    // URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
    router.get("/", pemasukan.viewDataPerPage);
    router.post("/filter", pemasukan.searchByFilter);
    //router.post("/create", Multer.uploadImage, pemasukan.createNewData);

    return app.use("/", router);
};

module.exports = initBarangRoutes;

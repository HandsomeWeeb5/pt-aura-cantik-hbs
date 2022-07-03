const express = require('express');
const app = express();
const router = express.Router();
const pemasukan = require('../controller/pemasukan.controller');

const initBarangRoutes = (app) => {
    // URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
    router.get("/api/barang", pemasukan.viewDataPerPage);

    return app.use("/", router);
};

module.exports = initBarangRoutes;

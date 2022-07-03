const express = require('express');
const barangService = require('../services/barang.service');

const viewDataPerPage = async(req, res) => {
    let results = await barangService.getDataBarang();
    
    /*
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
    */

    res.render('pemasukan', {layout: 'index', data: results});
    // res.json(entry);
    // res.json(results);
}

module.exports = {
    viewDataPerPage: viewDataPerPage
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
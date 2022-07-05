const express = require('express');
const barangService = require('../services/barang.service');

// Import all result from database


const viewDataPerPage = async(req, res) => {
    let rows = await barangService.getDataBarang();
    let totalItem = rows.length;
    if(totalItem === undefined){
        totalItem = 0;
    }
    let totalPrice = await barangService.totalHargaDataBarang();
    let total_harga = totalPrice[0].total_harga;

    let limit = 10;

    res.render('pemasukan', {
        layout: 'index', 
        data: { 
            rows,
            totalItem,
            total_harga
        },
        pagination: {
            page: req.query.page || 1,
            pageCount: Math.ceil(totalItem/limit)
        }
    });

    /*
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {};
    if(endIndex < rows.length){
        results.next = {
            page: page + 1,
            limit: limit
        };
    };
    if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    results.result = rows.slice(startIndex, endIndex);
    results.totalPrice = total_harga;
    */

    
    //res.json(results);
    
    /*
    res.json({data: {
        results,
        totalItem,
        totalPrice
    }});
    */
}

const searchByDescription = async(req, res) => {
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
}

module.exports = {
    viewDataPerPage: viewDataPerPage,
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
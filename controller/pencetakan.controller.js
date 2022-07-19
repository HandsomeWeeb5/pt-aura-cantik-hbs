const barangService = require('../services/barang.service');

const viewDataCartTable = async(req, res) => {
    let results = await barangService.getDataFromCart();
    let totalPrice = await barangService.countAllItem_in_Cart();
    let total_harga = totalPrice[0].total_harga;

    try {
        res.render('pencetakan', {
            layout: 'index',
            data: {
                results,
                total_harga
            }
        });
        // res.status(200).json({ data: results, totalPrice });
    } catch (error) {
        console.log("Penampilan Data Keranjang Gagal");
        throw error;
    }
};

module.exports = {
    viewDataCartTable: viewDataCartTable
}
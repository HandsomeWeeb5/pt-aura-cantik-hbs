const barangService = require('../services/barang.service');

const viewDataCartTable = async(req, res) => {
    let results = await barangService.getDataFromCart();
    let totalPrice = await barangService.countAllItem_in_Cart();
    let total_harga = totalPrice[0].total_harga;

    try {
        res.render('pengeluaran', {
            layout: 'index',
            data: {
                results,
                total_harga
            }
        });
    } catch (error) {
        console.log("Penampilan Data Keranjang Gagal");
        throw error;
    }
};

module.exports = {
    viewDataCartTable: viewDataCartTable
}
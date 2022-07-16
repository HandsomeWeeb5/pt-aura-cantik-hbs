const barangService = require('../services/barang.service');

const viewDataCartTable = async(req, res) => {
    let results = await barangService.getDataFromCart();

    try {
        res.render('pengeluaran', {
            layout: 'index',
            data: {
                results
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
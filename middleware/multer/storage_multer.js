const multer = require('multer');
const storage = require('../../config/storage.config');

let imageStorage = multer.diskStorage(storage.imageStorage);
let pdfStorage = multer.diskStorage(storage.pdfStorage);

let uploadImage = multer({ storage: imageStorage });
let uploadPDF = multer({ storage: pdfStorage });

module.exports = {
    uploadImage: uploadImage,
    uploadPDF: uploadPDF
}
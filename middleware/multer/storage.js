const multer = require('multer');
const path = require('path');

let imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/img')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
    },
});

let pdfStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/pdf')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now());
    }
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });

module.exports = {
    uploadImage: uploadImage,
    uploadPDF: uploadPDF
};
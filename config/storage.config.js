let imageStorage = {
    destination: (req, file, callback) => {
        callback(null, 'public/upload/img')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname)
    }
};

let pdfStorage = {
    destination: (req, file, callback) => {
        callback(null, 'public/upload/pdf')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname)
    }
}

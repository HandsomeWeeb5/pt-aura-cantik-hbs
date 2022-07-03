//* ________ SERVER.JS ______
const express = require('express');
const cors = require("cors");
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const handlebars = require('express-handlebars');

// Import Modules
const { handlebarsViewEngine } = require('./config/view.config');
const initBarangRoutes = require('./routes/barang.routes');
const helper = require('./config/helper.config');

// Access env file untuk menjalankan sistem
require('dotenv').config();

const PORT = process.env.PORT || 7200

const app = express();
// Parsing (uraikan) data form
app.use(express.urlencoded(
    { extended: true }
))
// Parsing (uraikan) data JSON dari Database
app.use(express.json())

// aktifkan untuk perizinan CORS
app.use(cors());

// Pasang session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 864000000 1 day
    }
}));

// Pasang cookie parser
app.use(cookieParser('secret'));

// Nyalakan pesan flash
app.use(flash())

// Pasang View Engine Handlebars
handlebarsViewEngine(app, handlebars.engine({
    extname: 'hbs',
    layoutsDir: `${__dirname}/public/views/layouts`,
    partialsDir: `${__dirname}/public/views/partials`,
    helpers: helper
}));

// ROUTE HALAMAN
app.get('/pengeluaran', (req, res) => {
    res.render('pengeluaran', {layout: 'index'})
});

app.get('/penarikan', (req, res) => {
    res.render('penarikan', {layout: 'index'})
});

app.get('/histori', (req, res) => {
    res.render('histori', {layout: 'index'})
});

// URL syntax: http://localhost:7200/api/barang?limit=[number]&page=[number]
initBarangRoutes(app);

// Server listen to Port 7200
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server listening to http://localhost:${PORT}`);
})



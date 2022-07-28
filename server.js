//* ________ SERVER.JS ______
const express = require('express');
const cors = require("cors");
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const handlebars = require('express-handlebars');
// const http = require("http");

// Import Modules
const { handlebarsViewEngine } = require('./config/view.config');
const initBarangRoutes = require('./routes/barang.routes');

// Access env file untuk menjalankan sistem
require('dotenv').config();

const PORT = process.env.PORT || 7200

const app = express();
// Parsing (uraikan) data JSON dari Database
app.use(express.json())

// Parsing (uraikan) data form
app.use(express.urlencoded(
    { extended: true }
))

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
    partialsDir: `${__dirname}/public/views/partials`
}));

app.get('/histori', (req, res) => {
    res.render('histori', {layout: 'index'})
});

// Initial Barang Routes
initBarangRoutes(app);

// Initial Login Routes 
// initLoginRoutes(app); <= Still in Development

// Server listen to Port 7200
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server listening to http://localhost:${PORT}`);
})



const login = require('../controller/login.controller');
const register = require('../controller/register.controller');
const penyimpanan = require('../controller/penyimpanan.controller');
const auth = require('../validation/auth.validation');
const passport = require('passport');
const initPassportLocal = require('../controllers/passport.local.controller');

const express = require('express');
const router = express.Router();

// Pasang semua passport api
initPassportLocal();

const initLoginRoutes = (app) => {
    router.get("/", login.checkLoggedIn, penyimpanan.viewDataBarang); // Login ke Pemasukan Page
    router.get("/login", login.checkLoggedOut, login.getPageLogin); // Logout dari Pemasukan
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/", 
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    })) // Mengecek apakah user sudah benar ada sebelum memasuki halaman home dengan passport
    router.get("/register", register.getPageRegister); // Memasuki halaman register
    router.post("/register", auth.validateRegister, register.createNewUser); // Pasang akun ke dalam database yang akan dijadikan login
    router.post("/logout", login.postLogOut); // Logout Akun ke login

    return app.use("/", router);
};
module.exports = initLoginRoutes;
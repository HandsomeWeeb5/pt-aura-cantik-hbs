const { validationResult } = require('express-validator');
const registerService = require('../services/register.service');

let getPageRegister = (req, res) => {
    return res.render("register", {
        errors: req.flash("errors")
    })
}

let createNewUser = async (req, res) => {
    //validasikan input isian
    let errorsArr = []; // simpan pesan error
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //buat user account baru
    let newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname
    };
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err){
        req.flash("errors", err);
        return res.redirect("/register");
    }
}

module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
}
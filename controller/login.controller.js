const { validationResult } = require('express-validator');
const loginService = require('../services/login.service');

let getPageLogin = (req, res) => {
    return res.render("login", {
        errors: req.flash("errors")
    });
}

let handleLogin = async(req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.username, req.body.password);
        return res.redirect("/");
    } catch (err){
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
}

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

let postLogOut = (req, res) => {
    req.session.destroy((err) => {
        return res.redirect("/login");
    });
}

module.exports = {
    getPageLogin: getPageLogin,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
}
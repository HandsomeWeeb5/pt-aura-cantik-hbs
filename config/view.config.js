const express = require('express');

const handlebarsViewEngine = (app, view_engine) => {
    app.use(express.static('public'));

    //* file ext: handlebars as hbs
    app.engine('.hbs', view_engine);
    app.set('view engine', '.hbs');
    app.set('views', 'public/views')
}

module.exports = {
    handlebarsViewEngine: handlebarsViewEngine
}
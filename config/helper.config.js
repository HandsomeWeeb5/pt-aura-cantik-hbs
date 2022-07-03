const hbs = require('handlebars');
const paginate = require('handlebars-paginate');

let helper = hbs.registerHelper('paginate', paginate);

module.exports = helper;
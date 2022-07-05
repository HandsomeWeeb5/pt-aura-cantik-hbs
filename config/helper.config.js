const hbs = require('handlebars');
const paginate = require('handlebars-paginate');

let pagination = hbs.registerHelper('paginate', paginate);

module.exports = { 
     pagination: pagination
};
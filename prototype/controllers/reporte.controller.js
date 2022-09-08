const path = require('path');

exports.getReportes = (request, response, next) => {
    response.render(path.join('reportes.ejs'));
};
const path = require('path');

exports.getColaborador = (request, response, next) => {
    response.render(path.join('colaboradores.ejs'));
};
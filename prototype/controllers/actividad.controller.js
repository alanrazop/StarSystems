const path = require('path');

exports.getActividad = (request, response, next) => {
    response.render(path.join('actividades.ejs'));
};
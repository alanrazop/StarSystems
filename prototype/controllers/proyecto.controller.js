const path = require('path');

exports.getProyecto = (request, response, next) => {
    response.render(path.join('proyectos.ejs'));
};
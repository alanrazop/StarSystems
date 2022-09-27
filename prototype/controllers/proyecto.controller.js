const path = require('path');
const PA = require('../models/proyectos_activos.model')



exports.getProyecto = (request, response, next) => {
    PA.fetchAll()
        .then(([rows, fieldData]) => {
            console.log(rows[0]);
            response.render(path.join('proyectos.ejs'), {
                activos: rows[0]});
        }).catch(error => {
            console.log(error);
        })
};
const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');

exports.getActividad  = (request, response, next) => {
    Actividades.fetchAll()
        .then(([rows, fieldData]) => {
            Proyectos.fetchAll()
                .then(([proyectos, fieldData]) => {
                    response.render(path.join('actividades.ejs'), {
                        actividades: rows,
                        proyectos: proyectos,
                    })
                }).catch(error => {
                    console.log(error);
                });

        })
        .catch(err => console.log(err));


}

const path = require('path');
const Empleados = require('../models/empleados.model');


exports.getEmpleado = (request, response, next) => {
        Empleados.fetchAll()
        .then(([rows,fieldData]) => {
            response.render(path.join('colaboradores.ejs'), {
                empleados: rows,
            })
        }).catch(error => {
            console.log(error);
        });
};
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

exports.getBuscarColab = (request, response, next) => {
    Empleados.find(request.params.valor)
        .then(([rows, fieldData]) => {
            response.status(200).json({empleados: rows});
        }).catch(err => {
            console.log(err);
            response.status(500).json({message: "ERROR"});
        })
}
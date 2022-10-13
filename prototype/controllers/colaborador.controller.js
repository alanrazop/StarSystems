const path = require('path');
const Empleados = require('../models/empleados.model');


exports.getEmpleado = (request, response, next) => {
        Empleados.fetchAll()
        .then(([rows,fieldData]) => {
            // Empleados.fetchProyectoEmpleado()
            // .then(([proyectos, fieldData]) => {
                response.render(path.join('colaboradores.ejs'), {
                    empleados: rows,
                    user: request.session.user ? request.session.user : '',
                })
            })
            // .catch(err => {
            //     console.log(err);
            // })

        .catch(error => {
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
const path = require('path');
const Proyectos = require('../models/proyectos.model');

exports.getProyecto = (request, response, next) => {
    response.render(path.join('proyectos.ejs'));
};


exports.getBuscar = (request, response, next) => {
    Proyectos.buscar(request.params.valor)
    .then(([proyectos, fielData]) => {
        response.status(200).json({proyectos: proyectos});
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({message: "ERROR 500"});
    });
};

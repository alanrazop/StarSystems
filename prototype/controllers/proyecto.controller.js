const path = require('path');
const PA = require('../models/proyectos_activos.model')
const Proyectos = require('../models/proyectos.model.js')

exports.getProyecto = (request, response, next) => {
    Proyectos.LiderProyecto()
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render(path.join('proyectos.ejs'), {
                proyectos: rows});
        }).catch(error => {
            console.log(error);
        })
};
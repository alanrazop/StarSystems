const { request } = require('http');
const path = require('path');
const Actividades = require('../models/actividades.model');


exports.getActividad = (request, response, next) => {
        Actividades.fetchAll()
        .then(([rows,fieldData]) => {
            response.render(path.join('actividades.ejs'), {
                actividades: rows,
            })
        }).catch(error => {
            console.log(error);
        });
};

exports.postActividad = (request, response, next) => {
    const usuario = new Actividades()
}
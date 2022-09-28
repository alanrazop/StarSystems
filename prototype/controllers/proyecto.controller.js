const path = require('path');
const PA = require('../models/proyectos_activos.model');
const Proyectos = require('../models/proyectos.model.js');
const Empleados = require('../models/empleados.model');

exports.getProyecto = (request, response, next) => {
    Proyectos.fetchAll()
        .then(([rows, fieldData]) => {
            Empleados.fetchLideresCoord()
                .then(([empleados, fieldData]) => {
                    console.log(rows);
                    response.render(path.join('proyectos.ejs'), {
                        proyecto: rows,
                        empleados: empleados,
                    })
                })
            
        }).catch(error => {
            console.log(error);
        })
};

exports.postProyecto = (request, response, next) => {
    console.log('POST');
    console.log(request.body.nombre);
    console.log(request.body.descripcion);
    console.log(request.body.fecha_act);
    console.log(request.body.select_estatus);
    console.log(request.body.select_tarea_proyecto);
    const NuevoRegistro = new Proyectos (request.body.nombre, request.body.descripcion,request.body.fecha_act,request.body.select_estatus,request.body.select_tarea_proyecto);
    console.log(NuevoRegistro);
    Proyectos.saveProject(NuevoRegistro)
        .then(() => {
            response.redirect('/home/proyectos'); 
        })
        .catch(err => {
            console.log(err);
        });
};
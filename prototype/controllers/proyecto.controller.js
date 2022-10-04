const path = require('path');
const PA = require('../models/proyectos_activos.model');
const Proyectos = require('../models/proyectos.model.js');
const Empleados = require('../models/empleados.model');
const { response } = require('express');
const User = require('../models/user.model')

exports.getProyecto = async (request, response, next) => {
    let proyectos;
    await Proyectos.fetchAll()
        .then( async ([rows, fieldData]) => {
            for (let proyecto of rows) {
                [colaboradores, fieldData] = await Proyectos.fetchColaboradores(proyecto.id_proyecto); 
                proyecto.participantes = colaboradores; 
            }     
            proyectos = rows;
        }).catch(err => {
            console.log(err);
        });  
    console.log(proyectos);
    response.render(path.join('proyectos.ejs'), {
        proyecto: proyectos,
    });                 
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

exports.postEditProject = (request, response, next) => {
    Proyectos.fetchOne(request.body.id)
    .then(([rows, fieldData]) => {
        rows[0].nombre_proyecto = request.body.nombre;
        rows[0].descripcion_proyecto = request.body.descripcion;
        rows[0].is_activo = request.body.is_activo;
        rows[0].tarea_proyecto = request.body.tarea_proyecto;
        Proyectos.saveEdit(rows[0])
            .then(() => {
                response.redirect('/home/proyectos');
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postDeleteProject = (request, response, next) => {
    Proyectos.fetchOne(request.body.id)
        .then(([rows, fieldData]) => {
            Proyectos.deleteOne(rows[0])
                .then(() => {
                    response.redirect('/home/proyectos');
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        });
};
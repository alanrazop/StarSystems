const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');
const Empleados = require('../models/empleados.model');



exports.getActividad  = (request, response, next) => {
    Actividades.fetchAll()
    .then(([rows, fieldData]) => {
        Empleados.NombreEmpleado()
        .then(([empleados,fieldData]) =>{
            Proyectos.fetchAll()
            .then(([proyectos,fieldData]) =>{
                response.render(path.join('actividades.ejs'), {
                    actividades: rows,
                    empleados:empleados,
                    proyectos: proyectos
                })
            }).catch(error => {
                console.log(error);
            });
        }).catch(error =>{
            console.log(error);
        }); 
    })
    .catch(err => console.log(err)); 
        
}

exports.postActividad = (request, response, next) => {

    const NuevaActividad = new Actividades (request.body.descripcion, request.body.select_proyectos,request.body.fecha_act );

    NuevaActividad.save()
        .then(() => {
            response.redirect('/home/tareas');
        })
        .catch(err => {
            console.log(err);
        });
}
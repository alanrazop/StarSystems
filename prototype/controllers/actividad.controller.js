const { request } = require('http');
const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');
const Empleados = require('../models/empleados.model');



exports.getActividad  = (request, response, next) => {
    Actividades.fetchAll()
    .then(([rows, fieldData]) => {
        Empleados.fetchAll()
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


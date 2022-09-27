const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');
const Empleados = require('../models/empleados.model');
const { get } = require('http');

//import {alert} from './app.js';


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

exports.postActividad =  (request, response, next) => {

    console.log('POST');
    console.log(request.body.descripcion);
    console.log(request.body.select_proyecto);
    console.log(request.body.input_horas);
    //console.log(request.body.select_colaborador);

    console.log(request.body.check_empleados);
    console.log(request.body.fecha_act);

    let empleado_relleno ;
    const NuevoRegistro = new Actividades (request.body.descripcion, request.body.select_proyecto,request.body.input_horas, empleado_relleno, request.body.fecha_act);
    console.log(empleado_relleno);

   // const NuevaActividad = new Actividades (request.body.descripcion, request.body.select_proyecto);


    Actividades.save(NuevoRegistro)
    .then(() => {
        console.log(NuevoRegistro);
        })
        .catch(err => {
            console.log(err);
    })

    const check_empleados = request.body.check_empleados;

    if (request.body.descripcion == "" ||  request.body.select_proyecto == "" || request.body.input_horas == ""  || request.body.fecha_act == "" ){
        console.log(request.body.descripcion);
        response.redirect('/home/tareas');
    }  

    for ( let e of check_empleados ){
        console.log('Esta es la e ' + e);
        NuevoRegistro.colab = e;
        console.log(NuevoRegistro.colab);
    
                
                    Actividades.saveRegistra(NuevoRegistro)
                    .then(() => {  
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
        }
        response.redirect('/home/tareas'); 
    
    }

    


exports.getEditAct = (request, response, next) => {
    Actividades.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            Empleados.NombreEmpleado()
            .then(([empleados,fieldData]) => {
                console.log(empleados);
                response.render(path.join('modAct.ejs'), {
                    actividades: rows[0],
                    empleados: empleados,
                });
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        }) 
};

exports.postEditAct = (request, response, next) => {
    
    Actividades.fetchOne(request.body.id)
    .then(([rows, fieldData]) => {
        let horas = request.body.num_horas;
        console.log(horas);
        rows[0].num_horas = horas;
        console.log(rows[0]);
        Actividades.saveEdit(rows[0])
            .then(() => {
                response.redirect('/home/tareas');
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
    console.log(err);
});
};

exports.postDeleteAct = (request, response, next) => {
    Actividades.fetchOne(request.body.id)
        .then(([rows, fieldData]) => {
            Actividades.deleteOne(rows[0])
                .then(() => {
                    response.redirect('/home/tareas');
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {console.log(err);});
};

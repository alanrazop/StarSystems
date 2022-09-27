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
    console.log(request.body.select_colaborador);
    console.log(request.body.fecha_act);


    // function Vertificar(){   
    //     let descripcion  = request.body.descripcion;
    //     // let select_proyecto = document.getElementById('select_proyecto');
    //     // let input_horas = document.getElementById('input_horas');
    //     // let select_colaborador =  document.getElementById('select_colaborador');
    //     // let fecha_act = document.getElementById('fecha_act');

        
    //     if (descripcion == " " ) {
    //       alert("Campo vacío. \nVerifique sus datos");
    //       // location.reload();
    //       return false;
    //     }        
    //   }

    console.log(arrayColaboradores);

    const NuevoRegistro = new Actividades (request.body.descripcion, request.body.select_proyecto,request.body.input_horas,request.body.select_colaborador,request.body.fecha_act);
    console.log(NuevoRegistro);

    
    
        if (request.body.descripcion == "" ||  request.body.select_proyecto == "" || request.body.input_horas == "" || request.body.select_colaborador == "" || request.body.fecha_act == "" ){
            console.log(request.body.descripcion);
            response.redirect('/home/tareas');
        }  

        else {
            Actividades.saveRegistra(NuevoRegistro)
            .then(() => {
                response.redirect('/home/tareas');   
            })
            .catch(err => {
                console.log(err);
            });
        } 
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

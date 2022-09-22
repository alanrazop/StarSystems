const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');
const Empleados = require('../models/empleados.model');
const { request } = require('http');



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

    // const NuevaActividad = new Actividades (request.body.descripcion, request.body.select_proyecto);
    // console.log(NuevaActividad);

    const NuevoRegistro = new Actividades (request.body.descripcion, request.body.select_proyecto,request.body.input_horas,request.body.select_colaborador,request.body.fecha_act);
    console.log(NuevoRegistro);


    // Actividades.save(NuevoRegistro)
    //     .then(() => {
    //         Actividades.saveRegistra(NuevoRegistro)
    //         .then(() => {
    //             response.redirect('/home/tareas'); 
                
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }).catch(error =>{
    //         console.log(error);
    //     });

    //ESTE SI FUNCIONA --------------------------
    // Actividades.save(NuevoRegistro)
    //     .then(() => {
    //         response.redirect('/home/tareas');   
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
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


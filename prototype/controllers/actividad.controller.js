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


exports.postActividad =  (request, response, next) => {

    console.log('POST');
    console.log(request.body.descripcion);
    console.log(request.body.select_proyecto);
    console.log(request.body.input_horas);
    console.log(request.body.select_colaborador);
    console.log(request.body.fecha_act);



    const NuevoRegistro = new Actividades (request.body.descripcion, request.body.select_proyecto,request.body.input_horas,request.body.select_colaborador,request.body.fecha_act);
    console.log(NuevoRegistro);

    Actividades.saveRegistra(NuevoRegistro)
        .then(() => {
            response.redirect('/home/tareas');   
        })
        .catch(err => {
            console.log(err);
        });


}


exports.getEditAct = (request, response, next) => {
    Actividades.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            Empleados.NombreEmpleado()
            .then(([empleados,fieldData]) => {  
                Proyectos.fetchAll()
                .then(([proyectos,fieldData]) =>{                       
                response.render(path.join('modAct.ejs'), {
                    actividades: rows[0],
                    empleados: empleados,
                    proyecto: proyectos
                })
            })
            .catch(err => {
                console.log(err);
            })
        })        .catch(err => {
            console.log(err);
        }) 
}).catch(err => {
    console.log(err);
}) ;
}

exports.postEditAct = (request, response, next) => {
    console.log('Si paso por aqui');
    console.log(request.body.id);

    const NuevoRegistro = new Actividades (request.body.descripcion, 
                                           request.body.id_proyecto,
                                           request.body.input_horas,
                                           request.body.select_colaborador,
                                           request.body.fecha_act,
                                           );
    NuevoRegistro.id = request.body.id;
    console.log(NuevoRegistro)
        Actividades.saveEdit(NuevoRegistro)
        .then(() => {
            response.redirect('/home/tareas');
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

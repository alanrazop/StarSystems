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
    
                console.log(rows[0].descripcion_actividad);     
                console.log('truena aqui');                
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
         console.log(request.body.descripcion);
         console.log(request.body.proyecto);
         console.log( request.body.num_horas);
         console.log(request.body.colab);
         console.log(request.body.fecha);
         console.log(request.body.id_actividad);
        rows[0].descripcion = request.body.descripcion;
        rows[0].proyecto = request.body.proyecto;
        rows[0].num_horas = request.body.num_horas;
        rows[0].colab = request.body.colab;
        rows[0].fecha = request.body.fecha; 
        rows[0].id_actividad = request.body.id_actividad; 
        console.log(id_actividad);

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

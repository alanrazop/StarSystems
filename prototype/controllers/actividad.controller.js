const path = require('path');
const Actividades = require('../models/actividades.model');
const Proyectos = require('../models/proyectos.model');
const Empleados = require('../models/empleados.model');
const Registra = require('../models/registra.model');
const { get } = require('http');

exports.getActividad = async (request, response, next) => {
    let actividades;
    await Actividades.fetchAll()
        .then( async ([rows, fieldData]) => {
            for (let actividad of rows) {
                [colaboradores, fieldData] = await Actividades.fetchColaboradores(actividad.id_actividad); 
                actividad.participantes = colaboradores; 
            }     
            actividades = rows;
        }).catch(err => {
            console.log(err);
        });  
        Empleados.fetchAll()
        .then(([empleados,fieldData]) =>{
            Proyectos.fetchAll()
            .then(([proyectos,fieldData]) =>{
                response.render(path.join('actividades.ejs'), {
                    actividades: actividades,
                    empleados:empleados,
                    proyectos: proyectos
                })
            }).catch(error => {
                console.log(error);
            });
        }).catch(error =>{
            console.log(error);
        });    
};

exports.postActividad = async (request, response, next) => {

    console.log('----------POST---------');
    console.log('request.body.descripcion : ' + request.body.descripcion);
    console.log('request.body.proyecto: ' + request.body.select_proyecto);
    console.log('request.body.horas : ' + request.body.input_horas);
    console.log('request.body.empleados: ' + request.body.check_empleados);
    console.log('request.body.fecha : ' + request.body.fecha_act);

    console.log('--- FIN DE LOS REQUEST ---- \n');

    let empleado_relleno = '';
    const check_empleados = request.body.check_empleados;
    const NuevoRegistro = new Registra (request.body.input_horas, 0,  empleado_relleno, request.body.fecha_act);
    const NuevaActividad = new Actividades (0,request.body.descripcion,request.body.select_proyecto, request.body.input_horas, empleado_relleno, request.body.fecha_act);
    console.log(NuevaActividad);

    await Actividades.save(NuevaActividad)
    .then(async () => {
        })
        .catch(err => {
            console.log(err);
    })

    if (request.body.descripcion == "" ||  request.body.select_proyecto == "" || request.body.input_horas == ""  || request.body.fecha_act == "" ){
        console.log(request.body.descripcion);
        response.redirect('/home/tareas');
    }  


    console.log(check_empleados);

    await Actividades.LastId()
        .then(async ([rows, fieldData]) => {
            NuevoRegistro.id_actividad = rows[0].id_actividad;
            console.log ('Nuevo id act: ' +  NuevoRegistro.id_actividad);
            
            for ( let e of check_empleados ){
                NuevoRegistro.colab = e;
                console.log(NuevoRegistro);
                console.log('id del colaborador: ' + NuevoRegistro.colab);
                await Registra.saveRegistra(NuevoRegistro)
                    .then(async() => {  
                        console.log('-------------\n');
                        console.log(NuevoRegistro);
                        console.log('-------------\n');
                        
                    })
                    .catch(err => {
                        console.log(err);
                    })  
            }  
    })
        .catch(err => {
            console.log(err);
        }) 
    
    response.redirect('/home/tareas'); 
};
    



exports.getEditAct = (request, response, next) => {
    Actividades.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            Empleados.fetchAll()
            .then(([empleados,fieldData]) => {  
                Proyectos.fetchAll()
                .then(([proyectos,fieldData]) =>{  
                    Registra.fetchAll()
                    .then(([registros, fieldData]) => {
                        response.render(path.join('modAct.ejs'), {
                            actividades: rows[0],
                            empleados: empleados,
                            proyecto: proyectos,
                            registros: registros
                        })
                    })
                    .catch(err => {console.log(err)});                     
                
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

    const NuevoRegistro = new Actividades (
        request.body.id,
        request.body.descripcion,
        request.body.id_proyecto,
        request.body.input_horas,
        request.body.check_empleados,
        request.body.fecha_act
    );
     NuevoRegistro.id = request.body.id;
    console.log(NuevoRegistro)
        Actividades.saveEdit(NuevoRegistro)
        .then(() => {
            for ( let e of request.body.check_empleados){
                NuevoRegistro.colab = e;
                console.log(NuevoRegistro);
                console.log('id del colaborador: ' + NuevoRegistro.colab);
                Registra.saveRegistra(NuevoRegistro)
                    .then(async() => {  
                        console.log('-------------\n');
                        console.log(NuevoRegistro);
                        console.log('-------------\n');

                    })
                    .catch(err => {
                        console.log(err);
                    })  
            }  
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

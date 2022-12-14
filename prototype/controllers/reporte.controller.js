const path = require('path');
const Reporte = require('../models/reporte.model');
const Empleados = require('../models/empleados.model');
const Proyectos_activos = require('../models/proyectos_activos.model');


exports.getReportes =  (request, response, next) => {
    Empleados.fetchAll().then(([trabajadores,fieldData]) => {
        Proyectos_activos.fetchRecent().then(([row, fieldData]) => {
            Reporte.fetchAll().then(([rows, fieldData]) => {
                // add security to double check user session rol
                if (request.session.roles === 1){
                    response.render(path.join('reportes.ejs'), {
                        user: request.session.user ? request.session.user : '',
                        user_permit: request.session.roles,
                        empleados: trabajadores,
                        proyectos_diez: row,
                        horas_vacaciones: rows[0].horas_vacaciones,
                        horas_trabajadas: rows[0].horas_trabajadas,
                        horas_tiempo_completo: rows[0].horas_tiempo_completo,
                        horas_tiempo_medio: rows[0].horas_tiempo_medio,
                        coeficiente_efectividad: rows[0].coeficiente_efectividad
                    })
                } else {
                    response.redirect('/home')
                }
            }).catch(err => console.log(err));
            }).catch(error => {
                console.log(error);
            });
    })
        .catch(err => console.log(err));
}

exports.postReporte = (request, response, next) => {
    console.log('POST');
    console.log(request.body.descripcion);
    console.log(request.body.select_proyecto);
    console.log(request.body.input_horas);
    console.log(request.body.select_colaborador);
    console.log(request.body.fecha_act);
    console.log(request.body.coeficiente);
    console.log(request.body.vacaciones_tm);
    console.log(request.body.vacaciones_tc);
    console.log(request.body.ngblock_tm);
    console.log(request.body.ngblock_tc);
}


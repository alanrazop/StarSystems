const path = require('path');
const Reporte = require('../models/reporte.model');
const Proyectos_activos = require('../models/proyectos_activos.model');

exports.getReportes = (request, response, next) => {
    Proyectos_activos.fetchAll().then(([row,  fieldData ]) => {  
        console.log(row[0]);
    
    
    Reporte.fetchAll().then(([rows, fieldData]) => {

  
        response.render(path.join('reportes.ejs'), {
            proyectosA:  row[0],
            // horas_vacaciones: rows[0].horas_vacaciones,
            // horas_trabajadas: rows[0].horas_trabajadas,
            // horas_tiempo_completo: rows[0].horas_tiempo_completo,
            // horas_tiempo_medio: rows[0].horas_tiempo_medio,
            // coeficiente_efectividad: rows[0].coeficiente_efectividad           
        })})
    .catch(err => console.log(err));
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

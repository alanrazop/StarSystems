const db = require('../util/database');


//  considerar columna vacaciones tiempo medio en base de datos
module.exports = class Reporte{
    constructor(_vacaciones_reporte, _trabajadas_reporte, _tiempo_completo_reporte, _tiempo_medio_reporte, _coeficiente_efectividad, _fecha_inicio, _fecha_corte){
        this.vacaciones_reporte = _vacaciones_reporte;
        this.trabajadas_reporte = _trabajadas_reporte;
        this.tiempo_completo_reporte = _tiempo_completo_reporte;
        this.tiempo_medio_reporte = _tiempo_medio_reporte;
        this.coeficiente_efectividad = _coeficiente_efectividad;
        this.fecha_inicio = _fecha_inicio;
        this.fecha_corte = _fecha_corte;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM reporte');
    }

    static buscaReporte(u_fecha) {
        return db.execute('SELECT fecha_corte FROM reporte WHERE fecha_corte LIKE ?', ['%'+u_fecha+'%']);
    }

}
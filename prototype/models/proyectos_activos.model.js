const db = require('../util/database');

module.exports = class proyectosActivos
{
    constructor(_nombre_proyecto_activo, _total_horas_proyecto){
        this.nombre_proyecto_activo = _nombre_proyecto_activo;
        this.total_horas_proyecto = _total_horas_proyecto;
        
    }
    
    static fetchAll()
    {
        return db.execute('Call proyectos_activos');
    }
}
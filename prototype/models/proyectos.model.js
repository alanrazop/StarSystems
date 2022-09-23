const db = require('../util/database');

module.exports = class Proyectos{
    constructor(_nombre_proyecto, _descripcion_proyecto, _fecha_inicio, _is_activo, _tarea_proyecto ){
        this.nombre_proyecto = _nombre_proyecto;
        this.descripcion_proyecto = _descripcion_proyecto;
        this.fecha_inicio = _fecha_inicio;
        this.is_activo = _is_activo;
        this.tarea_proyecto = _tarea_proyecto;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM proyecto');
    }

    static idProyecto(nombre_proyecto) {
        return db.execute('SELECT id_proyecto FROM proyecto WHERE nombre_proyecto = ?', [nombre_proyecto]) ;
        
    }



}
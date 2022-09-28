const db = require('../util/database');

module.exports = class Proyectos{
    constructor(_nombre_proyecto, _descripcion_proyecto, _fecha_inicio, _is_activo, _tarea_proyecto ){
        this.nombre_proyecto = _nombre_proyecto;
        this.descripcion_proyecto = _descripcion_proyecto;
        this.fecha_inicio = _fecha_inicio;
        this.is_activo = _is_activo;
        this.tarea_proyecto = _tarea_proyecto;

    }

    static saveProject(proyecto) {
        return db.execute('INSERT INTO proyecto (nombre_proyecto, descripcion_proyecto, fecha_inicio, is_activo, tarea_proyecto) VALUES (?, ?, ?, ?, ?);', [proyecto.nombre_proyecto, proyecto.descripcion_proyecto, proyecto.fecha_inicio, proyecto.is_activo, proyecto.tarea_proyecto]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM proyecto');
    }

    static idProyecto(nombre_proyecto) {
        return db.execute('SELECT id_proyecto FROM proyecto WHERE nombre_proyecto = ?', [nombre_proyecto]) ;
    }

    static LiderProyecto() {
        return db.execute('SELECT nombre_proyecto, descripcion_proyecto, e.nombre as lider FROM proyecto p, actividad a, registra r, empleado e  where p.id_proyecto = a.id_proyecto AND a.id_actividad = r.id_actividad AND r.id_empleado = e.id_empleado AND p.tarea_proyecto = 0 AND e.id_rol = 2;');
    }

    static fetchLideres(){
        return db.execute('SELECT * FROM `empleado` WHERE id_rol IN (1,2)')
    }
}
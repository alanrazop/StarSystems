const db = require('../util/database');

module.exports = class Empleados {
    //constructor(){
    // }
    static fetchAll() {
        return db.execute('SELECT * FROM empleado e, rol r WHERE e.id_rol = r.id_rol');
    }

    // static fetchProyectoEmpleado() {
    //     return db.execute('SELECT e.nombre, p.nombre_proyecto FROM empleado e, proyecto p, actividad a, registra reg WHERE e.id_empleado = ? GROUP BY e.nombre, p.nombre_proyecto;');
    // }

    static NombreEmpleado(){
        return db.execute('SELECT  * FROM empleado e, rol r WHERE e.id_rol = r.id_rol');
    }

    static find(valor) {
        return db.execute('SELECT * FROM empleado e, rol r WHERE e.nombre LIKE ? AND e.id_rol = r.id_rol', ['%' + valor + '%']);
    }

    static fetchLideresCoord(){
        return db.execute('SELECT * FROM `empleado` WHERE id_rol IN (1,2)')
    }


    static fetchTC() {
        return db.execute('SELECT COUNT(*) as tiempo_completo FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND is_tiempo_completo=1');
    }

    static fetchTM() {
        return db.execute('SELECT COUNT(*) as tiempo_medio FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND is_tiempo_completo=0');
    }

    // static NombreEmpleadoRegistrables(empleadoSolicitante){
    //     return db.execute('SELECT DISTINCT nombre FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND e.id_empleado != ?', [empleadoSolicitante]);
    // } 
}
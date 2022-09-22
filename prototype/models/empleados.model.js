const db = require('../util/database');

module.exports = class Empleados {
    //constructor(){
    // }
    static fetchAll() {
        return db.execute('SELECT * FROM empleado e, rol r WHERE e.id_rol = r.id_rol');
    }

    static NombreEmpleado(){
        return db.execute('SELECT  * FROM empleado e, rol r WHERE e.id_rol = r.id_rol');
    }

    static find(valor) {
        return db.execute('SELECT * FROM empleado e, rol r WHERE e.nombre LIKE ? AND e.id_rol = r.id_rol', ['%' + valor + '%']);
    }

    // static NombreEmpleadoRegistrables(empleadoSolicitante){
    //     return db.execute('SELECT DISTINCT nombre FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND e.id_empleado != ?', [empleadoSolicitante]);
    // } 
}
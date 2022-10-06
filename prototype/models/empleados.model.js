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

    static fetchLideresCoord(){
        return db.execute('SELECT * FROM `empleado` WHERE id_rol IN (1,2)')
    }

    delimiter //
    CREATE function capactiyCount (OUT cities INT)
       BEGIN
         SELECT COUNT(*) INTO cities FROM world.city
         WHERE CountryCode = country;
       END//

    static fetchTC() {
        return db.execute('SELECT COUNT() as tiempo_completo FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND is_tiempo_completo="1"');
    }

    static fetchTM() {
        return db.execute('SELECT () as tiempo_medio FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND is_tiempo_completo="0"');
    }

    // static NombreEmpleadoRegistrables(empleadoSolicitante){
    //     return db.execute('SELECT DISTINCT nombre FROM empleado e, rol r WHERE e.id_rol = r.id_rol AND e.id_empleado != ?', [empleadoSolicitante]);
    // } 
}
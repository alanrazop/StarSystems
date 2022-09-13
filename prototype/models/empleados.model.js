const db = require('../util/database');

module.exports = class Empleados {
    //constructor(){
    // }
    static fetchAll() {
        return db.execute(
            'SELECT nombre, is_tiempo_completo, descripcion FROM empleado e, rol r WHERE e.id_rol = r.id_rol'
            );
    }
}
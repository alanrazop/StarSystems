const db = require('../util/database');

module.exports = class Actividades {
    //constructor(){
    // }
    static fetchAll() {
        return db.execute('SELECT * FROM actividad a, registra r, proyecto p, empleado e WHERE a.id_actividad = r.id_actividad and a.id_proyecto = p.id_proyecto and r.id_empleado = e.id_empleado');
    }

    // static fetchVerProyectoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }

    // static fetchVerEmpleadoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }
}
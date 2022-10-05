const db = require('../util/database');

module.exports = class Actividades {
    constructor( _id_actividad, _descripcion, _proyecto, _duracion, _colab, _fecha){
        this.id_actividad = _id_actividad;
        this.descripcion = _descripcion;
        this.proyecto = _proyecto;
        this.duracion = _duracion;
        this.colab = _colab;
        this.fecha = _fecha;
    }


    // VERIFICAR EL EL UTLIMO ID GUARDADO
    static save(actividad) {
        return db.execute('INSERT INTO actividad (descripcion_actividad,id_proyecto) VALUES (?,?); ', [actividad.descripcion, actividad.proyecto])
    }
    // VERIFICAR EL EL UTLIMO ID GUARDADO
    //GUARDAR LA ACTIVIDAD REGISTRADA
    // static saveRegistra(actividad) {
        
    //     //return db.execute('cALL agregar_actividad  (?,?,?,?,?)', [actividad.descripcion, actividad.proyecto, actividad.duracion, actividad.colab, actividad.fecha])
    //     return db.execute('INSERT INTO registra (num_horas, id_actividad, id_empleado, fecha) VALUES  (?,?,?,?,?)', [actividad.duracion, actividad.id_Actividad, actividad.colab, actividad.fecha])
    // }

    // static saveEdit(actividad) {
    //     return db.execute('UPDATE registra SET  descripcion_actividad = ? , num_horas = ?, WHERE id_actividad = ?', [descripcion_actividad, actividad.num_horas, actividad.id_actividad]);
    // }

    static LastId(){
        return db.execute('SELECT id_actividad FROM actividad ORDER BY id_actividad DESC LIMIT 1')
    }
    static saveEdit(actividad) {
        return db.execute('CALL modificar_actividad (?,?,?,?,?)', [actividad.descripcion, actividad.proyecto, actividad.duracion, actividad.fecha, actividad.id]);
    }


    // call modificar_actividad('ya leo si funciono',16,5,1,"2022-09-22",315);


    // static saveEdit(actividad) {
    //     return db.execute('UPDATE registra SET num_horas = ? WHERE id_actividad = ?', [actividad.num_horas, actividad.id_actividad]);
    // }

    static fetchAll() {
        return db.execute('SELECT * FROM actividad a, registra r, proyecto p, empleado e WHERE a.id_actividad = r.id_actividad and a.id_proyecto = p.id_proyecto and r.id_empleado = e.id_empleado and p.is_activo = 1 GROUP BY a.descripcion_actividad');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM registra r, actividad a, proyecto p WHERE r.id_actividad = ? and a.id_actividad = r.id_actividad and a.id_proyecto = p.id_proyecto', [id] );
    }

    static deleteOne(id) {
        return db.execute('CALL eliminar_actividad (?)', [id.id_actividad]);
    }

    static fetchColaboradores(id_actividad){
        return db.execute('SELECT e.nombre FROM empleado e, registra r, actividad a, proyecto p WHERE e.id_empleado = r.id_empleado and a.id_actividad = r.id_actividad and a.id_proyecto = p.id_proyecto and a.id_actividad = ? GROUP BY e.nombre', [id_actividad]);
    }


    // static fetchVerProyectoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }

    // static fetchVerEmpleadoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }
}
const db = require('../util/database');

module.exports = class Actividades {
    constructor(_descripcion, _proyecto, _duracion, _colab, _fecha){
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
    saveRegistra() {
        return db.execute('INSERT INTO actividad (num_horas,id_proyecto) VALUES (?,?); ', [this.nombre, this.proyecto])
    }

    static saveEdit(actividad) {
        return db.execute('UPDATE registra SET num_horas = ? WHERE id_actividad = ?', [actividad.num_horas, actividad.id_actividad]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM actividad a, registra r, proyecto p, empleado e WHERE a.id_actividad = r.id_actividad and a.id_proyecto = p.id_proyecto and r.id_empleado = e.id_empleado');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM registra WHERE id_actividad = ?', [id]);
    }

    // static fetchVerProyectoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }

    // static fetchVerEmpleadoAct() {
    //     return db.execute('SELECT * FROM actividad a, proyecto p WHERE a.id_proyecto = p.id_proyecto');
    // }
}
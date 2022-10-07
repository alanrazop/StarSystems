const db = require('../util/database');

module.exports = class Registra {
    constructor( _duracion, _id_actividad,  _colab, _fecha){
        this.duracion = _duracion;
        this.id_actividad = _id_actividad;
        this.colab = _colab;
        this.fecha = _fecha;
    }


    static saveRegistra(actividad) {
        
        //return db.execute('cALL agregar_actividad  (?,?,?,?,?)', [actividad.descripcion, actividad.proyecto, actividad.duracion, actividad.colab, actividad.fecha])
        return db.execute('INSERT INTO registra (num_horas, id_actividad, id_empleado, fecha) VALUES  (?,?,?,?)', [actividad.duracion, actividad.id_actividad, actividad.colab, actividad.fecha])
    }

    static fetchAll (){
        return db.execute('SELECT * FROM registra WHERE id_actividad');
    }

    static fetchOneRegister(id){
        return db.execute('SELECT e.nombre FROM registra r, empleado e WHERE id_actividad = ? AND e.id_empleado = r.id_empleado', [id]);
    }

    static fetchListaEmpleadosDisponibles(id){
        return db.execute('SELECT * FROM empleado WHERE id_empleado NOT IN (SELECT r.id_empleado FROM registra r, empleado e WHERE id_actividad = ? AND e.id_empleado = r.id_empleado)', [id]);
    }

    static deleteColabReg(id){
        return db.execute('DELETE FROM registra WHERE id_empleado = ? AND id_actividad = ?;', [id.id_actividad, id.id_empleado]);
    }
}
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
}
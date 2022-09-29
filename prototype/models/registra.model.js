const db = require('../util/database');

module.exports = class Actividades {
    constructor( _id_actividad, _duracion, _colab, _fecha){
        this.id_actividad = _id_actividad;
        this.duracion = _duracion;
        this.colab = _colab;
        this.fecha = _fecha;
    }


    static saveRegistra(actividad) {
        
        //return db.execute('cALL agregar_actividad  (?,?,?,?,?)', [actividad.descripcion, actividad.proyecto, actividad.duracion, actividad.colab, actividad.fecha])
        return db.execute('INSERT INTO registra (num_horas, id_actividad, id_empleado, fecha) VALUES  (?,?,?,?,?)', [actividad.duracion, actividad.id_Actividad, actividad.colab, actividad.fecha])
    }
}
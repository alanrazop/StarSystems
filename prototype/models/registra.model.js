const db = require('../util/database');

module.exports = class Registra {
    constructor( _id_actividad, _duracion, _colab, _fecha){
        this.id_actividad = _id_actividad;
        this.duracion = _duracion;
        this.colab = _colab;
        this.fecha = _fecha;
    }


    static saveRegistra(actividad) {
        
        //return db.execute('cALL agregar_actividad  (?,?,?,?,?)', [actividad.descripcion, actividad.proyecto, actividad.duracion, actividad.colab, actividad.fecha])
        return db.execute('INSERT INTO registra (id_actividad, num_horas, id_empleado, fecha) VALUES  (?,?,?,?)', [actividad.id_Actividad, actividad.duracion, actividad.colab, actividad.fecha])
    }
}
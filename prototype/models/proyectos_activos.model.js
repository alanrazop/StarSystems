const db = require('../util/database');

function today_tendays() {
    const ms_per_day = 1000 * 60 * 60 * 24;
    const ten_days = ms_per_day * 8;
    let today = new Date();
    let ten_days_ago = Date.now() - ten_days;
    let date_ten_days_ago = new Date(ten_days_ago);
    let before = date_ten_days_ago.toISOString(); 
    let now = today.toISOString();
    now = now.slice(0,10)
    before = before.slice(0,10)
    let result = [now,before]; 
    return result;
}
let res = today_tendays();
const q1 = "SELECT nombre_proyecto, SUM(num_horas) as total_horas FROM `proyecto` p, `registra` r, `actividad` a WHERE r.id_actividad = a.id_actividad AND p.id_proyecto = a.id_proyecto AND p.is_activo = 1 AND r.fecha BETWEEN ";
const q2 = res[1];
const q3 = " AND "
const q4 = res[0];
const q5 = " GROUP BY nombre_proyecto;"
const quote = "'"

const query = q1+quote+q2+quote+q3+quote+q4+quote+q5;

module.exports = class proyectosActivos
{
    constructor(_nombre_proyecto_activo, _total_horas_proyecto){
        this.nombre_proyecto_activo = _nombre_proyecto_activo;
        this.total_horas_proyecto = _total_horas_proyecto;
    }
    
    static fetchAll()
    {
        return db.execute('Call proyectos_activos');
    }

    static fetchRecent() {
        return db.execute(""+query+"") 
    }
}

const db = require('../util/database');

// const labels = ["January", "February", "March"];

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(255, 99, 132)",
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };

// const config = {
//   type: "pie",
//   data: data,
//   options: {},
// };

// const myChart = new Chart(document.getElementById("myChart"), config);

//  considerar columna vacaciones tiempo medio en base de datos
module.exports = class Reporte{
    constructor(_vacaciones_reporte, _trabajadas_reporte, _tiempo_completo_reporte, _tiempo_medio_reporte, _coeficiente_efectividad, _fecha_inicio, _fecha_corte){
        this.vacaciones_reporte = _vacaciones_reporte;
        this.trabajadas_reporte = _trabajadas_reporte;
        this.tiempo_completo_reporte = _tiempo_completo_reporte;
        this.tiempo_medio_reporte = _tiempo_medio_reporte;
        this.coeficiente_efectividad = _coeficiente_efectividad;
        this.fecha_inicio = _fecha_inicio;
        this.fecha_corte = _fecha_corte;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM reporte');
    }

    static buscaReporte(u_fecha) {
        return db.execute('SELECT fecha_corte FROM reporte WHERE fecha_corte LIKE ?', ['%'+u_fecha+'%']);
    }
}
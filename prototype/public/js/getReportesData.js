
async function datosTablas() {
    const tabla1 = document.getElementById("table_1").getElementsByClassName('input');
    const tabla2 = document.getElementById("table_2").getElementsByClassName('input');
    const tabla3 = document.getElementById("table_3").getElementsByClassName('input');
    
    let datos_tabla = {
      labels: [],
      data: []
    }

    document.getElementsByName('proyect_names')
    .forEach(function (element) {
      datos_tabla.labels.push(element.outerText);
    });

    for (inputs of tabla1) {
    datos_tabla.data.push(inputs.value);
    }
    for (inputs of tabla2) {
      datos_tabla.labels.push(inputs.id);
      datos_tabla.data.push(inputs.value);
    }
    for (inputs of tabla3) {
      datos_tabla.labels.push(inputs.id);
      datos_tabla.data.push(inputs.value);
    }
    return datos_tabla;
}; 
  
async function getVars() {
    let variables_ajuste = [
      parseFloat(document.getElementById("coeficiente").value),
      parseInt(document.getElementById("ng_tm").value),
      parseInt(document.getElementById("ng_tc").value),
      parseInt(document.getElementById("v_tm").value),
      parseInt(document.getElementById("v_tc").value),
      parseInt(document.getElementById("horas_tc").value),
      parseInt(document.getElementById("horas_tm").value)
    ]
    return variables_ajuste;
};

async function createChart(array_of_labels, variables_ajuste, label_name_of_chart, type_of_chart, chart_data_label) {
    let ctx_live = document.getElementById("myChart");
    let myChart = new Chart(ctx_live, {
      type: type_of_chart,
      data: {
        labels: array_of_labels,
        datasets: [{
          data: variables_ajuste,
          borderWidth: 1,
          borderColor: '#00c0ef',
          label: chart_data_label,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: label_name_of_chart
          }
        },
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }
    });
    return myChart;
};

const resetCanvas = function () {
    document.getElementById('myChart').remove();
    document.getElementById('graph-container').innerHTML = '<canvas id="myChart"></canvas>';
    canvas = document.querySelector('#myChart');
    ctx = canvas.getContext('2d');
  };

async function renderChart() {
    resetCanvas();
    getVars()
      .then(async (vars) => { createChart(vars); })
      .catch(err => { console.log(err) })
}
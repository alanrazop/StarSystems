async function checkAjuste() {
    const ajustes = document.querySelectorAll('input#proy.input');
    let horas_proyectos = [];
    ajustes.forEach(element => {
        horas_proyectos.push(parseFloat(element.value))
    });
    const total = horas_proyectos.reduce((a, b) => a + b, 0);
    document.getElementById("horas_totales_ajustadas").childNodes[0].data = total.toFixed(3);
}

async function capTotal() {
    let updateValue= document.getElementById("personal_tm").value * document.getElementById("horas_tm").value +
    (document.getElementById("personal_tc").value * document.getElementById("horas_tc").value);
    document.getElementById("capacidad_total").value = updateValue.toFixed(3);
  }
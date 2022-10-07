async function checkAjuste() {
    const ajustes = document.querySelectorAll('input#proy.input');
    let horas_proyectos = [];
    ajustes.forEach(element => {
        horas_proyectos.push(parseFloat(element.value))
    });
    const total = horas_proyectos.reduce((a, b) => a + b, 0);

    // check for float 
    // code adapted from: 
    // Borislav Hadzhiev @ https://bobbyhadz.com/blog/javascript-check-if-value-is-float
    if (typeof(total) === 'number' && Number.isInteger(total)) {
        document.getElementById("horas_totales_ajustadas").childNodes[0].data = total;
    } else {
        document.getElementById("horas_totales_ajustadas").childNodes[0].data = total.toFixed(3);
    }
}

async function capTotal() {
    const updatedValue = (document.getElementById("personal_tm").value * document.getElementById("horas_tm").value) +
    (document.getElementById("personal_tc").value * document.getElementById("horas_tc").value);
    if (typeof(updatedValue) === 'number' && Number.isInteger(updatedValue)) {
        document.getElementById("capacidad_total").value = updatedValue;
    } else {
        document.getElementById("capacidad_total").value = updatedValue.toFixed(3);
    }
  }
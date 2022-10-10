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
        document.getElementById("proporcion").value = await horasAjustadas()/total;
        document.getElementById("porcentaje_verdadero").value = document.getElementById("proporcion").value / document.getElementById("coeficiente").value; 
    } else {
        document.getElementById("horas_totales_ajustadas").childNodes[0].data = total.toFixed(3);
        document.getElementById("proporcion").value = await horasAjustadas()/total;
        document.getElementById("porcentaje_verdadero").value = document.getElementById("proporcion").value / document.getElementById("coeficiente").value;
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

async function horasAjustadas() {
    let vac_tm = document.getElementById("v_tm").value / 7;
    let vac_tc = document.getElementById("v_tc").value / 7;
    let ng_tc  = document.getElementById("ng_tc").value * (document.getElementById("horas_tc").value / 7) ;
    let ng_tm  = document.getElementById("ng_tm").value * (document.getElementById("horas_tm").value / 7) ;
    let capTotal = (document.getElementById("personal_tm").value * document.getElementById("horas_tm").value) +
    (document.getElementById("personal_tc").value * document.getElementById("horas_tc").value);
    let capAjuste = capTotal - (vac_tm + vac_tc + ng_tc + ng_tm);
    document.getElementById("horas_esperadas").value = capAjuste;
    document.getElementById("vacaciones_totales").value = (vac_tm + vac_tc + ng_tc + ng_tm);
    return capAjuste;
}

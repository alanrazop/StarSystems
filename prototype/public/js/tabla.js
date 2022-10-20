function checkAjuste() {
    horasAjustadas();
    const ajustes = document.querySelectorAll('input#proy.input');
    let horas_ajuste = [];
    ajustes.forEach(element => {
        horas_ajuste.push(parseFloat(element.value))
    });
    const total_ajuste = horas_ajuste.reduce((a, b) => a + b, 0);
    
    const registrados = document.querySelectorAll('#registered_hours');
    let horas_registro = [];
    registrados.forEach(element => {
        horas_registro.push(parseFloat(element.innerText))
    });
    const total_registro = horas_registro.reduce((a, b) => a + b, 0);
    
    console.log(total_registro);
    document.getElementById("horas_totales_ajustadas").childNodes[0].data = total_ajuste;
    document.getElementById("proporcion").value = total_registro/document.getElementById("horas_esperadas").value;
    document.getElementById("porcentaje_verdadero").value = document.getElementById("proporcion").value / document.getElementById("coeficiente").value;

}

function capTotal() {
    const updatedValue = (document.getElementById("personal_tm").value * document.getElementById("horas_tm").value) +
        (document.getElementById("personal_tc").value * document.getElementById("horas_tc").value);
    if (typeof (updatedValue) === 'number' && Number.isInteger(updatedValue)) {
        document.getElementById("capacidad_total").value = updatedValue;
    } else {
        document.getElementById("capacidad_total").value = updatedValue.toFixed(3);
    }
}

function horasAjustadas() {
    let vac_tm = parseFloat(document.getElementById("v_tm").value / 7);
    let vac_tc = parseFloat(document.getElementById("v_tc").value / 7);
    let ng_tc = parseFloat(document.getElementById("ng_tc").value * (document.getElementById("horas_tc").value / 7));
    let ng_tm = parseFloat(document.getElementById("ng_tm").value * (document.getElementById("horas_tm").value / 7));
    let capTotal = parseFloat((document.getElementById("personal_tm").value * document.getElementById("horas_tm").value) +
        (document.getElementById("personal_tc").value * document.getElementById("horas_tc").value));
    let horas_esperadas = capTotal - (vac_tm + vac_tc + ng_tc + ng_tm);
    document.getElementById("horas_esperadas").value = horas_esperadas;
    document.getElementById("vacaciones_totales").value = (vac_tm + vac_tc + ng_tc + ng_tm);
}

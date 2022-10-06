async function checkAjuste() {
    const ajustes = document.querySelectorAll('input#proy.input');
    let horas_proyectos = [];
    ajustes.forEach(element => {
        horas_proyectos.push(parseFloat(element.value))
    });
    const total = horas_proyectos.reduce((a, b) => a + b, 0);
    console.log(total)
    let bod = document.getElementById("horas_totales_ajustadas").childNodes[0].data = total;
}

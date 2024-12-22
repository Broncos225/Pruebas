
const firebaseConfig = {
    apiKey: "AIzaSyB0Vyl_yglc57awrstiVEADAVdQJUapIPU",
    authDomain: "pruebasweb-77199.firebaseapp.com",
    projectId: "pruebasweb-77199",
    storageBucket: "pruebasweb-77199.firebasestorage.app",
    messagingSenderId: "737503707639",
    appId: "1:737503707639:web:71c10456f5ad69a9242ef2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

window.onload = function () {
    ocultarFilas("Juan Pablo Vidal Saldarriaga", ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"]);
    ocultarFilas("Yeison Torres Ochoa", ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]);
    ocultarFilas("Fray Guillermo Guerrero Hinestroza", ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"]);
    diaSemana();
    cargarDatos();
    colorCelda();
    Festivos();
    cambiarBordeColumna();
    contarTurnos();
};

function colorCelda() {
    const celdas = document.querySelectorAll('td');
    celdas.forEach(celda => {
        celda.addEventListener('input', () => {
            actualizarColorCelda(celda);
            guardarCelda(celda);
        });
        actualizarColorCelda(celda);
    });
}

function actualizarColorCelda(celda) {

    celda.style.color = '';
    var colorT1 = '#fcfb8d';
    var colorT2 = '#afed87';
    var colorT3 = '#87beed';
    var colorT4 = '#c5b4fa';
    var colorT5 = '#fcbdc4';
    var colorT6 = '#fc818d';
    var colorT7 = '#FFC85C';
    var colorTSA = '#FFA500';
    var colorAS = '#063970';
    var colorD = '#00e6db';
    var colorDV = '#88ed47';
    const texto = celda.textContent.trim();
    let color;
    switch (texto) {
        case 'LI':
            color = '#0c769e';
            break;

        case '':
            color = 'white';
            celda.style.color = 'black';
            break;
        case 'T1':
        case 'T1R1':
        case 'T1N':
        case 'T1D':
        case 'T1U':
        case 'T1T':
        case 'T1 - T1T':
            color = colorT1;
            celda.style.color = 'black';
            break;
        case 'T2':
        case 'T2R1':
        case 'T2N':
        case 'T2D':
        case 'T2U':
        case 'T2 - T2U':
            color = colorT2;
            celda.style.color = 'black';
            break;
        case 'T3':
        case 'T3R1':
        case 'T3N':
        case 'T3D':
        case 'T3AD':
            color = colorT3;
            celda.style.color = 'black';
            break;
        case 'T4':
        case 'T4R1':
        case 'T4N':
        case 'T4D':
        case 'T4A':
        case 'T4NA':
            color = colorT4;
            celda.style.color = 'black';
            break;
        case 'T5':
        case 'T5R1':
        case 'T5N':
        case 'T5D':
            color = colorT5;
            celda.style.color = 'black';
            break;
        case 'T6':
        case 'T6R1':
        case 'T6N':
        case 'T6D':
        case 'T6AD':
        case 'T6U':
            color = colorT6;
            celda.style.color = 'black';
            break;
        case 'T7':
        case 'T7R1':
            color = colorT7;
            celda.style.color = 'black';
            break;
        case 'D':
        case 'DF':
            if (!celda.classList.contains('titulos')) {
                color = 'white';
                celda.style.color = 'red';
            } else {
                color = colorD;
                celda.style.color = 'red';
            }
            break;
        case 'TSA':
            color = colorTSA;
            celda.style.color = 'black';
            break;
        case 'AS':
        case 'ASR1':
            color = colorAS;
            celda.style.color = 'white';
            break;
        case 'NN':
            color = 'gray';
            celda.style.color = 'gray';
            break;
        case 'R1':
            color = 'white';
            celda.style.color = 'black';
            break;
        case 'IN':
            color = 'red';
            celda.style.color = 'black';
            break;
        case 'DV':
            color = colorDV;
            celda.style.color = 'black';
            break;
        case 'T':
            color = colorT3;
            celda.style.color = 'black';
            break;
        case 'MD':
            color = colorT5;
            celda.style.color = 'black';
            break;
    }
    celda.style.backgroundColor = color;
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    guardarCeldas();
});

function guardarCeldas() {
    var passw = document.getElementById('pass').value;
    var contraseñaEncontrada = false;

    for (let agente in agentes) {
        if (agentes[agente].contraseña == passw) {
            contraseñaEncontrada = true;
            break;
        }
    }

    if (contraseñaEncontrada) {
        const celdas = document.querySelectorAll('#Table td');
        const mesSeleccionado = document.getElementById('Mes').selectedIndex + 1; // +1 porque los meses están 1-indexados
        const añoSeleccionado = document.getElementById('Año').value;

        celdas.forEach(celda => {
            const texto = celda.textContent.trim();
            const idCelda = celda.cellIndex + 1; // Obtén el índice de la celda (1-indexed)
            const nombreFila = celda.parentNode.cells[0].textContent.trim(); // Obtén el nombre del agente
            db.ref('celdas/' + nombreFila + '/' + idCelda + '/' + añoSeleccionado + '/' + mesSeleccionado).set({
                texto: texto,
            });
        });
        alert("Datos guardados");
        location.reload();
    } else {
        alert("Contraseña incorrecta");
        document.getElementById('pass').value = "";
    }
}



function cargarDatos() {
    const mesSeleccionado = document.getElementById('Mes').selectedIndex + 1; // Mes como número natural
    const añoSeleccionado = document.getElementById('Año').value;
    const filas = document.querySelectorAll('#Table tbody tr'); // Todas las filas con datos de empleados

    filas.forEach((fila) => {
        const nombreEmpleado = fila.cells[0].textContent.trim(); // Nombre del empleado (primera columna)

        // Iteramos sobre las celdas desde la segunda columna en adelante
        for (let dia = 1; dia <= 31; dia++) {
            const celda = fila.cells[dia]; // Columna correspondiente al día
            if (celda) {
                // Referencia al nodo del día en Firebase
                db.ref(`Empleados/${nombreEmpleado}/${añoSeleccionado}/${mesSeleccionado}/${dia}`).once('value')
                    .then(snapshot => {
                        const data = snapshot.val();
                        if (data && data.texto) {
                            celda.textContent = data.texto; // Actualizar el contenido de la celda
                            actualizarColorCelda(celda); // Cambiar el color según tus criterios
                        }
                    })
                    .catch(error => {
                        console.error(`Error al cargar datos para el empleado ${nombreEmpleado}, día ${dia}:`, error);
                    });
            }
        }
    });
}


function contDescansos() {
    var contA = 0, contB = 0, contC = 0, contD = 0, contE = 0, contF = 0, contG = 0;

    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('A' + i);
        if (celda.textContent == 'D') {
            contA += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('B' + i);
        if (celda.textContent == 'D') {
            contB += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('C' + i);
        if (celda.textContent == 'D') {
            contC += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('D' + i);
        if (celda.textContent == 'D') {
            contD += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('E' + i);
        if (celda.textContent == 'D') {
            contE += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('F' + i);
        if (celda.textContent == 'D') {
            contF += 1;
        }
    }
    for (var i = 1; i < 32; i++) {
        var celda = document.getElementById('G' + i);
        if (celda.textContent == 'D') {
            contG += 1;
        }
    }

    var celdaA = document.getElementById("1");
    celdaA.textContent = contA;
    var celdaB = document.getElementById("2");
    celdaB.textContent = contB;
    var celdaC = document.getElementById("3");
    celdaC.textContent = contC;
    var celdaD = document.getElementById("4");
    celdaD.textContent = contD;
    var celdaE = document.getElementById("5");
    celdaE.textContent = contE;
    var celdaF = document.getElementById("6");
    celdaF.textContent = contF;
    var celdaG = document.getElementById("7");
    celdaG.textContent = contG;
}



let agentes = {
    Anderson_Cano_Londoño: {
        nombre: "Anderson Cano Londoño",
        letra: "A",
        contraseña: ""
    },
    Yesica_Johana_Cano_Quintero: {
        nombre: "Yesica Johana Cano Quintero",
        letra: "B",
        contraseña: ""
    },
    Andrés_Felipe_Vidal_Medina: {
        nombre: "Andrés Felipe Vidal Medina",
        letra: "B",
        contraseña: ""
    },
    Andrés_Felipe_Yepes_Tascón: {
        nombre: "Andrés Felipe Yepes Tascón",
        letra: "D",
        contraseña: ""
    },
    Oscar_Luis_Cabrera_Pacheco: {
        nombre: "Oscar Luis Cabrera Pacheco",
        contraseña: ""
    },
    Juan_Pablo_Vidal_Saldarriaga: {
        nombre: "Juan Pablo Vidal Saldarriaga",
        contraseña: ""
    },
    Yeison_Torres_Ochoa: {
        nombre: "Yeison Torres Ochoa",
        contraseña: ""
    },
    Fray_Guillermo_Guerrero_Hinestroza: {
        nombre: "Fray Guillermo Guerrero Hinestroza",
        contraseña: ""
    },
    D: {
        nombre: "Descanso",
        contraseña: "D"
    },
    DF: {
        nombre: "Día de la familia",
        contraseña: "DF"
    },
    AS: {
        nombre: "Apoyo Sura",
        contraseña: "AS"
    }
}

let agentesExcluidos = ["D", "DF", "AS"];
for (let agente in agentes) {
    if (!agentesExcluidos.includes(agente)) {
        if (agentes[agente].contraseña == "") {
            let contraseña = firebase.database().ref('agentes/' + agente);
            contraseña.once('value').then(function (snapshot) {
                agentes[agente].contraseña = snapshot.val();
            }).catch(function (error) {
                // console.error("Error obteniendo las contraseñas: ", error);
            });
        }
    }
}

function ocultarFilas(nombre, mesesParam) {
    var valorSeleccionado = document.getElementById('Mes').value.trim().toLowerCase();
    var filas = document.getElementsByTagName('tr');
    nombre = nombre.trim().toLowerCase();

    var ocultarMes = mesesParam.map(mes => mes.toLowerCase()).includes(valorSeleccionado);

    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName('td');
        var nombreEncontrado = false;

        for (var j = 0; j < celdas.length; j++) {
            if (celdas[j].textContent.trim().toLowerCase() === nombre) {
                nombreEncontrado = true;
                break;
            }
        }

        if (nombreEncontrado) {
            filas[i].style.display = ocultarMes ? 'none' : '';

            var elementoRelacionado = document.getElementById(i - 2);
            if (elementoRelacionado) {
                elementoRelacionado.parentElement.style.display = ocultarMes ? 'none' : '';
            }
        }
    }
}


var selector = document.getElementById('Mes');
selector.addEventListener('change', function () {
    ocultarFilas("Andrés Felipe Vidal Medina", ["Junio", "Julio", "Agosto"]);
    ocultarFilas("Nuevo", ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]);
    ocultarFilas("Juan Pablo Vidal Saldarriaga", ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"]);
    ocultarFilas("Yeison Torres Ochoa", ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]);
    ocultarFilas("Fray Guillermo Guerrero Hinestroza", ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"]);
});



const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var titulo = document.getElementById("titulos");
var selectMes = document.getElementById('Mes');
var selectAño = document.getElementById('Año');

var mesActual = new Date().getMonth();
var currentYear = new Date().getFullYear();

selectMes.selectedIndex = mesActual;
titulo.textContent = nombresMeses[mesActual];
cargarDatos();

for (let i = 0; i < selectAño.options.length; i++) {
    if (+selectAño.options[i].value === currentYear) {
        selectAño.selectedIndex = i;
        break;
    }
}

selectMes.addEventListener('change', function () {
    var mesSeleccionado = selectMes.selectedIndex;
    titulo.textContent = nombresMeses[mesSeleccionado];
    cargarDatos();
    diaSemana();
    Festivos();
    cambiarBordeColumna();
});

selectAño.addEventListener('change', function () {
    var mesSeleccionado = selectMes.selectedIndex;
    titulo.textContent = nombresMeses[mesSeleccionado];
    cargarDatos();
    diaSemana();
    Festivos();
    cambiarBordeColumna();
});

function diaSemana() {
    var año = document.getElementById('Año').value;
    var mes = document.getElementById('Mes').value;
    var dias = ['D', 'L', 'M', 'M', 'J', 'V', 'S']; // Iniciales de los días de la semana

    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var mesNumero = meses.indexOf(mes);
    var celdas = document.getElementsByClassName('DiaSemana');
    for (var i = 1; i < celdas.length + 1; i++) {
        var fecha = new Date(año, mesNumero, i);
        var dia = fecha.getDay();
        if (celdas[i - 1]) {
            celdas[i - 1].textContent = dias[dia];
        } else {
        }
    }
    colorCelda();
}

function contHoras() {
    var contadores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
    var tiposTurno7_5 = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    var tiposTurno8 = ['T1N', 'T2N', 'T3N', 'T4N', 'T5N', 'T6N', 'TSA', 'DF'];
    var tiposTurno0 = ['NN', 'D', 'DV'];
    var tiposTurno8_5 = ['T2U'];
    var tiposTurno9_5 = ['T1T'];
    var tiposTurno6_5 = ['T6U'];
    const tiposTurno5 = ['T4NA'];
    var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    letras.forEach(function (letra) {
        for (var i = 1; i < 32; i++) {
            var celda = document.getElementById(letra + i);
            var contenido = celda.textContent;
            if (tiposTurno7_5.includes(contenido)) {
                contadores[letra] += 7.5;
            } else if (tiposTurno8.includes(contenido)) {
                contadores[letra] += 8;
            } else if (tiposTurno8_5.includes(contenido)) {
                contadores[letra] += 8.5;
            } else if (tiposTurno6_5.includes(contenido)) {
                contadores[letra] += 6.5;
            } else if (tiposTurno9_5.includes(contenido)) {
                contadores[letra] += 9.5;
            } else if (tiposTurno5.includes(contenido)) {
                contadores[letra] += 5;
            }
        }
    });

    letras.forEach(function (letra, index) {
        var celda = document.getElementById((index + 11).toString());
        celda.textContent = contadores[letra];
    });
}



const checkInterval = 200;
function checkScrollbar(el) {
    return el.offsetWidth < el.scrollWidth;
}
function cambiarPaddingSegunScroll() {
    if (window.innerWidth <= 810) {
        return;
    }

    const tabla = document.getElementById('Tabla');
    const otroDiv = document.getElementById('TablaDescansos');

    otroDiv.style.paddingBottom = checkScrollbar(tabla) ? '17px' : '0px';
}

cambiarPaddingSegunScroll();

setInterval(() => {
    cambiarPaddingSegunScroll();
}, checkInterval);



function Importar() {
    let confirmacion = confirm("¿Está seguro de que desea pegar los datos del portapapeles en la tabla?");
    if (!confirmacion) {
        return;
    }
    navigator.clipboard.readText()
        .then(data => {
            const dataArray = data.split('\n');
            const table = document.getElementById("Table");
            let rows = table.rows;
            let currentRow = 3; // Comienza después de las primeras 3 filas
            let currentCell = 1;

            dataArray.forEach(item => {
                let itemArray = item.split('\t'); // Divide cada línea por el carácter de tabulación
                itemArray.forEach(subItem => {
                    // Asegúrate de no exceder el número de filas disponibles
                    if (currentRow >= rows.length) {
                        console.error('No hay suficientes filas en la tabla para importar todos los datos.');
                        return; // Salir si no hay más filas disponibles
                    }
                    // Verifica si la fila actual está oculta (display: none)
                    if (rows[currentRow].style.display === 'none') {
                        // Si la fila está oculta, pasa a la siguiente fila
                        currentRow++;
                        currentCell = 1; // Reinicia el índice de celdas para la nueva fila
                    }
                    let cell = rows[currentRow].cells[currentCell]; // Obtiene la celda de la fila y columna actual
                    if (!cell.textContent.trim()) { // Si la celda está vacía
                        cell.textContent = subItem; // Agrega el valor en la celda
                        colorCelda(currentRow, currentCell); // Asumiendo que colorCelda ahora toma fila y celda como argumentos
                    }
                    currentCell++;
                    if (currentCell >= rows[currentRow].cells.length) {
                        currentCell = 1;
                        currentRow++;
                    }
                });
            });
        })
        .catch(error => {
            console.error('Failed to read clipboard data:', error);
        });
}

document.getElementById("btnImportar").addEventListener("click", Importar);

function limpiarCeldasEditables() {
    let celdasEditables = document.querySelectorAll('[contenteditable="true"]');

    celdasEditables.forEach(function (celda) {
        celda.textContent = '';
    });
    colorCelda()
}

document.getElementById('btnLimpiar').addEventListener('click', limpiarCeldasEditables);

function ExportaraTexto() {
    var nombreAsesorActual = localStorage.getItem("nombreAsesorActual");
    if (!nombreAsesorActual) {
        alert("Por favor seleccione un asesor para exportar los datos");
        return;
    }

    let confirmacion = confirm("¿Está seguro de que desea copiar los datos de la tabla al portapapeles?");
    if (!confirmacion) {
        return;
    }
    var Letra = agentes[nombreAsesorActual].letra;
    let texto = "";
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var horariosTurnos = {
        "T1": "7:00 - 4:00",
        "T2": "9:00 - 6:00",
        "T3": "09:30 - 6:30",
        "T4": "10:00 - 7:00",
        "T5": "11:00 - 8:00",
        "T6": "12:30 - 9:30",
        "T7": "8:00 - 5:00",
        "TSA": "8:00 - 4:00",
        "T2R1": "10:00 - 6:00",
        "T3R1": "10:30 - 6:30",
        "T4R1": "11:00 - 7:00",
        "T5R1": "12:00 - 8:00",
        "T6R1": "1:30 - 9:30",
        "T7R1": "9:00 - 5:00",
        "NN": "Ninguno",
        "D": "Descanso",
        "AS": "Apoyo Sura 06:30 am - 05:00 pm",
        "ASR1": "Apoyo Sura 06:30 am - 04:00 pm",
        "DF": "Día de la familia",
        "IN": "Incapacidad",
        "DV": "Vacaciones",
        "T": "Tramites",
        "MD": "Medio día",
    }
    agentes[nombreAsesorActual].nombre;
    var mes = document.getElementById("Mes").value;
    texto += "Turnos de " + agentes[nombreAsesorActual].nombre + " en " + mes + ":" + "\n" + "\n";
    for (let i = 1; i <= 31; i++) {
        var turno = document.getElementById(Letra + i).textContent;
        var horario = horariosTurnos[turno];
        var dia = document.getElementById("Dia" + i).textContent;
        var numeroMes = meses.indexOf(mes);
        var ano = document.getElementById("Año").value;
        var fecha = new Date(ano, numeroMes, dia);
        if (isNaN(fecha.getTime())) {
            alert("Fecha inválida: " + ano + "-" + mes + "-" + dia);
            return;
        }
        var diaSemana = fecha.getDay();

        var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        diaSemana = diasSemana[diaSemana];

        texto += diaSemana + " " + dia + ": (" + turno + ") " + horario + "\n";
    }
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Datos copiados al portapapeles");
        })
        .catch(error => {
            console.error('Falla en la copia en el portapeles', error);
        });
}

document.getElementById("btnExportarTexto").addEventListener("click", ExportaraTexto);

function Festivos() {
    var mes = document.getElementById("Mes").value;
    var ano = document.getElementById("Año").value;
    var festivos2024 = {
        "Enero": [1, 8],
        "Febrero": [],
        "Marzo": [25, 28, 29],
        "Abril": [],
        "Mayo": [1, 13],
        "Junio": [3, 10],
        "Julio": [1, 20],
        "Agosto": [7, 19],
        "Septiembre": [],
        "Octubre": [14],
        "Noviembre": [4, 11],
        "Diciembre": [8, 25]
    }
    const fecha = new Date();
    const dia = "Dia" + fecha.getDate();
    const nombresDeMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const mesActual = nombresDeMeses[fecha.getMonth()];
    for (let i = 1; i <= 31; i++) {
        var celda = document.getElementById("Dia" + i);
        celda.style.backgroundColor = "#00e6db";
        celda.style.color = "Black";
        if (festivos2024[mes].includes(i)) {
            if (dia == "Dia" + i) {
                celda.style.backgroundColor = "orange";
                celda.style.color = "red";
            } else {
                celda.style.backgroundColor = "red";
                celda.style.color = "Black";
            }
        } else if (dia == "Dia" + i && mes == mesActual) {
            celda.style.backgroundColor = "#0051e6";
            celda.style.color = "white";
        }
    }
}

var botonIzq = document.getElementById('Izq');
var botonHoy = document.getElementById('Hoy');
var botonDer = document.getElementById('Der');

botonIzq.addEventListener('click', function () {
    if (selectMes.selectedIndex > 0) {
        selectMes.selectedIndex--;
        selectMes.dispatchEvent(new Event('change'));
    }
});

botonHoy.addEventListener('click', function () {
    var fechaActual = new Date();
    var mesActual = fechaActual.getMonth();
    selectMes.selectedIndex = mesActual;
    selectMes.dispatchEvent(new Event('change'));
});

botonDer.addEventListener('click', function () {
    if (selectMes.selectedIndex < selectMes.options.length - 1) {
        selectMes.selectedIndex++;
        selectMes.dispatchEvent(new Event('change'));
    }
});

function eliminarBordes() {
    const todasLasCeldas = document.querySelectorAll('#Table th, #Table td');
    todasLasCeldas.forEach(celda => {
        celda.style.border = 'none';
    });
}

function cambiarBordeColumna() {
    // Eliminar bordes derechos existentes de todas las celdas y encabezados
    const todasLasCeldas = document.querySelectorAll('#Table th, #Table td');
    todasLasCeldas.forEach(celda => {
        celda.style.borderRight = 'none';
    });

    // Verificar si la segunda fila contiene 'D' y en qué columnas
    const segundaFila = document.querySelector('#Table tr:nth-child(2)');
    if (segundaFila) {
        const celdasSegundaFila = segundaFila.querySelectorAll('td');
        celdasSegundaFila.forEach((celda, index) => {
            if (celda.textContent.trim() === 'D') {
                const columnIndex = index + 2;
                const columnCeldas = document.querySelectorAll(`#Table th:nth-child(${columnIndex}), #Table td:nth-child(${columnIndex})`);
                columnCeldas.forEach((celda, idx) => {
                    if (idx === 0 || idx === 1) { // Índices 0 y 1 corresponden a las dos primeras filas (th y primera td)
                        celda.style.borderRight = '1px solid Black';
                    } else {
                        celda.style.borderRight = '1px solid #000';
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var boton = document.querySelector('#menuButton');
    var botonesHerramientas = document.querySelector('#BotonesHerramientas');
    botonesHerramientas.style.display = 'none'
    boton.addEventListener('click', function () {
        if (botonesHerramientas.style.display === 'none') {
            botonesHerramientas.style.display = 'flex';
        } else {
            botonesHerramientas.style.display = 'none';
        }
    });
});

function exportarIcs() {
    var nombreAsesor = document.getElementById('AsesorActual').textContent;
    var prefijo = "Bienvenido/a ";
    if (nombreAsesor.startsWith(prefijo)) {
        nombreAsesor = nombreAsesor.substring(prefijo.length);
    }

    var horariosTurnos = {
        "T1N": "7:00 AM - 4:00 PM",
        "T2N": "9:00 AM - 6:00 PM",
        "T3N": "09:30 AM - 6:30 PM",
        "T4N": "10:00 AM - 7:00 PM",
        "T5N": "11:00 AM - 8:00 PM",
        "T6N": "12:30 PM - 9:30 PM",
        "TSA": "8:00 AM - 4:00 PM",
        "T1": "7:00 AM - 3:30 PM",
        "T2": "9:00 AM - 5:30 PM",
        "T3": "09:30 AM - 6:00 PM",
        "T4": "10:00 AM - 6:30 PM",
        "T5": "11:00 AM - 7:30 PM",
        "T6": "1:00 PM - 9:30 PM",
        "T2R1": "10:00 AM - 6:00 PM",
        "T3R1": "10:30 AM - 6:30 PM",
        "T4R1": "11:00 AM - 7:00 PM",
        "T5R1": "12:00 PM - 8:00 PM",
        "T6R1": "1:30 PM - 9:30 PM",
        "T7R1": "9:00 AM - 5:00 PM",
        "NN": "Ninguno",
        "D": "Descanso",
        "AS": "Apoyo Sura 06:30 AM - 05:00 PM",
        "ASR1": "Apoyo Sura 06:30 AM - 04:00 PM",
        "DF": "Día de la familia",
        "IN": "Incapacidad",
        "DV": "Vacaciones",
        "T": "Tramites",
        "MD": "Medio día"
    };

    var meses = {
        "enero": 0,
        "febrero": 1,
        "marzo": 2,
        "abril": 3,
        "mayo": 4,
        "junio": 5,
        "julio": 6,
        "agosto": 7,
        "septiembre": 8,
        "octubre": 9,
        "noviembre": 10,
        "diciembre": 11
    };

    var mesTexto = document.getElementById('Mes').value.toLowerCase();
    var mes = meses[mesTexto];
    var año = parseInt(document.getElementById('Año').value);
    var table = document.getElementById('Table');
    var cal = ics();

    if (mes === undefined) {
        console.log(`Mes no válido: ${mesTexto}`);
        return;
    }

    function convertTo24Hour(time) {
        var [time, modifier] = time.split(' ');
        var [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
    }

    for (var i = 1, row; row = table.rows[i]; i++) {
        var nombre = row.cells[0].innerText;
        if (nombre === nombreAsesor) {
            for (var j = 1, cell; cell = row.cells[j]; j++) {
                var turno = cell.innerText.trim();
                if (turno === "NN") {
                    continue;
                } else if (horariosTurnos[turno]) {
                    var horario = horariosTurnos[turno];
                    if (turno === "D") {
                        var fecha = new Date(año, mes, j);
                        var start = new Date(fecha.setHours(0, 0, 0));
                        var end = new Date(fecha.setHours(23, 59, 59));
                        cal.addEvent('Descanso', `Día de descanso para ${nombreAsesor}`, 'Casa', start, end);
                    } else if (horario.includes(" - ")) {
                        var fecha = new Date(año, mes, j);
                        var [horaInicio, horaFin] = horario.split(" - ");
                        horaInicio = convertTo24Hour(horaInicio);
                        horaFin = convertTo24Hour(horaFin);
                        var [horaInicioH, horaInicioM] = horaInicio.split(':');
                        var [horaFinH, horaFinM] = horaFin.split(':');
                        var start = new Date(fecha.setHours(horaInicioH, horaInicioM));
                        var end = new Date(fecha.setHours(horaFinH, horaFinM));
                        cal.addEvent(`Turno ${turno}`, `Turno ${turno} para ${nombreAsesor}`, 'Arus', start, end);
                    } else {
                        console.log(`Horario no válido para el turno ${turno}: ${horario}`);
                    }
                } else {
                    var fecha = new Date(año, mes, j);
                    var start = new Date(fecha.setHours(0, 0, 0));
                    var end = new Date(fecha.setHours(23, 59, 59));
                    cal.addEvent('Turno diferente', `Turno diferente para ${nombreAsesor}`, 'Arus', start, end);
                }
            }
            break;
        }
    }

    cal.download(`${nombreAsesor}_horarios`);
}


function contarTurnos() {
    const rootRef = db.ref('celdas');
    rootRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            console.error('No se encontraron datos en la base de datos.');
            return;
        }

        const agentesA = {
            "anderson.cano": { nombre: "Anderson_Cano_Londoño" },
            "yesica.cano": { nombre: "Yesica_Johana_Cano_Quintero" },
            "andres.vidal": { nombre: "Andrés_Felipe_Vidal_Medina" },
            "andres.yepes": { nombre: "Andrés_Felipe_Yepes_Tascón" },
            "yeison.torres": { nombre: "Yeison_Torres_Ochoa" },
            "juan.vidal": { nombre: "Juan_Pablo_Vidal_Saldarriaga" },
            "fray.guerrero": { nombre: "Fray_Guillermo_Guerrero_Hinestroza" },
        };

        const table = document.getElementById('Table1');

        for (let agente in agentesA) {
            const nombre = agentesA[agente].nombre;
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = agentes[nombre].nombre;
            cell2.textContent = 0;
            cell2.id = `Turnos${nombre}`;
        }


    }, (error) => {
        // console.error('Error al leer los datos de la base de datos:', error);
    });
}



document.getElementById("btnExportar").addEventListener("click", exportarExcel);

function exportarExcel() {
    var table = document.getElementById("Table");
    var wb = XLSX.utils.table_to_book(table);
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Horarios.xlsx");
}






const condiciones = {
    // Turnos que nadie puede tener
    turnosExcluidos: ["T4NA", "T1T", "IN", "DF", "DV"],

    // Exclusiones por empleado específico
    exclusionesEmpleados: {
        "Yesica Johana Cano Quintero": ["T1N", "T4N"],
        "Juan Pablo Vidal Saldarriaga": ["T6", "T6N", "T5", "T5N"]
    },

    // Prohibiciones por día
    prohibicionesPorDia: {
        domingo: ["T1", "T1N"],
        sábado: ["T1", "T1N"]
    },

    // Límite de turnos nocturnos por semana (incluyendo TSA)
    limiteSemanalN: 2
};


document.getElementById("generar").addEventListener("click", async () => {
    await GenerarHorario(condiciones);  // Espera a que termine esta función
    cargarDatos();           // Luego ejecuta la siguiente función
});

async function GenerarHorario(condiciones = {}) {
    const turnos = {
        T1: "07:00 a 03:30",
        T1N: "07:00 a 04:00",
        T1T: "07:00 a 05:30",
        T2: "09:00 a 05:30",
        T2N: "09:00 a 06:00",
        T3: "10:00 a 06:30",
        T3N: "09:30 a 06:30",
        T4: "10:30 a 07:00",
        T4N: "10:00 a 07:00",
        T4NA: "10:00 a 03:00",
        T5: "11:30 a 08:00",
        T5N: "11:00 a 08:00",
        T6: "01:00 a 09:30",
        T6N: "12:30 a 09:30",
        TSA: "08:00 a 04:00",
        D: "Descanso",
        DF: "Día Familiar",
        DV: "Día Vacaciones",
        IN: "Incapacidad"
    };

    const empleados = ["Yesica Johana Cano Quintero", "Andrés Felipe Vidal Medina", "Andrés Felipe Yepes Tascón", "Juan Pablo Vidal Saldarriaga", "Yeison Torres Ochoa", "Fray Guillermo Guerrero Hinestroza"];
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = String(fechaActual.getMonth() + 1);
    const díasEnMes = new Date(añoActual, fechaActual.getMonth() + 1, 0).getDate();

    // Inicializamos los horarios para cada empleado
    const horarios = empleados.map(() => Array(díasEnMes).fill(null));

    function obtenerDiaSemana(dia) {
        const fecha = new Date(añoActual, fechaActual.getMonth(), dia);
        const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        return diasSemana[fecha.getDay()];
    }

    function esDiaLaboral(dia) {
        const diaSemana = obtenerDiaSemana(dia);
        return !['sábado', 'domingo'].includes(diaSemana);
    }

    function hayTurnoTipoEnDia(dia, tipo) {
        return empleados.some((_, index) => {
            const turno = horarios[index][dia];
            return turno && turno.startsWith(tipo);
        });
    }

    function contarDescansosEnSemana(turnosEmpleado, diaInicio, diaFin) {
        return turnosEmpleado.slice(diaInicio, diaFin + 1)
            .filter(t => t === 'D' || t === 'DF' || t === 'DV')
            .length;
    }

    function contarTurnosNocturnos(turnosEmpleado, diaInicio, diaFin) {
        return turnosEmpleado.slice(diaInicio, diaFin + 1)
            .filter(turno => turno && (turno.includes('N') || turno === 'TSA'))
            .length;
    }

    function hayDescansoEnDia(dia) {
        return empleados.some((_, index) => {
            const turno = horarios[index][dia];
            return turno === 'D' || turno === 'DF' || turno === 'DV';
        });
    }

    function cumpleCondiciones(empleado, dia, turno) {
        const diaSemana = obtenerDiaSemana(dia);
        const diaIndex = dia - 1;

        // 1. Validar descansos
        if (['D', 'DF', 'DV'].includes(turno)) {
            // No permitir más de un descanso por día
            if (hayDescansoEnDia(diaIndex)) {
                return false;
            }

            // Validar límite semanal de descansos
            const semanaInicio = Math.max(0, Math.floor(diaIndex / 7) * 7);
            const semanaFin = Math.min(díasEnMes - 1, semanaInicio + 6);
            if (contarDescansosEnSemana(horarios[empleado], semanaInicio, semanaFin) > 0) {
                return false;
            }
        }

        // 2. Validar TSA
        if (diaSemana === 'sábado') {
            if (turno === 'TSA' && hayTurnoTipoEnDia(diaIndex, 'TSA')) {
                return false;
            }
            if (turno !== 'TSA' && !hayTurnoTipoEnDia(diaIndex, 'TSA')) {
                return false;
            }
        } else if (turno === 'TSA') {
            return false;
        }

        // 3. Validar turnos T1 y T6 en días laborales
        if (esDiaLaboral(dia)) {
            // Si es un turno T1 o T6, verificar que no haya otro del mismo tipo
            if (turno.startsWith('T1') && hayTurnoTipoEnDia(diaIndex, 'T1')) {
                return false;
            }
            if (turno.startsWith('T6') && hayTurnoTipoEnDia(diaIndex, 'T6')) {
                return false;
            }

            // Si es el último empleado del día y aún no hay T1 o T6, forzar uno
            const esUltimoEmpleado = empleado === empleados.length - 1;
            if (esUltimoEmpleado) {
                const faltaT1 = !hayTurnoTipoEnDia(diaIndex, 'T1');
                const faltaT6 = !hayTurnoTipoEnDia(diaIndex, 'T6');

                if (faltaT1 && !turno.startsWith('T1')) return false;
                if (faltaT6 && !turno.startsWith('T6')) return false;
            }
        }

        // 4. Validar turnos nocturnos
        if ((turno.includes('N') || turno === 'TSA') && condiciones.limiteSemanalN) {
            const semanaInicio = Math.max(0, Math.floor(diaIndex / 7) * 7);
            const semanaFin = Math.min(díasEnMes - 1, semanaInicio + 6);
            if (contarTurnosNocturnos(horarios[empleado], semanaInicio, semanaFin) >= condiciones.limiteSemanalN) {
                return false;
            }
        }

        // 5. Validar exclusiones personales
        if (condiciones.exclusionesEmpleados?.[empleados[empleado]]?.includes(turno)) {
            return false;
        }

        // 6. Validar turnos excluidos generales
        if (condiciones.turnosExcluidos?.includes(turno)) {
            return false;
        }

        // 7. Validar prohibiciones por día
        if (condiciones.prohibicionesPorDia?.[diaSemana]?.includes(turno)) {
            return false;
        }

        return true;
    }

    // Estrategia de generación por fases
    async function generarHorarios() {
        // Fase 1: Asignar TSA para sábados
        for (let dia = 0; dia < díasEnMes; dia++) {
            if (obtenerDiaSemana(dia + 1) === 'sábado') {
                let asignado = false;
                for (let emp = 0; emp < empleados.length && !asignado; emp++) {
                    if (cumpleCondiciones(emp, dia + 1, 'TSA')) {
                        horarios[emp][dia] = 'TSA';
                        asignado = true;
                    }
                }
            }
        }

        // Fase 2: Asignar turnos T1 y T6 rotativos por semana
        for (let semana = 0; semana < Math.ceil(díasEnMes / 7); semana++) {
            const empleadosT1 = empleados.slice(semana * 2, semana * 2 + 2); // Dos personas por semana para T1
            const empleadosT6 = empleados.slice(semana * 2 + 2, semana * 2 + 4); // Dos personas por semana para T6

            for (let empT1 of empleadosT1) {
                const empIndex = empleados.indexOf(empT1);
                for (let dia = semana * 7; dia < (semana + 1) * 7 && dia < díasEnMes; dia++) {
                    if (cumpleCondiciones(empIndex, dia + 1, 'T1')) {
                        horarios[empIndex][dia] = 'T1';
                    }
                }
            }

            for (let empT6 of empleadosT6) {
                const empIndex = empleados.indexOf(empT6);
                for (let dia = semana * 7; dia < (semana + 1) * 7 && dia < díasEnMes; dia++) {
                    if (cumpleCondiciones(empIndex, dia + 1, 'T6')) {
                        horarios[empIndex][dia] = 'T6';
                    }
                }
            }
        }

        // Fase 3: Asignar turnos regulares y descansos
        for (let dia = 0; dia < díasEnMes; dia++) {
            for (let emp = 0; emp < empleados.length; emp++) {
                if (horarios[emp][dia] !== null) continue;

                let turnoAsignado = false;
                const turnosDisponibles = Object.keys(turnos)
                    .filter(t => t !== 'TSA') // TSA ya se manejó
                    .sort(() => Math.random() - 0.5); // Mezclar aleatoriamente

                // Si no se asignó un turno, intentar con descansos
                for (const turno of turnosDisponibles) {
                    if (cumpleCondiciones(emp, dia + 1, turno)) {
                        horarios[emp][dia] = turno;
                        turnoAsignado = true;
                        break;
                    }
                }

                // Si aún no se ha asignado turno, intentar asignar descanso
                if (!turnoAsignado) {
                    if (cumpleCondiciones(emp, dia + 1, 'D')) {
                        horarios[emp][dia] = 'D';
                    }
                }
            }
        }

        // Fase 4: Garantizar descanso para todos
        for (let emp = 0; emp < empleados.length; emp++) {
            let descansos = horarios[emp].filter(turno => ['D', 'DF', 'DV'].includes(turno));
            if (descansos.length === 0) {
                for (let dia = 0; dia < díasEnMes; dia++) {
                    if (cumpleCondiciones(emp, dia + 1, 'D')) {
                        horarios[emp][dia] = 'D';
                        break;
                    }
                }
            }
        }
    }



    // Generar horarios
    await generarHorarios();

    // Subir a Firebase
    try {
        for (let i = 0; i < empleados.length; i++) {
            const empleado = empleados[i];
            const ruta = `Empleados/${empleado}/${añoActual}/${mesActual}/`;
            const datosDias = {};

            horarios[i].forEach((turno, día) => {
                datosDias[día + 1] = { texto: turno };
            });

            await db.ref(ruta).update(datosDias);
            console.log(`Horario generado correctamente para ${empleado}.`);
        }
    } catch (error) {
        console.error('Error al guardar los horarios:', error);
        throw error;
    }

    return horarios;
}

// Array con las notas ingresadas por el usuario.
const notas = [];

// Función para agregar una nota a la tabla.
function agregarNota(id, listaNotas) {

    let Tbl = document.getElementById("tablaNotas");

    let hilera = document.createElement("tr");

    let celdaId = document.createElement("td");
    celdaId.appendChild(document.createTextNode(id));
    hilera.appendChild(celdaId);

    for (let i = 0; i < listaNotas.length; i++) {

        let celdaNota = document.createElement("td");
        let textoCelda = document.createTextNode(listaNotas[i]);

        celdaNota.appendChild(textoCelda);
        hilera.appendChild(celdaNota);

    }

    let celdaPromedio = document.createElement("td");
    let calcularPromedio = () => {
        let sumaNotas = 0;
        for (let i = 0; i < listaNotas.length; i++) {
            sumaNotas += parseInt(listaNotas[i]);
        }
        return sumaNotas / listaNotas.length;
    }

    let promedio = calcularPromedio();
    celdaPromedio.appendChild(document.createTextNode(promedio));
    hilera.appendChild(celdaPromedio);

    let celdaAprobado = document.createElement("td");
    let aprobado = (promedio > 60) ? "Si" : "No";
    celdaAprobado.appendChild(document.createTextNode(aprobado));
    hilera.appendChild(celdaAprobado);
    Tbl.appendChild(hilera);

    let notaAlumno = { "id": id, "nota1": listaNotas[0], "nota2": listaNotas[1], "nota3": listaNotas[2] };
    notas.push(notaAlumno);

}

// Función para abrir una alerta en caso de error.
async function mostrarError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'warning',
    });

}

// Función para comenzar a pedir los datos.
async function pedirDatos() {
    let id;
    let notas = [];
    Swal.fire({
        title: 'Ingresar ID',
        input: 'text',
        inputLabel: 'Ingrese el ID del alumno:',
        showCancelButton: true,
        inputValidator: (value) => {
            if (value) {
                id = value;
            }
        }
    }).then(() => {
        pedirNota(0, id, notas);
    })
}

// Función para abrir los prompts de pedirle las 3 notas al usuario.
async function pedirNota(indiceNota, id, notas) {
    correcto = true;
    Swal.fire({
        title: `Ingresar la nota número ${indiceNota + 1}: (1-100)`,
        input: 'text',
        showCancelButton: true,
        inputValidator: (valorNota) => {
            if (valorNota >= 1 && valorNota <= 100) {
                notas[indiceNota] = parseInt(valorNota);
            } else {
                mostrarError("Número no válido.");
                correcto = false;
                return;
            }
        }
    }).then(() => {
        if (indiceNota < 2) {
            pedirNota(indiceNota + 1, id, notas);
        } else if (correcto) {
            agregarNota(id, notas);
        }
    });
}

// Función para cargar los estudiantes desde una API.
async function obtenerEstudiantes() {
    let estudiantes = await fetch('https://api.hatchways.io/assessment/students')
        .then(response => response.json())
        .then(data => data.students.forEach(estudiante => {
            let notas = estudiante.grades;
            let id = estudiante.id;
            agregarNota(id, notas.slice(0, 3))
        }));
}


// Guarda las notas ingresadas por el usuario en el almacenamiento local.
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

// Cierra la sesión del usuario.
function cerrarSesion() {
    guardarLocal(listaNotas);
}

// Función de inicio de sesión.
function iniciarSesion() {
    let username = document.getElementById('username').value;
    sessionStorage.setItem("username", username);

}

// Guardar nombre en el span del navbar
window.addEventListener('load', function () {
    let nombreGuardado = sessionStorage.getItem('username');
    if (nombreGuardado) {
        let span = document.getElementById("username");
        span.textContent = nombreGuardado;
    }

    obtenerEstudiantes();
});
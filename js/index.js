const notas = [];

function agregarNota(listaNotas) {

    let Tbl = document.getElementById("tablaNotas");

    let hilera = document.createElement("tr");

    let celdaId = document.createElement("td");
    celdaId.appendChild(document.createTextNode(listaNotas[0]));
    hilera.appendChild(celdaId);

    for (let i = 1; i < listaNotas.length; i++) {

        let celdaNota = document.createElement("td");
        let textoCelda = document.createTextNode(listaNotas[i]);

        celdaNota.appendChild(textoCelda);
        hilera.appendChild(celdaNota);

    }

    let celdaPromedio = document.createElement("td");
    let calcularPromedio = () => {
        let sumaNotas = 0;
        for (let i = 1; i < listaNotas.length; i++) {
            sumaNotas += listaNotas[i];
        }
        return sumaNotas / listaNotas.length;
    }

    let promedio = calcularPromedio();
    celdaPromedio.appendChild(document.createTextNode(promedio));
    hilera.appendChild(celdaPromedio);

    let celdaAprobado = document.createElement("td");
    let aprobado = (promedio > 6) ? "Si" : "No";
    celdaAprobado.appendChild(document.createTextNode(aprobado));
    hilera.appendChild(celdaAprobado);
    Tbl.appendChild(hilera);

    let notaAlumno = { "id": listaNotas[0], "nota1": listaNotas[1], "nota2": listaNotas[2], "nota3": listaNotas[3] };
    notas.push(notaAlumno);

}

function pedirNotas() {
    let notas = [];
    let id = prompt("Ingrese el ID del alumno:");
    notas[0] = id;
    for (let i = 1; i < 4; i++) {
        let nota = parseInt(prompt(`Ingrese la nota número ${i}: (1-12)`));
        while (nota < 1 || nota > 12) {
            nota = parseInt(prompt("Error, las notas deben ser entre 1 y 12"));
        }
        notas[i] = nota;
    }
    agregarNota(notas);
}



const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

function cerrarSesion() {
    guardarLocal(listaNotas);
}

function iniciarSesion() {
    let username = document.getElementById('username').value;
    sessionStorage.setItem("username", username);
    
}


window.addEventListener('load', function() {
    let nombreGuardado = sessionStorage.getItem('username');
    if (nombreGuardado) {
        let span = document.getElementById("username");
        span.textContent = nombreGuardado;
    }
});
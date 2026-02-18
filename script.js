console.log("Bienvenidos!");

class Tarea {
    constructor(id,titulo,desc,estado,fechaCreacion) {
        this.id = id;
        this.titulo = titulo
        this.desc = desc;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }
    cambiarEstado = () => {
        if (this.estado == "pendiente") {
            this.estado = "completada";
        }
        tarjetaEstado(this.id);
        alert(`La tarea ${this.titulo} se ha marcado como "completada"`);
    }
}

class GestorTareas {
    constructor() {
        this.lista = [];
    }
    agregarTarea = nuevaTarea => {
        this.lista.push(nuevaTarea);
        mostrarTarea(nuevaTarea);
    }
    eliminarTarea = idtarea => {
        // Se busca el índice del arreglo en el que está la tarea con el id deseado
        let idx = this.lista.findIndex(check);
        function check(el) {
            return el.id == idtarea;
        };
        // Se elimina el objeto tarea en el índice correspondiente
        this.lista.splice(idx,1);
        quitarTarjeta(idtarea);
    }
    mostrarLista = () => {
        console.log(this.lista);
    }
}
let listaTareas = new GestorTareas();

// Captura de formulario y creación de tarea

let id_acc = 1;

document.getElementById("add-form").addEventListener('submit', (ev) => {
    ev.preventDefault();
    let in_titulo = document.getElementById("title").value;
    let in_desc = document.getElementById("descr").value;

    let tarea = new Tarea(id_acc,in_titulo,in_desc,"pendiente","16/2/2026");
    listaTareas.agregarTarea(tarea);
    //listaTareas.mostrarLista();

    // Se actualiza el id para mantener coherencia al asignar id aunque se eliminen elementos
    id_acc += 1;
});

// Agrega tarjeta bootstrap con datos de tarea. Recibe objeto tarea nueva.
// Se llama desde método listaTareas.agregarTarea()

function mostrarTarea(tarea) {
    let card = `<div id="tarea-${tarea.id}" class="col-12 my-2 col-lg-6">
    <div class="card text-center align-self-center m-0 p-0 rounded-5">
        <div class="card-body row">
            <h5 class="card-title col-6">${tarea.titulo}</h5>
            <p class="card-text col-6">${tarea.desc}</p>
            <h6 class="card-subtitle mb-2 text-body-secondary col-6">Fecha de creación: ${tarea.fechaCreacion}</h6>
            <p id="estado-${tarea.id}" class="card-text text-danger col-6">Pendiente</p>
        </div>
        <button id="btn-term-${tarea.id}" class="btn btn-primary col-4 m-3 rounded-5">Terminada</button>
        <button id="btn-elim-${tarea.id}" class="btn btn-danger col-4 m-3 rounded-5">Elminar</button>
    </div>
    </div>`;
    document.getElementById("show").innerHTML += card;
}

// Captura de botón

document.getElementById("show").addEventListener("click",(ev)=>{
    let elem = ev.target;
    if (elem.tagName === 'BUTTON') {
        console.log(ev.target);
        let elid = elem.id.split("-")[2];
        let eltype = elem.id.split("-")[1];
        switch (eltype) {
            case "elim":
                alert(`Botón eliminar apretado en tarea: ${elid}`);
                listaTareas.eliminarTarea(elid);
                console.log(listaTareas.lista);
                break;
            case "term":
                alert(`Botón terminar apretado en tarea: ${elid}`);
                listaTareas.lista.forEach(el=>{
                    if (el.id == elid) {
                        el.cambiarEstado();
                    }
                });
                break;
        }
    }
});

// Elimina tarjeta bootstrap correspondiente a la tarea, se llama desde método listaTareas.eliminarTarea()

function quitarTarjeta(id) {
    let tarj = document.getElementById(`tarea-${id}`);
    tarj.remove();
}

// Cambia estado correspondiente en tarjeta bootstrap y cambia color de texto

function tarjetaEstado(id) {
    let tarj = document.getElementById(`estado-${id}`);
    tarj.innerHTML = "Completada";
    tarj.setAttribute("class","card-text text-success col-6");
}

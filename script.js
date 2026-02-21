console.log("Bienvenidos!");

class Tarea {
    constructor(id,titulo,desc,estado,fechaCreacion,limite) {
        this.id = id;
        this.titulo = titulo
        this.desc = desc;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.limite = limite;
    }
    cambiarEstado = () => {
        if (this.estado == "pendiente") {
            this.estado = "completada";
        }
        tarjetaEstado(this.id);
        setTimeout(alert(`La tarea "${this.titulo}" se ha marcado como "completada"`),2000);
    }
}

class GestorTareas {
    constructor() {
        this.lista = [];
    }
    agregarTarea = nuevaTarea => {
        setTimeout(()=>{
            this.lista = [...this.lista,nuevaTarea];
            mostrarTarea(nuevaTarea);
            alert(`Tarea "${nuevaTarea.titulo}" registrada`);
        },2000)
    };
    eliminarTarea = idtarea => {
        // Se busca el índice del arreglo en el que está la tarea con el id deseado
        let idx = this.lista.findIndex(check);
        function check(el) {
            return el.id == idtarea;
        };
        // Se elimina el objeto tarea en el índice correspondiente
        this.lista.splice(idx,1);
        quitarTarjeta(idtarea);
        alert(`La tarea "${this.titulo}" se ha eliminado`);
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
    let in_limite = new Date(document.getElementById("limite").value); // Captura fecha límite ingresada
    let fecha_creacion = new Date(); // Crea objeto Date con la fecha y tiempo de ingreso realizado

    let tarea = new Tarea(id_acc,in_titulo,in_desc,"pendiente",fecha_creacion,in_limite);
    listaTareas.agregarTarea(tarea);
    //listaTareas.mostrarLista();

    // Se actualiza el id para mantener coherencia al asignar id aunque se eliminen elementos
    id_acc += 1;
});

// Agrega tarjeta bootstrap con datos de tarea. Recibe objeto tarea nueva.
// Se llama desde método listaTareas.agregarTarea()

function mostrarTarea(tarea) {
    let {id,titulo,desc,fechaCreacion,limite} = tarea;
    let card = `<div id="tarea-${id}" class="align-self-center my-2 col-12 col-lg-6"><div class="card text-center align-self-center m-0 p-0 rounded-5"><div class="card-body row"><div class="col-12 col-md-6 align-self-center"><h5 class="card-title w-100 col-6">${titulo}</h5><p class="card-text border border-1 rounded-4 w-100 p-1 col-6">${desc}</p></div><div class="col-12 col-md-6 align-self-center"><h6 id="estado-${id}" class="card-text text-danger w-100 my-1 col-6">Pendiente</h6><h6 class="card-subtitle text-body-secondary w-100 my-1 col-6">Creada: ${fechaCreacion.toLocaleString()}</h6></div></div><div class ="col-12"><button id="btn-term-${id}" class="btn btn-primary w-25 m-1 rounded-5">Terminar</button><button id="btn-elim-${id}" class="btn btn-danger w-25 m-1 rounded-5">Elminar</button></div></div>`;
    document.getElementById("show").innerHTML += card;
    if (limite) {    
        let padre = document.getElementById(`tarea-${id}`).firstChild.firstChild.lastChild;
        let el = document.createElement("h6");
        el.setAttribute("class","w-100 text-success col-6");
        
        startContador(fechaCreacion,limite,padre,el);
    }
}

// Captura de botón

document.getElementById("show").addEventListener("click",(ev)=>{
    let {target} = ev;
    if (target.tagName === 'BUTTON') {
        console.log(target);
        let elid = target.id.split("-")[2];
        let eltype = target.id.split("-")[1];
        switch (eltype) {
            case "elim":
                listaTareas.eliminarTarea(elid);
                console.log(listaTareas.lista);
                break;
            case "term":
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
    tarj.setAttribute("class","card-text text-success w-100 my-1 col-6");
}

// Cuenta regresiva

function startContador(creacion,limite,padre,elem) {
    limite = limite.getTime();// Obtenemos la fecha en milisegundos
    creacion = creacion.getTime();
    let difer = limite-creacion;// Restamos y nos da el tiempo de inicio para la cuenta

    let timer = setInterval(()=>{
        let dias = Math.floor(difer/(1000*60*60*24));
        let horas = Math.floor((difer%(1000*60*60*24))/(1000*60*60));
        let minutos = Math.floor((difer%(1000*60*60))/(1000*60));
        let segundos = Math.floor((difer%(1000*60))/(1000));
        
        elem.innerText = `Queda: ${dias} D ${horas} Hr ${minutos} Min ${segundos} S`; // Mostrar días, horas, minutos y segundos
        padre.appendChild(elem);// Mostrar elemento en el documento
        
        difer = difer-1000;// Restar un segundo
        if (difer < 0) {
            clearInterval(timer);
            elem.setAttribute("class","w-100 text-danger col-6")
            elem.innerText = "Límite Expirado";
        }
    },1000);
}

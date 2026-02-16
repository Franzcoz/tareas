console.log("Bienvenidos!");

class Tarea {
    constructor(id,desc,estado,fechaCreacion) {
        this.id = id;
        this.desc = desc;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }
    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

class GestorTareas {
    constructor() {
        this.lista = [];
    }
    agregarTarea(nuevaTarea) {
        this.lista.push(nuevaTarea);
    }
    eliminarTarea(id) {
        this.lista.splice(id-1,1);
    }
    mostrarLista() {
        return this.lista;
    }
}
var listaTareas = new GestorTareas();

var tarea1 = new Tarea(1,"Comprar papas fritas","pendiente","16/2/2026");
listaTareas.agregarTarea(tarea1);

var tarea2 = new Tarea(2,"Lavar loza","pendiente","17/2/2026");
listaTareas.agregarTarea(tarea2);

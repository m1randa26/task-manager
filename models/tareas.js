// Imports
const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];

            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {

        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareaFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const index = `${i + 1}`.green;
            const { desc, completadoOn } = tarea;

            if(completadoOn !== null) {
                console.log(`${(index + '.'.green)} ${desc} :: ${'Completado'.green}`);
            } else {
                console.log(`${(index + '.'.green)} ${desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoOn } = tarea;
            const estado = (completadoOn) ? 'Completado'.green : 'Pendiente'.red;

            if(completadas) {
                if(completadoOn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoOn.green}`);
                }
            } else {
                if(!completadoOn) {
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
                }
            }
        })
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoOn) {
                tarea.completadoOn = new Date().toDateString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoOn = null;
            }
        })
    }
}

module.exports = Tareas;
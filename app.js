// Imports
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.cargarTareaFromArray(tareasDB);
    }

    do {
        // Optenemos el valor de las opciones (1, 2, ...) en forma de string
        opt = await inquirerMenu();

        // Evaluamos el valor en forma de string
        switch(opt) {
            case '1':
                // Obtenemos el mesnaje que el usuario ingreso como desc
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.red);
                    }
                    break;
                }
        }

        guardarDB(tareas.listadoArr);

        // Pausa el programa hasta que el usuario teclee ENTER
        await pausa();

    } while (opt !== '0');

    // pausa();
}



main();
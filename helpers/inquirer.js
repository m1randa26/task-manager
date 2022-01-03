// Imports
const inquirer = require('inquirer');
require('colors');

// Questions del menu: es un array de objetos
const questions = [
    {
        // Indica el tipo de solicitud
        type: 'list',
        // Nombre que se utilizará al almacenar la respuesta que el usuario elija
        name: 'opcion',
        // Mensaje que mostrara el menu al usuario
        message: '¿Qué desea hacer?',
        // Todas las opciones que tiene el usuario para elegir: es un array de objetos
        choices: [
            {
                // Valor propio de cada opción
                value: '1',
                // Mensaje de la opcion que mostrará al usuario
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

// Función que imprime el menu de opciones
const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    // Obtenemos la opcion que elegió el usuario
    const { opcion } = await inquirer.prompt(questions);

    return opcion;
}

// Función que pausa el menu de opciones hasta que el usuario teclea ENTER
const pausa = async() => {

    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(questions);
}

// Función que lee la descripción del input
const leerInput = async(message) => {

    const question = [
        {
            // Tipo input para que el usuario ingrese un mensaje por consola
            type: 'input',
            // Se almacenará la entrada del usuario
            name: 'desc',
            //Mostrará el mensaje que se pase como argumento en la consola
            message,
            // Valida que no sea un string vacio
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    // Obtenemos el mensaje que el usuario ingresó
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoOn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

// Exports
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}
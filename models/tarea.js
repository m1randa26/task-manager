const { v4: uudiv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadoOn = null;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
    }
}


module.exports = Tarea;
const db = require('../util/database');

module.exports = class Index {
    constructor(una_imagen){
        this.imagen = una_imagen;
    }


    saveImg(){
        return db.execute('INSERT INTO imagen (archivo) VALUES (?)', [this.imagen]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM imagen ORDER BY id DESC LIMIT 1;')
    }
};
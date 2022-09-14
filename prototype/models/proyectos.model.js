const db = require('../util/database');

module.exports = class Proyectos{
    //constructor(){
    // }
    static fetchAll() {
        return db.execute('SELECT * FROM proyecto');
    }

}
const db = require('../util/database');
const bcrypt = require ('bcryptjs');

module.exports = class Usuario {

    constructor(un_username, un_password, un_nombre) {
        this.username = un_username;
        this.password = un_password;
        this.nombre = un_nombre;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
        .then((newPassword) => {
            return db.execute('INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)', [this.username, newPassword, this.nombre]);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    //Al ser un metodo estatico, se ejecuta sobre la clase, no sobre una instancia de la clase.
    static fetchAll() {
        return db.execute('SELECT * FROM usuarios');
        
    }
    static fetchOne(a_username) {
        return db.execute('SELECT * FROM usuarios WHERE username = ?', [a_username]);
        
    }
}
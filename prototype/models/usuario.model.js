const db = require('../util/database');
const bcrypt = require ('bcryptjs');

module.exports = class Usuario {

    constructor(un_correo, un_password, un_nombre, un_tiempo_completo, un_id_rol) {
        this.correo = un_correo;
        this.password = un_password;
        this.nombre = un_nombre;
        this.is_tiempo_completo = un_tiempo_completo;
        this.id_rol = un_id_rol; 
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
        .then((newPassword) => {
            return db.execute('INSERT INTO empleado (nombre, is_tiempo_completo, correo, password, id_rol) VALUES (?, ?, ?, ?, ?)', [this.nombre, this.is_tiempo_completo, this.correo, newPassword, this.id_rol]);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    //Al ser un metodo estatico, se ejecuta sobre la clase, no sobre una instancia de la clase.
    static fetchAll() {
        return db.execute('SELECT * FROM empleado');
        
    }
    static fetchOne(un_correo) {
        return db.execute('SELECT * FROM empleado WHERE correo = ?', [un_correo]);
        
    }
    static fetchRol() {
        return db.execute('SELECT descripcion FROM rol');
    }

    static getPrivilegios(un_empleado) {
        return db.execute('SELECT pri.desc_privilegio FROM posee p, rol r, privilegios pri WHERE p.id_rol = r.id_rol AND pri.id_privilegio = p.id_privilegio AND r.id_rol = (SELECT t.id_rol FROM tiene t WHERE t.id_empleado = ?)', [un_empleado]) ;
        
    }

    static getRol(un_rol) {
        return db.execute('SELECT descripcion FROM rol r, tiene t WHERE r.id_rol = t.id_rol AND t.id_empleado = ?', [un_rol]);
    }
}
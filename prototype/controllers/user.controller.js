const path = require('path');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model')

exports.getNuevo = (request, response, next) => {
    response.render(path.join('usuarios', 'usuario.form.ejs'), {
        user: request.session.user ? request.session.user : '',
    });
};

exports.postNuevo = (request, response, next) => {
    let user = request.body.username
    user.trim();
    const usuario = new Usuario(user, request.body.password, request.body.nombre, 1 , 3);
    usuario.save()
        .then(() => {
            response.status(303).redirect('/user/login');
        })
        .catch(err => {
            console.log(err);
            response.render('error', {
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
            });
        });
    
};

exports.getLogin = (request, response, next) => {
    const usuario = request.session.user ? request.session.user : '';
    response.render(path.join('usuarios', 'login.form.ejs'), {
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
        user: usuario
    });
};

exports.postLogin = (request, response, next) => {
    // Recuperar el usuario si es que existe
    return Usuario.fetchOne(request.body.correo)
    .then(([rows, fieldData]) => {
        if (rows.length == 1){
            bcrypt.compare(request.body.password, rows[0].password)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.user = rows[0].nombre;
                    return request.session.save(err => {
                        //Obtener los permisos del usuario
                        Usuario.getPrivilegios(rows[0].id_empleado)
                        .then(([consulta_privilegios, fielData]) => {
                            //Guardar los permisos en una variable de sesión
                            request.session.privilegios = [];
                            for(let privilegio of consulta_privilegios) {
                                request.session.privilegios.push(privilegio.descripcion);
                            }
                            Usuario.getRol(rows[0].id_empleado)
                                .then(([rows, fielData]) => {  
                                    request.session.roles = []; 
                                    
                                    request.session.roles.push(rows[0].descripcion);                                                                 
                                })
                                .catch(err => {
                                    console.log(err);
                                    response.render('error.ejs', {
                                        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                                    });
                                });
                                    response.redirect('/home');
                                })
                                .catch(err => {
                                    console.log(err);
                                    response.render('error.ejs', {
                                        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                                    });
                                });
                         })
                                    
                }
                else {
                    console.log("El usuario o contraseña no existe");
                    return response.redirect('/user/login');
                }
            })
            .catch(err => {
                console.log(err);
                return response.render('error.ejs', {
                    isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        return response.render('error.ejs', {
            isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
        });
    });
};

exports.logout = (request, response, next) => {
    
    request.session.destroy(() => {
        response.redirect('/user/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
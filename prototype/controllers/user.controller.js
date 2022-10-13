const path = require('path');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model')

exports.getNuevo = (request, response, next) => {
    response.render(path.join('usuarios', 'usuario.form.ejs'));
};

exports.postNuevo = (request, response, next) => {
    let user = request.body.username
    user.trim();
    const usuario = new Usuario(user, request.body.password, request.body.nombre);
    usuario.save()
        .then(() => {
            response.status(303).redirect('/user/login');
        })
        .catch(err => {
            console.log(err);
            response.render('error', {
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                csrfToken: request.csrfToken()
            });
        });
    
};

exports.getLogin = (request, response, next) => {
    response.render(path.join('usuarios', 'login.form.ejs'), {
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
    });
};

exports.postLogin = (request, response, next) => {
    // Recuperar el usuario si es que existe
    return Usuario.fetchOne(request.body.username)
    .then(([rows, fieldData]) => {
        if (rows.length == 1){
            bcrypt.compare(request.body.password, rows[0].password)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.user = rows[0].nombre;
                    return request.session.save(err => {
                        response.redirect('/home');
                    });
                }
                else {
                    console.log("El usuario o contraseña no existe");
                    return response.redirect('/user/login');
                }
            })
            .catch(err => {
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
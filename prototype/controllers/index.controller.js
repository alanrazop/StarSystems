const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Index = require('../models/index.model');
const Proyectos_activos = require('../models/proyectos_activos.model');
const Usuario = require('../models/usuario.model')

exports.getIndex = (request, response, next) => {
    Index.fetchAll()
         .then(([rows, fieldData]) => {
            Proyectos_activos.fetchAll()
                .then(([projects, fieldData]) => {
                    
                    response.render(path.join('index.ejs'), {
                        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : isLoggedIn,
                        imagenes: rows,
                        proyectosA: projects[0],
                        user: request.session.user ? request.session.user : '',
                        user: request.session.user ? request.session.user : '',
                        user_permit: request.session.roles,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
         })
         .catch(err => {
             console.log(err);
         });
};

exports.postIndex = (request, response, next) => {
    const file = new Index('/' + request.file.filename);
    file.saveImg()
        .then(() => {
            response.redirect('/home');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getDatosGrafica = (request, response, next) => {
    Proyectos_activos.fetchAll()
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows[0]);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({message: "ERROR"});
        })
}
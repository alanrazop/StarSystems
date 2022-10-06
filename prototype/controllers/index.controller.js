const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Index = require('../models/index.model');
const Proyectos_activos = require('../models/proyectos_activos.model');

exports.getImage = (request, response, next) => {
    Index.fetchAll()
         .then(([rows, fieldData]) => {
            Proyectos_activos.fetchAll()
                .then(([projects, fieldData]) => {
                    response.render(path.join('index.ejs'), {
                        imagenes: rows,
                        proyectosA: projects[0],
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

exports.postImage = (request, response, next) => {
    const file = new Index('/' + request.file.filename);
    file.saveImg()
        .then(() => {
            response.redirect('/home');
        })
        .catch(err => {
            console.log(err);
        })
};
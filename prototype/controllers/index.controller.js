const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Index = require('../models/index.model');

exports.getImage = (request, response, next) => {
    Index.fetchAll()
         .then(([rows, fieldData]) => {
            response.render(path.join('index.ejs'), {
                 imagenes: rows,
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
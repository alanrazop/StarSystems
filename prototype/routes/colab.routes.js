//vista colaborador

const express = require('express');
const path = require('path');
const actController = require('../controllers/actividad.controller');
const projectsController = require('../controllers/proyecto.controller');
const colabController = require('../controllers/colaborador.controller');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

// Route handling
router.get('/tareas', actController.getActividad);

router.post('/tareas', actController.postActividad);

router.get('/edit/:id', actController.getEditAct);

router.post('/edit', actController.postEditAct);

router.post('/delete', actController.postDeleteAct);

router.get('/proyectos', projectsController.getProyecto);

router.get('/colaboradores', colabController.getEmpleado);

router.get('/colaboradores/buscar/:valor', colabController.getBuscarColab);

module.exports = router;
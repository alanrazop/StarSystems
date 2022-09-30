const express = require('express');
const path = require('path');
const actController = require('../controllers/actividad.controller');
const projectsController = require('../controllers/proyecto.controller');
const colabController = require('../controllers/colaborador.controller');
const reporteController = require('../controllers/reporte.controller');
const indexController = require('../controllers/index.controller');

const router = express.Router();

// Route handling

router.get('/', indexController.getImage);

router.post('/image', indexController.postImage);

router.get('/tareas', actController.getActividad);

router.post('/tareas', actController.postActividad);

router.get('/edit/:id', actController.getEditAct);

router.post('/edit', actController.postEditAct);

router.post('/delete', actController.postDeleteAct);


router.get('/proyectos', projectsController.getProyecto);
router.get('tareas/buscar/:valor', projectsController.getBuscar);

router.get('/colaboradores', colabController.getEmpleado);

router.get('/reportes', reporteController.getReportes);

router.get('/colaboradores/buscar/:valor', colabController.getBuscarColab);

module.exports = router;
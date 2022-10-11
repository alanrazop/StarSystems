const express = require('express');
const path = require('path');
const actController = require('../controllers/actividad.controller');
const projectsController = require('../controllers/proyecto.controller');
const colabController = require('../controllers/colaborador.controller');
const reporteController = require('../controllers/reporte.controller');
const indexController = require('../controllers/index.controller');

const router = express.Router();

// Route handling

// ------------- INDEX -------------
router.get('/', indexController.getIndex);

router.post('/image', indexController.postIndex);

router.get('/grafica-proyectos', indexController.getDatosGrafica);

// ------------- ACTIVIDAD -------------

router.get('/tareas', actController.getActividad);

router.post('/tareas', actController.postActividad);

router.get('/edit/:id', actController.getEditAct);

router.post('/edit', actController.postEditAct);

router.get('/registra/delete/:id', actController.postRegistraDelete);

router.post('/delete', actController.postDeleteAct);



// ------------- PROYECTOS -------------

router.get('/proyectos', projectsController.getProyecto);
//router.get('tareas/buscar/:valor', projectsController.getBuscar);

router.post('/nuevo-proyecto', projectsController.postProyecto);

router.post('/proyectos/edit', projectsController.postEditProject);

router.post('/proyectos/delete', projectsController.postDeleteProject);

// ------------- COLABORADORES -------------

router.get('/colaboradores', colabController.getEmpleado);

router.get('/colaboradores/buscar/:valor', colabController.getBuscarColab);

// ------------- REPORTES -------------

router.get('/reportes', reporteController.getReportes);

module.exports = router;
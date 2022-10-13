const express = require('express');
const path = require('path');
const actController = require('../controllers/actividad.controller');
const projectsController = require('../controllers/proyecto.controller');
const colabController = require('../controllers/colaborador.controller');
const reporteController = require('../controllers/reporte.controller');
const indexController = require('../controllers/index.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

// Route handling

//-----------  AUTENTIFICAR ------


// ------------- INDEX -------------
router.get('/', isAuth, indexController.getIndex);

router.post('/image', isAuth, indexController.postIndex);

router.get('/grafica-proyectos', isAuth, indexController.getDatosGrafica);

// ------------- ACTIVIDAD -------------

router.get('/tareas', isAuth, actController.getActividad);

router.post('/tareas', isAuth, actController.postActividad);

router.get('/edit/:id', isAuth, actController.getEditAct);

router.post('/edit', isAuth, actController.postEditAct);

router.get('/registra/delete/:id', isAuth, actController.postRegistraDelete);

router.post('/delete', isAuth, actController.postDeleteAct);



// ------------- PROYECTOS -------------

router.get('/proyectos', isAuth, projectsController.getProyecto);
//router.get('tareas/buscar/:valor', projectsController.getBuscar);

router.post('/nuevo-proyecto', isAuth, projectsController.postProyecto);

router.post('/proyectos/edit', isAuth, projectsController.postEditProject);

router.post('/proyectos/delete', isAuth, projectsController.postDeleteProject);

// ------------- COLABORADORES -------------

router.get('/colaboradores', isAuth, colabController.getEmpleado);

router.get('/colaboradores/buscar/:valor', isAuth, colabController.getBuscarColab);

// ------------- REPORTES -------------

router.get('/reportes', isAuth, reporteController.getReportes);

module.exports = router;
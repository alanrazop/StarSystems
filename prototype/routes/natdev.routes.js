const express = require('express');
const path = require('path');
const actController = require('../controllers/actividad.controller');
const projectsController = require('../controllers/proyecto.controller');
const colabController = require('../controllers/colaborador.controller');
const reporteController = require('../controllers/reporte.controller');

const router = express.Router();

// Route handling
router.get('/tareas', actController.getActividad);
router.post('/tareas', actController.postActividad);




router.get('/proyectos', projectsController.getProyecto);

router.get('/colaboradores', colabController.getEmpleado);

router.get('/reportes', reporteController.getReportes);

module.exports = router;
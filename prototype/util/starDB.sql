-- Database name
-- Borra la anterior
DROP DATABASE `starDB`;
-- Crea nueva base de datos
CREATE DATABASE `starDB`;

ALTER DATABASE `starDB` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

USE `starDB`;

-- Tabla Rol
CREATE TABLE `rol` (
    `id_rol` int(11) NOT NULL,
    `descripcion` varchar(60) NOT NULL
);

-- Tabla Empleado
CREATE TABLE `empleado` (
    `id_empleado` int(11) NOT NULL,
    `nombre` varchar(60) NOT NULL,
    `is_tiempo_completo` TINYINT(1) NOT NULL,
    `correo` varchar(60) NOT NULL,
    `sub_auth0` varchar(60) NOT NULL,
    `id_rol`int(11) NOT NULL
);

-- Tabla Registra
CREATE TABLE `registra` (
    `num_horas` float NOT NULL,
    `id_actividad` int(11) on INSERT ()LAST_INSERT_ID();
    `id_empleado` int(11),
    `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `sub_auth0` varchar(60) NOT NULL,
    `correo` varchar(60) NOT NULL
);

-- Tabla actividad
CREATE TABLE `actividad` (
    `descripcion_actividad` varchar(255) NOT NULL,
    `id_actividad` int(11) NOT NULL,
    `id_proyecto` int(11)
);

-- Tabla proyecto
CREATE TABLE `proyecto` (
    `id_proyecto` int(11) NOT NULL,
    `nombre_proyecto` varchar(45) NOT NULL,
    `descripcion_proyecto` varchar(255),
    `fecha_inicio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_activo` TINYINT(1) NOT NULL ,
    `tarea_proyecto` TINYINT(1) NOT NULL
);

-- Tabla catalogo_variable 
CREATE TABLE `reporte` (
    -- si quiere agregar horas de vacaciones
    `horas_vacaciones` float NOT NULL ,
    -- si quiere agregar horas no registradas
    `horas_trabajadas` float NOT NULL ,
    `horas_tiempo_completo` float NOT NULL,
    `horas_tiempo_medio` float NOT NULL,
    `coeficiente_efectividad` float NOT NULL,
    `fecha` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `fecha_corte` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- -- Defaults for values
-- ALTER TABLE `reporte` 
-- ALTER `fecha_corte` SET URDATE();

-- ALTER TABLE `proyecto` 
-- ALTER `fecha_inicio` SET URDATE();

-- ALTER TABLE `registra` 
-- ALTER `fecha` SET URTIME();

-- Data insertion
INSERT INTO `rol` (`id_rol`,`descripcion`) VALUES
(1,'Coordinador'),
(2,'Lider'),
(3,'Colaborador') ;

-- nombre púede ser el nickname de fetchUserdata()
INSERT INTO `empleado` (`id_empleado`,`nombre` ,`is_tiempo_completo`,`correo`,`sub_auth0`,`id_rol`) VALUES
-- sample
(1,'Pedro',0,'ppedro@natgas.com.mx','auth0|n#"41_2*3f-kcansad',1);

-- -- Change these
-- (2,'Emilio',0,'eemilio@natgas.com.mx'),
-- (3,'Regina',0,'rregina@natgas.com.mx'),
-- (4,'Andrés',0,'aandres@natgas.com.mx'),
-- (5,'Juan' ,0,'jjuan@natgas.com.mx'),
-- (6,'Jose',0,'jjose@natgas.com.mx'),
-- (7,'Justino',0,'jjustino@natgas.com.mx'),
-- (8,'Ramona',0,'rramona@natgas.com.mx'),
-- (9,'Monse',0,'mmonse@natgas.com.mx'),
-- (10,'Guadalupe',0,'gguadalupe@natgas.com.mx'),
-- (11,'Leonardo',1,'leo0ramolo@natgas.com.mx'),
-- (12,'Alan',1,'aalan@natgas.com.mx'),
-- (13,'Monse' ,1,'mmonsee1@natgas.com.mx'),
-- (14,'Felix',1,'felixg@natgas.com.mx'),
-- (15,'Diego',1,'ddiegoo@natgas.com.mx'),
-- (16,'Santiago',1,'santilb@natgas.com.mx'),
-- (17,'Enrique',1,'Enriquex@natgas.com.mx'),
-- (18,'Elvira',1,'Evlira@nat'),
-- (19,'Alejandro',1,'Ale_jandro@natgas.com.mx'),
-- (20,'Monica',1,'MonicaAPW@natgas.com.mx');

INSERT INTO `actividad` (`id_actividad`, `descripcion_actividad`) VALUES

(1,'Diseño de proyecto Oasis');

-- (1,'2022-09-05',7,'Diseño de proyecto Oasis',1),
-- (2,'2022-09-06',9,'Implementación de recursos',NULL),
-- (3,'2022-09-07',2,'Desarrollo de proyecto Altair',2),
-- (4,'2022-09-12',2,'Junta de proyecto Oasis',1),
-- (5,'2022-09-13',2,'Desarrollo de proyecto Oasis',1),
-- (6,'2022-09-14',5,'Desarrollo de caso de uso para Oasis',1),
-- (7,'2022-09-19',1,'Desarrollo de función web para Pry',3),
-- (8,'2022-09-20',7,'Desarrollo de proyecto Altair',2),
-- (9,'2022-09-21',4,'Desarrollo de proyecto Altair',2),
-- (10,'2022-09-26',3,'Desarrollo de proyecto Pyro',4),
-- (11,'2022-09-27',1,'Junta de consejo de departamento',NULL),
-- (12,'2022-09-28',4,'Desarrollo de proyecto Altair',2),
-- (13,'2022-10-03',7,'Desarrollo de proyecto Oasis',1),
-- (14,'2022-10-04',9,'Junta de reasignaciones en proyecto Pyro',4),
-- (15,'2022-10-05',3,'Reunión de consejo de departamento',NULL),
-- (16,'2022-10-10',4,'Desarrollo de función web para Pry',3),
-- (17,'2022-10-11',1,'Desarrollo de función web para Pry',3),
-- (18,'2022-10-12',3,'Diseño de proyecto para Pyro',3),
-- (19,'2022-10-17',3,'Junta con colaboradores',NULL),
-- (20,'2022-10-18',6,'Entrega de documentaciones del departamento',NULL);

INSERT INTO `proyecto` (`id_proyecto`,`nombre_proyecto`,`descripcion_proyecto`,`fecha_inicio`,`tarea_proyecto`,`is_activo`) 
VALUES
(1,'Oasis','Web app en react para fundación Oasis','2022-01-07',0,1),
(2,'Altair','Web app en react para fundación Altair','2022-01-08',1,1),
(3,'Pry','Web app en react para fundación Pry','2022-01-09',0,1),
(4,'Pyro','Web app en react para fundación Pyro','2022-01-10',0,0);


INSERT INTO `registra` (
    `id_empleado`,
    `correo` ,
    `id_actividad` ,
    `fecha`,
    `sub_auth0`,
    `num_horas`) VALUES
-- sample
(1,'ppedro@natgas.com.mx',1,'2022-09-05','auth0|9832$#%#52sdkjbs',3);

-- -- to do
-- (2,'eemilio@natgas.com.mx',2,'2022-09-06'),
-- (3,'rregina@natgas.com.mx',3,'2022-09-07'),
-- (4,'aandres@natgas.com.mx',4,'2022-09-12'),
-- (5,'jjuan@natgas.com.mx',5,'2022-09-13'),
-- (6,'jjose@natgas.com.mx',6,'2022-09-14'),
-- (7,'jjustino@natgas.com.mx',7,'2022-09-19'),
-- (8,'rramona@natgas.com.mx',8,'2022-09-20'),
-- (9,'mmonse@natgas.com.mx',9,'2022-09-21'),
-- (10,'gguadalupe@natgas.com.mx',10,'2022-09-26'),
-- (11,'leo0ramolo@natgas.com.mx',11,'2022-09-27'),
-- (12,'aalan@natgas.com.mx',12,'2022-09-28'),
-- (13,'mmonsee1@natgas.com.mx',13,'2022-10-03'),
-- (14,'felixg@natgas.com.mx',14,'2022-10-04'),
-- (15,'ddiegoo@natgas.com.mx',15,'2022-10-05'),
-- (16,'santilb@natgas.com.mx',16,'2022-10-10'),
-- (17,'Enriquex@natgas.com.mx',17,'2022-10-11'),
-- (18,'Evlira@natgas.com.mx',18,'2022-10-12'),
-- (19,'Ale_jandro@natgas.com.mx',19,'2022-10-17'),
-- (20,'MonicaAPW@natgas.com.mx',20,'2022-10-18');


INSERT INTO `reporte`(
    `horas_tiempo_completo`,
    `horas_tiempo_medio`,
    `horas_vacaciones`,
    `horas_trabajadas`,
    `coeficiente_efectividad`)
    VALUES (7, 4, 0, 385, 0.85);

-- Llaves primarias 
ALTER TABLE `empleado`
    ADD PRIMARY KEY (`correo`,`id_empleado`,`sub_auth0`);

ALTER TABLE `rol`
    ADD PRIMARY KEY (`id_rol`);

ALTER TABLE `registra`
    ADD PRIMARY KEY (`fecha`);

ALTER TABLE `proyecto`
    ADD PRIMARY KEY (`id_proyecto`);

ALTER TABLE `actividad`
    ADD PRIMARY KEY (`id_actividad`);

ALTER TABLE `reporte`
    ADD PRIMARY KEY (`fecha`,`fecha_corte`);
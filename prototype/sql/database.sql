-- Database name
-- Borra la anterior
DROP DATABASE `starDB`;
-- Crea nueva base de datos
CREATE DATABASE `starDB`;

-- Tabla Empleado
CREATE TABLE `empleado` (
    `id_empleado` int(11) NOT NULL,
    `nombre` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
    `tipoTurno` TINYINT(1) NOT NULL,
    `correo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
    `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla actividad
CREATE TABLE `actividad` (
    `numHoras` float NOT NULL,
    `descripcion_actividad` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
    `fecha` date NOT NULL,
    `id_actividad` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla proyecto
CREATE TABLE `proyecto` (
    `id_proyecto` int(11) NOT NULL,
    `horas_registradas` float,
    `nombre_proyecto` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
    `descripcion_proyecto` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
    `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla registra
CREATE TABLE `registra` (
    `numHoras` float NOT NULL,
    `descripcion_actividad` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
    `fecha` date NOT NULL,
    `correo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla catalogo_variable 
CREATE TABLE `catalogo_variable` (
    `horas_vacaciones` float NOT NULL,
    `horas_trabajadas` float NOT NULL,
    `horas_tiempo_completo` float NOT NULL,
    `horas_tiempo_medio` float NOT NULL,
    `coeficiente_efectividad` float NOT NULL,
    `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Tabla reporte 
CREATE TABLE `reporte` (
    `fecha_corte` int NOT NULL,
    `horas_totales` int NOT NULL,
    `capacidad_utilizada` float NOT NULL,
    `capacidad_utilizada_ajustada` float NOT NULL,
    `horas_tiempo_medio` int NOT NULL,
    `coeficiente_efectividad` float NOT NULL,
    `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Llaves primarias 
ALTER TABLE `empleado`
    ADD PRIMARY KEY (`correo`,`id_empleado`);

ALTER TABLE `registra`
    ADD PRIMARY KEY (`fecha`,`correo`);

ALTER TABLE `proyecto`
    ADD PRIMARY KEY (`id_proyecto`);

ALTER TABLE `actividad`
    ADD PRIMARY KEY (`fecha`, `id_actividad`);

ALTER TABLE `catalogo_variable`
    ADD PRIMARY KEY (`fecha`);

ALTER TABLE `reporte`
    ADD PRIMARY KEY (`fecha_corte`);

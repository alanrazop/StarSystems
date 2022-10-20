-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-starss.alwaysdata.net
-- Generation Time: Oct 17, 2022 at 04:47 PM
-- Server version: 10.6.7-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `starss_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`starss`@`%` PROCEDURE `agregar_actividad` (IN `u_descripcion_actividad` VARCHAR(255) CHARSET utf8mb4, IN `u_id_proyecto` INT, IN `u_num_horas` FLOAT, IN `u_id_empleado` INT(11), IN `u_fecha` TIMESTAMP)   BEGIN

INSERT INTO actividad (descripcion_actividad, id_proyecto) VALUES (u_descripcion_actividad, u_id_proyecto);

INSERT INTO registra (num_horas, id_actividad, id_empleado, fecha) VALUES (u_num_horas, last_insert_id(), u_id_empleado, u_fecha);

END$$

CREATE DEFINER=`starss`@`%` PROCEDURE `eliminar_actividad` (IN `u_id_actividad` INT)   BEGIN 
DELETE FROM actividad WHERE id_actividad = u_id_actividad;
DELETE FROM registra WHERE id_actividad = u_id_actividad;


END$$

CREATE DEFINER=`starss`@`%` PROCEDURE `modificar_actividad` (IN `u_descripcion_actividad` VARCHAR(255) CHARSET utf8mb4, IN `u_id_proyecto` INT, IN `u_num_horas` FLOAT, IN `u_fecha` TIMESTAMP, IN `u_id_actividad` INT)  DETERMINISTIC BEGIN

UPDATE actividad SET descripcion_actividad = u_descripcion_actividad WHERE id_actividad  = u_id_actividad ;

UPDATE registra SET num_horas = u_num_horas, fecha = u_fecha WHERE id_actividad =  u_id_actividad ;

END$$

CREATE DEFINER=`starss`@`%` PROCEDURE `proyectos_activos` ()   BEGIN
 SELECT nombre_proyecto, SUM(num_horas) as total_horas
 FROM `proyecto` p, `registra` r, `actividad` a 
 WHERE r.id_actividad = a.id_actividad
 AND p.id_proyecto = a.id_proyecto
 AND p.is_activo = 1
 GROUP BY nombre_proyecto;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `actividad`
--

CREATE TABLE `actividad` (
  `descripcion_actividad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_tiempo_completo` tinyint(1) NOT NULL,
  `correo` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_auth0` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre`, `is_tiempo_completo`, `correo`, `password`, `sub_auth0`, `id_rol`) VALUES
(1, 'Jorge', 0, 'jjorge@natgas.com.mx', '', 'auth0|n#\"41_2*3f-kcansad', 3),
(2, 'Cut', 0, 'ccut@natgas.com.mx', '', 'auth0|n#\"42_2*3f-kcansad', 3),
(3, 'Armando', 0, 'aarmando@natgas.com.mx', '', 'auth0|n#\"43_2*3f-kcansad', 3),
(4, 'Caro', 0, 'ccaro@natgas.com.mx', '', 'auth0|n#\"44_2*3f-kcansad', 3),
(5, 'Alfredo', 0, 'aalfredo@natgas.com.mx', '', 'auth0|n#\"45_2*3f-kcansad', 3),
(6, 'Miguel', 0, 'mmiguel@natgas.com.mx', '', 'auth0|n#\"46_2*3f-kcansad', 3),
(7, 'Juan', 0, 'jjuan@natgas.com.mx', '', 'auth0|n#\"47_2*3f-kcansad', 3),
(8, 'Alejandro', 0, 'aalejandro@natgas.com.mx', '', 'auth0|n#\"48_2*3f-kcansad', 3),
(9, 'Mane', 1, 'mmane@natgas.com.mx', '', 'auth0|n#\"49_2*3f-kcansad', 3),
(10, 'Juanjo', 1, 'jjuanjo@natgas.com.mx', '', 'auth0|n#\"50_2*3f-kcansad', 3),
(11, 'Reno', 1, 'rreno@natgas.com.mx', '', 'auth0|n#\"50_2*3f-kcansad', 3),
(12, 'Vera', 1, 'vvera@natgas.com.mx', '', 'auth0|n#\"51_2*3f-kcansad', 3),
(13, 'Karla', 1, 'karla@natgas.com.mx', '', 'auth0|n#\"52_2*3f-kcansad', 3),
(14, 'Rudy', 1, 'rrudy@natgas.com.mx', '', 'auth0|n#\"53_2*3f-kcansad', 3),
(15, 'Juanpa', 1, 'jjuanpa@natgas.com.mx', '', 'auth0|n#\"54_2*3f-kcansad', 3),
(16, 'Pablo', 1, 'ppablo@natgas.com.mx', '', 'auth0|n#\"55_2*3f-kcansad', 3),
(17, 'Steph', 1, 'steph@natgas.com.mx', '', 'auth0|n#\"56_2*3f-kcansad', 3),
(18, 'Laura', 1, 'llaura@natgas.com.mx', '', 'auth0|n#\"57_2*3f-kcansad', 3),
(19, 'Jose M', 1, 'jjosem@natgas.com.mx', '', 'auth0|n#\"58_2*3f-kcansad', 3),
(20, 'Manuel', 1, 'mmanuel@natgas.com.mx', '', 'auth0|n#\"59_2*3f-kcansad', 3);

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `archivo` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posee`
--

CREATE TABLE `posee` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posee`
--

INSERT INTO `posee` (`id_rol`, `id_privilegio`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `privilegios`
--

CREATE TABLE `privilegios` (
  `id_privilegio` int(11) NOT NULL,
  `desc_privilegio` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `privilegios`
--

INSERT INTO `privilegios` (`id_privilegio`, `desc_privilegio`) VALUES
(1, 'Todas las funciones'),
(2, 'PROYECTOS, Actividades, Colabs'),
(3, 'Colabs, Actividades');

-- --------------------------------------------------------

--
-- Table structure for table `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre_proyecto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion_proyecto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_activo` tinyint(1) NOT NULL,
  `tarea_proyecto` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre_proyecto`, `descripcion_proyecto`, `fecha_inicio`, `is_activo`, `tarea_proyecto`) VALUES
(1, 'Oasis', 'Web app en react para fundación Oasis', '2022-01-06 23:00:00', 1, 0),
(2, 'Altair', 'Web app en react para fundación Altair', '2022-01-07 23:00:00', 1, 1),
(3, 'Poseidón', 'Web app en react para Poseidón', '2022-01-08 23:00:00', 1, 0),
(4, 'Pyro', 'Web app en react para fundación Pyro', '2022-01-09 23:00:00', 0, 0),
(5, 'Erelis 2.0', 'Web app en react para fundación Erelis', '2022-01-06 23:00:00', 1, 0),
(6, 'Departamento', 'Trabajo en el departamento', '2022-02-09 23:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `registra`
--

CREATE TABLE `registra` (
  `id` int(11) NOT NULL,
  `num_horas` float NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `sub_auth0` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporte`
--

CREATE TABLE `reporte` (
  `horas_vacaciones` float NOT NULL,
  `horas_trabajadas` float NOT NULL,
  `horas_tiempo_completo` float NOT NULL,
  `horas_tiempo_medio` float NOT NULL,
  `coeficiente_efectividad` float NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_corte` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reporte`
--

INSERT INTO `reporte` (`horas_vacaciones`, `horas_trabajadas`, `horas_tiempo_completo`, `horas_tiempo_medio`, `coeficiente_efectividad`, `fecha`, `fecha_corte`) VALUES
(1, 385, 7, 4, 0.85, '2022-09-22 22:30:39', '2022-09-22 22:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `descripcion` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `descripcion`) VALUES
(1, 'Coordinador'),
(2, 'Lider'),
(3, 'Colaborador');

-- --------------------------------------------------------

--
-- Table structure for table `tiene`
--

CREATE TABLE `tiene` (
  `id_empleado` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tiene`
--

INSERT INTO `tiene` (`id_empleado`, `id_rol`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 2),
(6, 3),
(7, 1),
(8, 2),
(9, 3),
(10, 1),
(11, 2),
(12, 3),
(13, 1),
(14, 2),
(15, 3),
(16, 1),
(17, 2),
(18, 3),
(19, 1),
(20, 2),
(23, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id_actividad`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`,`correo`) USING BTREE;

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posee`
--
ALTER TABLE `posee`
  ADD PRIMARY KEY (`id_rol`,`id_privilegio`);

--
-- Indexes for table `privilegios`
--
ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id_privilegio`);

--
-- Indexes for table `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`,`nombre_proyecto`);

--
-- Indexes for table `registra`
--
ALTER TABLE `registra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`fecha`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id_empleado`,`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `registra`
--
ALTER TABLE `registra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tiene`
--
ALTER TABLE `tiene`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

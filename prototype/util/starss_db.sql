-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-starss.alwaysdata.net
-- Generation Time: Oct 11, 2022 at 07:46 PM
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

--
-- RELATIONSHIPS FOR TABLE `actividad`:
--

--
-- Dumping data for table `actividad`
--

INSERT INTO `actividad` (`descripcion_actividad`, `id_actividad`, `id_proyecto`) VALUES
('Prueba del error', 1, 1),
('Desarrollo de proyecto Altair', 3, 2),
('k', 4, 1),
('k', 6, 1),
('Desarrollo de función web para Pry', 7, 3),
('Desarrollo de proyecto Altair', 8, 2),
('Desarrollo de proyecto Altair', 9, 2),
('   Junta de consejo de departamento', 11, 5),
('proyecto altairrrr', 12, 2),
('k', 13, 1),
(' Junta de reasignaciones en proyecto Pyro', 14, 4),
('Desarrollo de función web para Pry', 16, 3),
('Desarrollo de función web para Pry', 17, 3),
('     Junta con colaboradoressss nuevos colabs', 19, 5),
('  Una nueva tarea del equipo en proyecto departamento', 20, 5),
(' Prueba de empleados', 343, 15),
('k', 344, 1),
('Prueba de act', 345, 17),
('p', 346, 17),
('leo act ', 347, 19),
('Hola', 349, 20),
('   pruebas Monse', 353, 21),
(' Prueba de agregar tarea', 356, 5),
('  jorge de CAstro estubo aqui esto es xdxdxd', 357, 19),
('  Tarea de prueba colaboradores repetidos 3', 359, 15),
(' Hola esto es una prueba 2', 360, 5),
('hola', 361, 29),
('Hola', 362, 19),
('Esto es una prueba para el SF', 365, 5),
('  Esto es una prueba tres', 366, 28),
(' adioos', 367, 15),
('Hola esto es una prueba por enésima vez', 368, 18),
('pruebaaa x', 369, 28),
(' alan', 370, 28),
('alanbrito', 371, 15),
('prueba alterna', 372, 5),
(' prueba', 373, 28),
('tarea de prueba', 374, 23),
('¡Salvar la Materia!', 375, 23),
('prueba 1000', 376, 15),
('Prueba con Manuel', 379, 23),
('Prueba con Manuel', 380, 23),
('Prueba presentación', 382, 5),
('prueba preee', 383, 5),
('Prueba de colaboradores en actividades MA', 384, 18),
('PRUEBA DE FUEGO, FECHA ORDENADA yey', 385, 5),
('Prueba de Alan en la tarde', 386, 5),
('Esta es una tarea de prueba', 387, 0),
('Prueba del 10 de oct', 388, 0),
('hola esto es una prueba de hoy 100/10', 389, 5),
('hotfix', 390, 18),
('prueba 2 dejar un solo colab', 391, 18),
('Falta muchooooooo pero hay fe', 392, 0);

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_tiempo_completo` tinyint(1) NOT NULL,
  `correo` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_auth0` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `empleado`:
--

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre`, `is_tiempo_completo`, `correo`, `sub_auth0`, `id_rol`) VALUES
(12, 'Alan', 1, 'aalan@natgas.com.mx', 'auth0|n#\"51_2*3f-kcansad', 3),
(4, 'Andrés', 0, 'aandres@natgas.com.mx', 'auth0|n#\"44_2*3f-kcansad', 1),
(19, 'Alejandro', 1, 'Ale_jandro@natgas.com.mx', 'auth0|n#\"58_2*3f-kcansad', 1),
(15, 'Diego', 1, 'ddiegoo@natgas.com.mx', 'auth0|n#\"54_2*3f-kcansad', 3),
(2, 'Emilio', 0, 'eemilio@natgas.com.mx', 'auth0|n#\"42_2*3f-kcansad', 2),
(17, 'Enrique', 1, 'Enriquex@natgas.com.mx', 'auth0|n#\"56_2*3f-kcansad', 2),
(18, 'Elvira', 1, 'Evlira@natgas.com.mx', 'auth0|n#\"57_2*3f-kcansad', 3),
(14, 'Felix', 1, 'felixg@natgas.com.mx', 'auth0|n#\"53_2*3f-kcansad', 2),
(10, 'Guadalupe', 0, 'gguadalupe@natgas.com.mx', 'auth0|n#\"50_2*3f-kcansad', 1),
(6, 'Monse', 0, 'jjose@natgas.com.mx', 'auth0|n#\"46_2*3f-kcansad', 3),
(5, 'Juan', 0, 'jjuan@natgas.com.mx', 'auth0|n#\"45_2*3f-kcansad', 2),
(7, 'Justino', 0, 'jjustino@natgas.com.mx', 'auth0|n#\"47_2*3f-kcansad', 1),
(11, 'Leonardo', 1, 'leo0ramolo@natgas.com.mx', 'auth0|n#\"50_2*3f-kcansad', 2),
(9, 'Monse', 0, 'mmonse@natgas.com.mx', 'auth0|n#\"49_2*3f-kcansad', 3),
(13, 'Monse', 1, 'mmonsee1@natgas.com.mx', 'auth0|n#\"52_2*3f-kcansad', 1),
(20, 'Monica', 1, 'MonicaAPW@natgas.com.mx', 'auth0|n#\"59_2*3f-kcansad', 2),
(1, 'Pedro', 0, 'ppedro@natgas.com.mx', 'auth0|n#\"41_2*3f-kcansad', 1),
(8, 'Ramona', 0, 'rramona@natgas.com.mx', 'auth0|n#\"48_2*3f-kcansad', 2),
(3, 'Regina', 0, 'rregina@natgas.com.mx', 'auth0|n#\"43_2*3f-kcansad', 3),
(16, 'Santiago', 1, 'santilb@natgas.com.mx', 'auth0|n#\"55_2*3f-kcansad', 1);

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `archivo` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `imagen`:
--

--
-- Dumping data for table `imagen`
--

INSERT INTO `imagen` (`id`, `archivo`) VALUES
(1, '/1664056362169-prueba.webp'),
(4, '/1664479225537-Mapeo.jpg'),
(5, '/1664479241200-MER.drawio (2).png'),
(6, '/1664479439818-prueba.webp'),
(7, '/1664818955943-captivating-image-of-chip-n-dale-q2iuhf77gamape5p.jpg'),
(8, '/1664820214039-6AE41DD2-720B-4652-88A6-1CAB21CEAA9C.jpeg'),
(9, '/1664903224751-Captura de Pantalla 2021-09-29 a la(s) 19.14.01.png'),
(10, '/1664903254309-Captura de Pantalla 2021-10-12 a la(s) 8.04.12.png'),
(11, '/1665068168835-captivating-image-of-chip-n-dale-q2iuhf77gamape5p.jpg'),
(12, '/1665153964557-gato.png');

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
-- RELATIONSHIPS FOR TABLE `proyecto`:
--

--
-- Dumping data for table `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre_proyecto`, `descripcion_proyecto`, `fecha_inicio`, `is_activo`, `tarea_proyecto`) VALUES
(5, 'Departamento', 'Trabajo en el departamento', '2022-10-03 19:25:24', 1, 0),
(18, 'Proyecto L', 'leo', '2022-09-29 22:00:00', 1, 0),
(28, 'Proyecto de prueba 2', 'Este es un proyecto para probar funciones 2', '2022-10-11 15:58:30', 1, 0),
(29, '8', 'hola', '2022-10-10 22:00:00', 1, 0),
(30, 'monsee', 'ahhh', '2022-10-10 22:00:00', 1, 0),
(31, 'proyecto fuegooo', 'esta caliente', '2022-10-10 22:00:00', 1, 0);

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

--
-- RELATIONSHIPS FOR TABLE `registra`:
--

--
-- Dumping data for table `registra`
--

INSERT INTO `registra` (`id`, `num_horas`, `id_actividad`, `id_empleado`, `fecha`, `sub_auth0`, `correo`) VALUES
(1, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(2, 9, 1, 1, '2022-09-27 23:22:11', 'auth0|n#\"41_2*3f-kcansad', 'pedro@natgas.com.mx'),
(3, 12, 3, 3, '2022-09-29 18:30:46', 'auth0|n#\"43_2*3f-kcansad', 'regina@natgas.com.mx'),
(4, 7, 4, 4, '2022-08-31 22:00:00', 'auth0|n#\"44_2*3f-kcansad', 'andres@natgas.com.mx'),
(5, 5, 6, 6, '2022-09-13 22:00:00', 'auth0|n#\"46_2*3f-kcansad', 'jose@natgas.com.mx'),
(6, 4, 8, 8, '2022-09-19 22:00:00', 'auth0|n#\"48_2*3f-kcansad', 'ramona@natgas.com.mx'),
(7, 1, 9, 9, '2022-09-20 22:00:00', 'auth0|n#\"49_2*3f-kcansad', 'monse@natgas.com.mx'),
(9, 7, 12, 3, '2022-04-08 22:00:00', 'auth0|n#\"51_2*3f-kcansad', 'aalan@natgas.com.mx'),
(10, 2, 13, 13, '2022-10-02 22:00:00', 'auth0|n#\"52_2*3f-kcansad', 'mmonsee1@natgas.com.mx'),
(11, 4, 14, 14, '2022-10-04 22:00:00', 'auth0|n#\"53_2*3f-kcansad', 'felixg@natgas.com.mx'),
(12, 10, 16, 16, '2022-09-27 23:34:37', 'auth0|n#\"55_2*3f-kcansad', 'santilb@natgas.com.mx'),
(13, 900, 17, 15, '2021-12-31 23:00:00', 'auth0|n#\"56_2*3f-kcansad', 'Enriquex@natgas.com.mx'),
(15, 6, 20, 14, '2022-10-04 22:00:00', 'auth0|n#\"59_2*3f-kcansad', 'MonicaAPW@natgas.com.mx'),
(16, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(17, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(18, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(19, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(20, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(21, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(22, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(23, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(24, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(25, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(26, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(27, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(28, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(29, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(30, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(31, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(32, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(33, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(34, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(35, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(36, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(37, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(38, 12, 0, 1983, '2000-03-06 23:00:00', '', ''),
(39, 7, 343, 12, '2022-10-04 22:00:00', '', ''),
(40, 7, 343, 4, '2022-10-04 22:00:00', '', ''),
(41, 7, 343, 19, '2022-10-04 22:00:00', '', ''),
(42, 7, 343, 17, '2022-10-04 22:00:00', '', ''),
(43, 7, 343, 10, '2022-10-04 22:00:00', '', ''),
(44, 7, 343, 5, '2022-10-04 22:00:00', '', ''),
(45, 7, 343, 11, '2022-10-04 22:00:00', '', ''),
(46, 4, 344, 12, '2022-09-29 22:00:00', '', ''),
(47, 4, 344, 4, '2022-09-29 22:00:00', '', ''),
(48, 4, 344, 19, '2022-09-29 22:00:00', '', ''),
(49, 8, 345, 9, '2022-09-30 17:51:24', '', ''),
(50, 8, 345, 20, '2022-09-30 17:51:24', '', ''),
(51, 8, 345, 8, '2022-09-30 17:51:24', '', ''),
(52, 8, 345, 16, '2022-09-30 17:51:24', '', ''),
(53, 0, 346, 4, '2022-09-29 22:00:00', '', ''),
(54, 0, 346, 2, '2022-09-29 22:00:00', '', ''),
(55, 8, 347, 12, '2022-09-29 22:00:00', '', ''),
(56, 8, 347, 15, '2022-09-29 22:00:00', '', ''),
(57, 8, 347, 2, '2022-09-29 22:00:00', '', ''),
(58, 8, 347, 18, '2022-09-29 22:00:00', '', ''),
(59, 5, 349, 12, '2022-09-29 22:00:00', '', ''),
(60, 5, 349, 4, '2022-09-29 22:00:00', '', ''),
(61, 5, 349, 19, '2022-09-29 22:00:00', '', ''),
(62, -3, 353, 1, '2022-10-04 22:00:00', '', ''),
(63, -3, 353, 9, '2022-10-04 22:00:00', '', ''),
(64, 2, 356, 12, '2022-10-03 22:00:00', '', ''),
(65, 2, 356, 6, '2022-10-03 22:00:00', '', ''),
(66, 2, 356, 11, '2022-10-03 22:00:00', '', ''),
(67, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(68, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(69, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(70, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(71, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(72, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(73, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(74, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(75, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(76, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(77, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(78, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(79, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(80, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(81, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(82, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(83, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(84, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(85, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(86, 11, 357, 17, '2022-10-04 22:00:00', '', ''),
(87, 4, 14, 0, '2022-10-04 22:00:00', '', ''),
(88, 4, 14, 1, '2022-10-04 22:00:00', '', ''),
(93, 6, 20, 12, '2022-10-04 22:00:00', '', ''),
(94, 6, 20, 6, '2022-10-04 22:00:00', '', ''),
(95, 6, 20, 11, '2022-10-04 22:00:00', '', ''),
(98, 11, 357, 8, '2022-10-04 22:00:00', '', ''),
(99, 2, 356, 1, '2022-10-03 22:00:00', '', ''),
(100, 2, 356, 4, '2022-10-03 22:00:00', '', ''),
(101, -3, 353, 1, '2022-10-04 22:00:00', '', ''),
(102, -3, 353, 2, '2022-10-04 22:00:00', '', ''),
(103, -3, 353, 1, '2022-10-04 22:00:00', '', ''),
(104, -3, 353, 2, '2022-10-04 22:00:00', '', ''),
(105, 3, 359, 1, '2022-10-05 22:00:00', '', ''),
(106, 3, 359, 2, '2022-10-05 22:00:00', '', ''),
(107, 3, 359, 1, '2022-10-05 22:00:00', '', ''),
(108, 3, 359, 2, '2022-10-05 22:00:00', '', ''),
(109, 3, 360, 4, '2022-10-04 22:00:00', '', ''),
(110, 3, 360, 15, '2022-10-04 22:00:00', '', ''),
(111, 3, 360, 1, '2022-10-04 22:00:00', '', ''),
(112, 3, 360, 2, '2022-10-04 22:00:00', '', ''),
(113, 6, 361, 1, '2022-10-03 22:00:00', '', ''),
(114, 6, 361, 2, '2022-10-03 22:00:00', '', ''),
(115, 3, 362, 20, '2022-10-04 22:00:00', '', ''),
(116, 3, 362, 16, '2022-10-04 22:00:00', '', ''),
(121, 4, 365, 12, '2022-10-04 22:00:00', '', ''),
(122, 4, 365, 14, '2022-10-04 22:00:00', '', ''),
(123, 4, 365, 11, '2022-10-04 22:00:00', '', ''),
(124, 4, 365, 9, '2022-10-04 22:00:00', '', ''),
(125, 21, 366, 1, '2022-10-04 22:00:00', '', ''),
(126, 21, 366, 6, '2022-10-04 22:00:00', '', ''),
(127, 21, 366, 1, '2022-10-04 22:00:00', '', ''),
(128, 21, 366, 2, '2022-10-04 22:00:00', '', ''),
(129, 21, 366, 1, '2022-10-04 22:00:00', '', ''),
(130, 21, 366, 2, '2022-10-04 22:00:00', '', ''),
(131, 4, 367, 11, '2022-10-04 22:00:00', '', ''),
(132, 4, 367, 12, '2022-10-04 22:00:00', '', ''),
(133, 4, 367, 15, '2022-10-04 22:00:00', '', ''),
(134, 4, 367, 7, '2022-10-04 22:00:00', '', ''),
(135, 4, 367, 1, '2022-10-04 22:00:00', '', ''),
(136, 6, 368, 16, '2022-10-06 22:00:00', '', ''),
(137, 6, 368, 20, '2022-10-06 22:00:00', '', ''),
(138, 1, 369, 8, '2022-10-03 22:00:00', '', ''),
(139, 1, 369, 10, '2022-10-03 22:00:00', '', ''),
(140, 1, 369, 18, '2022-10-03 22:00:00', '', ''),
(141, 2, 370, 1, '2022-10-04 22:00:00', '', ''),
(142, 2, 370, 2, '2022-10-04 22:00:00', '', ''),
(143, 2, 370, 2, '2022-10-04 22:00:00', '', ''),
(144, 2, 370, 1, '2022-10-04 22:00:00', '', ''),
(145, 10, 371, 1, '2022-10-05 22:00:00', '', ''),
(146, 10, 371, 2, '2022-10-05 22:00:00', '', ''),
(151, 3, 372, 12, '2022-10-06 22:00:00', '', ''),
(152, 3, 372, 16, '2022-10-06 22:00:00', '', ''),
(153, 3, 372, 20, '2022-10-06 22:00:00', '', ''),
(154, 7, 343, 1, '2022-10-04 22:00:00', '', ''),
(155, 7, 343, 7, '2022-10-04 22:00:00', '', ''),
(156, 5, 373, 6, '2022-10-04 22:00:00', '', ''),
(157, 5, 373, 7, '2022-10-04 22:00:00', '', ''),
(158, 5, 373, 10, '2022-10-04 22:00:00', '', ''),
(159, 5, 373, 1, '2022-10-04 22:00:00', '', ''),
(160, 5, 373, 2, '2022-10-04 22:00:00', '', ''),
(161, 8, 374, 10, '2022-10-07 22:00:00', '', ''),
(162, 8, 374, 6, '2022-10-07 22:00:00', '', ''),
(163, 6, 375, 12, '2022-10-05 22:00:00', '', ''),
(164, 6, 375, 14, '2022-10-05 22:00:00', '', ''),
(165, 6, 375, 6, '2022-10-05 22:00:00', '', ''),
(166, 6, 375, 11, '2022-10-05 22:00:00', '', ''),
(167, 3, 376, 17, '2022-10-04 22:00:00', '', ''),
(168, 3, 376, 18, '2022-10-04 22:00:00', '', ''),
(169, 3, 376, 7, '2022-10-04 22:00:00', '', ''),
(170, 3, 376, 1, '2022-10-04 22:00:00', '', ''),
(171, 3, 376, 0, '2022-10-04 22:00:00', '', ''),
(172, 21, 366, 1, '2022-10-04 22:00:00', '', ''),
(173, 21, 366, 2, '2022-10-04 22:00:00', '', ''),
(174, 10, 371, 9, '2022-10-05 22:00:00', '', ''),
(175, 10, 371, 1, '2022-10-05 22:00:00', '', ''),
(176, 10, 371, 12, '2022-10-05 22:00:00', '', ''),
(177, 10, 371, 14, '2022-10-05 22:00:00', '', ''),
(178, 10, 371, 13, '2022-10-05 22:00:00', '', ''),
(179, 10, 371, 20, '2022-10-05 22:00:00', '', ''),
(182, 3, 359, 4, '2022-10-05 22:00:00', '', ''),
(183, 3, 359, 19, '2022-10-05 22:00:00', '', ''),
(184, 3, 359, 15, '2022-10-05 22:00:00', '', ''),
(185, 3, 359, 5, '2022-10-05 22:00:00', '', ''),
(186, 3, 359, 6, '2022-10-05 22:00:00', '', ''),
(187, 3, 359, 17, '2022-10-05 22:00:00', '', ''),
(188, 3, 359, 20, '2022-10-05 22:00:00', '', ''),
(189, 3, 359, 18, '2022-10-05 22:00:00', '', ''),
(190, 3, 359, 14, '2022-10-05 22:00:00', '', ''),
(191, 3, 359, 10, '2022-10-05 22:00:00', '', ''),
(194, 3, 379, 14, '2022-10-05 22:00:00', '', ''),
(195, 3, 379, 5, '2022-10-05 22:00:00', '', ''),
(196, 3, 379, 13, '2022-10-05 22:00:00', '', ''),
(197, 3, 380, 14, '2022-10-05 22:00:00', '', ''),
(198, 3, 380, 5, '2022-10-05 22:00:00', '', ''),
(199, 3, 380, 9, '2022-10-05 22:00:00', '', ''),
(201, 5, 382, 12, '2022-10-06 22:00:00', '', ''),
(202, 5, 382, 14, '2022-10-06 22:00:00', '', ''),
(203, 5, 382, 6, '2022-10-06 22:00:00', '', ''),
(204, 5, 382, 11, '2022-10-06 22:00:00', '', ''),
(205, 3, 372, 1, '2022-10-06 22:00:00', '', ''),
(206, 3, 372, 1, '2022-10-06 22:00:00', '', ''),
(207, 16, 383, 4, '2022-10-06 22:00:00', '', ''),
(208, 16, 383, 19, '2022-10-06 22:00:00', '', ''),
(209, 16, 383, 15, '2022-10-06 22:00:00', '', ''),
(210, 13, 384, 12, '2022-10-06 22:00:00', '', ''),
(211, 13, 384, 9, '2022-10-06 22:00:00', '', ''),
(212, 12, 385, 12, '2022-10-06 22:00:00', '', ''),
(213, 12, 385, 6, '2022-10-06 22:00:00', '', ''),
(214, 12, 385, 14, '2022-10-06 22:00:00', '', ''),
(215, 12, 385, 11, '2022-10-06 22:00:00', '', ''),
(216, 12, 385, 5, '2022-10-06 22:00:00', '', ''),
(217, 13, 384, 14, '2022-10-06 22:00:00', '', ''),
(218, 13, 384, 11, '2022-10-06 22:00:00', '', ''),
(219, 13, 384, 8, '2022-10-06 22:00:00', '', ''),
(220, 16, 383, 1, '2022-10-06 22:00:00', '', ''),
(221, 16, 383, 8, '2022-10-06 22:00:00', '', ''),
(222, 8, 386, 8, '2022-10-06 22:00:00', '', ''),
(223, 8, 386, 3, '2022-10-06 22:00:00', '', ''),
(224, 8, 386, 16, '2022-10-06 22:00:00', '', ''),
(225, 8, 386, 14, '2022-10-06 22:00:00', '', ''),
(226, 8, 386, 11, '2022-10-06 22:00:00', '', ''),
(227, 8, 386, 1, '2022-10-06 22:00:00', '', ''),
(228, 8, 386, 8, '2022-10-06 22:00:00', '', ''),
(229, 6, 368, 1, '2022-10-06 22:00:00', '', ''),
(230, 6, 368, 1, '2022-10-06 22:00:00', '', ''),
(231, 6, 368, 7, '2022-10-06 22:00:00', '', ''),
(234, 8, 387, 12, '2022-10-09 22:00:00', '', ''),
(235, 8, 387, 10, '2022-10-09 22:00:00', '', ''),
(236, 8, 387, 7, '2022-10-09 22:00:00', '', ''),
(237, 8, 387, 5, '2022-10-09 22:00:00', '', ''),
(238, 10, 388, 17, '2022-10-10 22:00:00', '', ''),
(241, 8, 387, 1, '2022-10-09 22:00:00', '', ''),
(242, 10, 388, 5, '2022-10-10 22:00:00', '', ''),
(243, 10, 388, 2, '2022-10-10 22:00:00', '', ''),
(244, 10, 388, 18, '2022-10-10 22:00:00', '', ''),
(245, 6, 389, 12, '2022-10-09 22:00:00', '', ''),
(254, 6, 389, 0, '2022-10-09 22:00:00', '', ''),
(256, 6, 389, 0, '2022-10-09 22:00:00', '', ''),
(257, 6, 389, 4, '2022-10-09 22:00:00', '', ''),
(258, 6, 389, 19, '2022-10-09 22:00:00', '', ''),
(261, 6, 389, 2, '2022-10-09 22:00:00', '', ''),
(262, 4, 390, 12, '2022-10-12 22:00:00', '', ''),
(268, 1, 391, 1, '2022-10-10 22:00:00', '', ''),
(270, 20, 392, 12, '2022-10-10 22:00:00', '', ''),
(271, 20, 392, 6, '2022-10-10 22:00:00', '', ''),
(272, 20, 392, 11, '2022-10-10 22:00:00', '', '');

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
-- RELATIONSHIPS FOR TABLE `reporte`:
--

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
-- RELATIONSHIPS FOR TABLE `rol`:
--

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `descripcion`) VALUES
(1, 'Coordinador'),
(2, 'Lider'),
(3, 'Colaborador');

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
  ADD PRIMARY KEY (`correo`,`id_empleado`,`sub_auth0`);

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=393;

--
-- AUTO_INCREMENT for table `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `registra`
--
ALTER TABLE `registra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

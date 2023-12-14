-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2023 a las 01:08:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `planeacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_administrador` int(11) NOT NULL,
  `rut_administrador` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_administrador`, `rut_administrador`, `nombre`, `correo`, `password`) VALUES
(1, '11111111-1', 'admin', 'admin@ucen.cl', '$2b$10$HhrYwMQpciMpF9owoMxvGO96rEslpOjWmnSPcTGxANshasQ.O42Ti');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `id_alumno` int(11) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id_alumno`, `rut`, `nombre`, `correo`, `password`, `id_carrera`, `estado`) VALUES
(1, '20908852-5', 'BENJAMIN BRAVO', 'benja.b@ucen.cl', '$2b$10$gZb1CpV152tGIkW/yAlP8.BEcbowEFhVk9a.ltxdYBPOhYYSMz3DK', 889, 1),
(8, '20655755-9', 'EDUARDO TAPIA', 'eduardo.t@ucen.cl', '$2b$10$bMzo199iUnV4Hkr7MCPToeWl5M3P5L2zlfTT2XUvrdafz39gsB61W', 889, 1),
(10, '20913811-5', 'DAMIAN VELASCO ', 'damian.v@ucen.cl', '$2b$10$I85AqXc3F7dSzUR9v7VlwO7oLsYd54s3/YrEMY5Byl/XFKxkMQJoe', 889, 1),
(20, '20912164-6', 'VICENTE JULIO', 'vicentej@ucen.cl', '$2b$10$I.w5Nn/5f6VFlASHaSTgEeM74NNgJitvepqcGMQsOXGeCUCpKnrx6', 889, 1),
(23, '20819830-0', 'RONY PEREZ', 'rony.p@ucen.cl', '$2b$10$FOkMjp8Pu5fYgnBTrpvFjeVLJlxiD5/Eb8kleq9c0yGvnlLB74Fvm', 889, 1),
(24, '12312-3', 'benjamin', 'benja@', '$2b$10$y9Bat1x/tSwvuBFbScj2.OgRzj6AlxXrlxjji83NzoY28dmDny62y', 996, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_asignatura`
--

CREATE TABLE `alumno_asignatura` (
  `id_alumno_asignatura` int(11) NOT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno_asignatura`
--

INSERT INTO `alumno_asignatura` (`id_alumno_asignatura`, `id_alumno`, `id_asignatura`) VALUES
(1, 1, 19068),
(2, 10, 19083),
(3, 8, 19083),
(5, 1, 19080),
(6, 1, 19086),
(7, 1, 3364),
(11, 23, 19080),
(12, 23, 19080),
(13, 23, 19083),
(14, 23, 19068),
(15, 23, 3364),
(16, 10, 3347),
(17, 10, 19068),
(18, 10, 3341);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `id_asignatura` int(3) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `id_nivel` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id_asignatura`, `nombre`, `id_nivel`) VALUES
(3328, 'ESTRUCTURA DE DATOS', 5),
(3329, 'FUNDAMENTOS DE LENGUAJES DE PROGRAMACION', 4),
(3335, 'SISTEMAS DIGITALES', 3),
(3341, 'ANALISIS Y DISEÑO DE SISTEMAS DE INFORMA', 6),
(3344, 'ARQUITECTURA DE COMPUTADORES', 4),
(3346, 'SISTEMAS OPERATIVOS', 5),
(3347, 'BASES DE DATOS', 6),
(3352, 'PRACTICA OPERACIONAL', 7),
(3355, 'TOPICOS AVANZADOS DE DATOS', 7),
(3364, 'INGENIERIA DE SOFTWARE', 8),
(3780, 'ELECTIVO DE ESPECIALIZACION PROFESIONAL ', 9),
(3782, 'ELECTIVO DE ESPECIALIZACION PROFESIONAL ', 10),
(3783, 'GESTION DE CALIDAD DE SOFTWARE', 9),
(3785, 'PRACTICA PROFESIONAL', 9),
(3787, 'ELECTIVO DE ESPECIALIZACION PROFESIONAL ', 11),
(3850, 'DIBUJO GRAFICO COMPUTACIONAL', 2),
(4856, 'PLANIFICACION ESTRATEGICA', 11),
(14702, 'PROGRAMACION COMPUTACIONAL', 2),
(19008, 'SEGURIDAD INFORMATICA', 10),
(19017, 'COMPLEJIDAD DE ALGORITMOS', 6),
(19063, 'AUTOMATIZACION', 7),
(19064, 'ARQUITECTURA DE SOFTWARE', 7),
(19065, 'REDES DE DATOS Y SISTEMAS DISTRIBUIDOS', 6),
(19068, 'INTELIGENCIA ARTIFICIAL', 8),
(19071, 'ETICA Y MORAL PROFESIONAL', 10),
(19076, 'INTRODUCCION A LA INGENIERIA EN COMPUTAC', 1),
(19080, 'TALLER INTEGRADOR II', 8),
(19081, 'SISTEMAS INTELIGENTES', 9),
(19082, 'DIRECCION Y EVALUACION DE PROYECTOS INFO', 10),
(19083, 'MINERIA DE DATOS', 11),
(19084, 'PROGRAMACION ORIENTADA A OBJETOS', 2),
(19085, 'TALLER INTEGRADOR I', 2),
(19086, 'PROGRAMACION DE APLICACIONES', 8),
(19537, 'PROYECTO DE TITULO I', 9),
(19541, 'PROYECTO DE TITULO II', 11),
(56004, 'PETROGRAFIA Y MINERALOGIA', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `id_carrera` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_facultad` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`id_carrera`, `nombre`, `id_facultad`) VALUES
(889, 'ESCUELA DE INGENIERIA CIVIL EN COMPUTACION E INFOR', 0),
(996, 'ESCUELA DE INGENIERÍA CIVIL EN MINAS', 0),
(998, 'ESCUELA DE INGENIERIA CIVIL INDUSTRIAL', 0),
(1000, 'ESCUELA DE INGENIERIA EN CONSTRUCCION', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera_asignatura`
--

CREATE TABLE `carrera_asignatura` (
  `id_carrera_asignatura` int(11) NOT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `periodo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera_asignatura`
--

INSERT INTO `carrera_asignatura` (`id_carrera_asignatura`, `id_asignatura`, `id_carrera`, `periodo`) VALUES
(1, 14702, 889, '2024-02'),
(3, 14702, 889, '2024-01'),
(4, 19076, 889, '2024-01'),
(5, 3335, 889, '2024-01'),
(6, 3328, 889, '2024-01'),
(7, 19064, 889, '2024-01'),
(8, 19063, 889, '2024-01'),
(9, 3352, 889, '2024-01'),
(10, 3355, 889, '2024-01'),
(11, 3780, 889, '2024-01'),
(12, 3783, 889, '2024-01'),
(13, 3785, 889, '2024-01'),
(14, 19537, 889, '2024-01'),
(15, 19081, 889, '2024-01'),
(16, 19083, 889, '2024-01'),
(17, 19541, 889, '2024-01'),
(18, 3780, 889, '2024-01'),
(19, 4856, 889, '2024-01'),
(20, 19084, 889, '2024-02'),
(21, 19085, 889, '2024-02'),
(22, 3329, 889, '2024-02'),
(23, 3344, 889, '2024-02'),
(24, 3341, 889, '2024-02'),
(25, 3347, 889, '2024-02'),
(26, 19017, 889, '2024-02'),
(27, 19065, 889, '2024-02'),
(28, 3352, 889, '2024-02'),
(29, 3364, 889, '2024-02'),
(30, 19068, 889, '2024-02'),
(31, 19080, 889, '2024-02'),
(32, 19086, 889, '2024-02'),
(33, 3782, 889, '2024-02'),
(34, 19008, 889, '2024-02'),
(35, 19071, 889, '2024-02'),
(36, 19082, 889, '2024-02'),
(37, 19537, 889, '2024-02'),
(38, 56004, 996, '2024-02'),
(39, 19541, 998, '2024-02'),
(40, 3850, 1000, '2024-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera_sede`
--

CREATE TABLE `carrera_sede` (
  `id_carrera` int(5) NOT NULL,
  `id_sede` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera_sede`
--

INSERT INTO `carrera_sede` (`id_carrera`, `id_sede`) VALUES
(889, 4),
(996, 4),
(998, 4),
(1000, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disputa`
--

CREATE TABLE `disputa` (
  `id_disputa` int(11) NOT NULL,
  `id_solicitud` int(11) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tipo_usuario` tinyint(1) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disputa`
--

INSERT INTO `disputa` (`id_disputa`, `id_solicitud`, `descripcion`, `tipo_usuario`, `fecha`) VALUES
(21, 33, 'a las 17:15 del mismo dia tengo libre', 1, '2023-12-12 20:24:04'),
(22, 33, 'claro a esa hora', NULL, '2023-12-12 20:24:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id_evento` int(11) NOT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  `id_horario` int(11) DEFAULT NULL,
  `id_sala` varchar(50) DEFAULT NULL,
  `cupos` int(10) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `fecha` varchar(20) DEFAULT NULL,
  `nivel_asignatura` int(11) DEFAULT NULL,
  `cancelado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id_evento`, `id_asignatura`, `id_horario`, `id_sala`, `cupos`, `seccion`, `fecha`, `nivel_asignatura`, `cancelado`) VALUES
(2, 19086, 7, 'B308', 30, '201', 'lunes', NULL, NULL),
(3, 3364, 8, 'B308', 30, '201', 'lunes', NULL, NULL),
(4, 19068, 5, 'B509', 30, '201', 'martes', NULL, NULL),
(5, 19080, 6, 'B509', 30, '201', 'martes', NULL, NULL),
(6, 19086, 7, 'B307', 30, '201', 'martes', NULL, NULL),
(7, 19086, 8, 'B307', 30, '201', 'martes', NULL, NULL),
(9, 19068, 5, 'LC2', 30, '201', 'jueves', NULL, NULL),
(18, 19081, 5, 'B405', 40, '201', 'martes', 9, NULL),
(22, 3346, 1, 'LC2', 40, '201', 'martes', 5, NULL),
(34, 19068, 6, 'B308', 30, '201', 'lunes', NULL, NULL),
(36, 3364, 6, 'B405', 40, '201', 'miércoles', NULL, NULL),
(37, 3364, 7, 'B405', 30, '201', 'miércoles', NULL, NULL),
(38, 19083, 7, 'B308', 30, '201', 'martes', NULL, 'red'),
(39, 3347, 5, 'B308', 30, '201', 'martes', NULL, NULL),
(40, 3347, 7, 'B307', 30, '201', 'viernes', NULL, NULL),
(41, 3347, 6, 'B308', 30, '201', 'jueves', NULL, NULL),
(42, 3341, 6, 'B308', 40, '201', 'lunes', NULL, NULL),
(43, 3341, 7, 'B308', 30, '201', 'lunes', NULL, NULL),
(44, 3341, 6, 'B307', 40, '201', 'miércoles', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultad`
--

CREATE TABLE `facultad` (
  `id_facultad` int(11) NOT NULL,
  `nombre_facultad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facultad`
--

INSERT INTO `facultad` (`id_facultad`, `nombre_facultad`) VALUES
(0, 'FACULTAD DE INGENIERÍA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int(11) NOT NULL,
  `start` varchar(20) DEFAULT NULL,
  `end` varchar(20) DEFAULT NULL,
  `bloque` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `start`, `end`, `bloque`) VALUES
(1, '08:15:00', '09:35:00', '8:15 - 9:35'),
(2, '09:45:00', '11:05:00', '9:45 - 11:05'),
(3, '11:15:00', '12:35:00', '11:15 - 12:35'),
(4, '12:45:00', '14:05:00', '12:45 - 14:05'),
(5, '14:15:00', '15:35:00', '14:15 - 15:35'),
(6, '15:45:00', '17:05:00', '15:45 - 17:05'),
(7, '17:15:00', '18:35:00', '17:15 - 18:35'),
(8, '18:50:00', '20:10:00', '18:50 - 20:10'),
(9, '20:15:00', '21:35:00', '20:15 - 21:35'),
(10, '21:40:00', '23:00:00', '21:40 - 23:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE `nivel` (
  `id_nivel` int(11) NOT NULL,
  `detalle` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`id_nivel`, `detalle`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6'),
(7, '7'),
(8, '8'),
(9, '9'),
(10, '10'),
(11, '11'),
(12, '12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `id_profesor` int(11) NOT NULL,
  `rut_profesor` varchar(12) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrato` varchar(50) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id_profesor`, `rut_profesor`, `nombre`, `contrato`, `correo`, `password`, `estado`) VALUES
(1, '12345678-9', 'PATRICIO ALEJANDRO ROJAS CARRASCO', 'Planta', 'patricio.r@gmail.cl', '$2b$10$/30UfxNIAjHTrjDWkqdxser8qYZ8BdoNBjKHnJwbVZAthN2vIM03K', 1),
(2, '12345678-0', 'MARIO HERNAN ORTIZ BONILLA', 'Planta', 'mario.o@ucen.cl', '$2b$10$cFsfi07wWWnI2zXWJORkwOQDfT.L/pluwtRe6rTQkUljD7HyL8cue', 1),
(3, '12312312-3', 'CLAUDIA MARCELA CONTRERAS GAHONA', 'Honorario', 'claudia.m@ucen.cl', '$2b$10$048MDBs1yGlknNd9I0lU.OC0QSSXtIQdwUSlrRsY2BwZoMWKepw1y', 1),
(4, '32132132-7', 'CHRISTIAN LUIS ACUNA OPAZO', 'Planta', 'christian.l@ucen.cl', '$2b$10$.UnTZluqTgZfyNOZA81zEu4MFri.1AH9B911gpu7MQL/.CTaoXPp2', 1),
(5, '23123123-4', 'SEBASTIAN BAEZA DONOSO', 'Planta', 'sebastian.b@ucen.cl', '$2b$10$lNKMl3RlYfng0tEXCAOjku6mTWYQIuDtAMAb5RHUrIM78Q/wgHtam', 1),
(15, '98765432-2', 'JOSE LUIS VEAS MUÑOZ', 'Honorario', 'jose.l@ucen.cl', '$2b$10$SPIF0eeu/pjn3Og/HhQ1DOAu7iOfnqsEDZl8VhitXBr63/FCs3iqa', 1),
(16, '28327828-2', 'FRANCISCO GABRIEL CAICEO LEON', 'Honorario', 'francisco.g@ucen.cl', '$2b$10$qOzOZWej8w1R5pyXq92Oye8aDMQvTx3aB4OeNsOCfA2oWnsozX5TW', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_asignatura`
--

CREATE TABLE `profesor_asignatura` (
  `id_profesor_asignatura` int(11) NOT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor_asignatura`
--

INSERT INTO `profesor_asignatura` (`id_profesor_asignatura`, `id_profesor`, `id_asignatura`) VALUES
(1, 1, 19017),
(2, 1, 3329),
(3, 1, 19063),
(6, 1, 19081),
(7, 1, 19085),
(8, 2, 19083),
(9, 2, 3341),
(10, 2, 3347),
(11, 5, 4856),
(12, 3, 3344),
(13, 3, 3782),
(14, 4, 19537),
(15, 1, 19068),
(16, 2, 19080),
(17, 15, 19086),
(18, 16, 3364),
(19, 2, 3341);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sala`
--

CREATE TABLE `sala` (
  `id_sala` varchar(11) NOT NULL,
  `detalle` varchar(15) NOT NULL,
  `id_sede` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sala`
--

INSERT INTO `sala` (`id_sala`, `detalle`, `id_sede`) VALUES
('A206', 'SALA', 4),
('A208', 'SALA', 4),
('B307', 'LETIC', 4),
('B308', 'LETIC', 4),
('B405', 'SALA', 4),
('B408', 'SALA', 4),
('B413', 'SALA', 4),
('B509', 'SALA', 4),
('B511', 'SALA', 4),
('LC1', 'LETIC', 4),
('LC2', 'LETIC', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `id_sede` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `telefono` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`id_sede`, `nombre`, `telefono`) VALUES
(4, 'COQUIMBO', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id_solicitud` int(11) NOT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `tipo_solicitud` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_administrador` int(11) DEFAULT NULL,
  `id_evento` int(11) DEFAULT NULL,
  `id_horario` int(11) DEFAULT NULL,
  `fecha` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id_solicitud`, `id_profesor`, `tipo_solicitud`, `estado`, `fecha_creacion`, `fecha_actualizacion`, `id_administrador`, `id_evento`, `id_horario`, `fecha`) VALUES
(33, 2, 'Cambio hora de clase', 'Cambio Aceptado', '2023-12-12 20:21:19', '2023-12-12 20:25:23', 1, 40, 7, 'viernes'),
(34, 2, 'Cambio hora de clase', 'En revisión', '2023-12-12 20:27:50', '2023-12-12 20:28:02', 1, 5, 5, 'sábado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_administrador`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`id_alumno`),
  ADD KEY `id_carrera` (`id_carrera`);

--
-- Indices de la tabla `alumno_asignatura`
--
ALTER TABLE `alumno_asignatura`
  ADD PRIMARY KEY (`id_alumno_asignatura`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`id_asignatura`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`id_carrera`),
  ADD KEY `id_facultad` (`id_facultad`);

--
-- Indices de la tabla `carrera_asignatura`
--
ALTER TABLE `carrera_asignatura`
  ADD PRIMARY KEY (`id_carrera_asignatura`),
  ADD KEY `id_asignatura` (`id_asignatura`),
  ADD KEY `id_carrera` (`id_carrera`);

--
-- Indices de la tabla `carrera_sede`
--
ALTER TABLE `carrera_sede`
  ADD PRIMARY KEY (`id_carrera`,`id_sede`),
  ADD KEY `id_sede` (`id_sede`);

--
-- Indices de la tabla `disputa`
--
ALTER TABLE `disputa`
  ADD PRIMARY KEY (`id_disputa`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id_evento`),
  ADD KEY `id_asignatura` (`id_asignatura`),
  ADD KEY `id_horario` (`id_horario`),
  ADD KEY `id_sala` (`id_sala`),
  ADD KEY `fk_nivel_asignatura` (`nivel_asignatura`);

--
-- Indices de la tabla `facultad`
--
ALTER TABLE `facultad`
  ADD PRIMARY KEY (`id_facultad`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
  ADD PRIMARY KEY (`id_nivel`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`id_profesor`);

--
-- Indices de la tabla `profesor_asignatura`
--
ALTER TABLE `profesor_asignatura`
  ADD PRIMARY KEY (`id_profesor_asignatura`),
  ADD KEY `id_profesor` (`id_profesor`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `sala`
--
ALTER TABLE `sala`
  ADD PRIMARY KEY (`id_sala`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_profesor` (`id_profesor`),
  ADD KEY `id_administrador` (`id_administrador`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_horario` (`id_horario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `alumno_asignatura`
--
ALTER TABLE `alumno_asignatura`
  MODIFY `id_alumno_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1119;

--
-- AUTO_INCREMENT de la tabla `carrera_asignatura`
--
ALTER TABLE `carrera_asignatura`
  MODIFY `id_carrera_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `disputa`
--
ALTER TABLE `disputa`
  MODIFY `id_disputa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `nivel`
--
ALTER TABLE `nivel`
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `id_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `profesor_asignatura`
--
ALTER TABLE `profesor_asignatura`
  MODIFY `id_profesor_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id_carrera`);

--
-- Filtros para la tabla `alumno_asignatura`
--
ALTER TABLE `alumno_asignatura`
  ADD CONSTRAINT `alumno_asignatura_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`),
  ADD CONSTRAINT `alumno_asignatura_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`);

--
-- Filtros para la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id_nivel`);

--
-- Filtros para la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id_facultad`);

--
-- Filtros para la tabla `carrera_asignatura`
--
ALTER TABLE `carrera_asignatura`
  ADD CONSTRAINT `carrera_asignatura_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`),
  ADD CONSTRAINT `carrera_asignatura_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id_carrera`);

--
-- Filtros para la tabla `carrera_sede`
--
ALTER TABLE `carrera_sede`
  ADD CONSTRAINT `carrera_sede_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id_carrera`),
  ADD CONSTRAINT `carrera_sede_ibfk_2` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`);

--
-- Filtros para la tabla `disputa`
--
ALTER TABLE `disputa`
  ADD CONSTRAINT `disputa_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`),
  ADD CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`),
  ADD CONSTRAINT `eventos_ibfk_3` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`),
  ADD CONSTRAINT `fk_nivel_asignatura` FOREIGN KEY (`nivel_asignatura`) REFERENCES `asignatura` (`id_nivel`);

--
-- Filtros para la tabla `profesor_asignatura`
--
ALTER TABLE `profesor_asignatura`
  ADD CONSTRAINT `profesor_asignatura_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`),
  ADD CONSTRAINT `profesor_asignatura_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`),
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`),
  ADD CONSTRAINT `solicitudes_ibfk_3` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id_evento`),
  ADD CONSTRAINT `solicitudes_ibfk_4` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

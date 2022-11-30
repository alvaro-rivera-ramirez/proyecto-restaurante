-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2022 a las 17:53:38
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nom_categoria` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nom_categoria`) VALUES
(1, 'entrada'),
(2, 'Bebida sin Alcoholica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cli` int(11) NOT NULL,
  `nom_cli` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `dni_cli` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_ped` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `cantidad_det` int(11) NOT NULL,
  `descripcion_det` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_mesa`
--

CREATE TABLE `estado_mesa` (
  `id_emesa` int(11) NOT NULL,
  `estado_emesa` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `id_epedido` int(11) NOT NULL,
  `tipo_epedido` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medio_pago`
--

CREATE TABLE `medio_pago` (
  `id_mpago` int(11) NOT NULL,
  `tipo_mpago` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `id_mesa` int(11) NOT NULL,
  `id_piso` int(11) NOT NULL,
  `id_emesa` int(11) NOT NULL,
  `numero_mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa_pedido`
--

CREATE TABLE `mesa_pedido` (
  `id_ped` int(11) NOT NULL,
  `id_mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE `modalidad` (
  `id_mod` int(11) NOT NULL,
  `nom_mod` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL,
  `id_mpago` int(11) NOT NULL,
  `id_ped` int(11) NOT NULL,
  `fecha_pago` date NOT NULL,
  `total_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_ped` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  `id_cli` int(11) NOT NULL,
  `id_epedido` int(11) NOT NULL,
  `id_mod` int(11) NOT NULL,
  `fecha_ped` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE `piso` (
  `id_piso` int(11) NOT NULL,
  `numero_piso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_prod` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nom_prod` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `descripcion_prod` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_u_prod` float DEFAULT NULL,
  `imagen_prod` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_prod`, `id_categoria`, `nom_prod`, `descripcion_prod`, `precio_u_prod`, `imagen_prod`) VALUES
(8, 1, 'dota', 'aaaaa', 12, 'http://localhost:3000/public/img/productos/1669211434313.jpg'),
(10, 1, 'dota', 'aaaaa', 12, 'http://localhost:3000/public/img/productos/1669214450117.jpg'),
(11, 1, 'dota', 'aaaaa', 12, 'http://localhost:3000/public/img/productos/1669214486047.jpg'),
(14, 1, 'cuba libre', 'quema hasta el estomago', 12, 'image1669224514834.jpeg'),
(15, 2, 'quema', 'bastante', 11, 'image1669224709447.jpeg'),
(16, 2, 'dasd', 'dasdas', 12, 'image1669225174642.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipousu` int(11) NOT NULL,
  `nom_tipousu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipousu`, `nom_tipousu`) VALUES
(1, 'Administrador'),
(2, 'Cajero'),
(3, 'Mesero'),
(4, 'Cocinero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL,
  `tipo_usu` int(11) NOT NULL,
  `dni_usu` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nom_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `ape1_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ape2_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `email_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `psw_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `dir_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `tipo_usu`, `dni_usu`, `nom_usu`, `ape1_usu`, `ape2_usu`, `email_usu`, `psw_usu`, `dir_usu`) VALUES
(41, 1, '72230547', 'Johan Marcos', 'Condori ', 'Orellana', 'johanmarcos1@gmail.com', '$2b$10$QUFxm2eP7Rp5jTGk2AH1B.EdhgH58miFiWczecY5qYnheHKcqOWq2', 'Alto de la Alianza'),
(44, 2, '72230549', 'marcos', 'condori2', 'orellana2', 'jcondorio@unjbg.edu.pe', '$2b$10$PxtxpPkrsUSwezt4t4jW6eQTN9c2CPnpz2Lq17gakHQHILtnLyGvG', 'cono sur'),
(45, 4, '72230547', 'aaaa', 'Condori ', 'Orellana', 'prueba@gmail.com', '$2b$10$hU9EQo7i2Xsjz7Td0dCstuaA4uiEg2l.MEmVchtmqoi0UnI5NoYh2', 'cono sur'),
(46, 3, '42685346', 'dota3', 'dota', 'dota', 'miracomoregistra@gmail.com', '$2b$10$pbPnwGiKwaWc9ZVHVlqhB.B/hrCT5tINwXf9bFc1dQZou5BoH2ZJO', 'cono sur'),
(47, 2, '72230511', 'johanorellana', 'orellana', 'orellana', 'asdas@gmail.com', '$2b$10$oaS3fhLjvckOK8rXlzvSFebZU7h6d4VrMZcqC7WY9UNt0DUfD/wey', 'cono sur');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cli`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD KEY `ID_PED` (`id_ped`),
  ADD KEY `ID_PROD` (`id_prod`);

--
-- Indices de la tabla `estado_mesa`
--
ALTER TABLE `estado_mesa`
  ADD PRIMARY KEY (`id_emesa`);

--
-- Indices de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  ADD PRIMARY KEY (`id_epedido`);

--
-- Indices de la tabla `medio_pago`
--
ALTER TABLE `medio_pago`
  ADD PRIMARY KEY (`id_mpago`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`id_mesa`),
  ADD KEY `ID_EMESA` (`id_emesa`),
  ADD KEY `ID_PISO` (`id_piso`);

--
-- Indices de la tabla `mesa_pedido`
--
ALTER TABLE `mesa_pedido`
  ADD KEY `ID_MESA` (`id_mesa`),
  ADD KEY `ID_PED` (`id_ped`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`id_mod`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD UNIQUE KEY `unico` (`id_ped`),
  ADD KEY `ID_MPAGO` (`id_mpago`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_ped`),
  ADD KEY `ID_CLI` (`id_cli`),
  ADD KEY `ID_EPEDIDO` (`id_epedido`),
  ADD KEY `ID_MOD` (`id_mod`),
  ADD KEY `ID_USU` (`id_usu`);

--
-- Indices de la tabla `piso`
--
ALTER TABLE `piso`
  ADD PRIMARY KEY (`id_piso`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `ID_CATEGORIA` (`id_categoria`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipousu`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `email_unico` (`email_usu`),
  ADD KEY `TIPO_USU` (`tipo_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cli` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_mesa`
--
ALTER TABLE `estado_mesa`
  MODIFY `id_emesa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `id_epedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medio_pago`
--
ALTER TABLE `medio_pago`
  MODIFY `id_mpago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mesa`
--
ALTER TABLE `mesa`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  MODIFY `id_mod` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_ped` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `piso`
--
ALTER TABLE `piso`
  MODIFY `id_piso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipousu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`);

--
-- Filtros para la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`id_emesa`) REFERENCES `estado_mesa` (`id_emesa`),
  ADD CONSTRAINT `mesa_ibfk_2` FOREIGN KEY (`id_piso`) REFERENCES `piso` (`id_piso`);

--
-- Filtros para la tabla `mesa_pedido`
--
ALTER TABLE `mesa_pedido`
  ADD CONSTRAINT `mesa_pedido_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesa` (`id_mesa`),
  ADD CONSTRAINT `mesa_pedido_ibfk_2` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_mpago`) REFERENCES `medio_pago` (`id_mpago`),
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_epedido`) REFERENCES `estado_pedido` (`id_epedido`),
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`id_mod`) REFERENCES `modalidad` (`id_mod`),
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tipo_usu`) REFERENCES `tipo_usuario` (`id_tipousu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

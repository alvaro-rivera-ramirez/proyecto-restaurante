-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2022 a las 20:35:43
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `nom_categoria` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cli` int(11) NOT NULL,
  `nom_cli` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `dni_cli` varchar(8) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `ID_PED` int(11) NOT NULL,
  `ID_PROD` int(11) NOT NULL,
  `CANTIDAD_DET` int(11) NOT NULL,
  `DESCRIPCION_DET` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_mesa`
--

CREATE TABLE `estado_mesa` (
  `ID_EMESA` int(11) NOT NULL,
  `ESTADO_EMESA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `ID_EPEDIDO` int(11) NOT NULL,
  `TIPO_EPEDIDO` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medio_pago`
--

CREATE TABLE `medio_pago` (
  `ID_MPAGO` int(11) NOT NULL,
  `TIPO_MPAGO` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `ID_MESA` int(11) NOT NULL,
  `ID_PISO` int(11) NOT NULL,
  `ID_EMESA` int(11) NOT NULL,
  `NUMERO_MESA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa_pedido`
--

CREATE TABLE `mesa_pedido` (
  `ID_PED` int(11) NOT NULL,
  `ID_MESA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE `modalidad` (
  `ID_MOD` int(11) NOT NULL,
  `NOM_MOD` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_PAGO` int(11) NOT NULL,
  `ID_MPAGO` int(11) NOT NULL,
  `ID_PED` int(11) NOT NULL,
  `FECHA_PAGO` int(11) NOT NULL,
  `TOTAL_PAGO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `ID_PED` int(11) NOT NULL,
  `ID_USU` int(11) NOT NULL,
  `ID_CLI` int(11) NOT NULL,
  `ID_EPEDIDO` int(11) NOT NULL,
  `ID_MOD` int(11) NOT NULL,
  `FECHA_PED` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE `piso` (
  `ID_PISO` int(11) NOT NULL,
  `NUMERO_PISO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_prod` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nom_prod` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `descripcion_prod` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_u_prod` float DEFAULT NULL,
  `imagen_prod` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipousu` int(11) NOT NULL,
  `nom_tipousu` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
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
  `dni_usu` varchar(8) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nom_usu` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `ape1_usu` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ape2_usu` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `email_usu` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `psw_usu` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `dir_usu` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `tipo_usu`, `dni_usu`, `nom_usu`, `ape1_usu`, `ape2_usu`, `email_usu`, `psw_usu`, `dir_usu`) VALUES
(1, 1, NULL, 'Alvaro Alejandro', NULL, NULL, 'alvaro@gmail.com', '$2b$10$wv6wDUwlplZbjyZF3Yfsg.buzx2gTL33vIaQ7COXeej0tDNrB78oC', NULL),
(2, 2, NULL, 'Johan Marcos', NULL, NULL, 'johanM@gmail.com', '$2b$10$1uVDngFUU9Sy25Ab6NnOp.aOW7NlYcYuuBMxyYneWgdrFq8EtzRzO', NULL);

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
  ADD KEY `ID_PED` (`ID_PED`),
  ADD KEY `ID_PROD` (`ID_PROD`);

--
-- Indices de la tabla `estado_mesa`
--
ALTER TABLE `estado_mesa`
  ADD PRIMARY KEY (`ID_EMESA`);

--
-- Indices de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  ADD PRIMARY KEY (`ID_EPEDIDO`);

--
-- Indices de la tabla `medio_pago`
--
ALTER TABLE `medio_pago`
  ADD PRIMARY KEY (`ID_MPAGO`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`ID_MESA`),
  ADD KEY `ID_EMESA` (`ID_EMESA`),
  ADD KEY `ID_PISO` (`ID_PISO`);

--
-- Indices de la tabla `mesa_pedido`
--
ALTER TABLE `mesa_pedido`
  ADD KEY `ID_MESA` (`ID_MESA`),
  ADD KEY `ID_PED` (`ID_PED`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`ID_MOD`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID_PAGO`),
  ADD UNIQUE KEY `unico` (`ID_PED`),
  ADD KEY `ID_MPAGO` (`ID_MPAGO`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID_PED`),
  ADD KEY `ID_CLI` (`ID_CLI`),
  ADD KEY `ID_EPEDIDO` (`ID_EPEDIDO`),
  ADD KEY `ID_MOD` (`ID_MOD`),
  ADD KEY `ID_USU` (`ID_USU`);

--
-- Indices de la tabla `piso`
--
ALTER TABLE `piso`
  ADD PRIMARY KEY (`ID_PISO`);

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
  ADD KEY `TIPO_USU` (`tipo_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cli` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_mesa`
--
ALTER TABLE `estado_mesa`
  MODIFY `ID_EMESA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `ID_EPEDIDO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medio_pago`
--
ALTER TABLE `medio_pago`
  MODIFY `ID_MPAGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mesa`
--
ALTER TABLE `mesa`
  MODIFY `ID_MESA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  MODIFY `ID_MOD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID_PAGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `ID_PED` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `piso`
--
ALTER TABLE `piso`
  MODIFY `ID_PISO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipousu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`ID_PROD`) REFERENCES `producto` (`ID_PROD`);

--
-- Filtros para la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`ID_EMESA`) REFERENCES `estado_mesa` (`ID_EMESA`),
  ADD CONSTRAINT `mesa_ibfk_2` FOREIGN KEY (`ID_PISO`) REFERENCES `piso` (`ID_PISO`);

--
-- Filtros para la tabla `mesa_pedido`
--
ALTER TABLE `mesa_pedido`
  ADD CONSTRAINT `mesa_pedido_ibfk_1` FOREIGN KEY (`ID_MESA`) REFERENCES `mesa` (`ID_MESA`),
  ADD CONSTRAINT `mesa_pedido_ibfk_2` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`ID_MPAGO`) REFERENCES `medio_pago` (`ID_MPAGO`),
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_CLI`) REFERENCES `cliente` (`ID_CLI`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`ID_EPEDIDO`) REFERENCES `estado_pedido` (`ID_EPEDIDO`),
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`ID_MOD`) REFERENCES `modalidad` (`ID_MOD`),
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`ID_USU`) REFERENCES `usuario` (`ID_USU`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`ID_CATEGORIA`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`TIPO_USU`) REFERENCES `tipo_usuario` (`ID_TIPOUSU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

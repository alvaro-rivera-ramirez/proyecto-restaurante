-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-10-2022 a las 05:35:32
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
-- Base de datos: `sistema_restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_CATEGORIA` int(11) NOT NULL,
  `NOMBRE_CATEGORIA` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_CLI` int(11) NOT NULL,
  `NOM_CLI` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `DNI_CLI` varchar(8) COLLATE utf8_spanish2_ci NOT NULL
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
  `ID_PROD` int(11) NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL,
  `NOMBRE_PROD` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `DESCRIPCION_PROD` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `PRECIO_U_PROD` float NOT NULL,
  `IMAGEN_PROD` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `ID_TIPOUSU` int(11) NOT NULL,
  `NOM_TIPOUSU` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_USU` int(11) NOT NULL,
  `TIPO_USU` int(11) NOT NULL,
  `DNI_USU` varchar(8) COLLATE utf8_spanish2_ci NOT NULL,
  `NOM_USU` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `APE1_USU` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `APE2_USU` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `EMAIL_USU` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `PSW_USU` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `DIR_USU` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_CATEGORIA`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_CLI`);

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
  ADD KEY `ID_MPAGO` (`ID_MPAGO`),
  ADD KEY `ID_PED` (`ID_PED`);

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
  ADD PRIMARY KEY (`ID_PROD`),
  ADD KEY `ID_CATEGORIA` (`ID_CATEGORIA`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`ID_TIPOUSU`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_USU`),
  ADD KEY `TIPO_USU` (`TIPO_USU`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_CLI` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `ID_PROD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `ID_TIPOUSU` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_USU` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`ID_PROD`) REFERENCES `producto` (`ID_PROD`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`ID_EMESA`) REFERENCES `estado_mesa` (`ID_EMESA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mesa_ibfk_2` FOREIGN KEY (`ID_PISO`) REFERENCES `piso` (`ID_PISO`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `mesa_pedido`
--
ALTER TABLE `mesa_pedido`
  ADD CONSTRAINT `mesa_pedido_ibfk_1` FOREIGN KEY (`ID_MESA`) REFERENCES `mesa` (`ID_MESA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mesa_pedido_ibfk_2` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`ID_MPAGO`) REFERENCES `medio_pago` (`ID_MPAGO`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`ID_PED`) REFERENCES `pedido` (`ID_PED`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_CLI`) REFERENCES `cliente` (`ID_CLI`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`ID_EPEDIDO`) REFERENCES `estado_pedido` (`ID_EPEDIDO`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`ID_MOD`) REFERENCES `modalidad` (`ID_MOD`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`ID_USU`) REFERENCES `usuario` (`ID_USU`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`ID_CATEGORIA`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`TIPO_USU`) REFERENCES `tipo_usuario` (`ID_TIPOUSU`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

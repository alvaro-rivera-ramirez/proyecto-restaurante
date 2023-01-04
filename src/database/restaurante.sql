CREATE DATABASE  IF NOT EXISTS `restaurante` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurante`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurante
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nom_categoria` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (4,'Cervezas'),(5,'Sour'),(6,'Sin Alcohol'),(7,'Shots'),(8,'Cockteles'),(9,'Vinos Tintos'),(10,'Vinos Blancos'),(11,'Entradas'),(12,'Fondos'),(13,'Entradas Fuertes'),(14,'Parrillas y piqueos'),(15,'Sopas'),(16,'Ensaladas'),(17,'Del Resto del Mundo'),(18,'Postres'),(19,'Guarniciones'),(21,'ensayoo'),(23,'pescados'),(24,'pescados y mariscos'),(29,'ejemplo'),(30,'ejemplo');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cli` int NOT NULL AUTO_INCREMENT,
  `nom_cli` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `dni_cli` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_cli`),
  UNIQUE KEY `dni_cli_UNIQUE` (`dni_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Roy AnThony','75131659'),(2,'Lucas Ms','84659612');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_ped` int NOT NULL,
  `id_prod` int NOT NULL,
  `cantidad_det` int DEFAULT NULL,
  `descripcion_det` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  UNIQUE KEY `pedido_producto` (`id_ped`,`id_prod`),
  KEY `ID_PED` (`id_ped`),
  KEY `ID_PROD` (`id_prod`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`),
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (1,82,2,''),(1,83,2,''),(2,18,1,''),(2,138,3,''),(2,142,1,''),(3,34,1,''),(3,35,1,''),(4,42,3,''),(4,43,2,'frio'),(5,44,2,''),(6,138,2,''),(6,139,1,''),(6,142,1,''),(7,120,2,''),(7,121,1,'');
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_mesa`
--

DROP TABLE IF EXISTS `estado_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_mesa` (
  `id_emesa` int NOT NULL AUTO_INCREMENT,
  `estado_emesa` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_emesa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_mesa`
--

LOCK TABLES `estado_mesa` WRITE;
/*!40000 ALTER TABLE `estado_mesa` DISABLE KEYS */;
INSERT INTO `estado_mesa` VALUES (1,'Libre'),(2,'Ocupado'),(3,'Inhabilitado');
/*!40000 ALTER TABLE `estado_mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_pedido` (
  `id_epedido` int NOT NULL AUTO_INCREMENT,
  `tipo_epedido` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_epedido`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
INSERT INTO `estado_pedido` VALUES (1,'Pendiente'),(2,'Preparado'),(3,'Precuenta'),(4,'Pagado'),(5,'Cancelado');
/*!40000 ALTER TABLE `estado_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medio_pago`
--

DROP TABLE IF EXISTS `medio_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medio_pago` (
  `id_mpago` int NOT NULL AUTO_INCREMENT,
  `tipo_mpago` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_mpago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medio_pago`
--

LOCK TABLES `medio_pago` WRITE;
/*!40000 ALTER TABLE `medio_pago` DISABLE KEYS */;
INSERT INTO `medio_pago` VALUES (1,'Efectivo'),(2,'Tarjeta');
/*!40000 ALTER TABLE `medio_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa` (
  `id_mesa` int NOT NULL AUTO_INCREMENT,
  `id_piso` int NOT NULL,
  `id_emesa` int NOT NULL,
  `numero_mesa` int NOT NULL,
  PRIMARY KEY (`id_mesa`),
  KEY `ID_EMESA` (`id_emesa`),
  KEY `ID_PISO` (`id_piso`),
  CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`id_emesa`) REFERENCES `estado_mesa` (`id_emesa`),
  CONSTRAINT `mesa_ibfk_2` FOREIGN KEY (`id_piso`) REFERENCES `piso` (`id_piso`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa`
--

LOCK TABLES `mesa` WRITE;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
INSERT INTO `mesa` VALUES (1,1,2,5),(2,1,2,6),(3,1,2,7),(4,2,1,10),(5,2,1,12),(6,3,2,14),(7,3,1,15),(8,2,1,16),(9,2,1,17),(10,1,2,18),(11,1,1,19),(12,1,1,20),(13,1,1,21),(14,3,1,22),(15,2,1,23),(16,3,1,24),(17,1,1,25),(18,2,2,26),(19,1,1,27),(20,2,2,28),(21,2,1,29),(22,3,1,30),(23,2,1,31),(24,1,1,32);
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa_pedido`
--

DROP TABLE IF EXISTS `mesa_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa_pedido` (
  `id_ped` int NOT NULL,
  `id_mesa` int NOT NULL,
  UNIQUE KEY `mesas_ped` (`id_ped`,`id_mesa`),
  KEY `ID_MESA` (`id_mesa`),
  KEY `ID_PED` (`id_ped`),
  CONSTRAINT `mesa_pedido_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesa` (`id_mesa`),
  CONSTRAINT `mesa_pedido_ibfk_2` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa_pedido`
--

LOCK TABLES `mesa_pedido` WRITE;
/*!40000 ALTER TABLE `mesa_pedido` DISABLE KEYS */;
INSERT INTO `mesa_pedido` VALUES (2,1),(6,2),(6,3),(5,6),(7,10),(1,13),(1,17),(4,18),(4,20);
/*!40000 ALTER TABLE `mesa_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidad`
--

DROP TABLE IF EXISTS `modalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidad` (
  `id_mod` int NOT NULL AUTO_INCREMENT,
  `nom_mod` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_mod`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidad`
--

LOCK TABLES `modalidad` WRITE;
/*!40000 ALTER TABLE `modalidad` DISABLE KEYS */;
INSERT INTO `modalidad` VALUES (1,'Para llevar'),(2,'Para la mesa');
/*!40000 ALTER TABLE `modalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_mpago` int NOT NULL,
  `id_ped` int NOT NULL,
  `fecha_pago` date NOT NULL,
  `total_pago` int NOT NULL,
  PRIMARY KEY (`id_pago`),
  UNIQUE KEY `unico` (`id_ped`),
  KEY `ID_MPAGO` (`id_mpago`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_mpago`) REFERENCES `medio_pago` (`id_mpago`),
  CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_ped`) REFERENCES `pedido` (`id_ped`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_ped` int NOT NULL AUTO_INCREMENT,
  `cod_ped` varchar(12) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `id_usu` int DEFAULT NULL,
  `id_cli` int DEFAULT NULL,
  `id_epedido` int DEFAULT NULL,
  `id_mod` int DEFAULT NULL,
  `fecha_ped` datetime DEFAULT NULL,
  PRIMARY KEY (`id_ped`),
  UNIQUE KEY `cod_ped` (`cod_ped`),
  KEY `ID_CLI` (`id_cli`),
  KEY `ID_EPEDIDO` (`id_epedido`),
  KEY `ID_MOD` (`id_mod`),
  KEY `ID_USU` (`id_usu`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_epedido`) REFERENCES `estado_pedido` (`id_epedido`),
  CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`id_mod`) REFERENCES `modalidad` (`id_mod`),
  CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'izKNxWq9jfhQ',4,NULL,4,2,'2022-12-27 00:36:27'),(2,'yAFLTe9FW3TL',4,NULL,1,2,'2022-12-27 00:36:57'),(3,'z72DKHNGq3FI',4,NULL,1,1,'2022-12-27 00:37:08'),(4,'SEbVvvO6I_Es',4,NULL,2,2,'2022-12-27 11:58:12'),(5,'7yeOhp3UdXTL',4,NULL,1,2,'2022-12-27 12:13:36'),(6,'u9vC8vdRyScx',5,NULL,1,2,'2022-12-27 12:15:13'),(7,'aiYKhaGDuvYf',4,NULL,1,2,'2023-01-04 15:31:16');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piso`
--

DROP TABLE IF EXISTS `piso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `piso` (
  `id_piso` int NOT NULL AUTO_INCREMENT,
  `nom_piso` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_piso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piso`
--

LOCK TABLES `piso` WRITE;
/*!40000 ALTER TABLE `piso` DISABLE KEYS */;
INSERT INTO `piso` VALUES (1,'Principal'),(2,'Secundario'),(3,'Balcones');
/*!40000 ALTER TABLE `piso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_prod` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nom_prod` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `descripcion_prod` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_u_prod` float DEFAULT NULL,
  `imagen_prod` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_prod`),
  KEY `ID_CATEGORIA` (`id_categoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (17,4,'Budweiser','bebida alcoholica',15,'image1670729789537.png'),(18,4,'Corona','bebida alcoholica',17,'image1670729824449.png'),(19,4,'Stella Artois','bebida alcoholica',17,'image1670729850614.png'),(20,4,'Cusqueña Dorada','bebida alcoholica',16,'image1670729870874.png'),(21,4,'Cusqueña Negra','bebida alcoholica',16,'image1670729882979.png'),(22,4,'Pilsen Callao','bebida alcoholica',15,'image1670729905741.jpeg'),(23,4,'Cristal','bebida alcoholica',15,'image1670729919340.png'),(24,5,'Pisco Sour','bebida alcoholica',23,'image1670730339701.jpeg'),(25,5,'Pisco Sour Doble','bebida alcoholica',39,'image1670730358010.jpeg'),(26,5,'Aguaymanto Sour','bebida alcoholica',26,'image1670730381339.jpeg'),(27,5,'Kamu Kamu Sour','bebida alcoholica',26,'image1670730394682.jpeg'),(28,5,'Uchu Sour','bebida alcoholica',26,'image1670730445927.jpeg'),(29,5,'Coca Sour','bebida alcoholica',26,'image1670730467036.jpeg'),(30,5,'Maracuya Sour','bebida alcoholica',26,'image1670730486315.jpeg'),(31,5,'Maca Sour','bebida alcoholica',26,'image1670730506284.jpeg'),(32,5,'Cafe Sour','bebida alcoholica',26,'image1670730524570.jpeg'),(33,5,'Whisky Sour','bebida alcoholica',26,'image1670730536268.jpeg'),(34,6,'Chicha Morada (Vaso)','bebida sin alcohol',9,'image1670731602815.jpeg'),(35,6,'Chicha Morada (Jarra)','bebida sin alcohol',25,'image1670731616482.webp'),(36,6,'Chicha de Jora (Vaso)','bebida sin alcohol',9,'image1670731636499.jpeg'),(37,6,'Chicha de Jora (Jarra)','bebida sin alcohol',25,'image1670731646051.jpeg'),(38,6,'Limonada (Vaso)','bebida sin alcohol',9,'image1670731693993.jpeg'),(39,6,'Limonada (Jarra)','bebida sin alcohol',21,'image1670731705444.webp'),(40,6,'Gaseosas','bebida sin alcohol',8,'image1670731722542.jpeg'),(41,6,'Agua Mineral','bebida sin alcohol',8,'image1670731737600.webp'),(42,8,'Algarrobina','bebidas con saborizantes ',25,'image1670732416804.jpeg'),(43,8,'Capitan','bebidas con saborizantes ',25,'image1670732430065.webp'),(44,8,'Chilcano de Pisco','bebidas con saborizantes ',25,'image1670732451053.jpeg'),(45,8,'Mi Bandera','bebidas con saborizantes ',25,'image1670732463794.jpeg'),(46,8,'Peru Libre','bebidas con saborizantes ',25,'image1670732481002.jpeg'),(47,8,'Sol y Sombra','bebidas con saborizantes ',25,'image1670732497519.jpeg'),(48,8,'Machu Picchu','bebidas con saborizantes ',25,'image1670732515320.jpeg'),(49,8,'Piña Colada con Pisco','bebidas con saborizantes ',25,'image1670732539636.jpeg'),(50,8,'Mojito Criollo','bebidas con saborizantes ',25,'image1670732555745.jpeg'),(51,8,'Daiquiri de Frutas Peruanas','bebidas con saborizantes ',25,'image1670732583621.jpeg'),(52,8,'Chalan Limeño','bebidas con saborizantes ',25,'image1670732630780.jpeg'),(53,8,'No Me Jora','bebidas con saborizantes ',29,'image1670732654789.webp'),(54,8,'Cosmopolitan','bebidas con saborizantes ',29,'image1670732673332.jpeg'),(55,8,'Apple Martini','bebidas con saborizantes ',29,'image1670732686566.jpeg'),(56,7,'Quebranta','bebida refinada embotellada',21,'image1670732858936.jpeg'),(57,7,'Acholado','bebida refinada embotellada',21,'image1670732871270.jpeg'),(58,7,'Italia','bebida refinada embotellada',21,'image1670732879636.jpeg'),(59,9,'Santiago Queirolo Tannat','Vino con contenido alcoholico',51,'image1670733833410.webp'),(60,9,'Santiago Queirolo Malbec','Vino con contenido alcoholico',51,'image1670733852267.jpeg'),(61,9,'Santiago Queirolo (Magdalena) Blend','Vino con contenido alcoholico',51,'image1670733877628.webp'),(62,9,'Santiago Queirolo Borgoña','Vino con contenido alcoholico',51,'image1670733893062.webp'),(63,9,'Intipalka Cabernet Sauvignon/Syrah','Vino con contenido alcoholico',51,'image1670733947121.jpeg'),(64,9,'Intipalka Malbec/Merlot','Vino con contenido alcoholico',73,'image1670733985523.jpeg'),(65,9,'Intipalka Tannat','Vino con contenido alcoholico',73,'image1670734004410.webp'),(66,9,'Intipalka Malbec','Vino con contenido alcoholico',73,'image1670734020229.jpeg'),(67,9,'Intipalka Cabernet Sauvignon/Syrah Reserva','Vino con contenido alcoholico',89,'image1670734065694.jpeg'),(68,9,'Intipalka Malbec/Merlot Reserva','Vino con contenido alcoholico',89,'image1670734085432.jpeg'),(69,9,'Tacama Gran Tinto','Vino con contenido alcoholico',66,'image1670734106121.webp'),(70,10,'Santiago Queirolo Sauvignon Blanc','Bebida alcoholizada blanca',51,'image1670734312401.jpeg'),(71,10,'Intipalka Chardonay','Bebida alcoholizada blanca',69,'image1670734331653.webp'),(72,10,'Intipalka Sauvignon Blanc','Bebida alcoholizada blanca',88,'image1670734350656.webp'),(73,11,'Causa de Langostinos a la Huancaina','platos de entrada',39,'image1670734637420.jpeg'),(74,11,'causa de pulpo','platos de entrada',38,'image1670734657401.jpeg'),(75,11,'Causa Limeña','platos de entrada',38,'image1670734670186.jpeg'),(76,11,'Papa Rellena','platos de entrada',29,'image1670734699464.jpeg'),(77,11,'Salpicon de Pollo','platos de entrada',30,'image1670734725550.jpeg'),(78,11,'Palta Rellena','platos de entrada',30,'image1670734741003.webp'),(79,11,'Tamal Criollo','platos de entrada',16,'image1670734758632.jpeg'),(80,11,'Tamal Verde','platos de entrada',17,'image1670734773991.jpeg'),(81,11,'Papa a la Huancaina','platos de entrada',28,'image1670734791397.webp'),(82,12,'Arroz con Pato Borracho','Platos de fondo Principal',65,'image1670735325652.jpeg'),(83,12,'Seco de Pato Norteña','Platos de fondo Principal',65,'image1670735346937.jpeg'),(84,12,'Seco de Cordero al Pisco','Platos de fondo Principal',58,'image1670735369084.jpeg'),(85,12,'Cabrito a la Norteña','Platos de fondo Principal',60,'image1670735397112.jpeg'),(86,12,'Cuy Chactado','Platos de fondo Principal',59,'image1670735414562.jpeg'),(87,12,'Aji de Gallina','Platos de fondo Principal',42,'image1670735434811.jpeg'),(88,12,'Carapulcra Chinchana','Platos de fondo Principal',42,'image1670735461985.jpeg'),(89,12,'Manchapecho','Platos de fondo Principal',42,'image1670735491569.jpeg'),(90,12,'Lomo Saltado','Platos de fondo Principal',58,'image1670735508042.jpeg'),(91,12,'Tallarin Saltado','Platos de fondo Principal',58,'image1670735523222.jpeg'),(92,12,'Tallarines a la Huancaina con Lomo Saltado','Platos de fondo Principal',60,'image1670735547710.jpeg'),(93,13,'Caisa Ferreñafana','Platos de entrada con bastante contenido',68,'image1670736825627.jpeg'),(94,13,'Cebiche de Pescado','Platos de entrada con bastante contenido',49,'image1670736854228.jpeg'),(95,13,'Cebiche Mixto','Platos de entrada con bastante contenido',56,'image1670736877041.jpeg'),(96,13,'Cebiche de Mariscos','Platos de entrada con bastante contenido',52,'image1670736898710.jpeg'),(97,13,'Tiradito al Aji','Platos de entrada con bastante contenido',49,'image1670736917014.jpeg'),(98,13,'Escabeche de Pescado','Platos de entrada con bastante contenido',48,'image1670736941080.jpeg'),(99,13,'Ronda Marina','Platos de entrada con bastante contenido',79,'image1670736959986.jpeg'),(100,13,'Cebiche Carretillero','Platos de entrada con bastante contenido',59,'image1670736985960.jpeg'),(101,13,'Combo Marino','Platos de entrada con bastante contenido',58,'image1670737008779.jpeg'),(102,13,'Pulpo al Olivo','Platos de entrada con bastante contenido',58,'image1670737021635.jpeg'),(103,14,'Anticucho','Comidas para picar mientras esperas el plato fuerte',39,'image1670737076727.jpeg'),(104,14,'Mixto','Comidas para picar mientras esperas el plato fuerte',38,'image1670737090410.jpeg'),(105,14,'Mollejitas a la Parrilla','Comidas para picar mientras esperas el plato fuerte',30,'image1670737116754.jpeg'),(106,14,'Brochetas de Pollo','Comidas para picar mientras esperas el plato fuerte',37,'image1670737138427.jpeg'),(107,14,'Lomo a la Parrilla','Comidas para picar mientras esperas el plato fuerte',56,'image1670737159205.jpeg'),(108,14,'Higado a la Parrilla','Comidas para picar mientras esperas el plato fuerte',36,'image1670737179577.webp'),(109,14,'Chuleta a la Parrilla','Comidas para picar mientras esperas el plato fuerte',39,'image1670737209606.jpeg'),(110,15,'Sopa a la Minuta','Sopas con producto peruano',28,'image1670737262569.jpeg'),(111,15,'Sopa Criolla','Sopas con producto peruano',29,'image1670737282982.jpeg'),(112,15,'Dieta de Pollo','Sopas con producto peruano',27,'image1670737300381.jpeg'),(113,15,'Chupe de Olluco','Sopas con producto peruano',34,'image1670737346776.webp'),(114,15,'Chupe de Camarones','Sopas con producto peruano',56,'image1670737385738.jpeg'),(115,15,'Sudado de Pescado','Sopas con producto peruano',52,'image1670737406203.jpeg'),(116,15,'Sancochado','Sopas con producto peruano',79,'image1670737441048.jpeg'),(117,15,'Menestron','Sopas con producto peruano',46,'image1670737458698.jpeg'),(118,15,'Shambar','Sopas con producto peruano',38,'image1670737477996.jpeg'),(119,15,'Sopa de Mote','Sopas con producto peruano',39,'image1670737495035.jpeg'),(120,16,'Ensalada Fresca','Ensaladas con producto nacional',28,'image1670737552124.jpeg'),(121,16,'Ensalada Cocida','Ensaladas con producto nacional',30,'image1670737562770.jpeg'),(122,18,'Picarones','Postres nacionales con toque de la casa',22,'image1670737651257.jpeg'),(123,18,'Ranfañote','Postres nacionales con toque de la casa',20,'image1670737670922.jpeg'),(124,18,'Suspiro Limeño','Postres nacionales con toque de la casa',19,'image1670737690510.jpeg'),(125,18,'Copa de Helado','Postres nacionales con toque de la casa',26,'image1670737711375.jpeg'),(126,18,'Mazamorra Morada','Postres nacionales con toque de la casa',16,'image1670737731271.webp'),(127,18,'Combinado','Postres nacionales con toque de la casa',19,'image1670737751430.jpeg'),(128,18,'Arroz con Leche','Postres nacionales con toque de la casa',16,'image1670737766770.webp'),(129,18,'Panqueque con Helado','Postres nacionales con toque de la casa',26,'image1670737786858.jpeg'),(130,18,'Torta de Chocolate','Postres nacionales con toque de la casa',18,'image1670737801783.jpeg'),(131,17,'Fillet Mignon','Platos Internacionales famosos',55,'image1670737852260.webp'),(132,17,'Lomo Strogonof','Platos Internacionales famosos',55,'image1670737869697.jpeg'),(133,17,'Lomo a la Pimienta','Platos Internacionales famosos',55,'image1670737887111.jpeg'),(134,17,'Cordon Bleu','Platos Internacionales famosos',55,'image1670737909960.jpeg'),(135,17,'Sàgiettis a la Bolognesa','Platos Internacionales famosos',33,'image1670737937211.jpeg'),(136,17,'Spaguettis al Pesto','Platos Internacionales famosos',33,'image1670737960637.jpeg'),(137,17,'Spaguettis a lo Alfredo','Platos Internacionales famosos',34,'image1670737975306.jpeg'),(138,19,'Papas Fritas','Platos Internacionales famosos',18,'image1670738011850.webp'),(139,19,'Papas Sancochadas','Platos Internacionales famosos',15,'image1670738026945.jpeg'),(140,19,'Pure de Papa','Complementos por si falta suministros',25,'image1670738067524.jpeg'),(141,19,'Choclo','Complementos por si falta suministros',18,'image1670738082641.webp'),(142,19,'Yucas Sancochadas','Complementos por si falta suministros',14,'image1670738098629.jpeg'),(143,19,'Frijoles','Complementos por si falta suministros',28,'image1670738112920.jpeg'),(144,19,'Arroz','Complementos por si falta suministros',14,'image1670738128946.jpeg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipousu` int NOT NULL AUTO_INCREMENT,
  `nom_tipousu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_tipousu`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'Administrador'),(2,'Cajero'),(3,'Mesero'),(4,'Cocinero');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usu` int NOT NULL AUTO_INCREMENT,
  `tipo_usu` int NOT NULL,
  `dni_usu` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nom_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `ape1_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ape2_usu` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `email_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `psw_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `dir_usu` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  KEY `TIPO_USU` (`tipo_usu`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tipo_usu`) REFERENCES `tipo_usuario` (`id_tipousu`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1,'','Alvaro Alejandro','Rivera','Ramirez','alvaro@gmail.com','$2b$10$Z0evF3uJufgPojvLm5QmT..IR5hgz7/aurb7DZ7OncN5L64f2qpRq','732977121'),(2,2,'','Johan Marcos','Condori','','johan@hotmail.com','$2b$10$Q9/EjZIiJI.xDamnuK2FtuXr8vFZdmuhjoFjKhLIcDpHjTchVVOFq',''),(3,4,'','Carlos','Yufra','','carlos@hotmail.com','$2b$10$grx2AWPIEmtBbm4ChgWiY.AkjohGWMFC.P0AAPyOBAYksPnjsh2Me',''),(4,3,'','Alejandro','Ramirez','','alejandro@gmail.com','$2b$10$ZYLbUmSgdFTc.287B94CyOKScVzAk4Qox6UuBCYRQ1VkBggBX4dPO',''),(5,3,NULL,'Mesero 1',NULL,NULL,'mesero1@hotmail.com','$2b$10$mO1X6LEcXGkLFJNskxWOEOWvgVa5J9zT8Bq5O/9lV2bjpMjPoEhvS',NULL),(6,3,'','Mesero 2','AAA','','mesero2@hotmail.com','$2b$10$Wka0k3oPMTCltWwAB2qDjuPEoHU9GYjjTx66rxs3jODbWE/cCm.oq',''),(7,1,NULL,'Alexandro',NULL,NULL,'alexandro@hotmail.com','$2b$10$xVRqk4mtFdbi9jTKRBe4Hu8C6yb0v.WXkQy94v1ZCWb8wfXTkX4l6',NULL),(8,3,'73112121','Carlos Mesero','','','carlosMesero@gmail.com','$2b$10$zib9dT6TlgIKZ8mOWpAETeo/GY7ZqkWlqhDs6QpK59Y6I/o6i20Ra',''),(9,4,'73478121','Cocinero1','','','cocinero1@gmail.com','$2b$10$jCTezscTrSQTE562JZAHUukKDQRsR7ANwZkSMxVSYgj3XLVNy8wia',''),(10,2,'40478121','Cajero1','','','cajero1@gmail.com','$2b$10$J17uKprqUvhxl9fOA7fDru04xCHeHkGKBhnwzr8R1mY/AzSnPP9vO','');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-04 16:34:59

-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: user_registration_db
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` binary(16) NOT NULL,
  `type` tinyint DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  KEY `fk_address_users` (`user_id`),
  CONSTRAINT `fk_address_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (_binary '£ô\Â\×\é¸,4V\×\èù ¼\Þ',1,'Rua de Tal','PrÃ³ximo ao parque','Brazil','SÃ£o Paulo','RibeirÃ£o Preto',_binary 'o\Z+<M^ox«4Vx\Í'),(_binary '±~OœŠ-;n4\\m~',2,'Avenida de Tal','PrÃ³ximo ao centro comercial','Brazil','SÃ£o Paulo','Santos',_binary 'o\Z+<M^ox«4Vx\Í'),(_binary 'Èš´\×\æñ#Vx›\Í\àñ¢³',3,'Estrada de Tal','PrÃ³ximo ao shopping','Brazil','SÃ£o Paulo','SÃ£o Carlos',_binary 'o\Z+<M^ox«4Vx\Í'),(_binary '\Ð/<KZg‰\ï#Eg‰«\Í',2,'Avenida de Tal','PrÃ³ximo ao centro comercial','Brazil','SÃ£o Paulo','Santos',_binary '+<M^ox«4Vx\Í\ï'),(_binary '\â4Vxš¼\Þ\Z+<M^ox',3,'Estrada de Tal','PrÃ³ximo ao shopping','Brazil','SÃ£o Paulo','Santos',_binary '<M^ox«4Vx\Í\ï');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-16 22:16:30

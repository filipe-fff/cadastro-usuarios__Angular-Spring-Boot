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
-- Table structure for table `musics`
--

DROP TABLE IF EXISTS `musics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musics` (
  `id` binary(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `band` varchar(255) NOT NULL,
  `genre` tinyint NOT NULL,
  `is_favorite` tinyint(1) DEFAULT '0',
  `favorite_rank` tinyint DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_favorite` (`user_id`,`favorite_rank`),
  CONSTRAINT `fk_musics` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `musics_chk_1` CHECK (((`favorite_rank` is null) or (`favorite_rank` between 1 and 3)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musics`
--

LOCK TABLES `musics` WRITE;
/*!40000 ALTER TABLE `musics` DISABLE KEYS */;
INSERT INTO `musics` VALUES (_binary '¥\æ÷‰\n,=N_`q‚“¤µ','MÃºsica 5','Banda Y',7,1,NULL,_binary '+<M^ox«4Vx\Í\ï'),(_binary '¶÷‰\n,=N_`q‚“¤µ\Æ','MÃºsica 6','Banda Z',12,0,NULL,_binary '+<M^ox«4Vx\Í\ï'),(_binary 'Á¢³\Ä\Õ\æ÷‰\n,=N_`q','MÃºsica 1','Banda A',8,0,NULL,_binary 'o\Z+<M^ox«4Vx\Í'),(_binary '\Çø¡²\Ã\Ô\åö):K\\m','Easy','Commodores',2,1,NULL,_binary '<M^ox«4Vx\Í\ï'),(_binary 'Ò³\Ä\Õ\æ÷‰\n,=N_`q‚','MÃºsica 2','Banda B',11,0,NULL,_binary 'o\Z+<M^ox«4Vx\Í'),(_binary '\Øù\n,=N_`q‚“¤µ\Æ\×','True','Spandau Ballet',2,0,NULL,_binary '<M^ox«4Vx\Í\ï'),(_binary '\ã\Ä\Õ\æ÷‰\n,=N_`q‚“','MÃºsica 3','Banda C',9,1,NULL,_binary 'o\Z+<M^ox«4Vx\Í'),(_binary '\éð¡²\Ã\Ô\åö):K\\m~','If You Don\'t Know Me by Now','Simply Red',2,0,NULL,_binary '<M^ox«4Vx\Í\ï'),(_binary 'ô\Õ\æ÷‰\n,=N_`q‚“¤','MÃºsica 4','Banda X',1,0,NULL,_binary '+<M^ox«4Vx\Í\ï');
/*!40000 ALTER TABLE `musics` ENABLE KEYS */;
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

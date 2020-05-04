-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: users
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
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `SerieID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(45) DEFAULT NULL,
  `Note` enum('1','2','3','4','5','6','7','8','9','10') DEFAULT NULL,
  `Description` varchar(800) DEFAULT NULL,
  `FK_CatégorieID` int DEFAULT NULL,
  `FK_iduser` int DEFAULT NULL,
  `Statut` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SerieID`),
  KEY `SerieID` (`SerieID`),
  KEY `FK_categorieID_idx` (`FK_CatégorieID`),
  KEY `FK_iduser_idx` (`FK_iduser`),
  CONSTRAINT `FK_CatégorieID` FOREIGN KEY (`FK_CatégorieID`) REFERENCES `catégorie` (`CatégorieID`) ON DELETE CASCADE,
  CONSTRAINT `FK_iduser` FOREIGN KEY (`FK_iduser`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (1,'The Big Bang Theory','6','Une bande de docteurs en science partagent un quotidien fait de jeux vidéo, d\'équations et d\'amitié. Leur nouvelle voisine de palier va troubler leurs vieilles habitudes et va tenter de les sortir de leur univers et de les connecter à la réalité.',5,1,'Serie Fini'),(2,'Casa de Papel','9','Huit voleurs font une prise d\'otages dans la Maison royale de la Monnaie d\'Espagne, tandis qu\'un génie du crime manipule la police pour mettre son plan à exécution. ',1,1,'En cours'),(3,'Game of Thrones','10','À l’extrême-nord, un gigantesque mur de glace protège le royaume de plusieurs créatures potentiellement dangereuses, celui-ci est supervisé par la garde de nuit une organisation militaire officielle qui vise à protéger le mur et le royaume des menaces du grand nord. Au-delà du mur vivent des créatures « primitives », les Sauvageons qui tentent d’envahir le royaume pour fuir des créatures mythiques et très dangereuses que l\'on pensait disparues depuis plusieurs siècles. À l’est, au-delà d’un détroit, se trouve le continent d’Essos sur lequel une jeune princesse en exil prépare son retour.',4,1,'En cours'),(4,'Friends','7','Monica Geller, une jeune cuisinière d\'environ 25 ans, vit dans un appartement situé à Manhattan, dans Greenwich Village. Un jour, son amie d\'enfance, Rachel Green, qu\'elle n\'avait plus vue depuis des années, lui rend visite après avoir quitté son fiancé à l\'autel le jour de leur mariage. Rachel devient alors la nouvelle colocataire de Monica et s’intègre sans problème à son groupe d\'amis, composé de : Phoebe Buffay (l\'ancienne colocataire de Monica), Ross Geller (le frère de Monica, qui est secrètement amoureux de Rachel depuis le lycée), Chandler Bing (qui est le meilleur ami de Ross depuis l\'université) et Joey Tribbiani (le colocataire actuel de Chandler). Ces deux derniers vivent dans l\'appartement juste en face de celui de Monica, sur le même palier.',3,2,'En cours'),(5,'The walking Dead','8','Après une apocalypse ayant transformé la quasi-totalité de la population en zombies, un groupe d\'hommes et de femmes mené par l\'officier Rick Grimes tente de survivre... Ensemble, ils vont devoir tant bien que mal faire face à ce nouveau monde devenu méconnaissable, à travers leur périple dans le Sud profond des États-Unis',5,2,'Serie Fini'),(6,'Breaking Bad ','5','Walter White, 50 ans, est professeur de chimie dans un lycée du Nouveau-Mexique. Pour subvenir aux besoins de Skyler, sa femme enceinte, et de Walt Junior, son fils handicapé, il est obligé de travailler doublement. Son quotidien déjà morose devient carrément noir lorsqu\'il apprend qu\'il est atteint d\'un incurable cancer des poumons. Les médecins ne lui donnent pas plus de deux ans à vivre. Pour réunir rapidement beaucoup d\'argent afin de mettre sa famille à l\'abri, Walter ne voit plus qu\'une solution : mettre ses connaissances en chimie à profit pour fabriquer et vendre du crystal meth, une drogue de synthèse qui rapporte beaucoup',4,2,'Serie FIni'),(7,'Vampire diares','8','Quatre mois après le tragique accident de voiture qui a tué leurs parents, Elena Gilbert, 17 ans, et son frère Jeremy, 15 ans, essaient encore de s\'adapter à cette nouvelle réalité. Belle et populaire, l\'adolescente poursuit ses études au Mystic Falls High en s\'efforçant de masquer son chagrin. Elena est immédiatement fascinée par Stefan et Damon Salvatore, deux frères que tout oppose. Elle ne tarde pas à découvrir qu\'ils sont en fait des vampires...',3,3,'En cours'),(8,'Les 100','8','Après une apocalypse nucléaire, les 318 survivants se réfugient dans des stations spatiales et parviennent à y vivre et à se reproduire, atteignant le nombre de 4000 ; 97 ans plus tard, une centaine de jeunes délinquants redescendent sur Terre.',2,3,'Serie Fini'),(9,'How I Met Your Mother','8','Ted se remémore ses jeunes années, lorsqu\'il était encore célibataire. Il raconte à ses enfants avec nostalgie ses moments d\'égarements et de troubles, ses rencontres et ses recherches effrénées du Grand Amour et les facéties de sa bande d\'amis... ',4,3,'En cours'),(10,'Mad Men','9','Dans le New York des années 60, Don Draper est l\'un des grands noms de la pub. Maître manipulateur, il compte dans son entourage des ennemis qui attendent sa chute.',3,4,'En cours'),(11,'Gossip Girl','7','La vie de la jeunesse dorée des élèves de deux écoles privées new-yorkaises, vue à travers les yeux ironiques d\'une mystérieuse \"bloggeuse\" surnommée Gossip Girl. Entre amour et amitié, chacun tente de tirer son épingle du jeu, mais rien n\'est jamais simple derrière des apparences parfaites...',5,4,'Serie Fini'),(12,'Dexter','6','Brillant expert scientifique du service médico-légal de la police de Miami, Dexter Morgan est spécialisé dans l\'analyse de prélèvements sanguins. Mais voilà, Dexter cache un terrible secret : il est également tueur en série. Un serial killer pas comme les autres, avec sa propre vision de la justice.',4,4,'En cours'),(14,'Flash','7','À la suite d\'un accident de laboratoire au cours duquel il est frappé par la foudre, le chercheur Barry Allen, qui travaille pour le département de la police scientifique, découvre qu\'il est capable de se déplacer à une vitesse supersonique.',2,1,'Serie Fini'),(15,'Vikings','10','Scandinavie, à la fin du 8ème siècle. Ragnar Lodbrok, un jeune guerrier viking, est avide d\'aventures et de nouvelles conquêtes. Lassé des pillages sur les terres de l\'Est, il se met en tête d\'explorer l\'Ouest par la mer. Malgré la réprobation de son chef, Haraldson, il se fie aux signes et à la volonté des dieux, en construisant une nouvelle génération de vaisseaux, plus légers et plus rapides...',1,5,'Serie Fini'),(60,' Scherlock','5','Dans cette nouvelle adaptation des fameuses intrigues d\'Arthur Conan Doyle, l\'excentrique détective recherche des indices dans les rues de Londres.',3,1,'En cours');
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-04 11:31:48

-- MySQL dump 10.13  Distrib 5.5.46, for Linux (x86_64)
--
-- Host: localhost    Database: tour
-- ------------------------------------------------------
-- Server version	5.5.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tourLike`
--

DROP TABLE IF EXISTS `tourLike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourLike` (
  `uid` varchar(40) NOT NULL DEFAULT '',
  `cid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`,`cid`),
  KEY `cid` (`cid`),
  CONSTRAINT `tourLike_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `tourUser` (`uid`),
  CONSTRAINT `tourLike_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `tourPlace` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourLike`
--

LOCK TABLES `tourLike` WRITE;
/*!40000 ALTER TABLE `tourLike` DISABLE KEYS */;
INSERT INTO `tourLike` VALUES ('1038447736237181',264320);
/*!40000 ALTER TABLE `tourLike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourPlace`
--

DROP TABLE IF EXISTS `tourPlace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourPlace` (
  `cid` int(11) NOT NULL DEFAULT '0',
  `areaCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourPlace`
--

LOCK TABLES `tourPlace` WRITE;
/*!40000 ALTER TABLE `tourPlace` DISABLE KEYS */;
INSERT INTO `tourPlace` VALUES (264106,1),(264107,1),(264110,1),(264111,1),(264112,1),(264113,1),(264114,1),(264115,1),(264116,1),(264122,1),(264131,1),(264132,1),(264134,1),(264135,1),(264137,1),(264138,1),(264152,1),(264196,1),(264223,1),(264257,1),(264308,1),(264309,1),(264312,1),(264313,1),(264314,1),(264315,1),(264316,1),(264317,1),(264320,1),(264329,1),(264337,1),(264340,1),(264348,1),(264350,1),(264351,1),(264352,1),(264354,1),(264358,1),(264376,1),(264378,1),(264427,1),(264444,1),(264446,1),(264454,1),(264455,1),(264464,1),(264465,1),(264471,1),(264472,1),(264473,1),(264475,1),(264478,1),(264550,1),(264571,1),(264594,1),(264603,1),(264614,1),(264623,1),(264635,1),(561382,1),(610005,1),(610092,1),(610302,1),(610397,1),(610483,1),(612304,1),(616983,1),(625139,1),(625505,1),(638292,1),(668511,1),(669211,1),(747197,1),(767100,1),(778924,1),(789696,1),(789703,1),(822944,1),(897540,1),(929909,1),(997163,1),(997266,1),(999854,1),(1000299,1),(1011895,1),(1011983,1),(1013338,1),(1013413,1),(1013448,1),(1024612,1),(1024701,1),(1024822,1),(1024837,1),(1024874,1),(1024914,1),(1024919,1),(1024981,1),(1030527,1),(1034818,1),(1035096,1),(1051832,1),(1060117,1),(1061789,1),(1061818,1),(1064294,1),(1064349,1),(1064767,1),(1114212,1),(1121029,1),(1121158,1),(1121641,1),(1131921,1),(1134541,1),(1158841,1),(1220743,1),(1241248,1),(1253587,1),(1256072,1),(1256219,1),(1256247,1),(1256307,1),(1266515,1),(1282175,1),(1295190,1),(1297755,1),(1300201,1),(1300249,1),(1323377,1),(1326972,1),(1340416,1),(1341981,1),(1348417,1),(1348558,1),(1348621,1),(1348684,1),(1348713,1),(1349135,1),(1349202,1),(1349267,1),(1352705,1),(1371199,1),(1371835,1),(1373230,1),(1382366,1),(1382517,1),(1382671,1),(1389275,1),(1392370,1),(1393354,1),(1398666,1),(1407539,1),(1435046,1),(1438008,1),(1459282,1),(1461568,1),(1494224,1),(1511701,1),(1527125,1),(1531015,1),(1542646,1),(1561471,1),(1562674,1),(1605017,1),(1634308,1),(1684868,1),(1701767,1),(1702328,1),(1720756,1),(1720980,1),(1721280,1),(1721311,1),(1729324,1),(1729904,1),(1742305,1),(1742381,1),(1742421,1),(1747593,1),(1747653,1),(1747895,1),(1747979,1),(1747984,1),(1747993,1),(1747995,1),(1748002,1),(1748004,1),(1748008,1),(1748351,1),(1748354,1),(1748365,1),(1748369,1),(1749909,1),(1751094,1),(1751255,1),(1751257,1),(1751260,1),(1751262,1),(1751264,1),(1751266,1),(1796840,1),(1810712,1),(1816845,1),(1824742,1),(1838143,1),(1846453,1),(1847640,1),(1850476,1),(1851871,1),(1865073,1),(1875551,1),(1876942,1),(1876944,1),(1887232,1),(1887235,1),(1887239,1),(1908468,1),(1909494,1),(1909497,1),(1909500,1),(1910191,1),(1911833,1),(1912476,1),(1913218,1),(1918889,1),(1918892,1),(1918894,1),(1918896,1),(1924956,1),(1930107,1),(1930520,1),(1930523,1),(1930527,1),(1930531,1),(1930534,1),(1930548,1),(1933089,1),(1935817,1),(1936097,1),(1939656,1),(1939666,1),(1939670,1),(1939681,1),(1942577,1),(1963052,1),(1963058,1),(1963114,1),(1963123,1),(1965838,1),(1986672,1),(1991027,1),(1998305,1),(2003918,1),(2008624,1),(2009863,1),(2025427,1),(2030936,1),(2033085,1),(2035459,1),(2035491,1),(2037040,1),(2044982,1),(2045657,1),(2357787,1),(2357804,1),(2373511,1);
/*!40000 ALTER TABLE `tourPlace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourPref`
--

DROP TABLE IF EXISTS `tourPref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourPref` (
  `uid` varchar(40) NOT NULL DEFAULT '',
  `cid` int(11) NOT NULL DEFAULT '0',
  `pref` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`,`cid`),
  KEY `cid` (`cid`),
  CONSTRAINT `tourPref_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `tourUser` (`uid`),
  CONSTRAINT `tourPref_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `tourPlace` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourPref`
--

LOCK TABLES `tourPref` WRITE;
/*!40000 ALTER TABLE `tourPref` DISABLE KEYS */;
INSERT INTO `tourPref` VALUES ('1038447736237181',264107,1),('1038447736237181',264351,1),('1038447736237181',1024822,5),('1038447736237181',1253587,3),('1038447736237181',1348713,5),('1038447736237181',1371199,5),('1038447736237181',1373230,3),('1038447736237181',1748004,1),('1038447736237181',1909497,1),('1038447736237181',1918889,5);
/*!40000 ALTER TABLE `tourPref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourReview`
--

DROP TABLE IF EXISTS `tourReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourReview` (
  `uid` varchar(40) NOT NULL DEFAULT '',
  `cid` int(11) NOT NULL DEFAULT '0',
  `review` text,
  `starRating` int(11) DEFAULT NULL,
  `date` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`uid`,`cid`),
  KEY `cid` (`cid`),
  CONSTRAINT `tourReview_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `tourUser` (`uid`),
  CONSTRAINT `tourReview_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `tourPlace` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourReview`
--

LOCK TABLES `tourReview` WRITE;
/*!40000 ALTER TABLE `tourReview` DISABLE KEYS */;
INSERT INTO `tourReview` VALUES ('1038447736237181',264320,'\'한글 리뷰\'',3,'2016.6.13');
/*!40000 ALTER TABLE `tourReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourUser`
--

DROP TABLE IF EXISTS `tourUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourUser` (
  `uid` varchar(40) NOT NULL DEFAULT '',
  `age` int(11) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `travStyle` int(11) DEFAULT NULL,
  `nationality` varchar(40) DEFAULT NULL,
  `numPref` int(11) DEFAULT NULL,
  `nickname` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourUser`
--

LOCK TABLES `tourUser` WRITE;
/*!40000 ALTER TABLE `tourUser` DISABLE KEYS */;
INSERT INTO `tourUser` VALUES ('1038447736237181',22,0,1,'KOREA',10,'testnick');
/*!40000 ALTER TABLE `tourUser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-13  8:15:31

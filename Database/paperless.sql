/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.0.67-community-nt : Database - paperless
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`paperless` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `paperless`;

/*Table structure for table `forms` */

DROP TABLE IF EXISTS `forms`;

CREATE TABLE `forms` (
  `formid` int(11) NOT NULL auto_increment COMMENT 'pk',
  `title` varchar(100) NOT NULL,
  `jsonarr` varchar(10000) NOT NULL,
  `description` varchar(200) default NULL,
  `insert` varchar(500) default NULL,
  `delete` varchar(500) default NULL,
  `select` varchar(500) default NULL,
  `isActive` tinyint(1) default NULL,
  `publicuri` varchar(500) default NULL,
  `orgid` int(11) default NULL,
  `userid` int(11) default NULL,
  `threshold` int(11) default NULL,
  PRIMARY KEY  (`formid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `forms` */

insert  into `forms`(`formid`,`title`,`jsonarr`,`description`,`insert`,`delete`,`select`,`isActive`,`publicuri`,`orgid`,`userid`,`threshold`) values (1,'Employee Details','[{\"_uid\":\"0fpa\",\"type\":\"Heading\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"12\",\"values\":[\"Personal Details\"]},{\"_uid\":\"1l93\",\"type\":\"TextBoxLeft\",\"required\":false,\"singleItem\":false,\"dataType\":\"text\",\"label\":\"Name\",\"placeholder\":\"Jon Doe\",\"cssClass\":\"form-group\",\"width\":\"12\",\"values\":[]},{\"_uid\":\"2era\",\"type\":\"TextBoxLeft\",\"required\":false,\"singleItem\":false,\"dataType\":\"text\",\"label\":\"Email\",\"placeholder\":\"jon.doe@live.com\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"3fuz\",\"type\":\"TextBoxRight\",\"required\":false,\"singleItem\":false,\"dataType\":\"date\",\"label\":\"D.O.B.\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"4s5w\",\"type\":\"TextArea\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"Address\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"5g06\",\"type\":\"CheckBox\",\"required\":false,\"singleItem\":false,\"dataType\":\"checkbox\",\"label\":\"check me out\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[\"Windows Phone\",\"iPhone\",\"Android\",\"Symbian\"]},{\"_uid\":\"6f0l\",\"type\":\"Heading\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"12\",\"values\":[\"Employment Details\"]},{\"_uid\":\"10pvl\",\"type\":\"Paragraph\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"12\",\"values\":[\"this placeholder is here to be fancy\"]},{\"_uid\":\"9jhl\",\"type\":\"TextArea\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"Office Address\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"8vi1\",\"type\":\"TextBoxLeft\",\"required\":false,\"singleItem\":false,\"dataType\":\"text\",\"label\":\"Title\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"7b49\",\"type\":\"TextBoxLeft\",\"required\":false,\"singleItem\":false,\"dataType\":\"text\",\"label\":\"Organization\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"6\",\"values\":[]},{\"_uid\":\"11y6v\",\"type\":\"ParagraphHigh\",\"required\":false,\"singleItem\":false,\"dataType\":\"Default\",\"label\":\"\",\"placeholder\":\"\",\"cssClass\":\"form-group\",\"width\":\"12\",\"values\":[\"Thankyou for whatever :)\"]}]','Kindly Enter your employement details before the end of tenure','null','null','SELECT * FROM bktza',0,'bktza',1,1,40);

/*Table structure for table `organization` */

DROP TABLE IF EXISTS `organization`;

CREATE TABLE `organization` (
  `orgid` int(11) NOT NULL auto_increment COMMENT 'pk',
  `orgName` varchar(100) NOT NULL,
  `logouri` varchar(100) default NULL COMMENT 'webpath',
  `website` varchar(100) default NULL COMMENT 'link',
  `formsCount` int(11) NOT NULL,
  `peopleCount` int(11) NOT NULL,
  `isActive` tinyint(1) default NULL,
  `expiration` datetime NOT NULL,
  `description` varchar(200) default NULL,
  `orguri` varchar(20) NOT NULL,
  PRIMARY KEY  (`orgid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `organization` */

insert  into `organization`(`orgid`,`orgName`,`logouri`,`website`,`formsCount`,`peopleCount`,`isActive`,`expiration`,`description`,`orguri`) values (1,'originals','images/originals/logo.png','google.com',200,20,1,'2016-05-06 03:17:27','Just another organization','YfyRM5A');

/*Table structure for table `package` */

DROP TABLE IF EXISTS `package`;

CREATE TABLE `package` (
  `pkgid` int(11) NOT NULL auto_increment COMMENT 'pk',
  `price` int(11) NOT NULL,
  `userlimit` int(11) NOT NULL,
  `formlimit` int(11) NOT NULL,
  `desc` varchar(200) NOT NULL,
  PRIMARY KEY  (`pkgid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `package` */

/*Table structure for table `request` */

DROP TABLE IF EXISTS `request`;

CREATE TABLE `request` (
  `userid` int(11) NOT NULL COMMENT 'fk',
  `req_time` datetime NOT NULL,
  `isActive` tinyint(1) default NULL,
  `title` varchar(100) default NULL,
  `reqdesc` varchar(200) default NULL,
  `seen` tinyint(1) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `request` */

insert  into `request`(`userid`,`req_time`,`isActive`,`title`,`reqdesc`,`seen`) values (1,'2015-05-10 03:31:03',1,'Employee Details','Form Pending',0),(1,'2015-05-10 03:31:16',1,'CRF','Pending Form Again',0),(1,'2015-05-10 03:31:42',1,'Stewie','Louis',0),(2,'2015-05-10 03:42:05',1,'Distrubia','Rihanna Calling',0),(2,'2015-05-10 03:43:28',1,'Bad Romance','Form Pending',0),(3,'2015-05-10 03:43:46',1,'Blue','Form Pending',0);

/*Table structure for table `signature` */

DROP TABLE IF EXISTS `signature`;

CREATE TABLE `signature` (
  `userid` int(11) default NULL COMMENT 'fk',
  `formid` int(11) default NULL COMMENT 'fk',
  `approval` tinyint(1) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `signature` */

insert  into `signature`(`userid`,`formid`,`approval`) values (1,1,0),(2,1,0),(3,1,0);

/*Table structure for table `subscriber` */

DROP TABLE IF EXISTS `subscriber`;

CREATE TABLE `subscriber` (
  `subid` int(11) NOT NULL,
  `userid` int(11) NOT NULL COMMENT 'fk',
  `orgid` int(11) NOT NULL COMMENT 'fk',
  PRIMARY KEY  (`subid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `subscriber` */

insert  into `subscriber`(`subid`,`userid`,`orgid`) values (0,1,1);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userid` int(10) unsigned NOT NULL,
  `email` varchar(100) NOT NULL,
  `orgid` int(11) NOT NULL COMMENT 'fk',
  `name` varchar(50) NOT NULL,
  `address` varchar(100) default NULL,
  `phonenumber` varchar(15) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `signature` int(11) default NULL,
  `username` varchar(50) NOT NULL COMMENT 'usr',
  `password` varchar(50) NOT NULL,
  `usertype` varchar(5) NOT NULL COMMENT 'type',
  PRIMARY KEY  (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`userid`,`email`,`orgid`,`name`,`address`,`phonenumber`,`designation`,`signature`,`username`,`password`,`usertype`) values (1,'imaadabbasi@hotmail.com',1,'Imad Ali','Clifton Block II','03215639759','Lead Developer',NULL,'imixtron','welcome123','SADMI'),(2,'anweramin@gmail.com',1,'Anwer Amin','Clifton Block V','03335639759','Developer',NULL,'shattercage','welcome123','ADMIN'),(3,'tanzeel@live.com',1,'Tanzeel','Gulshan-e-Iqbal','03455639759','Documentionist',NULL,'zaalim','welcome123','USER');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

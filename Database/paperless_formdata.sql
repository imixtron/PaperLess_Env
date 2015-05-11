/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.0.67-community-nt : Database - paperless_formdata
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`paperless_formdata` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `paperless_formdata`;

/*Table structure for table `bktza` */

DROP TABLE IF EXISTS `bktza`;

CREATE TABLE `bktza` (
  `id` int(6) unsigned NOT NULL auto_increment,
  `0fpa` varchar(250) default NULL,
  `1l93` varchar(250) default NULL,
  `2era` varchar(250) default NULL,
  `3fuz` date default NULL,
  `4s5w` varchar(250) default NULL,
  `5g06` varchar(250) default NULL,
  `6f0l` varchar(250) default NULL,
  `10pvl` varchar(250) default NULL,
  `9jhl` varchar(250) default NULL,
  `8vi1` varchar(250) default NULL,
  `7b49` varchar(250) default NULL,
  `11y6v` varchar(250) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `bktza` */

insert  into `bktza`(`id`,`0fpa`,`1l93`,`2era`,`3fuz`,`4s5w`,`5g06`,`6f0l`,`10pvl`,`9jhl`,`8vi1`,`7b49`,`11y6v`) values (6,NULL,'Linda Litt','mrslitt@gmail.com','1990-06-03','Hello','1990-06-03Windows Phone; ',NULL,NULL,'working for 10 years','Paralegal','Pearson Hardman',NULL),(5,NULL,'Mike Ross','mikeross@live.com','1979-09-05','221b Baker street','Symbian;',NULL,NULL,'still a student','CEO','Cross software house',NULL),(4,NULL,'Mindy Blake','mindyblake@hotmail.com','1995-01-26','Hi','Windows Phone; ',NULL,NULL,'This is Mindy from Mindy Project.','HRM','Orange HRMS',NULL);

/*Table structure for table `formdatahistory` */

DROP TABLE IF EXISTS `formdatahistory`;

CREATE TABLE `formdatahistory` (
  `hsid` int(11) unsigned NOT NULL,
  `id` int(11) unsigned NOT NULL,
  `userid` int(11) unsigned NOT NULL,
  `orgid` int(11) unsigned NOT NULL,
  `dateTime` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`hsid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `formdatahistory` */

/*Table structure for table `mj3j6` */

DROP TABLE IF EXISTS `mj3j6`;

CREATE TABLE `mj3j6` (
  `5kb3` varchar(250) default NULL,
  `0ylo` varchar(250) default NULL,
  `11o9` varchar(250) default NULL,
  `2b39` varchar(250) default NULL,
  `6ywr` date default NULL,
  `4smc` varchar(250) default NULL,
  `id` int(11) unsigned NOT NULL auto_increment,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `mj3j6` */

insert  into `mj3j6`(`5kb3`,`0ylo`,`11o9`,`2b39`,`6ywr`,`4smc`,`id`) values ('Lost','James Sawyer','Island','Other','1977-06-19','I was so high i just completely friggin lost it... stupid time travel',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

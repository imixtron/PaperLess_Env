USE [master]
GO
/****** Object:  Database [GoPaperlessDB]    Script Date: 4/15/2015 4:49:53 PM ******/
CREATE DATABASE [GoPaperlessDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GoPaperlessDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\GoPaperlessDB.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'GoPaperlessDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\GoPaperlessDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [GoPaperlessDB] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GoPaperlessDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GoPaperlessDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [GoPaperlessDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GoPaperlessDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GoPaperlessDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GoPaperlessDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GoPaperlessDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GoPaperlessDB] SET  MULTI_USER 
GO
ALTER DATABASE [GoPaperlessDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GoPaperlessDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GoPaperlessDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GoPaperlessDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [GoPaperlessDB]
GO
/****** Object:  Table [dbo].[Forms]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Forms](
	[FormId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Structure] [varchar](max) NOT NULL,
	[UpdateQuery] [varchar](max) NOT NULL,
	[DeleteQuery] [varchar](max) NOT NULL,
	[ViewQuery] [varchar](max) NOT NULL,
	[isApproved] [bit] NOT NULL,
 CONSTRAINT [PK_Forms] PRIMARY KEY CLUSTERED 
(
	[FormId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Organization](
	[OrganizationName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Description] [varchar](50) NULL,
	[SizeInForms] [int] NOT NULL,
	[SizeInPeople] [int] NOT NULL,
	[Logo] [varchar](50) NULL,
	[Website] [varchar](50) NULL,
	[Org-isActive] [bit] NOT NULL,
 CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED 
(
	[OrganizationName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Package]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Package](
	[PackagesID] [int] IDENTITY(1,1) NOT NULL,
	[Price] [int] NULL,
	[NoOfUsers] [int] NULL,
	[NoOfForms] [int] NULL,
	[Description] [varchar](50) NULL,
 CONSTRAINT [PK_Package] PRIMARY KEY CLUSTERED 
(
	[PackagesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Request]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Request](
	[FormID] [int] NOT NULL,
	[User] [varchar](50) NOT NULL,
	[Datatime] [datetime] NULL,
	[isActive] [bit] NULL,
	[RequestDiscription] [varchar](50) NULL,
 CONSTRAINT [PK_Request] PRIMARY KEY CLUSTERED 
(
	[FormID] ASC,
	[User] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Signature]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Signature](
	[FormID] [int] NOT NULL,
	[User] [varchar](50) NOT NULL,
	[Approval] [bit] NOT NULL,
 CONSTRAINT [PK_Signature] PRIMARY KEY CLUSTERED 
(
	[FormID] ASC,
	[User] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Subscribers]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Subscribers](
	[Email] [varchar](50) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[PhoneNumber] [int] NOT NULL,
	[Address] [varchar](150) NULL,
	[CardInfo] [varchar](50) NOT NULL,
	[PackageNo] [int] NOT NULL,
	[Coupons] [varchar](50) NULL,
	[Discount] [int] NULL,
	[isActive] [bit] NOT NULL,
 CONSTRAINT [PK_Subscribers] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/15/2015 4:49:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](50) NULL,
	[Designation] [varchar](50) NULL,
	[Role] [varchar](50) NOT NULL,
	[Signature] [varchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Subscribers] FOREIGN KEY([Email])
REFERENCES [dbo].[Subscribers] ([Email])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Subscribers]
GO
ALTER TABLE [dbo].[Subscribers]  WITH CHECK ADD  CONSTRAINT [FK_Subscribers_Package] FOREIGN KEY([PackageNo])
REFERENCES [dbo].[Package] ([PackagesID])
GO
ALTER TABLE [dbo].[Subscribers] CHECK CONSTRAINT [FK_Subscribers_Package]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'CP object' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Forms', @level2type=N'COLUMN',@level2name=N'Structure'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'boolean check' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Forms', @level2type=N'COLUMN',@level2name=N'isApproved'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Primary key from Subcribers' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Organization', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Admin/user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'autogen key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Signature'
GO
USE [master]
GO
ALTER DATABASE [GoPaperlessDB] SET  READ_WRITE 
GO

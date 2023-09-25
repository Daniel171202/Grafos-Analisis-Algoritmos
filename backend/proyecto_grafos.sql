/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : proyecto_grafos

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 25/09/2023 10:43:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grafos
-- ----------------------------
DROP TABLE IF EXISTS `grafos`;
CREATE TABLE `grafos` (
  `idGrafo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nodes` text NOT NULL,
  `edges` text NOT NULL,
  `layouts` text NOT NULL,
  `Usuarios_idUsuario` int NOT NULL,
  PRIMARY KEY (`idGrafo`),
  KEY `grafos_Usuarios` (`Usuarios_idUsuario`),
  CONSTRAINT `grafos_Usuarios` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `Usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of grafos
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Usuarios
-- ----------------------------
DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios` (
  `idUsuario` int NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Usuarios
-- ----------------------------
BEGIN;
INSERT INTO `Usuarios` (`idUsuario`, `usuario`, `clave`) VALUES (1, 'usuario1', 'usuario1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

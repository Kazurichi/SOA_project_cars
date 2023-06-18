-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2023 at 01:51 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soa_project_cars`
--
CREATE DATABASE IF NOT EXISTS `soa_project_cars` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `soa_project_cars`;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `vin` varchar(255) NOT NULL,
  `idx_car_manufacturer` int(11) NOT NULL,
  `plat_number` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `car_manufacturer`
--

DROP TABLE IF EXISTS `car_manufacturer`;
CREATE TABLE `car_manufacturer` (
  `idx` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `idx_manufacturer` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `drive` varchar(255) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `cylinders` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `damages`
--

DROP TABLE IF EXISTS `damages`;
CREATE TABLE `damages` (
  `idx` int(50) NOT NULL,
  `vin` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `estimated` int(50) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `damages`
--

INSERT INTO `damages` (`idx`, `vin`, `description`, `estimated`, `picture`) VALUES
(1, 'JTOQA7595RS00001', 'pernah terjadi kecelakaan dan mengalami kerusakan dibagian depan', 9999, 'JTOQA7595RS00001_volkswagen-passat--front-left.jpg'),
(2, 'JTOQA7595RS00001', 'pernah terjadi kecelakaan dan mengalami kerusakan dibagian depan', 29000, 'JTOQA7595RS00001_volkswagen-passat--vin.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
CREATE TABLE `manufacturers` (
  `idx` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_origin` varchar(255) NOT NULL,
  `region_id` varchar(255) NOT NULL,
  `plant_code` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `authorized` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`idx`, `name`, `country_origin`, `region_id`, `plant_code`, `password`, `authorized`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'toyota', 'Japan', 'J', 'S', '12345678', 0, NULL, NULL, NULL),
(2, 'Mitsubishi', 'Japan', 'R', 'F', '12345678', 0, NULL, NULL, NULL),
(3, 'Porcshe', 'Germany', 'Y', 'I', '65432198', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reporter`
--

DROP TABLE IF EXISTS `reporter`;
CREATE TABLE `reporter` (
  `idx` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `authorized` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reporter`
--

INSERT INTO `reporter` (`idx`, `name`, `username`, `password`, `company`, `authorized`, `createdAt`, `updatedAt`, `DeletedAt`) VALUES
(1, 'Will', 'Reporter1', '123', 'Kompas Gramedia', 0, '2023-06-09 15:42:23', '2023-06-09 15:42:23', NULL),
(2, 'Allan', 'Reporter2', '123', 'Tempo Media Group', 1, '2023-06-09 15:43:35', '2023-06-09 15:43:35', NULL),
(3, 'Maya', 'Reporter3', '123', 'Antara News Agency', 1, '2023-06-09 15:43:42', '2023-06-09 15:43:42', NULL),
(4, 'Mei', 'Reporter4', '123', 'Antara News Agency', 0, '2023-06-17 09:44:16', '2023-06-17 09:44:16', NULL),
(5, 'Malv', 'Malv123', '123', 'CNN Indonesia', 1, '2023-06-17 09:45:04', '2023-06-17 09:45:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
  `idx` int(11) NOT NULL,
  `vin` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `reporter_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`idx`, `vin`, `type`, `title`, `location`, `reporter_id`, `reporter_name`, `description`, `createdAt`, `updatedAt`, `deleteAt`) VALUES
(1, 'JTOQA7595RS00001', 'Taxi', 'Taxi Mobil', 'Surabaya', 1, 'Reporter1', 'Mobil ini pernah digunakan sebagai taxi mobil', '2023-06-17 14:34:35', '2023-06-17 14:34:35', NULL),
(2, 'JTOQA7595RS00002', 'Taxi', 'Taxi Mobil', 'Jakarta', 2, 'Reporter2', 'Mobil ini pernah digunakan sebagai taxi mobil', '2023-06-17 14:34:36', '2023-06-17 14:34:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
  `idx` int(225) NOT NULL,
  `id_user` int(225) NOT NULL,
  `tier` int(1) NOT NULL,
  `content_access` int(225) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`idx`, `id_user`, `tier`, `content_access`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 0, '2023-06-12 22:57:08', '2023-06-16 20:07:55', '0000-00-00 00:00:00'),
(2, 2, 1, 39, '2023-06-16 18:21:15', '2023-06-16 18:21:15', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tiers`
--

DROP TABLE IF EXISTS `tiers`;
CREATE TABLE `tiers` (
  `idx` int(225) NOT NULL,
  `tier_name` varchar(225) NOT NULL,
  `price` int(225) NOT NULL,
  `content_access` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiers`
--

INSERT INTO `tiers` (`idx`, `tier_name`, `price`, `content_access`) VALUES
(1, 'Beginner', 10000, 50),
(2, 'Middle', 20000, 100),
(3, 'Expert', 50000, 250);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idx` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `API_KEY` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idx`, `email`, `username`, `password`, `name`, `account_type`, `API_KEY`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'email@email.com', 'User1', '123', 'John', '-', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjEsInVzZXJuYW1lIjoiVXNlcjEiLCJyb2xlIjoxLCJpYXQiOjE2ODcwNTk5MTMsImV4cCI6MTY4NzA2MzUxM30.iT7xS0DtHF2HJXORu_Q5Ps4Es9IfVS9Zhf7UXZaMvLM', '2023-06-03 13:07:49', '2023-06-18 10:45:13', NULL),
(2, 'email4@email.com', 'User1', '123', 'John', '-', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjIsInVzZXJuYW1lIjoiVXNlcjEiLCJyb2xlIjoxLCJpYXQiOjE2ODY5OTA5MzEsImV4cCI6MTY4Njk5NDUzMX0.zCOVYCJksLKbPAJGXMn0onvOBayVR_7xCaVkTjEhNVw', '2023-06-17 12:19:49', '2023-06-17 15:35:31', NULL),
(3, 'test@email.com', 'User1', '123', 'John', '-', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjMsInVzZXJuYW1lIjoiVXNlcjEiLCJyb2xlIjoxLCJpYXQiOjE2ODcwNTc1NjQsImV4cCI6MTY4NzA2MTE2NH0.iVQhUyS_maQhn91oG2xs4nd721mmSMWQ0rL0d4I5tj8', '2023-06-18 10:05:51', '2023-06-18 10:06:04', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `damages`
--
ALTER TABLE `damages`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `reporter`
--
ALTER TABLE `reporter`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `tiers`
--
ALTER TABLE `tiers`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idx`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `damages`
--
ALTER TABLE `damages`
  MODIFY `idx` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reporter`
--
ALTER TABLE `reporter`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `idx` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tiers`
--
ALTER TABLE `tiers`
  MODIFY `idx` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

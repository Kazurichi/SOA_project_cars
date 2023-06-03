-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2023 at 06:01 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

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
  `plat_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`vin`, `idx_car_manufacturer`, `plat_number`) VALUES
('JTOQA7595RS00001', 1, NULL),
('JTOQA7595RS00002', 1, NULL),
('JTOQA7595RS00003', 1, NULL);

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
  `cylinders` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `car_manufacturer`
--

INSERT INTO `car_manufacturer` (`idx`, `model`, `idx_manufacturer`, `year`, `drive`, `fuel_type`, `transmission`, `cylinders`) VALUES
(1, 'supra', 1, 1994, 'rwd', 'gas', 'a', 6),
(2, 'prius', 1, 2001, 'fwd', 'gas', 'a', 4);

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
  `authorized` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`idx`, `name`, `country_origin`, `region_id`, `plant_code`, `password`, `authorized`) VALUES
(1, 'toyota', 'Japan', 'J', 'S', '12345678', 1),
(2, 'Mitsubishi', 'Japan', 'R', 'F', '12345678', 0);

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
  `API_KEY` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`vin`);

--
-- Indexes for table `car_manufacturer`
--
ALTER TABLE `car_manufacturer`
  ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
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
-- AUTO_INCREMENT for table `car_manufacturer`
--
ALTER TABLE `car_manufacturer`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2020 at 01:00 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fishly`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration_confirm_hash`
--

CREATE TABLE `registration_confirm_hash` (
  `user_id` int(11) NOT NULL,
  `hash` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reported_set`
--

CREATE TABLE `reported_set` (
  `user_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `saved_set`
--

CREATE TABLE `saved_set` (
  `user_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `set`
--

CREATE TABLE `set` (
  `set_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `subject` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(16) NOT NULL,
  `lastname` varchar(24) NOT NULL,
  `email` varchar(32) NOT NULL,
  `login` varchar(16) NOT NULL,
  `hashed_password` varchar(128) NOT NULL,
  `status` int(1) NOT NULL,
  `registration_ip` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `word`
--

CREATE TABLE `word` (
  `word_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `original` varchar(32) NOT NULL,
  `translated` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration_confirm_hash`
--
ALTER TABLE `registration_confirm_hash`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `hash` (`hash`(768));

--
-- Indexes for table `reported_set`
--
ALTER TABLE `reported_set`
  ADD PRIMARY KEY (`user_id`,`set_id`);

--
-- Indexes for table `saved_set`
--
ALTER TABLE `saved_set`
  ADD PRIMARY KEY (`user_id`,`set_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `set`
--
ALTER TABLE `set`
  ADD PRIMARY KEY (`set_id`),
  ADD KEY `language_id` (`created_by`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `subject_id` (`subject`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `hashed_password` (`hashed_password`),
  ADD KEY `login` (`login`),
  ADD KEY `email` (`email`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`word_id`),
  ADD KEY `set_id` (`set_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `set`
--
ALTER TABLE `set`
  MODIFY `set_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `word`
--
ALTER TABLE `word`
  MODIFY `word_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registration_confirm_hash`
--
ALTER TABLE `registration_confirm_hash`
  ADD CONSTRAINT `registration_confirm_hash_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

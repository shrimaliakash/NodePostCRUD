-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2020 at 11:00 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodepost`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `status` enum('draft','published') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `name`, `description`, `category`, `status`, `created_at`, `updated_at`) VALUES
(1, 'post1', 'post1 description', 'Category2', 'draft', '2020-08-02 10:06:04', '2020-08-03 19:18:39'),
(2, 'post2', 'post2 description', 'Category4', 'published', '2020-08-02 10:06:37', '2020-08-03 19:18:48'),
(3, 'post3', 'post3 description', 'Category5', 'published', '2020-08-02 10:09:16', '2020-08-03 19:18:54'),
(6, 'post4', 'post4 description', 'Category5', 'published', '2020-08-03 18:42:49', '2020-08-03 19:39:00'),
(7, 'post5', 'post5 description', 'Category5', 'draft', '2020-08-03 18:44:19', '2020-08-03 18:44:19'),
(8, 'post6', 'post6 description', 'Category3', 'draft', '2020-08-03 18:46:14', '2020-08-03 18:46:14'),
(9, 'post7', 'post7 description', 'Category3', 'published', '2020-08-03 18:47:59', '2020-08-03 18:47:59'),
(10, 'post8', 'post8 description', 'Category1', 'draft', '2020-08-03 18:49:04', '2020-08-03 18:49:04'),
(11, 'post8', 'post8 description', 'Category1', 'draft', '2020-08-03 18:50:10', '2020-08-03 18:50:10'),
(12, 'post9', 'post9 description', 'Category3', 'published', '2020-08-03 18:52:55', '2020-08-03 18:52:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

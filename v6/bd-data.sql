-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : dim. 03 sep. 2023 à 13:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nest-purchase-v3`
--

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `fullName`, `email`, `clientCategoryId`) VALUES
(1, ' mehdi khaoula', 'aitbelmehdik@gmail.com', NULL);

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `code`, `reference`) VALUES
(1, '123', '456'),
(2, '456', '789');

--
-- Déchargement des données de la table `purchase`
--

INSERT INTO `purchase` (`id`, `reference`, `purchaseDate`, `image`, `total`, `description`, `clientId`) VALUES
(1, 'PUR1', '2023-08-17 14:00:00', '', 150.00, 'purchase description', 1),
(2, 'PUR1', '2023-08-17 14:00:00', '', 150.00, 'purchase description', NULL),
(3, 'd2', '0000-00-00 00:00:00', 'd2', 200.00, 'd2d2d2d2d2d2d2d2', 1);

--
-- Déchargement des données de la table `purchase_item`
--

INSERT INTO `purchase_item` (`id`, `price`, `quantity`, `productId`, `purchaseId`) VALUES
(1, 50.00, 2.00, 1, 1),
(2, 3.00, 10.00, 2, 1),
(3, 20.00, 2.00, NULL, 3),
(4, 30.00, 3.00, NULL, 3);

--
-- Déchargement des données de la table `role_app`
--

INSERT INTO `role_app` (`id`, `authority`) VALUES
(1, 'ROLE_ADMIN');

--
-- Déchargement des données de la table `user_app`
--

INSERT INTO `user_app` (`id`, `email`, `username`, `password`, `roleId`) VALUES
(3, 'zouani', 'zouani', '$2b$12$t5BomtIjrVBAA/cw87G6luWxayElxQiUCahz2EUZkXcdTUx0w8oOq', NULL),
(4, 'khaoula', 'khaoula', '$2b$12$OFS08agJKxQTCYJHLF95sOQm3J7HUcIjbYscGy2gtG/TgcbYdhNUK', NULL),
(5, 'koko', 'koko', '$2b$12$XHAt29ii2QlPA6ozMAAL0uyHhA8t6jmX8F0Sh0DF/8ja5/en42s3a', NULL),
(6, 'soso', 'soso', '$2b$12$TkZDu3.ag6jsp3I0AL/tqejDO8rfL7jqU3Ao3nUMdEARJOqrX68ii', NULL),
(7, 'ana', 'ana', '$2b$12$vy.kmJ0EJ2/8NPzPw0Mi4O0ZaPx8tJtoNCUDKVZymuW3rRRXmgjO2', 1),
(8, 'lolo', 'lolo', '$2b$12$dKZcXAvptvG7o0xFswS0Vu2FPP8COqZ1sxLT3hPPm5DhJX72zP40C', 1);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

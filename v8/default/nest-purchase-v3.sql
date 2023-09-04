-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 18 août 2023 à 13:13
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

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

INSERT INTO `client` (`id`, `fullName`, `email`) VALUES
(1, 'khaoula ait bel mehdi', 'aitbelmehdikhaoula@gmail.com');

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `code`, `reference`) VALUES
(1, '123', '456');

--
-- Déchargement des données de la table `purchase`
--

INSERT INTO `purchase` (`id`, `reference`, `purchaseDate`, `total`, `description`, `clientId`) VALUES
(1, 'PUR1_updated', '2023-08-17 13:00:00', '200.00', 'Updated purchase description', 1);

--
-- Déchargement des données de la table `purchase-item`
--

INSERT INTO `purchase-item` (`id`, `price`, `quantity`, `productId`, `purchaseId`) VALUES
(1, '50.00', '2.00', 1, 1);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

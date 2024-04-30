-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 30. 08:16
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `lords`
--
CREATE DATABASE IF NOT EXISTS `lords` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lords`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `oltonyok`
--

CREATE TABLE `oltonyok` (
  `productid` int(11) NOT NULL COMMENT 'a ruha azonosítója',
  `brand` varchar(50) NOT NULL COMMENT 'a ruha márkája',
  `model` varchar(50) NOT NULL COMMENT 'a ruha modellje',
  `image` varchar(255) DEFAULT NULL COMMENT 'a kép neve',
  `price` int(11) NOT NULL COMMENT 'a termék ára',
  `stock` int(11) NOT NULL COMMENT 'a termék darabszáma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `oltonyok`
--

INSERT INTO `oltonyok` (`productid`, `brand`, `model`, `image`, `price`, `stock`) VALUES
(49, 'Lords', 'Men’s Charcoal Grey 3 Piece Tweed Herringbone Suit', '2024_02_15_1.jpg', 59990, 4),
(50, 'Lords', 'Mens Herringbone Tweed 3 Piece Navy Red Check Suit', '2024_02_15_2.jpg', 49990, 13),
(51, 'Lords', 'Mens 3 Piece Blue-Grey Vintage Suit – Paul Andrew ', '2024_02_15_3.jpg', 59990, 47),
(52, 'Lords', 'Mens 3 Piece Tweed Check Suit – Brown', '2024_02_15_4.jpg', 99990, 38),
(53, 'Lords', 'Mens Navy-Blue Peaky Blinders Wool Suit', '2024_02_15_5.jpg', 149990, 3),
(54, 'Lords', 'Oak-Brown Herringbone Tweed 3 Piece Suit', '2024_02_15_6.jpg', 89990, 2),
(55, 'Lords', 'Men’s Grey Tartan Check 3 Piece Suit', '2024_02_15_7.jpg', 49990, 5),
(56, 'Lords', 'Men’s Blue Tartan Check 3 Piece Suit', '2024_02_15_8.jpg', 59990, 6),
(57, 'Lords', 'Men’s Herringbone Wine Maroon 3 Piece Tweed Suit –', '2024_02_15_9.jpg', 199990, 9),
(58, 'Lords', 'Mens 3 Piece Tweed Check Suit – Cream', '2024_02_15_10.jpg', 69990, 3),
(59, 'Lords', 'Mens 3 Piece Tweed Check Suit – Navy Blue', '2024_02_15_11.jpg', 59990, 5),
(60, 'Lords', 'Mens Grey Wool Suit', '2024_02_15_12.jpg', 49990, 2),
(61, 'Lords', 'Men’s Black Glen Check 3 Piece Suit', '2024_02_15_13.jpg', 199990, 15),
(62, 'Lords', 'Men’s Brown Herringbone Tweed 3 Piece Suit', '2024_02_15_14.jpg', 189990, 4),
(64, 'Lords', 'Men’s Navy-Blue Herringbone Tweed 3 Piece Suit', '2024_02_15_15.jpg', 219990, 1),
(65, 'Lords', 'Mens 3 Piece Herringbone Tweed Tan Brown Check Sui', '2024_02_15_20.jpg', 259990, 0),
(66, 'Lords', 'Mens Grey Snakeskin Design Shoes with Metal Toe', '2024_02_15_c1.jpg', 399990, 14),
(67, 'Lords', 'Mens Black Patent Shoes with Tassel', '2024_02_15_c2.jpg', 499990, 2),
(68, 'Lords', 'Mens Brogue Ankle Boots Tan', '2024_02_15_c3.jpg', 99990, 21),
(69, 'Lords', 'Blundstone 063 Voltan Black Leather Chelsea Boots', '2024_02_15_c4.jpg', 399900, 24),
(70, 'Lords', 'Mens Shiny Glitter White Party Smart Formal Slip O', '2024_02_15_c5.jpg', 299990, 6),
(71, 'Lords', 'Mens Shiny Glitter Black Party Smart Formal Slip O', '2024_02_15_c6.jpg', 399990, 6),
(72, 'Lords', 'Mens Black & White Patent Shoes with Metal Toe', '2024_02_15_c7.jpg', 99990, 27),
(73, 'Lords', 'Mens Real Leather Classic Brogues Black Laced Shoe', '2024_02_15_c8.jpg', 79990, 19);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ordering`
--

CREATE TABLE `ordering` (
  `orderid` int(11) NOT NULL COMMENT 'a rendelés azonosítója',
  `userid` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `productid` int(11) NOT NULL COMMENT 'a ruha azonosítója',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'a rendelés ideje',
  `price` int(11) NOT NULL COMMENT 'a megrendelés összértéke'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ordering`
--

INSERT INTO `ordering` (`orderid`, `userid`, `productid`, `order_date`, `price`) VALUES
(8, 2, 49, '2024-03-19 08:52:11', 59990),
(9, 2, 49, '2024-03-19 08:54:56', 59990),
(10, 2, 49, '2024-03-19 08:55:02', 59990),
(11, 2, 49, '2024-03-19 08:55:42', 59990),
(12, 2, 50, '2024-03-19 08:55:50', 49990),
(13, 2, 49, '2024-03-19 08:56:51', 59990),
(14, 2, 50, '2024-03-19 08:57:08', 299940),
(15, 2, 49, '2024-03-19 08:59:12', 59990),
(16, 2, 49, '2024-03-19 09:05:36', 59990),
(17, 2, 51, '2024-03-20 09:05:24', 119980),
(18, 2, 49, '2024-03-21 08:28:21', 59990),
(19, 2, 49, '2024-03-22 12:36:00', 59990),
(20, 2, 51, '2024-03-26 06:45:32', 59990),
(21, 2, 51, '2024-03-26 06:59:25', 0),
(22, 2, 51, '2024-03-26 06:59:30', 0),
(23, 2, 51, '2024-03-26 07:58:06', 119980),
(24, 2, 50, '2024-03-26 09:50:54', 49990);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `email` varchar(255) NOT NULL COMMENT 'a felhasználó email címe',
  `nick_name` varchar(50) NOT NULL COMMENT 'a felhasználónév',
  `password` varchar(255) NOT NULL COMMENT 'a felhasználó jelszava',
  `role` tinyint(5) NOT NULL COMMENT 'a felhasználó szerepköre: 0 = user, 1 = admin',
  `userImage` varchar(255) NOT NULL COMMENT 'kép a sorozatról',
  `birthday` date DEFAULT NULL COMMENT 'a felhasználó születési dátuma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userid`, `email`, `nick_name`, `password`, `role`, `userImage`, `birthday`) VALUES
(1, 'admin@admin.hu', 'Admin', '$2b$10$xR9bxOvI0vjwJIZOzdF0Z.OiXR3ZfBC3JnlF43m.ThT12ik/EkS36', 1, '2024_03_26_admin.jpg', '1858-07-09'),
(2, 'teszt@teszt.hu', 'Teszt', '$2b$10$ZiIefJ7.DjQhUNa131qIsOknEcEJ/Qi7tKcwvc8gmHlwtlXAX29mC', 0, '2024_03_26_teszt.gif', '2003-01-20'),
(15, 'teszt1@gmail.com', '123456aA', '$2b$10$GQpkJCSwQRAD3MLFewFQluiyEjsh4nFTBa6yRQAxX/5QdyGXaJxy6', 0, 'no_image.png', NULL),
(16, 'pelda@gmail.com', 'Teszt2', '$2b$10$fNvNVCdGlofMmNxjPS6GzuP7laUretlczaMgIT3p900s8ovz9S/gK', 0, 'no_image.png', NULL),
(17, 'teszt3@gmail.com', 'Teszt3', '$2b$10$J9Hdzav31f/5ONxkGdRP/eyTO.AAr6c02YXtvGNoFhftNRylz0Rhu', 0, 'no_image.png', NULL),
(18, 'teszt4@gmail.com', 'Teszt4', '$2b$10$RI3Cm5C6V4MYDjOSpVnNMe.XtpejeJNxJzhm/GznKXWKIJpC3yJ62', 0, 'no_image.png', NULL),
(19, 'teszt5@gmail.com', 'Teszt5', '$2b$10$Yfb3fJi40hWCWIYDoIHuBuwcXb92g4pVliwjowGIHtL7Wvvgqd7ie', 0, 'no_image.png', NULL),
(20, 'kutya12345@gmail.com', 'kutya12345', '$2b$10$HpM5.0uACy5c2kzwRl8nleAG4CGYm3rpPW6OrMVyP9meNfXy5BGba', 1, 'no_image.png', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `oltonyok`
--
ALTER TABLE `oltonyok`
  ADD PRIMARY KEY (`productid`);

--
-- A tábla indexei `ordering`
--
ALTER TABLE `ordering`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `fk_sorozat_order` (`productid`),
  ADD KEY `fk_user_order` (`userid`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `oltonyok`
--
ALTER TABLE `oltonyok`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a ruha azonosítója', AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT a táblához `ordering`
--
ALTER TABLE `ordering`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a rendelés azonosítója', AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a felhasználó azonosítója', AUTO_INCREMENT=22;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ordering`
--
ALTER TABLE `ordering`
  ADD CONSTRAINT `fk_sorozat_order` FOREIGN KEY (`productid`) REFERENCES `oltonyok` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`userid`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

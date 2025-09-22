-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: user-registration
-- Tempo de geração: 22-Set-2025 às 01:58
-- Versão do servidor: 8.3.0
-- versão do PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dados: `user_registration_db`
--
CREATE DATABASE IF NOT EXISTS `user_registration_db` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `user_registration_db`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `address`
--

CREATE TABLE `address` (
  `id` binary(16) NOT NULL,
  `type` tinyint DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `address_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `address`
--

INSERT INTO `address` (`id`, `type`, `street`, `complement`, `country`, `state`, `city`, `user_id`, `address_order`) VALUES
(0xd01e2f3c4b5a6789ef0123456789abcd, 2, 'Avenida de Tal', 'Próximo ao centro comercial', 'Brazil', 'São Paulo', 'Santos', 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL),
(0xe23456789abcde0f1a2b3c4d5e6f7890, 3, 'Estrada de Tal', 'Próximo ao shopping', 'Brazil', 'São Paulo', 'Santos', 0x8f3c4d5e6f7890ab1234567890cdef12, NULL),
(0x4580e242b89c4c05ae5d856cc544f893, 1, 'Rua de Tal', 'Próximo ao parque', 'Brazil', 'São Paulo', 'Ribeirão Preto', 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x566462350a554c4db4c10e6e1ecf320e, 2, 'Avenida de Tal', 'Próximo ao centro comercial', 'Brazil', 'São Paulo', 'Santos', 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x8df4e6800feb4e5a903a45ecf23d6be9, 3, 'Estrada de Tal', 'Próximo ao shopping', 'Brazil', 'São Paulo', 'São Carlos', 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0xf950d78b924046bbb8e02695f64f0e29, 1, 'Rua de Tal', 'próximo ao parque', 'Brazil', 'Rio Grande do Sul', 'Porto Alegre', 0x30538eb368714f85ac61ae3ded52c54b, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `dependents`
--

CREATE TABLE `dependents` (
  `id` binary(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` tinyint NOT NULL,
  `document` bigint NOT NULL,
  `user_id` binary(16) NOT NULL,
  `dependent_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `dependents`
--

INSERT INTO `dependents` (`id`, `name`, `age`, `document`, `user_id`, `dependent_order`) VALUES
(0x06478b4103e74ccbb855a898e8bde495, 'Filipinho', 5, 11111111111, 0x30538eb368714f85ac61ae3ded52c54b, NULL),
(0x3fbd8a66b90f452cbca763a385e0ed0e, 'Fulaninho', 12, 22011944867, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x6fe255cd587b41dab14b62d4ea017e8d, 'Fulaninha', 9, 99988877766, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0xb7890abc1234def567890abcdef12345, 'Fulaninho', 5, 22011944800, 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `genres`
--

CREATE TABLE `genres` (
  `id` int NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `genres`
--

INSERT INTO `genres` (`id`, `description`) VALUES
(1, 'Electronic'),
(2, 'Pop Rock'),
(3, 'Reggae'),
(4, 'Punk'),
(5, 'Funk'),
(6, 'Jazz'),
(7, 'Rock'),
(8, 'Indie'),
(9, 'Soul'),
(10, 'Metal'),
(11, 'Blues'),
(12, 'Latin'),
(13, 'Hip Hop'),
(14, 'Pop'),
(15, 'R&B'),
(16, 'Alternative'),
(17, 'Gospel'),
(18, 'Country'),
(19, 'World'),
(20, 'Classical');

-- --------------------------------------------------------

--
-- Estrutura da tabela `musics`
--

CREATE TABLE `musics` (
  `id` binary(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `band` varchar(255) NOT NULL,
  `genre` tinyint NOT NULL,
  `is_favorite` tinyint(1) DEFAULT '0',
  `favorite_rank` tinyint DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `music_order` int DEFAULT NULL
) ;

--
-- Extraindo dados da tabela `musics`
--

INSERT INTO `musics` (`id`, `title`, `band`, `genre`, `is_favorite`, `favorite_rank`, `user_id`, `music_order`) VALUES
(0x6b87b3282da8456db5b66e13233938aa, 'Música 1', 'Banda A', 8, 1, NULL, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x87a51155072d46b2878da054af6b3ee0, 'Música 2', 'Banda B', 11, 0, NULL, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0xa5e6f7890a1b2c3d4e5f60718293a4b5, 'Música 5', 'Banda Y', 7, 1, NULL, 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL),
(0xa8a548c3b9d0455591b0c0c8e606308b, 'Música F', 'Banda do F', 1, 1, NULL, 0x30538eb368714f85ac61ae3ded52c54b, NULL),
(0xb6f7890a1b2c3d4e5f60718293a4b5c6, 'Música 6', 'Banda Z', 12, 0, NULL, 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL),
(0xc7f890a1b2c3d4e5f60718293a4b5c6d, 'Easy', 'Commodores', 2, 1, NULL, 0x8f3c4d5e6f7890ab1234567890cdef12, NULL),
(0xd8f90a1b2c3d4e5f60718293a4b5c6d7, 'True', 'Spandau Ballet', 2, 0, NULL, 0x8f3c4d5e6f7890ab1234567890cdef12, NULL),
(0xdd8f25208c7542609d51387b634857df, 'Música 3', 'Banda C', 9, 0, NULL, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0xe9f0a1b2c3d4e5f60718293a4b5c6d7e, 'If You Don\'t Know Me by Now', 'Simply Red', 2, 0, NULL, 0x8f3c4d5e6f7890ab1234567890cdef12, NULL),
(0xf4d5e6f7890a1b2c3d4e5f60718293a4, 'Música 4', 'Banda X', 1, 0, NULL, 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `phone`
--

CREATE TABLE `phone` (
  `id` binary(16) NOT NULL,
  `area_code` varchar(2) NOT NULL,
  `international_code` varchar(3) NOT NULL,
  `number` varchar(10) NOT NULL,
  `type` tinyint NOT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `phone_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `phone`
--

INSERT INTO `phone` (`id`, `area_code`, `international_code`, `number`, `type`, `user_id`, `phone_order`) VALUES
(0x1e17338dc55b4408b0e5f3b8b23ae78b, '11', '+55', '91111-7777', 2, 0x8f3c4d5e6f7890ab1234567890cdef12, NULL),
(0x30b5e3190e564ef2b1dd4c8c231ea101, '11', '+55', '1234-5678', 1, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x59455b296e2b4a9cb18e8681e57c2065, '11', '+55', '93333-7777', 3, 0x7f2b3c4d5e6f7890ab1234567890cdef, NULL),
(0x639be2d1605e4880883921a2e1719763, '11', '+55', '91111-2222', 2, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL),
(0x754549edc51540998663fd62607a6f4d, '51', '+55', '11111-1111', 2, 0x30538eb368714f85ac61ae3ded52c54b, NULL),
(0x959fdc0c0ea14ed1b7f2eade1b0515a5, '11', '+55', '93333-4444', 3, 0x6f1a2b3c4d5e6f7890ab1234567890cd, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `photo` tinytext,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `marital_status` tinyint NOT NULL,
  `monthly_income` decimal(38,2) NOT NULL,
  `birth_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `photo`, `name`, `password`, `email`, `country`, `state`, `marital_status`, `monthly_income`, `birth_date`) VALUES
(0x30538eb368714f85ac61ae3ded52c54b, '30538eb3-6871-4f85-ac61-ae3ded52c54b.jpg', 'filipe', '123456', 'filipe@gmail.com', 'Brazil', 'Rio Grande do Sul', 1, 2000.00, '2004-03-01'),
(0x6f1a2b3c4d5e6f7890ab1234567890cd, '6f1a2b3c-4d5e-6f78-90ab-1234567890cd.jpg', 'Fulano', '123yvtyvyttyvtr', 'fulano@hotmail.com', 'Brazil', 'São Paulo', 1, 5000.00, '1991-02-25'),
(0x7f2b3c4d5e6f7890ab1234567890cdef, NULL, 'Laura', 'senha laura', 'laura@hotmail.com', 'Brazil', 'São Paulo', 2, 6000.00, '1994-12-12'),
(0x8f3c4d5e6f7890ab1234567890cdef12, NULL, 'Marcos', 'coqueiro', 'marcos@hotmail.com', 'Brazil', 'São Paulo', 3, 7000.00, '1991-11-11');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `address`
--
ALTER TABLE `address`
  ADD KEY `fk_address_users` (`user_id`);

--
-- Índices para tabela `dependents`
--
ALTER TABLE `dependents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document` (`document`),
  ADD KEY `fk_dependents_users` (`user_id`);

--
-- Índices para tabela `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `musics`
--
ALTER TABLE `musics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_user_favorite` (`user_id`,`favorite_rank`);

--
-- Índices para tabela `phone`
--
ALTER TABLE `phone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_phone_users` (`user_id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `dependents`
--
ALTER TABLE `dependents`
  ADD CONSTRAINT `fk_dependents_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `musics`
--
ALTER TABLE `musics`
  ADD CONSTRAINT `fk_musics` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `phone`
--
ALTER TABLE `phone`
  ADD CONSTRAINT `fk_phone_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 27/10/2024 às 00:46
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `easypark`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `vaga`
--

CREATE TABLE `vaga` (
  `id_vaga` int(11) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `status_vaga` enum('vazio','reservado') DEFAULT NULL,
  `tipo_vaga` enum('normal','pcd','idoso','autista','gestante') DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `tempo` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vaga`
--

INSERT INTO `vaga` (`id_vaga`, `numero`, `tipo_vaga`, `descricao`, `preco`, `tempo`) VALUES
(1, 1, 'normal', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(2, 2, 'normal', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(3, 3, 'autista', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(4, 4, 'pcd', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(5, 5, 'gestante', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(6, 6, 'idoso', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(7, 7, 'normal', 'Lorem ipsum dolor sit amet. Est architecto assumenda 33 voluptatum impedit et sapiente unde.', 10, '00:30:00'),
(8, 8, 'autista', 'Lorem ipsum dolor sit amet. Ea galisum deserunt est Quis commodi eos eius incidunt sed autem accusamus? Rem itaque illo est accusamus repellat sed alias voluptatem.', 10, '00:30:00'),
(9, 9, 'pcd', 'Lorem ipsum dolor sit amet. Ea galisum deserunt est Quis commodi eos eius incidunt sed autem accusamus? Rem itaque illo est accusamus repellat sed alias voluptatem.', 10, '00:30:00'),
(10, 10, 'gestante', 'Lorem ipsum dolor sit amet. Ea galisum deserunt est Quis commodi eos eius incidunt sed autem accusamus? Rem itaque illo est accusamus repellat sed alias voluptatem.', 10, '00:30:00'),
(11, 11, 'idoso', 'Lorem ipsum dolor sit amet. Ea galisum deserunt est Quis commodi eos eius incidunt sed autem accusamus? Rem itaque illo est accusamus repellat sed alias voluptatem.', 10, '00:30:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `vaga`
--
ALTER TABLE `vaga`
  ADD PRIMARY KEY (`id_vaga`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `vaga`
--
ALTER TABLE `vaga`
  MODIFY `id_vaga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

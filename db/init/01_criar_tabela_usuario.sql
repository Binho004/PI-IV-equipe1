-- -- Tabela de usuários — nome e colunas compatíveis com o modelo `Usuario` em `api/models.py`
-- CREATE TABLE IF NOT EXISTS usuarios (
-- 	id INT AUTO_INCREMENT PRIMARY KEY,
-- 	nome_usuario VARCHAR(100) NOT NULL,
-- 	email VARCHAR(100) NOT NULL UNIQUE,
-- 	senha VARCHAR(256) NOT NULL,
-- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- )
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



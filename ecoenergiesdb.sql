create database if not exists ecoenergiesdb;

use ecoenergiesdb;

create table if not exists usuarios (
    id int auto_increment primary key,
    nome varchar(255) not null,
    senha varchar(255) not null,
    email varchar(255) not null,
    isAdmin BOOLEAN DEFAULT 0
	);

CREATE TABLE IF NOT EXISTS publicacoes (
    id int auto_increment primary key,
    nome_empresa varchar(255) not null,
    tipo varchar(255) not null,
    localizacao varchar(255) not null,
    descricao text not null,
    preco decimal(10, 2)
	);

INSERT INTO usuarios (id, nome, senha, email, isAdmin) VALUES (1, 'admin', '1234', 'admin@gmail.com', true);

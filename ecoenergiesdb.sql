create database if not exists ecoenergiesdb;

use ecoenergiesdb;

create table if not exists usuarios (
    id int auto_increment primary key,
    email varchar(255) not null,
    senha varchar(255) not null,
    cep varchar(255) not null,
    telefone varchar(255) not null,
    isAdmin BOOLEAN DEFAULT 0
	);

create table if not exists publicacoes (
    id int auto_increment primary key,
    nome_publi varchar(255) not null,
    tipo varchar(255) not null,
    localizacao varchar(255) not null,
    descricao text not null,
    preco decimal(10, 2),
    link text (255) not null
	);
    
create table if not exists empresas (
    id int auto_increment primary key,
    email varchar(255) not null,
    cnpj varchar(255) not null,
    telefone varchar(255) not null,
    senha varchar(255) not null
	);

INSERT INTO usuarios (id, email, senha, cep, telefone, isAdmin) VALUES (1, 'joaoMarcelo@gmail.com', '1234', '01001-000', '7111112222', true);

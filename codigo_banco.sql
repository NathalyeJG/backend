create database sidedb;
use sidedb;
CREATE TABLE usuario ( 
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
tipo_usuario BOOLEAN NOT NULL,
nome_usuario VARCHAR(25) NOT NULL,
senha VARCHAR(15) NOT NULL,
foto_usuario VARCHAR(50) NOT NULL );
CREATE TABLE agendamento (
id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
id_jovem INT NOT NULL,
id_idoso INT NOT NULL,
data_hora DATETIME NOT NULL,
duracao INT NOT NULL,
valor INT,
confirmar_idoso BOOLEAN NOT NULL,
confirmar_jovem BOOLEAN NOT NULL);
CREATE TABLE endereco ( 
id_endereco INT AUTO_INCREMENT PRIMARY KEY,
logradouro ENUM('Rua', 'Avenida', 'Alameda', 'Travessa', 'Praça', 'Estrada', 'Rodovia', 'Viela') NOT NULL,
logradouro_nome VARCHAR(50) NOT NULL,
numero VARCHAR(10) NOT NULL,
complemento VARCHAR(20),
cidade VARCHAR(30) NOT NULL,
estado VARCHAR(20) NOT NULL,
bairro VARCHAR(30) NOT NULL,
cep VARCHAR(9) NOT NULL,
pais VARCHAR(20) NOT NULL DEFAULT 'Brasil' );
 
 
CREATE TABLE pagamento (
id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
id_agendamento INT NOT NULL,
status VARCHAR(20) NOT NULL );
 
 
CREATE TABLE jovem (
id_jovem INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
id_contato INT NOT NULL,
nome varchar(60) not null,
cpf VARCHAR(14) UNIQUE NOT NULL,
data_nascimento DATE NOT NULL,
experiencia TEXT,
chave_pix VARCHAR(50),
descricao VARCHAR(150) NOT NULL,
genero VARCHAR(5) NOT NULL);
 
 
CREATE TABLE idoso (
id_idoso INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
id_contato INT NOT NULL,
nome varchar(60) not null,
cpf VARCHAR(14) UNIQUE NOT NULL,
data_nascimento DATE NOT NULL,
comorbidade BOOLEAN NOT NULL,
tipo_comorbidade VARCHAR(50),
descricao VARCHAR(150) NOT NULL,
genero VARCHAR(5) NOT NULL);
 
 
CREATE TABLE contato (
id_contato INT AUTO_INCREMENT PRIMARY KEY,
telefone_celular VARCHAR(15) NOT NULL,
telefone_fixo VARCHAR(15),
email VARCHAR(50) NOT NULL UNIQUE );
 
CREATE TABLE receber (
id_receber INT AUTO_INCREMENT PRIMARY KEY,
id_agendamento INT NOT NULL,
status VARCHAR(20) NOT NULL,
trabalho_realizado boolean not null );
 
CREATE TABLE avaliacao (
id_avaliacao int auto_increment primary key,
id_agendamento int,
nota decimal (3,2) not null,
avaliacao varchar(150) not null
);
 
-- relacionar a tabela agendamento com a tabela jovem
ALTER TABLE agendamento
ADD CONSTRAINT `fk_agendamento_pk_jovem` 
FOREIGN KEY agendamento(`id_jovem`)
REFERENCES jovem(`id_jovem`);
-- relacionar a tabela agendamento com a tabela idoso
ALTER TABLE agendamento
ADD CONSTRAINT `fk_agendamento_pk_idoso` 
FOREIGN KEY agendamento(`id_idoso`)
REFERENCES idoso(`id_idoso`);

-- relacionar a tabela pagamento com a tabela agendamento
ALTER TABLE pagamento
ADD CONSTRAINT `fk_pagamento_pk_agendamento` 
FOREIGN KEY pagamento(`id_agendamento`)
REFERENCES agendamento(`id_agendamento`);
-- relacionar a tabela jovem com a tabela usuario
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_usuario` 
FOREIGN KEY jovem(`id_usuario`)
REFERENCES usuario(`id_usuario`);
-- relacionar a tabela jovem com a tabela usuario
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_contato` 
FOREIGN KEY jovem(`id_contato`)
REFERENCES contato(`id_contato`);
-- relacionar a tabela jovem com a tabela usuario
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_endereco` 
FOREIGN KEY jovem(`id_endereco`)
REFERENCES endereco(`id_endereco`);
-- relacionar a tabela idoso com a tabela usuario
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_usuario` 
FOREIGN KEY idoso(`id_usuario`)
REFERENCES usuario(`id_usuario`);
 
-- relacionar a tabela idoso com a tabela endereço
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_endereco` 
FOREIGN KEY idoso(`id_endereco`)
REFERENCES endereco(`id_endereco`);
 
-- relacionar a tabela idoso com a tabela contato
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_contato` 
FOREIGN KEY idoso(`id_contato`)
REFERENCES contato(`id_contato`);
-- relacionar a tabela receber com a tabela agendamento
ALTER TABLE receber
ADD CONSTRAINT `fk_receber_pk_agendamento` 
FOREIGN KEY receber(`id_agendamento`)
REFERENCES agendamento(`id_agendamento`);

-- relacionar a tabela avaliação com a tabela agendamento
ALTER TABLE avaliacao
ADD CONSTRAINT `fk_avalicao_pk_agendamento` 
FOREIGN KEY avaliacao(`id_agendamento`)
REFERENCES agendamento(`id_agendamento`);
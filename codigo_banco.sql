create database sidedb;
use sidedb;
CREATE TABLE usuario ( 
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) NOT NULL,
nome_completo VARCHAR(80) NOT NULL,
nome_usuario VARCHAR(25) NOT NULL,
senha VARCHAR(15) NOT NULL,
tipo_usuario BOOLEAN NOT NULL);
 
 
CREATE TABLE agendamento (
id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
id_jovem INT NOT NULL,
id_idoso INT NOT NULL,
data_hora DATETIME NOT NULL,
duracao INT NOT NULL
);
 
CREATE TABLE endereco ( 
id_endereco INT AUTO_INCREMENT PRIMARY KEY,
logradouro VARCHAR(20) NOT NULL,
logradouro_nome VARCHAR(50) NOT NULL,
numero VARCHAR(5) NOT NULL,
complemento VARCHAR(20),
cidade VARCHAR(30) NOT NULL,
estado VARCHAR(20) NOT NULL,
bairro VARCHAR(30) NOT NULL,
cep VARCHAR(9) NOT NULL,
pais VARCHAR(20) NOT NULL DEFAULT 'Brasil' );



CREATE TABLE jovem (
id_jovem INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
cpf_jovem VARCHAR(14) UNIQUE NOT NULL,
valor_jovem DECIMAL(4,2),
foto_jovem varchar(255),
assinante_jovem BOOLEAN NOT NULL,
data_nascimento_jovem DATE NOT NULL,
experiencia_jovem TEXT,
descricao_jovem VARCHAR(150) NOT NULL,
telefone_jovem VARCHAR(14) UNIQUE NOT NULL,
genero_jovem BOOLEAN NOT NULL);


CREATE TABLE idoso (
id_idoso INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
foto_idoso varchar(255),
assinante_idoso BOOLEAN NOT NULL,
cpf VARCHAR(14) UNIQUE NOT NULL,
data_nascimento DATE NOT NULL,
comorbidade BOOLEAN NOT NULL,
tipo_comorbidade VARCHAR(50),
descricao VARCHAR(150) NOT NULL,
telefone_idoso VARCHAR(14) UNIQUE NOT NULL,
genero BOOLEAN NOT NULL);

CREATE TABLE avaliacao (
id_avaliacao int auto_increment primary key,
id_agendamento int,
nota decimal (3,2) not null,
avaliacao varchar(150) not null
);


CREATE TABLE mensagens (
    id_messagem INT AUTO_INCREMENT PRIMARY KEY,
    id_remetente INT NOT NULL,        -- -> id da tabela 'usuario'
    id_destinatario INT NOT NULL,     -- -> id da tabela 'usuario'
    conteudo TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_remetente) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_destinatario) REFERENCES usuario(id_usuario)
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
 

-- relacionar a tabela jovem com a tabela usuario
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_usuario` 
FOREIGN KEY jovem(`id_usuario`)
REFERENCES usuario(`id_usuario`);
 
-- relacionar a tabela jovem com a tabela endereco
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_endereco` 
FOREIGN KEY jovem(`id_endereco`)
REFERENCES endereco(`id_endereco`);
-- relacionar a tabela idoso com a tabela usuario
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_usuario` 
FOREIGN KEY idoso(`id_usuario`)
REFERENCES usuario(`id_usuario`);
-- relacionar a tabela idoso com a tabela endereço .
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_endereco` 
FOREIGN KEY idoso(`id_endereco`)
REFERENCES endereco(`id_endereco`);

-- relacionar a tabela avaliação com a tabela agendamento
ALTER TABLE avaliacao
ADD CONSTRAINT `fk_avalicao_pk_agendamento` 
FOREIGN KEY avaliacao(`id_agendamento`)
REFERENCES agendamento(`id_agendamento`);
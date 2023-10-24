CREATE DATABASE loja_online;

USE loja_online;

CREATE TABLE cidades(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

INSERT INTO `cidades` (`id`, `nome`) VALUES
(1, 'Porto Alegre'),
(2, 'Viamao');

CREATE TABLE categorias(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) 
);

INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Bebidas'),
(2, 'Doces'),
(3, 'Comidas');

CREATE TABLE clientes (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
nome VARCHAR(100) NOT NULL ,
altura DOUBLE ,
nascimento DATE ,
cidade_id INT NOT NULL ,
FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

INSERT INTO `clientes` (`id`, `nome`, `altura`, `nascimento`, `cidade_id`) VALUES
(1, 'Christian', 1.75, '2001-02-10', 1);

CREATE TABLE produtos (
id int NOT NULL primary key auto_increment ,
nome VARCHAR(100) NOT NULL ,
preco DOUBLE NOT NULL ,
quantidade DOUBLE ,
categoria_id INT NOT NULL ,
FOREIGN KEY(categoria_id) REFERENCES categorias(id)
);

INSERT INTO `produtos` (`id`, `nome`, `preco`, `quantidade`, `categoria_id`) VALUES
(3, 'pepsi', 5.99, 200, 1),
(4, 'coca-cola', 6.99, 300, 1),
(5, 'Arroz', 4.99, 120, 3),
(6, 'sorvete', 10.99, 50, 2);

CREATE TABLE pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
horario DATETIME ,
endereco VARCHAR(100) NOT NULL ,
cliente_id INT NOT NULL ,
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedidos_produtos(
pedido_id INT NOT NULL ,
produto_id INT NOT NULL ,
preco DOUBLE,
quantidade DOUBLE,
foreign key(pedido_id) references pedidos (id),
foreign key(produto_id) references produtos (id)
);
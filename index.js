const restify = require("restify");
const errors = require("restify-errors");

const servidor = restify.createServer({
    name : 'loja' ,
    version : '1.0.0'
});

servidor.use( restify.plugins.acceptParser(servidor.acceptable) );
servidor.use( restify.plugins.queryParser());
servidor.use( restify.plugins.bodyParser());

servidor.listen( 8001 , function(){
    console.log("%s executando em %s", 
    servidor.name, servidor.url);
});

var knex = require('knex')({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'loja_online'
    }
});

servidor.get( '/' , (req, res, next) => {
    res.send('Bem-vindo a API Loja!');
});

// ==================== CLIENTES ===================

// Cadastro do cliente
servidor.post('/clientes', (req, res, next) => {
    knex('clientes')
    .insert(req.body)
    .then((dados) => {
        res.send(dados);
    }, next);
});

// Consultar um produto
servidor.get('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id', idProduto)
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado!'));
            }else{
                res.send(dados);
            }
        }, next);
});

// Consultar todos os produtos
servidor.get('/produtos', (req, res, next) => {
    knex('produtos')
    .then((dados) => {
        res.send(dados);
    }, next);
});

// Criar um pedido
servidor.post('/pedidos', (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// Adicionar um produto a um pedido
servidor.post('/pedidos_produtos', (req, res, next) => {
    knex('pedidos_produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// Consultar um pedido
servidor.get('/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido) 
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }else{
                res.send(dados);
            }
        }, next);
});

// ================== ADMINISTRADORES ===================

// Atualização de pedidos
servidor.put('/admin/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }
            res.send("Pedido Atualizado!");
        }, next);
});

// Exclusão de pedidos
servidor.del('/admin/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }
            res.send("Pedido Deletado");
        }, next);
});

// Consulta de produtos adicionados a pedidos
servidor.get('/admin/pedidos_produtos', (req, res, next) => {
    knex('pedidos_produtos').then((dados) => {
        res.send(dados);
    }, next);
});

// Criação de produtos
servidor.post('/admin/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// atualização de produtos
servidor.put('/admin/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id', idProduto)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado'));
            }
            res.send("Produto Atualizado");
        }, next);
});

// exclusão de produtos
servidor.del('/admin/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id', idProduto)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado'));
            }
            res.send("Produto Deletado");
        }, next);
});

// Consultar todos os clientes
servidor.get('/admin/clientes', (req, res, next) => {
    knex('clientes').then((dados) => {
        res.send(dados);
    }, next);
});

// Consultar um cliente
servidor.get('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.id;
    knex('clientes')
        .where('id', idCliente) 
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Este cliente não foi encontrado'));
            }else{
                res.send(dados);
            }
        }, next);
});

// Atualizar um cliente
servidor.put('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.id;
    knex('clientes')
        .where('id', idCliente)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Cliente não encontrado!'));
            }
            res.send("Cliente Atualizado!");
        }, next);
});

// excluir cliente
servidor.del('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.id;
    knex('clientes')
        .where('id', idCliente)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Cliente não encontrado!'));
            }
            res.send("Cliente Deletado");
        }, next);
});
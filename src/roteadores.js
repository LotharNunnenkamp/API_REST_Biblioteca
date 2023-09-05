const express = require('express');
const { consultarLivros, consultarLivro, adicionarLivro, substituirLivro, alterarLivro, removerLivro } = require('../controladores/livros');
const rotas = express();

rotas.get('/livros', consultarLivros);
rotas.get('/livros/:id', consultarLivro);
rotas.post('/livros', adicionarLivro);
rotas.put('/livros/:id', substituirLivro);
rotas.patch('/livros/:id', alterarLivro);
rotas.delete('/livros/:id', removerLivro);

module.exports = {rotas};
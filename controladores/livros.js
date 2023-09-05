let { livros } = require('../banco de dados/livros')

const consultarLivros = (req, res) => {
    return res.status(200).json(livros);
}

const consultarLivro = (req, res) => {
    let { id } = req.params;
    id = Number(id)
    
    if (Number.isInteger(id)) {

        const livro = livros.find((livro) => {
            return livro.id === id;
        })

        if (!livro) {
            return res.status(404).json({ mensagem: "Não existe livro para o ID informado." })
        }

        return res.status(200).json(livro);

    } else {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." })
    }
}

const adicionarLivro = (req, res) => {
    let identificadorLivro = livros.length + 1;

    const { titulo, autor, ano, numPaginas } = req.body;

    const livro = {
        id: identificadorLivro,
        titulo,
        autor,
        ano,
        numPaginas
    }

    livros.push(livro);
    return res.status(201).send();
}

const substituirLivro = (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, numPaginas } = req.body;

    let livro = livros.find((livro) => {
        return livro.id === Number(id);
    })

    if (!livro) {
        return res.status(404).json({ mensagem: "Não existe livro a ser substituído para o ID informado." })
    }

    livro = {
        id: Number(id),
        titulo,
        autor,
        ano,
        numPaginas
    }

    livros.splice(Number(id) - 1, 1, livro);

    return res.status(204).json({ mensagem: "Livro substituído." })
}

const alterarLivro = (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, numPaginas } = req.body;

    let livro = livros.find((livro) => {
        return livro.id === Number(id);
    })

    if (!livro) {
        return res.status(404).json({ mensagem: "Não existe livro a ser alterado para o ID informado." })
    }

    livro = {
        id: Number(id),
        titulo: titulo ?? livro.titulo,
        autor: autor ?? livro.autor,
        ano: ano ?? livro.ano,
        numPaginas: numPaginas ?? livro.numPaginas
    }

    livros.splice(Number(id) - 1, 1, livro);

    return res.status(204).json({ mensagem: "Livro alterado." })
}

const removerLivro = (req, res) => {
    const { id } = req.params;

    let livro = livros.find((livro) => {
        return livro.id === Number(id);
    })

    if (!livro) {
        return res.status(404).json({ mensagem: "Não existe livro a ser removido para o ID informado." })
    }

    livros.splice(Number(id) - 1, 1);

    return res.status(200).json({ mensagem: "Livro removido." })
}

module.exports = {
    consultarLivros,
    consultarLivro,
    adicionarLivro,
    substituirLivro,
    alterarLivro,
    removerLivro
}
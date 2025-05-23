const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Configurar CORS para permitir todas as origens
app.use(cors());

// Habilitar suporte a JSON
app.use(express.json());

// Banco de dados em memória (simulação)
let livros = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis" },
  { id: 2, titulo: "O Alquimista", autor: "Paulo Coelho" },
];

// Criar um novo livro
app.post("/livros", (req, res) => {
  const novoLivro = req.body;
  novoLivro.id = livros.length + 1;
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

// Obter todos os livros
app.get("/livros", (req, res) => {
  res.json(livros);
});

// Obter um livro específico por ID
app.get("/livros/:id", (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id);
  livro ? res.json(livro) : res.status(404).send("Livro não encontrado");
});

// Atualizar um livro por ID
app.put("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id == req.params.id);
  if (index !== -1) {
    livros[index] = { ...livros[index], ...req.body };
    res.json(livros[index]);
  } else {
    res.status(404).send("Livro não encontrado");
  }
});

// Excluir um livro por ID
app.delete("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id == req.params.id);
  if (index !== -1) {
    livros.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Livro não encontrado");
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

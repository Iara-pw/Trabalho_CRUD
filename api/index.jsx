const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Permitir CORS para todas as origens e métodos
app.use(
  cors({
    origin: "*", // aceita qualquer origem
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // métodos liberados
    allowedHeaders: ["Content-Type", "Authorization"], // cabeçalhos permitidos
  })
);
app.use(bodyParser.json());

// ...existing code...

let livros = [
  { id: 1, titulo: "Dom Quixote", autor: "Miguel de Cervantes", ano: 1605 },
  { id: 2, titulo: "1984", autor: "George Orwell", ano: 1949 },
];

// Rotas
app.get("/livros", (req, res) => res.json(livros));

app.get("/livros/:id", (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id);
  livro
    ? res.json(livro)
    : res.status(404).json({ message: "Livro não encontrado" });
});

app.post("/livros", (req, res) => {
  const novoLivro = { ...req.body, id: Date.now() };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id == req.params.id);
  if (index !== -1) {
    livros[index] = { ...livros[index], ...req.body };
    res.json(livros[index]);
  } else {
    res.status(404).json({ message: "Livro não encontrado" });
  }
});

app.delete("/livros/:id", (req, res) => {
  livros = livros.filter((l) => l.id != req.params.id);
  res.json({ message: "Livro removido com sucesso" });
});

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));

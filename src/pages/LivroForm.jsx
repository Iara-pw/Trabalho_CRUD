import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/livros";

export default function LivroForm() {
  const [livro, setLivro] = useState({ titulo: "", autor: "", ano: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/${id}`).then((res) => setLivro(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prev) => ({ ...prev, [name]: value }));
  };

  // filepath: c:\Sites\Crud_trabalho\Trabalho_CRUD\src\pages\LivroForm.jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    const livroParaEnviar = { ...livro, ano: Number(livro.ano) };
    const requisicao = isEdit
      ? axios.put(`${API_URL}/${id}`, livroParaEnviar)
      : axios.post(API_URL, livroParaEnviar);

    requisicao.then(() => navigate("/livros"));
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{isEdit ? "✏️ Editar Livro" : "➕ Cadastrar Livro"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <br />
          <input
            name="titulo"
            value={livro.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <br />
          <input
            name="autor"
            value={livro.autor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ano:</label>
          <br />
          <input
            name="ano"
            value={livro.ano}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Salvar</button>
        <Link to="/livros" style={{ marginLeft: "1rem" }}>
          Cancelar
        </Link>
      </form>
    </div>
  );
}

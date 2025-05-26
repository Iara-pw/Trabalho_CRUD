import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/livros";

export default function LivroLista() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = () => {
    axios
      .get(API_URL)
      .then((res) => setLivros(res.data))
      .catch((err) => console.error("Erro:", err));
  };

  const excluirLivro = (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      axios.delete(`${API_URL}/${id}`).then(() => carregarLivros());
    }
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>📚 Lista de Livros</h2>
      <Link to="/livros/novo">➕ Cadastrar Livro</Link>
      <ul>
        {livros.map((l) => (
          <li key={l.id}>
            <b>{l.titulo}</b> - {l.autor} ({l.ano}){" "}
            <button onClick={() => navigate(`/livros/editar/${l.id}`)}>
              ✏️ Editar
            </button>
            <button onClick={() => excluirLivro(l.id)}>🗑️ Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo à Biblioteca</h1>
      <p>Use o menu abaixo para navegar:</p>
      <nav>
        <Link to="/livros">Lista de Livros</Link>
      </nav>
    </div>
  );
}

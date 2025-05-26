import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LivroLista from "./pages/LivroLista";
import LivroForm from "./pages/LivroForm";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livros" element={<LivroLista />} />
        <Route path="/livros/novo" element={<LivroForm />} />
        <Route path="/livros/editar/:id" element={<LivroForm />} />
      </Routes>
    </Router>
  );
}

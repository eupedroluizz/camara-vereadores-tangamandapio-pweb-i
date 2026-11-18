import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="navegacao-principal" aria-label="Navegação principal">
      <button
        id="botao-menu"
        className="botao-menu"
        type="button"
        aria-expanded={menuAberto}
        aria-controls="lista-navegacao"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        Menu
      </button>
      <ul
        id="lista-navegacao"
        className={`lista-navegacao conteiner ${menuAberto ? "aberto" : ""}`}
      >
        <li><NavLink to="/" end>Início</NavLink></li>
        <li><NavLink to="/institucional">Institucional</NavLink></li>
        <li><NavLink to="/noticias">Notícias</NavLink></li>
        <li><NavLink to="/vereadores">Vereadores</NavLink></li>
        <li><NavLink to="/mesa-diretora">Mesa Diretora</NavLink></li>
        <li><NavLink to="/legislacao">Legislação</NavLink></li>
        <li><NavLink to="/transparencia">Transparência</NavLink></li>
        <li><NavLink to="/ouvidoria">Ouvidoria</NavLink></li>
      </ul>
    </nav>
  );
}

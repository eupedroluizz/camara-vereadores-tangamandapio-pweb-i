import { useState } from "react";
import { Link } from "react-router-dom";

const dadosMesa = [
  {
    id: "girafales-mesa",
    nome: "Professor Girafales",
    cargo: "Presidente",
    partido: "Partido da Educação (PE)",
    foto: "/assets/img/professor_girafales.png",
    atribuicoes: "Preside as sessões plenárias, promulga resoluções, representa o poder legislativo em juízo e fora dele e coordena os trabalhos parlamentares."
  },
  {
    id: "barriga-mesa",
    nome: "Seu Barriga",
    cargo: "Vice-presidente",
    partido: "Partido dos Proprietários da Vila (PPV)",
    foto: "/assets/img/seu_barriga.jpg",
    atribuicoes: "Substitui o Presidente em suas ausências ou impedimentos e supervisiona a gestão administrativa e patrimonial da Câmara."
  },
  {
    id: "jaiminho-mesa",
    nome: "Jaiminho, O Carteiro",
    cargo: "1º Secretário",
    partido: "Partido da Fadiga Zero (PFZ)",
    foto: "/assets/img/jaiminho.jpeg",
    atribuicoes: "Responsável pelas atas das sessões, contagem das votações, verificação de quórum e guarda dos arquivos oficiais."
  },
  {
    id: "madruga-mesa",
    nome: "Seu Madruga",
    cargo: "2º Secretário",
    partido: "Partido do Trabalhador Autônomo (PTA)",
    foto: "/assets/img/seu_madruga.png",
    atribuicoes: "Auxilia o 1º Secretário e fiscaliza o recebimento de requerimentos, ofícios e correspondências dos munícipes."
  }
];

export default function MesaDiretora() {
  const [filtroCargo, setFiltroCargo] = useState("todos");

  const membrosFiltrados = dadosMesa.filter((membro) => {
    if (filtroCargo === "todos") return true;
    return membro.cargo === filtroCargo;
  });

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Mesa Diretora</span>
      </nav>

      <section className="conteiner" aria-labelledby="titulo-mesa">
        <h2 id="titulo-mesa" className="titulo-secao">Mesa Diretora (Biênio 2025-2026)</h2>
        <p className="subtitulo-secao">Órgão responsável pela condução dos trabalhos legislativos e da gestão administrativa</p>

        <div className="filtro">
          <label htmlFor="filtro-cargo">Filtrar por cargo</label>
          <select
            id="filtro-cargo"
            value={filtroCargo}
            onChange={(e) => setFiltroCargo(e.target.value)}
          >
            <option value="todos">Todos os cargos</option>
            <option value="Presidente">Presidente</option>
            <option value="Vice-presidente">Vice-presidente</option>
            <option value="1º Secretário">1º Secretário</option>
            <option value="2º Secretário">2º Secretário</option>
          </select>
        </div>

        <p id="contador-mesa" className="contador" aria-live="polite">
          Mostrando {membrosFiltrados.length} de {dadosMesa.length} membros da mesa
        </p>

        <div className="grade-vereadores" style={{ marginTop: "1.5rem" }}>
          {membrosFiltrados.map((m) => (
            <article key={m.id} className="cartao-vereador">
              <img className="img-responsiva" src={m.foto} alt={`Foto do ${m.cargo} ${m.nome}`} />
              <div className="info-vereador">
                <h3>{m.nome}</h3>
                <p className="cargo-vereador"><strong>Cargo:</strong> {m.cargo}</p>
                <p className="partido-vereador"><strong>Partido:</strong> {m.partido}</p>
                <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#444" }}>
                  <strong>Atribuições:</strong> {m.atribuicoes}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

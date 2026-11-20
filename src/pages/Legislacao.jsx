import { useState } from "react";
import { Link } from "react-router-dom";

const dadosLeis = [
  {
    id: "lei-101",
    tipo: "Lei Ordinária",
    numero: "Lei nº 101/2026",
    data: "23/09/2026",
    titulo: "Institui o \"Dia Municipal de Evitar a Fadiga\"",
    ementa: "Fica instituído no calendário oficial do município o Dia de Evitar a Fadiga, promovendo o descanso e a qualidade de vida aos trabalhadores locais.",
    textoCompleto: "Art. 1º Fica instituído o dia 23 de setembro como o Dia Municipal de Evitar a Fadiga. Art. 2º O Poder Executivo apoiará atividades de recreação e repouso na praça central. Art. 3º Esta Lei entra em vigor na data de sua publicação."
  },
  {
    id: "dec-54",
    tipo: "Decreto Legislativo",
    numero: "Decreto nº 54/2026",
    data: "10/08/2026",
    titulo: "Regulamenta o tráfego de bicicletas postais nas ladeiras da serra",
    ementa: "Estabelece diretrizes de trânsito preferencial aos carteiros e entregadores de bicicletas nas vias públicas de Tangamandápio.",
    textoCompleto: "Art. 1º As vias municipais deverão contar com sinalização exclusiva de ciclorrotas para trabalhadores postais. Art. 2º O descumprimento sujeitará o infrator a advertência pública."
  },
  {
    id: "res-12",
    tipo: "Resolução",
    numero: "Resolução nº 12/2026",
    data: "05/06/2026",
    titulo: "Reforma do Regimento Interno da Câmara Municipal",
    ementa: "Altera o horário de início das sessões plenárias para as 10h da manhã, garantindo intervalo adequado para o café da manhã com café quente.",
    textoCompleto: "Art. 1º O plenário reunir-se-á ordinariamente às quintas-feiras, a partir das 10 horas. Art. 2º Fica assegurada pausa regimental de 20 minutos para café e prosa."
  }
];

export default function Legislacao() {
  const [tipo, setTipo] = useState("todas");
  const [termoBusca, setTermoBusca] = useState("");
  const [expandidos, setExpandidos] = useState({});

  const toggleExpandir = (id) => {
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const leisFiltradas = dadosLeis.filter((lei) => {
    const combinaTipo = tipo === "todas" ? true : lei.tipo === tipo;
    const combinaTexto =
      lei.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      lei.ementa.toLowerCase().includes(termoBusca.toLowerCase()) ||
      lei.numero.toLowerCase().includes(termoBusca.toLowerCase());
    return combinaTipo && combinaTexto;
  });

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Legislação</span>
      </nav>

      <section className="conteiner" aria-labelledby="titulo-legislacao">
        <h2 id="titulo-legislacao" className="titulo-secao">Legislação Municipal</h2>
        <p className="subtitulo-secao">Pesquise e consulte as normas vigentes em Tangamandápio</p>

        <div className="filtro">
          <label htmlFor="filtro-tipo-lei">Tipo de norma</label>
          <select
            id="filtro-tipo-lei"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="todas">Todas as normas</option>
            <option value="Lei Ordinária">Leis Ordinárias</option>
            <option value="Decreto Legislativo">Decretos Legislativos</option>
            <option value="Resolução">Resoluções</option>
          </select>
        </div>

        <div className="filtro" style={{ marginTop: "1rem" }}>
          <label htmlFor="busca-lei">Pesquisar por palavra-chave</label>
          <input
            id="busca-lei"
            type="text"
            placeholder="Ex.: fadiga, bicicleta, regimento..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        <p id="contador-leis" className="contador" aria-live="polite">
          Mostrando {leisFiltradas.length} de {dadosLeis.length} normas
        </p>

        <div className="lista-leis" style={{ marginTop: "1.5rem" }}>
          {leisFiltradas.map((lei) => {
            const isExp = !!expandidos[lei.id];
            return (
              <article key={lei.id} className="bloco-institucional" style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <span className="categoria-noticia">{lei.tipo}</span>
                  <span className="data-noticia">{lei.data}</span>
                </div>
                <h3 style={{ marginTop: "0.5rem" }}>{lei.numero} — {lei.titulo}</h3>
                <p style={{ marginTop: "0.5rem" }}><strong>Ementa:</strong> {lei.ementa}</p>

                <button
                  type="button"
                  className="botao-secundario"
                  onClick={() => toggleExpandir(lei.id)}
                  style={{ marginTop: "0.8rem" }}
                >
                  {isExp ? "Ocultar Artigos" : "Ver Texto Completo"}
                </button>

                {isExp && (
                  <div style={{ marginTop: "0.8rem", padding: "0.8rem", background: "#f9f9f9", borderRadius: "4px" }}>
                    <p><strong>Texto Completo:</strong> {lei.textoCompleto}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

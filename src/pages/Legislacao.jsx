import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setCookie } from "../utils/cookies";

export default function Legislacao() {
  const [leis, setLeis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [tipo, setTipo] = useState("todas");
  const [termoBusca, setTermoBusca] = useState("");
  const [expandidos, setExpandidos] = useState({});

  useEffect(() => {
    async function carregarLeis() {
      try {
        setCarregando(true);
        const res = await fetch("/data/legislacao.json");
        if (!res.ok) {
          throw new Error(`Erro HTTP status ${res.status}`);
        }
        const data = await res.json();
        setLeis(data);
      } catch (err) {
        console.error("Erro ao carregar normas:", err);
        setErro("Não foi possível carregar o acervo normativo.");
      } finally {
        setCarregando(false);
      }
    }
    carregarLeis();
  }, []);

  const toggleExpandir = (lei) => {
    const id = lei.id;
    const jaAberto = !!expandidos[id];

    if (!jaAberto) {
      setCookie("ultimaLei", lei.numero, 30);
    }
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const leisFiltradas = leis.filter((lei) => {
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

        {carregando && (
          <p className="contador" style={{ color: "#15803d", fontWeight: "bold" }}>
            Carregando acervo normativo da Câmara via Fetch API...
          </p>
        )}

        {erro && (
          <p className="contador" style={{ color: "#b91c1c" }}>
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <>
            <p id="contador-leis" className="contador" aria-live="polite">
              Mostrando {leisFiltradas.length} de {leis.length} normas
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
                      onClick={() => toggleExpandir(lei)}
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
          </>
        )}
      </section>
    </main>
  );
}

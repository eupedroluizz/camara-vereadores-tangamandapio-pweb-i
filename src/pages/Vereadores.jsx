import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../utils/storage";

export default function Vereadores() {
  const [vereadores, setVereadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [expandidos, setExpandidos] = useState({});
  const [favoritos, setFavoritos] = useState(() => {
    const salvos = storage.getLocal("favoritosVereadores", "");
    return salvos ? salvos.split(",").filter(Boolean) : [];
  });

  useEffect(() => {
    async function buscarVereadores() {
      try {
        setCarregando(true);
        const res = await fetch("/data/vereadores.json");
        if (!res.ok) {
          throw new Error(`Erro HTTP status ${res.status}`);
        }
        const data = await res.json();
        setVereadores(data);
      } catch (err) {
        console.error("Erro ao carregar vereadores:", err);
        setErro("Não foi possível carregar a lista de parlamentares.");
      } finally {
        setCarregando(false);
      }
    }
    buscarVereadores();
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos((prev) => {
      const novo = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      storage.setLocal("favoritosVereadores", novo.join(","));
      return novo;
    });
  };

  const toggleExpandir = (id) => {
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const vereadoresFiltrados = vereadores.filter((v) =>
    v.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Vereadores</span>
      </nav>

      <section id="vereadores" className="secao-vereadores conteiner" aria-labelledby="titulo-vereadores">
        <h2 id="titulo-vereadores" className="titulo-secao">Vereadores</h2>
        <p className="subtitulo-secao">Conheça os representantes do poder legislativo de Tangamandápio</p>

        <div className="filtro">
          <label htmlFor="filtro-vereador">Pesquisar vereador pelo nome</label>
          <input
            id="filtro-vereador"
            type="text"
            placeholder="Ex.: Madruga"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {carregando && (
          <p className="contador" style={{ color: "#15803d", fontWeight: "bold" }}>
            Carregando lista de parlamentares via Fetch API...
          </p>
        )}

        {erro && (
          <p className="contador" style={{ color: "#b91c1c" }}>
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <>
            <p id="contador-vereadores" className="contador" aria-live="polite">
              Mostrando {vereadoresFiltrados.length} de {vereadores.length} vereadores
            </p>

            <div id="grade-vereadores" className="grade-vereadores">
              {vereadoresFiltrados.map((v) => {
                const isExp = !!expandidos[v.id];
                const isFav = favoritos.includes(v.id);

                return (
                  <article key={v.id} className="cartao-vereador" id={v.id}>
                    <img className="img-responsiva" src={v.foto} alt={`Foto do Vereador ${v.nome}`} />
                    <div className="info-vereador">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>{v.nome}</h3>
                        <button
                          type="button"
                          className="botao-favorito"
                          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                          onClick={() => toggleFavorito(v.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem" }}
                        >
                          {isFav ? "★" : "☆"}
                        </button>
                      </div>
                      <p className="cargo-vereador"><strong>Cargo:</strong> {v.cargo}</p>
                      <p className="partido-vereador"><strong>Partido:</strong> {v.partido}</p>

                      <button
                        type="button"
                        className="botao-primario botao-detalhes"
                        onClick={() => toggleExpandir(v.id)}
                        aria-expanded={isExp}
                      >
                        {isExp ? "Ocultar Perfil" : "Ver Perfil"}
                      </button>

                      {isExp && (
                        <div className="detalhes-vereador" style={{ marginTop: "0.8rem", textAlign: "left" }}>
                          <p><strong>E-mail:</strong> {v.email}</p>
                          <p><strong>Telefone:</strong> {v.telefone}</p>
                          <p style={{ marginTop: "0.5rem" }}>{v.biografia}</p>
                        </div>
                      )}
                    </div>
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

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import { storage } from "../utils/storage";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [categoria, setCategoria] = useState(() => storage.getSession("filtroCategoria", "todas"));
  const [expandidas, setExpandidas] = useState({});
  const [noticiasLidas, setNoticiasLidas] = useState(() => {
    const salvas = storage.getLocal("noticiasLidas", "");
    return salvas ? salvas.split(",").filter(Boolean) : [];
  });

  useEffect(() => {
    async function carregarNoticias() {
      try {
        setCarregando(true);
        const res = await fetch("/data/noticias.json");
        if (!res.ok) {
          throw new Error(`Erro HTTP status ${res.status}`);
        }
        const data = await res.json();
        setNoticias(data);
      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
        setErro("Não foi possível carregar as notícias municipais.");
      } finally {
        setCarregando(false);
      }
    }
    carregarNoticias();
  }, []);

  const handleCategoriaChange = (novaCat) => {
    setCategoria(novaCat);
    storage.setSession("filtroCategoria", novaCat);
  };

  const toggleExpandir = (noticia) => {
    const id = noticia.id;
    const jaExpandido = !!expandidas[id];

    if (!jaExpandido) {
      if (!noticiasLidas.includes(id)) {
        const novasLidas = [...noticiasLidas, id];
        setNoticiasLidas(novasLidas);
        storage.setLocal("noticiasLidas", novasLidas.join(","));
      }
      setCookie("ultimaNoticia", id, 30);
    }

    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const noticiasFiltradas = noticias.filter((noticia) => {
    if (categoria === "todas") return true;
    return noticia.categoria === categoria;
  });

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Notícias</span>
      </nav>

      <section className="secao-noticias conteiner" aria-labelledby="titulo-noticias">
        <h2 id="titulo-noticias" className="titulo-secao">Notícias</h2>
        <p className="subtitulo-secao">Acompanhe tudo o que acontece na Câmara Municipal de Tangamandápio</p>

        <div className="filtro">
          <label htmlFor="filtro-categoria">Filtrar por categoria</label>
          <select
            id="filtro-categoria"
            value={categoria}
            onChange={(e) => handleCategoriaChange(e.target.value)}
          >
            <option value="todas">Todas as categorias</option>
            <option value="Notícias do Legislativo">Notícias do Legislativo</option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Educação">Educação</option>
          </select>
        </div>

        {carregando && (
          <p className="contador" style={{ color: "#15803d", fontWeight: "bold" }}>
            Carregando notícias da Câmara via Fetch API...
          </p>
        )}

        {erro && (
          <p className="contador" style={{ color: "#b91c1c" }}>
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <>
            <p id="contador-noticias" className="contador" aria-live="polite">
              Mostrando {noticiasFiltradas.length} de {noticias.length} notícias
            </p>

            <div className="grade-noticias" style={{ marginTop: "1.5rem" }}>
              {noticiasFiltradas.map((noticia) => {
                const isExp = !!expandidas[noticia.id];
                const isLida = noticiasLidas.includes(noticia.id);

                return (
                  <article key={noticia.id} className="cartao-noticia">
                    <img
                      className="imagem-noticia img-responsiva"
                      src={noticia.imagem}
                      alt={noticia.descricaoImagem}
                    />
                    <div className="conteudo-noticia">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span className="data-noticia">{noticia.data}</span> |{" "}
                          <span className="categoria-noticia">{noticia.categoria}</span>
                        </div>
                        {isLida && (
                          <span style={{ fontSize: "0.8rem", color: "#15803d", fontWeight: "bold" }}>
                            ✓ (Lida)
                          </span>
                        )}
                      </div>
                      <h3>{noticia.titulo}</h3>
                      <p>{noticia.resumo}</p>

                      <button
                        type="button"
                        className="botao-secundario"
                        onClick={() => toggleExpandir(noticia)}
                        style={{ marginTop: "0.8rem" }}
                      >
                        {isExp ? "Mostrar Menos" : "Leia Mais"}
                      </button>

                      {isExp && (
                        <div
                          className="texto-completo-noticia"
                          style={{ marginTop: "0.8rem", borderTop: "1px dashed #ccc", paddingTop: "0.8rem" }}
                        >
                          <p>{noticia.texto}</p>
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

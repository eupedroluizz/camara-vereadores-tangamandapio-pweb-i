import { useState } from "react";
import { Link } from "react-router-dom";

const dadosNoticias = [
  {
    id: "noticia-1",
    titulo: "Projeto de Lei institui o \"Dia Municipal de Evitar a Fadiga\"",
    data: "23/09/2026",
    categoria: "Notícias do Legislativo",
    imagem: "/assets/img/news1.jpg",
    descricaoImagem: "Fotografia de crianças evitando a fadiga na escola",
    resumo: "A câmara aprovou por unanimidade o novo feriado municipal, incentivando o descanso dos trabalhadores locais.",
    texto: "O projeto, de autoria do vereador Jaiminho, foi votado na sessão ordinária de terça-feira. O feriado será comemorado todo ano e contará com palestras de conscientização sobre a saúde mental e o direito ao repouso digno para todos os carteiros e munícipes."
  },
  {
    id: "noticia-2",
    titulo: "Nova frota de bicicletas para a equipe dos correios",
    data: "21/09/2026",
    categoria: "Infraestrutura",
    imagem: "/assets/img/news2.jpeg",
    descricaoImagem: "Fotografia da praça principal de Tangamandápio com novas bicicletas",
    resumo: "O poder legislativo municipal aprovou o orçamento para aquisição de bicicletas com marcha para facilitar as entregas.",
    texto: "Com a nova frota, os entregadores de correspondências poderão subir as ladeiras da serra de Tangamandápio com menor esforço físico, reduzindo o cansaço excessivo e agilizando a chegada das cartas de parentes distantes."
  },
  {
    id: "noticia-3",
    titulo: "Escola Municipal anuncia programa de incentivo à leitura",
    data: "15/09/2026",
    categoria: "Educação",
    imagem: "/assets/img/professor_girafales_grande.png",
    descricaoImagem: "Professor Girafales na biblioteca municipal",
    resumo: "Sob a liderança do Professor Girafales, a Câmara aprovou verba para ampliação do acervo de livros da biblioteca.",
    texto: "A iniciativa visa distribuir obras clássicas da literatura para crianças e adolescentes da rede pública de ensino, além de criar rodas de leitura aos sábados na Praça Principal."
  }
];

export default function Noticias() {
  const [categoria, setCategoria] = useState("todas");
  const [expandidas, setExpandidas] = useState({});

  const toggleExpandir = (id) => {
    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const noticiasFiltradas = dadosNoticias.filter((noticia) => {
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
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todas">Todas as categorias</option>
            <option value="Notícias do Legislativo">Notícias do Legislativo</option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Educação">Educação</option>
          </select>
        </div>

        <p id="contador-noticias" className="contador" aria-live="polite">
          Mostrando {noticiasFiltradas.length} de {dadosNoticias.length} notícias
        </p>

        <div className="grade-noticias" style={{ marginTop: "1.5rem" }}>
          {noticiasFiltradas.map((noticia) => {
            const isExp = !!expandidas[noticia.id];
            return (
              <article key={noticia.id} className="cartao-noticia">
                <img
                  className="imagem-noticia img-responsiva"
                  src={noticia.imagem}
                  alt={noticia.descricaoImagem}
                />
                <div className="conteudo-noticia">
                  <span className="data-noticia">{noticia.data}</span> |{" "}
                  <span className="categoria-noticia">{noticia.categoria}</span>
                  <h3>{noticia.titulo}</h3>
                  <p>{noticia.resumo}</p>

                  <button
                    type="button"
                    className="botao-secundario"
                    onClick={() => toggleExpandir(noticia.id)}
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
      </section>
    </main>
  );
}

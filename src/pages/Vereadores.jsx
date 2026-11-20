import { useState } from "react";
import { Link } from "react-router-dom";

const dadosVereadores = [
  {
    id: "jaiminho",
    nome: "Jaiminho, O Carteiro",
    cargo: "1º Secretário",
    partido: "Partido da Fadiga Zero (PFZ)",
    foto: "/assets/img/jaiminho.jpeg",
    telefone: "(00) 1234-5601",
    email: "jaiminho@tangamandapio.leg.mx",
    biografia: "Carteiro de Tangamandápio há mais de 30 anos. Defende melhores condições de trabalho para os servidores dos correios e a construção de ciclovias na cidade."
  },
  {
    id: "seu-barriga",
    nome: "Seu Barriga",
    cargo: "Vice-presidente",
    partido: "Partido dos Proprietários da Vila (PPV)",
    foto: "/assets/img/seu_barriga.jpg",
    telefone: "(00) 1234-5602",
    email: "seubarriga@tangamandapio.leg.mx",
    biografia: "Empresário e proprietário da vila. Seus projetos tratam da regularização de aluguéis e da conservação dos imóveis do município."
  },
  {
    id: "seu-madruga",
    nome: "Seu Madruga",
    cargo: "Vereador",
    partido: "Partido do Trabalhador Autônomo (PTA)",
    foto: "/assets/img/seu_madruga.png",
    telefone: "(00) 1234-5603",
    email: "seumadruga@tangamandapio.leg.mx",
    biografia: "Trabalhador autônomo, já foi sapateiro, carpinteiro e vendedor de churros. Luta pela geração de empregos e pelo parcelamento de dívidas dos moradores."
  },
  {
    id: "professor-girafales",
    nome: "Professor Girafales",
    cargo: "Presidente",
    partido: "Partido da Educação (PE)",
    foto: "/assets/img/professor_girafales.png",
    telefone: "(00) 1234-5604",
    email: "girafales@tangamandapio.leg.mx",
    biografia: "Professor da escola municipal há muitos anos. É autor de projetos voltados para a educação, a leitura e a reforma das escolas da cidade."
  }
];

export default function Vereadores() {
  const [busca, setBusca] = useState("");
  const [expandidos, setExpandidos] = useState({});

  const toggleExpandir = (id) => {
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const vereadoresFiltrados = dadosVereadores.filter((v) =>
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

        <p id="contador-vereadores" className="contador" aria-live="polite">
          Mostrando {vereadoresFiltrados.length} de {dadosVereadores.length} vereadores
        </p>

        <div id="grade-vereadores" className="grade-vereadores">
          {vereadoresFiltrados.map((v) => {
            const isExp = !!expandidos[v.id];
            return (
              <article key={v.id} className="cartao-vereador" id={v.id}>
                <img className="img-responsiva" src={v.foto} alt={`Foto do Vereador ${v.nome}`} />
                <div className="info-vereador">
                  <h3>{v.nome}</h3>
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
      </section>
    </main>
  );
}

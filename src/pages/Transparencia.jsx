import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Transparencia() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  useEffect(() => {
    async function carregarLicitacoes() {
      try {
        setCarregando(true);
        const resposta = await fetch("/data/licitacoes.json");
        if (!resposta.ok) {
          throw new Error(`Falha na requisição: status ${resposta.status}`);
        }
        const dados = await resposta.json();
        setLicitacoes(dados);
      } catch (err) {
        console.error("Erro ao buscar licitações:", err);
        setErro("Não foi possível carregar os dados das licitações no momento.");
      } finally {
        setCarregando(false);
      }
    }
    carregarLicitacoes();
  }, []);

  const licitacoesFiltradas = licitacoes.filter((item) => {
    if (filtroStatus === "todos") return true;
    return item.status === filtroStatus;
  });

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Transparência</span>
      </nav>

      <section className="conteiner" aria-labelledby="titulo-transparencia">
        <h2 id="titulo-transparencia" className="titulo-secao">Portal da Transparência</h2>
        <p className="subtitulo-secao">Acesso à informação, prestação de contas e controle social do poder legislativo</p>

        <h3 className="titulo-secao" style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}>Câmara em Números</h3>
        <p className="subtitulo-secao">Transparência e eficiência na gestão pública de Tangamandápio</p>

        <div className="grade-numeros">
          <div className="cartao-numero">
            <span className="valor-numero">42</span>
            <p className="descricao-numero">Projetos de Lei aprovados em 2026</p>
          </div>
          <div className="cartao-numero">
            <span className="valor-numero">105</span>
            <p className="descricao-numero">Cidadãos atendidos pela Ouvidoria</p>
          </div>
          <div className="cartao-numero">
            <span className="valor-numero">R$ 15M</span>
            <p className="descricao-numero">Orçamento anual da Câmara</p>
          </div>
          <div className="cartao-numero">
            <span className="valor-numero">28</span>
            <p className="descricao-numero">Decretos publicados em 2026</p>
          </div>
        </div>
      </section>

      <section className="conteiner" style={{ marginTop: "2rem" }} aria-labelledby="titulo-licitacoes">
        <h2 id="titulo-licitacoes" className="titulo-secao">Demonstrativo de Licitações Recentes</h2>
        <p className="subtitulo-secao">Acompanhe as contratações públicas e aquisições de materiais</p>

        <div className="filtro">
          <label htmlFor="filtro-status-licitacao">Filtrar por status</label>
          <select
            id="filtro-status-licitacao"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="Concluída">Concluída</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Homologada">Homologada</option>
          </select>
        </div>

        {carregando && (
          <p className="contador" style={{ color: "#15803d", fontWeight: "bold" }}>
            Carregando licitações da Câmara Municipal via Fetch API...
          </p>
        )}

        {erro && (
          <p className="contador" style={{ color: "#b91c1c" }}>
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <>
            <p id="contador-licitacoes" className="contador" aria-live="polite">
              Mostrando {licitacoesFiltradas.length} de {licitacoes.length} licitações
            </p>

            <div className="tabela-responsiva">
              <table className="tabela-dados">
                <thead>
                  <tr>
                    <th>Processo</th>
                    <th>Objeto</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="corpo-tabela-licitacoes">
                  {licitacoesFiltradas.map((lic, idx) => (
                    <tr key={idx}>
                      <td><strong>{lic.processo}</strong></td>
                      <td>{lic.objeto}</td>
                      <td>{lic.valor}</td>
                      <td>{lic.data}</td>
                      <td>
                        <span className={`status-tag status-${lic.status.toLowerCase().replace(" ", "-")}`}>
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

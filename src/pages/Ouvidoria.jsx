import { useState } from "react";
import { Link } from "react-router-dom";

export default function Ouvidoria() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("Sugestão");
  const [mensagem, setMensagem] = useState("");
  const [dica, setDica] = useState("");
  const [statusEnvio, setStatusEnvio] = useState("");
  const [manifestacoes, setManifestacoes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      setStatusEnvio("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const nova = {
      id: Date.now(),
      nome,
      email,
      assunto,
      mensagem,
      data: new Date().toLocaleDateString("pt-BR")
    };

    setManifestacoes([nova, ...manifestacoes]);
    setStatusEnvio("Manifestação protocolada com sucesso na Câmara!");
    setNome("");
    setEmail("");
    setMensagem("");
  };

  const handleRemover = (id) => {
    setManifestacoes(manifestacoes.filter((m) => m.id !== id));
  };

  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Ouvidoria</span>
      </nav>

      <section className="secao-ouvidoria conteiner" aria-labelledby="titulo-ouvidoria">
        <h2 id="titulo-ouvidoria" className="titulo-secao">Ouvidoria</h2>
        <p className="subtitulo-secao">Envie sua sugestão, reclamação, elogio ou pedido de informação para a Câmara Municipal</p>

        <form id="formulario-ouvidoria" className="formulario-ouvidoria" onSubmit={handleSubmit}>
          {dica && <p id="dica" className="dica" aria-live="polite">{dica}</p>}
          {statusEnvio && (
            <p style={{ padding: "0.8rem", background: "#e0f2fe", color: "#0369a1", borderRadius: "4px", marginBottom: "1rem" }}>
              {statusEnvio}
            </p>
          )}

          <label htmlFor="nome">Nome *</label>
          <input
            id="nome"
            type="text"
            name="nome"
            placeholder="Ex.: Maria da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onFocus={() => setDica("Informe seu nome completo para registro do protocolo.")}
            onBlur={() => setDica("")}
            required
          />

          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="seunome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setDica("Informe um e-mail válido para receber a resposta.")}
            onBlur={() => setDica("")}
            required
          />

          <label htmlFor="assunto">Assunto</label>
          <select
            id="assunto"
            name="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
          >
            <option value="Sugestão">Sugestão</option>
            <option value="Reclamação">Reclamação</option>
            <option value="Elogio">Elogio</option>
            <option value="Informação">Pedido de Informação (e-SIC)</option>
          </select>

          <label htmlFor="mensagem">Mensagem *</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="5"
            placeholder="Descreva detalhadamente sua manifestação..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onFocus={() => setDica("Evite a fadiga: seja claro e objetivo em sua solicitação.")}
            onBlur={() => setDica("")}
            required
          />
          <p id="contador-caracteres" style={{ fontSize: "0.85rem", color: "#666", textAlign: "right" }}>
            {mensagem.length} caracteres digitados
          </p>

          <button id="enviar-formulario" className="botao-primario" type="submit" style={{ marginTop: "1rem" }}>
            Enviar Manifestação
          </button>
        </form>

        <section style={{ marginTop: "2.5rem" }}>
          <h3 className="titulo-secao" style={{ fontSize: "1.3rem" }}>Manifestações Registradas</h3>
          {manifestacoes.length === 0 ? (
            <p id="sem-manifestacoes" style={{ color: "#666", fontStyle: "italic", marginTop: "1rem" }}>
              Nenhuma manifestação registrada nesta sessão.
            </p>
          ) : (
            <div id="lista-manifestacoes" style={{ marginTop: "1rem" }}>
              {manifestacoes.map((m) => (
                <article key={m.id} className="bloco-institucional" style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h4>{m.assunto} — {m.nome}</h4>
                    <p style={{ fontSize: "0.85rem", color: "#666" }}>Protocolado em {m.data} ({m.email})</p>
                    <p style={{ marginTop: "0.5rem" }}>{m.mensagem}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemover(m.id)}
                    className="botao-secundario"
                    style={{ marginLeft: "1rem", color: "#b91c1c" }}
                  >
                    Excluir
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

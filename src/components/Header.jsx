import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Header() {
  const [termoBusca, setTermoBusca] = useState("");
  const [mensagemBusca, setMensagemBusca] = useState("");
  const [tamanhoFonte, setTamanhoFonte] = useState(16);

  useEffect(() => {
    const salva = localStorage.getItem("tamanhoFonte");
    if (salva) {
      const valor = parseInt(salva, 10);
      setTamanhoFonte(valor);
      document.documentElement.style.fontSize = `${valor}px`;
    }
  }, []);

  const alterarFonte = (delta) => {
    setTamanhoFonte((prev) => {
      const novo = Math.min(22, Math.max(12, prev + delta));
      document.documentElement.style.fontSize = `${novo}px`;
      localStorage.setItem("tamanhoFonte", novo.toString());
      return novo;
    });
  };

  const handleBusca = (e) => {
    e.preventDefault();
    if (!termoBusca.trim()) {
      setMensagemBusca("Digite um termo para pesquisar no portal.");
    } else {
      setMensagemBusca(`Buscando por: "${termoBusca}" no portal.`);
    }
  };

  return (
    <header id="topo" className="cabecalho-principal">
      <div className="barra-acessibilidade">
        <div className="conteiner">
          <button
            id="diminuir-fonte"
            type="button"
            aria-label="Diminuir tamanho da fonte"
            onClick={() => alterarFonte(-2)}
          >
            A-
          </button>
          <button
            id="aumentar-fonte"
            type="button"
            aria-label="Aumentar tamanho da fonte"
            onClick={() => alterarFonte(2)}
          >
            A+
          </button>
        </div>
      </div>

      <div className="barra-topo conteiner">
        <div className="logomarca">
          <div className="logomarca-texto">
            <h1>Câmara Municipal de Tangamandápio</h1>
          </div>
        </div>

        <div className="caixa-busca">
          <form className="formulario-busca" onSubmit={handleBusca}>
            <label className="oculto-visualmente" htmlFor="campo-busca">
              Buscar no portal
            </label>
            <input
              id="campo-busca"
              type="search"
              name="q"
              placeholder="Buscar no portal..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
            <button type="submit" aria-label="Realizar busca">
              <img
                className="icone-lupa"
                src="/assets/img/lupa.png"
                width="23"
                height="23"
                alt="Ícone de Lupa"
              />
            </button>
          </form>
        </div>
      </div>

      <Navbar />
      {mensagemBusca && (
        <p id="mensagem-busca" className="mensagem-busca" aria-live="polite">
          {mensagemBusca}
        </p>
      )}
    </header>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookies";
import { storage } from "../utils/storage";

export default function Footer() {
  const [visitas, setVisitas] = useState(1);
  const [ultimaVisita, setUltimaVisita] = useState("");

  useEffect(() => {
    let cont = parseInt(getCookie("quantidadeVisitas") || "0", 10);
    const jaContou = storage.getSession("visitaContada");

    if (!jaContou) {
      cont += 1;
      setCookie("quantidadeVisitas", cont.toString(), 365);
      storage.setSession("visitaContada", "true");
    }

    setVisitas(cont);

    const uv = getCookie("ultimaVisita");
    if (uv) {
      setUltimaVisita(uv);
    } else {
      const hoje = new Date().toLocaleDateString("pt-BR");
      setCookie("ultimaVisita", hoje, 365);
      setUltimaVisita(hoje);
    }
  }, []);

  return (
    <footer className="rodape-principal">
      <div className="conteiner grade-rodape">
        <div className="coluna-rodape">
          <h4>Sobre a Câmara Municipal</h4>
          <p>
            Tangamandápio é uma cidadezinha aconchegante e pacata. A Câmara Municipal é o poder legislativo do município, responsável por elaborar leis e fiscalizar o executivo, sempre procurando evitar a fadiga.
          </p>
        </div>

        <div className="coluna-rodape">
          <h4>Links úteis</h4>
          <ul>
            <li><Link to="/transparencia">Portal da Transparência</Link></li>
            <li><Link to="/ouvidoria">e-SIC</Link></li>
            <li><Link to="/legislacao">Diário Oficial</Link></li>
            <li><Link to="/transparencia">Licitações</Link></li>
            <li><Link to="/ouvidoria">Ouvidoria</Link></li>
          </ul>
        </div>

        <div className="coluna-rodape">
          <h4>Transparência</h4>
          <ul>
            <li><Link to="/institucional">LGPD</Link></li>
            <li><Link to="/transparencia">Acesso à Informação</Link></li>
            <li><Link to="/ouvidoria">Carta de Serviços</Link></li>
            <li><Link to="/institucional">Política de Privacidade</Link></li>
          </ul>
        </div>

        <div className="coluna-rodape">
          <h4>Contato</h4>
          <address>
            <p>Praça Principal, S/N - Centro<br />Tangamandápio - MX</p>
            <p>(00) 1234-5678</p>
            <p><a href="mailto:contato@tangamandapio.leg.mx">contato@tangamandapio.leg.mx</a></p>
            <p>Terça a Quinta, 10h às 13h</p>
          </address>
        </div>
      </div>
      <div className="rodape-inferior">
        <p>&copy; 2026 Câmara Municipal de Tangamandápio. Todos os direitos reservados para evitar a fadiga.</p>
        <p id="info-visita">
          Visitas registradas: <strong>{visitas}</strong> {ultimaVisita && `| Última visita: ${ultimaVisita}`}
        </p>
      </div>
    </footer>
  );
}

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookies";

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aceitou = getCookie("aceitouCookies");
    if (!aceitou) {
      setVisivel(true);
    }
  }, []);

  const handleAceitar = () => {
    setCookie("aceitouCookies", "true", 365);
    setCookie("ultimaVisita", new Date().toLocaleDateString("pt-BR"), 365);
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div id="aviso-cookies" className="aviso-cookies">
      <p>Este site utiliza cookies para guardar informações sobre a sua visita e melhorar sua experiência.</p>
      <button id="aceitar-cookies" className="botao-primario" type="button" onClick={handleAceitar}>
        Aceitar
      </button>
    </div>
  );
}

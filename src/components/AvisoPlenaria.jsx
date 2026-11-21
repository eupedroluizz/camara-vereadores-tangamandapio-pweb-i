import { useState, useEffect } from "react";
import { storage } from "../utils/storage";

export default function AvisoPlenaria() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const fechado = storage.getSession("avisoFechado");
    if (fechado === "true") {
      setVisivel(false);
    }
  }, []);

  const fechar = () => {
    storage.setSession("avisoFechado", "true");
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div id="aviso" className="aviso conteiner">
      <p>
        <strong>Aviso:</strong> a próxima sessão ordinária acontece na quinta-feira, às 10h, no plenário da Câmara. A sessão é aberta ao público.
      </p>
      <button
        id="fechar-aviso"
        className="fechar-aviso"
        type="button"
        aria-label="Fechar aviso"
        onClick={fechar}
      >
        X
      </button>
    </div>
  );
}

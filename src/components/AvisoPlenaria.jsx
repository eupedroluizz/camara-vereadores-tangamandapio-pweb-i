import React, { useState } from "react";

export default function AvisoPlenaria() {
  const [visivel, setVisivel] = useState(true);

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
        onClick={() => setVisivel(false)}
      >
        X
      </button>
    </div>
  );
}

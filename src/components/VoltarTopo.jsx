import { useState, useEffect } from "react";

export default function VoltarTopo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const monitorarScroll = () => {
      if (window.scrollY > 300) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    };

    window.addEventListener("scroll", monitorarScroll);
    return () => window.removeEventListener("scroll", monitorarScroll);
  }, []);

  const voltarAoTopo = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      id="voltar-topo"
      className={`voltar-topo ${visivel ? "visivel" : ""}`}
      href="#topo"
      aria-label="Voltar ao topo da página"
      onClick={voltarAoTopo}
    >
      &uarr;
    </a>
  );
}

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VoltarTopo from "./components/VoltarTopo";
import Inicio from "./pages/Inicio";
import Institucional from "./pages/Institucional";
import Noticias from "./pages/Noticias";
import Vereadores from "./pages/Vereadores";
import MesaDiretora from "./pages/MesaDiretora";
import Legislacao from "./pages/Legislacao";
import Transparencia from "./pages/Transparencia";
import Ouvidoria from "./pages/Ouvidoria";

export default function App() {
  return (
    <div className="site-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/institucional" element={<Institucional />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/vereadores" element={<Vereadores />} />
        <Route path="/mesa-diretora" element={<MesaDiretora />} />
        <Route path="/legislacao" element={<Legislacao />} />
        <Route path="/transparencia" element={<Transparencia />} />
        <Route path="/ouvidoria" element={<Ouvidoria />} />
      </Routes>
      <Footer />
      <VoltarTopo />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import AvisoPlenaria from "../components/AvisoPlenaria";

export default function Inicio() {
  return (
    <main>
      <AvisoPlenaria />

      <section id="vereadores" className="secao-vereadores conteiner" aria-labelledby="titulo-vereadores">
        <h2 id="titulo-vereadores" className="titulo-secao">Nossos Vereadores</h2>
        <p className="subtitulo-secao">Conheça os representantes do poder legislativo municipal</p>

        <div className="grade-vereadores">
          <article className="cartao-vereador">
            <img className="img-responsiva" src="/assets/img/jaiminho.jpeg" alt="Foto do Vereador Jaiminho" />
            <div className="info-vereador">
              <h3>Jaiminho, O Carteiro</h3>
              <Link className="botao-primario" to="/vereadores">Ver Perfil</Link>
            </div>
          </article>

          <article className="cartao-vereador">
            <img className="img-responsiva" src="/assets/img/seu_barriga.jpg" alt="Foto do Vereador Seu Barriga" />
            <div className="info-vereador">
              <h3>Seu Barriga</h3>
              <Link className="botao-primario" to="/vereadores">Ver Perfil</Link>
            </div>
          </article>

          <article className="cartao-vereador">
            <img className="img-responsiva" src="/assets/img/seu_madruga.png" alt="Foto do Vereador Seu Madruga" />
            <div className="info-vereador">
              <h3>Seu Madruga</h3>
              <Link className="botao-primario" to="/vereadores">Ver Perfil</Link>
            </div>
          </article>

          <article className="cartao-vereador">
            <img className="img-responsiva" src="/assets/img/professor_girafales.png" alt="Foto do Vereador Professor Girafales" />
            <div className="info-vereador">
              <h3>Professor Girafales</h3>
              <Link className="botao-primario" to="/vereadores">Ver Perfil</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="secao-noticias conteiner" aria-labelledby="titulo-noticias">
        <h2 id="titulo-noticias" className="titulo-secao">Últimas Notícias</h2>
        <p className="subtitulo-secao">Fique por dentro das atividades da Câmara Municipal para evitar a fadiga</p>

        <div className="grade-noticias">
          <article className="cartao-noticia">
            <img className="imagem-noticia img-responsiva" src="/assets/img/news1.jpg" alt="Fotografia de crianças evitando a fadiga na escola" />
            <div className="conteudo-noticia">
              <span className="data-noticia">23/09/2026</span> | <span className="categoria-noticia">Notícias do Legislativo</span>
              <h3><Link to="/noticias">Projeto de Lei institui o "Dia Municipal de Evitar a Fadiga"</Link></h3>
              <p>A câmara aprovou por unanimidade o novo feriado municipal, incentivando o descanso dos trabalhadores locais.</p>
            </div>
          </article>

          <article className="cartao-noticia">
            <img className="imagem-noticia img-responsiva" src="/assets/img/news2.jpeg" alt="Fotografia da praça principal de Tangamandápio com novas bicicletas" />
            <div className="conteudo-noticia">
              <span className="data-noticia">21/09/2026</span> | <span className="categoria-noticia">Infraestrutura</span>
              <h3><Link to="/noticias">Nova frota de bicicletas para a equipe dos correios</Link></h3>
              <p>O poder legislativo municipal aprovou o orçamento para aquisição de bicicletas com marcha para facilitar as entregas.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="secao-numeros fundo-claro">
        <div className="conteiner">
          <h2 className="titulo-secao">Câmara em Números</h2>
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
        </div>
      </section>
    </main>
  );
}

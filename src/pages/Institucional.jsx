import { Link } from "react-router-dom";

export default function Institucional() {
  return (
    <main>
      <nav className="caminho-navegacao conteiner" aria-label="Navegação estrutural">
        <Link to="/">Início</Link> / <span>Institucional</span>
      </nav>

      <section className="conteiner secao-institucional" aria-labelledby="titulo-institucional">
        <h2 id="titulo-institucional" className="titulo-secao">Institucional</h2>
        <p className="subtitulo-secao">Conheça a história, a missão e a estrutura da Câmara Municipal de Tangamandápio</p>

        <article className="bloco-institucional">
          <h3>Sobre a Câmara</h3>
          <p>
            A Câmara Municipal de Tangamandápio é a instituição responsável pelo Poder Legislativo no âmbito municipal.
            Composta por representantes eleitos democraticamente pelo povo, tem como atribuições primordiais legislar
            sobre matérias de interesse local e fiscalizar os atos e contas do Poder Executivo, zelando sempre pelo
            bem-estar de todos os cidadãos para evitar qualquer fadiga desnecessária.
          </p>
        </article>

        <article className="bloco-institucional">
          <h3>História de Tangamandápio</h3>
          <p>
            Fundada em tempos memoráveis entre colinas pacatas e campos verdejantes, Tangamandápio orgulha-se de sua
            identidade acolhedora e bucólica. Seus cidadãos sempre prezaram pelo diálogo sereno, pela cultura comunitária
            e pelo respeito aos serviços públicos, tendo como figura lendária seus dedicados carteiros e educadores.
          </p>
        </article>

        <div className="grade-institucional">
          <article className="cartao-missao">
            <h3>Missão</h3>
            <p>
              Representar a sociedade de Tangamandápio com integridade e transparência, elaborando leis que promovam o
              desenvolvimento social sustentável, com equilíbrio entre deveres cívicos e qualidade de vida.
            </p>
          </article>

          <article className="cartao-missao">
            <h3>Visão</h3>
            <p>
              Ser referência legislativa estadual em eficiência, proximidade com a população e modernização de seus
              serviços de atendimento, sem burocracias e sem fadiga.
            </p>
          </article>

          <article className="cartao-missao">
            <h3>Valores</h3>
            <ul>
              <li>Transparência irrestrita e respeito à coisa pública</li>
              <li>Compromisso com as demandas da comunidade</li>
              <li>Valorização do servidor e do carteiro municipal</li>
              <li>Eficiência e tranquilidade no atendimento</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

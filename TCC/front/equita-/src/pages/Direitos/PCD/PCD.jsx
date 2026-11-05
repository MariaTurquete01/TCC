import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./PCD.module.css";

function PCD() {
  return (
    <>
      <Navbar />

      <section className={styles.pcdPage}>
        <div className={styles.pcdHero}>
          <span className={styles.badge}>
            Pessoas com Deficiência
          </span>

          <h1>
            Inclusão, acessibilidade e igualdade para todos
          </h1>

          <p>
            Conheça os direitos das pessoas com deficiência, as garantias de
            inclusão e os caminhos para buscar proteção e apoio.
          </p>
        </div>

        <section className={styles.contentCard}>
          <h2>📖 O que é Pessoa com Deficiência (PCD)?</h2>

          <p>
            Pessoa com deficiência é aquela que possui impedimentos de longo
            prazo de natureza física, mental, intelectual ou sensorial que,
            quando encontram barreiras na sociedade, podem limitar sua
            participação plena e efetiva em igualdade de condições com as demais
            pessoas.
          </p>

          <p>
            A deficiência não está apenas na condição individual da pessoa, mas
            também na relação com o ambiente e com as barreiras existentes,
            como falta de acessibilidade, preconceito ou ausência de adaptações.
          </p>

          <p>
            A legislação brasileira reconhece que pessoas com deficiência têm
            direito à autonomia, independência, participação social e igualdade
            de oportunidades.
          </p>
        </section>

        <section className={styles.contentCard}>
          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A Lei Brasileira de Inclusão da Pessoa com Deficiência garante
            direitos fundamentais para promover igualdade e combater qualquer
            forma de discriminação.
          </p>

          <ul>
            <li>
              Direito à acessibilidade em espaços públicos e privados.
            </li>

            <li>
              Direito à educação inclusiva e atendimento adequado.
            </li>

            <li>
              Direito ao atendimento prioritário.
            </li>

            <li>
              Direito à saúde e acompanhamento especializado.
            </li>

            <li>
              Direito ao trabalho e inclusão profissional.
            </li>

            <li>
              Direito ao transporte acessível.
            </li>

            <li>
              Direito à comunicação acessível.
            </li>

            <li>
              Direito à participação política e social.
            </li>

            <li>
              Direito à proteção contra negligência, violência e exploração.
            </li>

            <li>
              Direito à igualdade e respeito à dignidade humana.
            </li>
          </ul>
        </section>

        <section className={styles.contentCard}>
          <h2>♿ Tipos de Acessibilidade</h2>

          <p>
            A acessibilidade permite que pessoas com deficiência participem da
            sociedade com autonomia e segurança.
          </p>

          <div className={styles.grid}>
            <div className={styles.item}>
              <h3>Acessibilidade Física</h3>

              <p>
                Envolve rampas, elevadores, banheiros adaptados, calçadas
                acessíveis e espaços planejados para diferentes necessidades.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Acessibilidade Digital</h3>

              <p>
                Garante que sites, aplicativos e tecnologias possam ser usados
                por todas as pessoas, incluindo recursos como leitores de tela.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Acessibilidade Comunicacional</h3>

              <p>
                Inclui Libras, legendas, audiodescrição e outras formas de
                comunicação acessível.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Acessibilidade Atitudinal</h3>

              <p>
                Combate preconceitos, estereótipos e atitudes que dificultam a
                inclusão das pessoas com deficiência.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contentCard}>
          <h2>🌎 Temas Frequentes</h2>

          <div className={styles.grid}>
            <div className={styles.item}>
              <h3>Educação Inclusiva</h3>

              <p>
                Garante que estudantes com deficiência tenham acesso à escola
                regular com recursos e apoio necessários.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Mercado de Trabalho</h3>

              <p>
                Empresas devem promover inclusão profissional e respeitar as
                capacidades das pessoas com deficiência.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Mobilidade</h3>

              <p>
                Envolve transporte adaptado, acessibilidade urbana e autonomia
                para deslocamento.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Tecnologia Assistiva</h3>

              <p>
                São recursos e equipamentos que ajudam pessoas com deficiência a
                realizarem atividades com mais independência.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Combate ao Capacitismo</h3>

              <p>
                O capacitismo é o preconceito baseado na ideia de que pessoas
                com deficiência são inferiores ou incapazes.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Vida Independente</h3>

              <p>
                Incentiva autonomia, escolhas pessoais e participação ativa na
                sociedade.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contentCard}>
          <h2>🛟 O que fazer em caso de violação de direitos?</h2>

          <p>
            Caso uma pessoa com deficiência sofra discriminação, falta de
            acessibilidade ou qualquer forma de violência, é importante buscar
            orientação e registrar a situação.
          </p>

          <ol>
            <li>
              Reúna informações e provas da situação ocorrida.
            </li>

            <li>
              Procure órgãos de defesa dos direitos.
            </li>

            <li>
              Busque orientação jurídica quando necessário.
            </li>

            <li>
              Registre denúncias pelos canais oficiais.
            </li>

            <li>
              Procure serviços de assistência social e apoio especializado.
            </li>
          </ol>
        </section>

        <section className={styles.contentCard}>
          <h2>🏛️ Onde Buscar Ajuda?</h2>

          <p>
            Existem diversos serviços públicos e instituições que oferecem
            orientação e proteção aos direitos das pessoas com deficiência.
          </p>

          <ul>
            <li>
              Disque Direitos Humanos - 100.
            </li>

            <li>
              Defensoria Pública.
            </li>

            <li>
              Ministério Público.
            </li>

            <li>
              Centros de Referência da Assistência Social (CRAS).
            </li>

            <li>
              Centros Especializados de Assistência Social (CREAS).
            </li>

            <li>
              Conselhos Municipais dos Direitos da Pessoa com Deficiência.
            </li>
          </ul>
        </section>

        <section className={styles.contentCard}>
          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações desta página foram organizadas com base na legislação
            brasileira e em normas relacionadas aos direitos humanos e inclusão.
          </p>

          <div className={styles.referenceCategory}>
            <div className={styles.referenceItem}>
              <h4>Lei Brasileira de Inclusão (LBI)</h4>

              <p>
                Estabelece direitos e garantias para promover inclusão e
                acessibilidade das pessoas com deficiência.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>
            </div>

            <div className={styles.referenceItem}>
              <h4>Constituição Federal de 1988</h4>

              <p>
                Garante igualdade, dignidade e proteção contra discriminação.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3>📌 Importante</h3>

            <p>
              Este conteúdo possui finalidade educativa e informativa e não
              substitui atendimento jurídico ou especializado.
            </p>
          </div>
        </section>

        <section className={styles.actionsSection}>
          <h2>
            O que deseja fazer agora?
          </h2>

          <div className={styles.actionsGrid}>
            <Link
              to="/direitos"
              className={styles.actionCard}
            >
              ⚖️ Voltar para Direitos
            </Link>

            <Link
              to="/recursos"
              className={styles.actionCard}
            >
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link
              to="/cursos"
              className={styles.actionCard}
            >
              🎓 Cursos Relacionados
            </Link>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default PCD;

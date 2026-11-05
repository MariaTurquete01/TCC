import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./mulheres.module.css";

function Mulheres() {
  return (
    <>
      <Navbar />

      <section className={styles["women-page"]}>

        <div className={styles["women-hero"]}>

          <span className={styles.badge}>
            Direitos das Mulheres
          </span>

          <h1>
            Informação, proteção e igualdade para todas as mulheres
          </h1>

          <p>
            Conheça seus direitos, identifique situações de violência,
            discriminação e saiba onde buscar proteção, apoio e orientação.
          </p>

        </div>

        <section className={styles["content-card"]}>

          <h2>📖 O que são os Direitos das Mulheres?</h2>

          <p>
            Os Direitos das Mulheres representam um conjunto de garantias
            destinadas a assegurar igualdade, liberdade, segurança, dignidade e
            oportunidades para todas as mulheres.
          </p>

          <p>
            Esses direitos existem para combater desigualdades históricas e
            garantir que mulheres tenham acesso pleno à educação, saúde,
            trabalho, justiça, participação social e autonomia sobre suas
            próprias escolhas.
          </p>

          <p>
            A proteção dos direitos das mulheres envolve prevenir e combater
            todas as formas de violência, discriminação, abuso e desigualdade,
            promovendo uma sociedade baseada no respeito e na igualdade.
          </p>

          <p>
            A legislação brasileira garante proteção em diversas áreas, como
            família, trabalho, maternidade, saúde, segurança, participação
            política e liberdade individual.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A legislação brasileira reconhece diversos direitos fundamentais
            para garantir que mulheres possam viver com segurança, autonomia e
            igualdade.
          </p>

          <ul>

            <li>
              Direito à igualdade de direitos e oportunidades entre homens e
              mulheres.
            </li>

            <li>
              Direito à vida, segurança e proteção contra qualquer forma de
              violência.
            </li>

            <li>
              Direito à integridade física, psicológica, moral e sexual.
            </li>

            <li>
              Direito ao acesso à justiça e aos mecanismos de proteção do Estado.
            </li>

            <li>
              Direito à saúde integral, incluindo atendimento médico e
              psicológico.
            </li>

            <li>
              Direito à saúde sexual e reprodutiva e ao planejamento familiar.
            </li>

            <li>
              Direito à educação livre de discriminação.
            </li>

            <li>
              Direito ao trabalho digno e igualdade profissional.
            </li>

            <li>
              Direito à igualdade salarial para funções equivalentes.
            </li>

            <li>
              Direito à proteção durante a gravidez e maternidade.
            </li>

            <li>
              Direito à autonomia financeira e liberdade de administrar seus
              próprios recursos.
            </li>

            <li>
              Direito à participação política e ocupação de espaços de decisão.
            </li>

            <li>
              Direito à proteção contra violência e perseguição digital.
            </li>

            <li>
              Direito ao respeito à privacidade, dignidade e liberdade.
            </li>

          </ul>

        </section>

        <section className={styles["content-card"]}>

          <p>
            Conhecer os direitos é uma forma de prevenção e proteção. Muitas
            situações de violência começam com comportamentos de controle,
            ameaças, isolamento ou manipulação.
          </p>

          <h2>👩 Temas Frequentes</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Violência Doméstica</h3>

              <p>
                Inclui agressões físicas, psicológicas, morais, patrimoniais e
                sexuais praticadas dentro de relações familiares ou afetivas.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Lei Maria da Penha</h3>

              <p>
                Criada para prevenir e combater a violência doméstica e garantir
                mecanismos de proteção às mulheres.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Assédio</h3>

              <p>
                Comportamentos abusivos, constrangedores ou invasivos em
                ambientes de trabalho, estudo ou espaços públicos.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Igualdade no Trabalho</h3>

              <p>
                Protege contra discriminação profissional, desigualdade salarial
                e falta de oportunidades.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Maternidade</h3>

              <p>
                Garante direitos relacionados à gestação, licença-maternidade e
                proteção da trabalhadora.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Violência Digital</h3>

              <p>
                Abrange ameaças, exposição de imagens, perseguições e abusos
                cometidos no ambiente virtual.
              </p>

            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>🛟 O que fazer em caso de violência?</h2>

          <p>
            Em situações de violência, a prioridade deve ser garantir a segurança
            da vítima. Sempre que possível, procure afastar-se do agressor e
            buscar um ambiente protegido.
          </p>

          <ol>

            <li>
              Procure um local seguro e peça ajuda a pessoas de confiança.
            </li>

            <li>
              Guarde provas como mensagens, fotos, áudios ou documentos médicos.
            </li>

            <li>
              Procure atendimento médico caso exista agressão física ou sexual.
            </li>

            <li>
              Registre a ocorrência em uma delegacia ou Delegacia da Mulher.
            </li>

            <li>
              Solicite medidas protetivas de urgência quando necessário.
            </li>

            <li>
              Busque apoio psicológico e social.
            </li>

          </ol>

        </section>

        <section className={styles["content-card"]}>

          <h2>🏛️ Onde Buscar Ajuda?</h2>

          <p>
            Existem serviços especializados para orientar, proteger e encaminhar
            mulheres em situações de violência ou violação de direitos.
          </p>

          <ul>

            <li>
              Central de Atendimento à Mulher - Ligue 180.
            </li>

            <li>
              Polícia Militar - Ligue 190 em situações de emergência.
            </li>

            <li>
              Delegacia da Mulher.
            </li>

            <li>
              Defensoria Pública.
            </li>

            <li>
              Ministério Público.
            </li>

            <li>
              Centros de Referência de Atendimento à Mulher.
            </li>

            <li>
              Serviços de assistência social como CRAS e CREAS.
            </li>

          </ul>

        </section>

        <section className={styles["content-card"]}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações desta página foram organizadas com base na legislação
            brasileira e em materiais oficiais relacionados à proteção dos
            direitos das mulheres.
          </p>

          <div className={styles["reference-category"]}>

            <div className={styles["reference-item"]}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Garante igualdade entre homens e mulheres e proteção aos direitos
                fundamentais.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles["reference-item"]}>

              <h4>Lei Maria da Penha</h4>

              <p>
                Estabelece mecanismos para prevenir e combater a violência
                doméstica e familiar contra a mulher.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles["reference-item"]}>

              <h4>Lei da Igualdade Salarial</h4>

              <p>
                Fortalece medidas para garantir igualdade de remuneração entre
                homens e mulheres.
              </p>

              <a
                href="https://www.planalto.gov.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

          </div>

          <div className={styles["info-box"]}>

            <h3>📌 Importante</h3>

            <p>
              Este conteúdo possui finalidade educativa e informativa e não
              substitui atendimento jurídico, psicológico ou profissional
              especializado.
            </p>

          </div>

        </section>

        <section className={styles["actions-section"]}>

          <h2>
            O que deseja fazer agora?
          </h2>

          <div className={styles["actions-grid"]}>

            <Link
              to="/direitos"
              className={styles["action-card"]}
            >
              ⚖️ Voltar para Direitos
            </Link>

            <Link
              to="/recursos"
              className={styles["action-card"]}
            >
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link
              to="/cursos"
              className={styles["action-card"]}
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

export default Mulheres;

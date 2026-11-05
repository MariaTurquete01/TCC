import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./familia.module.css";

function Familia() {
  return (
    <>
      <Navbar />

      <section className={styles["family-page"]}>

        <div className={styles["family-hero"]}>

          <span className={styles.badge}>
            Direitos da Família
          </span>

          <h1>
            Proteção, convivência e responsabilidade familiar
          </h1>

          <p>
            Conheça direitos relacionados à família,
            guarda, pensão alimentícia e convivência.
          </p>

        </div>

        <section className={styles["content-card"]}>

          <h2>📖 O que são os Direitos da Família?</h2>

          <p>
            O Direito de Família é o conjunto de normas que regulamenta as relações
            familiares, garantindo proteção, direitos e deveres entre pais, filhos,
            cônjuges, companheiros e demais integrantes da família.
          </p>

          <p>
            A Constituição Federal reconhece a família como base da sociedade e assegura
            sua proteção pelo Estado. Essas normas buscam promover o respeito, a
            convivência familiar, a igualdade entre seus membros e a proteção de crianças,
            adolescentes, idosos e pessoas em situação de vulnerabilidade.
          </p>

          <p>
            O Direito de Família também trata de situações como casamento, união estável,
            guarda dos filhos, pensão alimentícia, adoção, divórcio e violência
            doméstica.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A legislação brasileira assegura diversos direitos para proteger as relações
            familiares e garantir o desenvolvimento saudável de seus integrantes.
          </p>

          <ul>
            <li>Direito à convivência familiar.</li>
            <li>Igualdade entre homens e mulheres.</li>
            <li>Proteção integral de crianças e adolescentes.</li>
            <li>Direito à pensão alimentícia.</li>
            <li>Direito à guarda e convivência dos filhos.</li>
            <li>Proteção contra violência doméstica.</li>
            <li>Direito ao reconhecimento da união estável.</li>
            <li>Direito à adoção conforme a legislação.</li>
          </ul>

          <p>
            Esses direitos buscam fortalecer os vínculos familiares e garantir proteção aos
            integrantes da família em diferentes situações da vida.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <p>
            Diversas situações do cotidiano envolvem o Direito de Família. Conhecer esses
            temas ajuda na busca pelos órgãos responsáveis quando necessário.
          </p>

          <h2>👨‍👩‍👧 Temas Frequentes</h2>

          <div className={styles.grid}>

            <div className={styles.item}>
              <h3>Guarda</h3>
              <p>
                Define quem será responsável pelos cuidados e decisões relacionadas aos filhos
                menores.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Pensão Alimentícia</h3>
              <p>
                Valor destinado ao sustento, educação, saúde e demais necessidades do
                dependente.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Visitação</h3>
              <p>
                Garante o direito de convivência entre pais, filhos e familiares.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Adoção</h3>
              <p>
                Procedimento legal que estabelece vínculo familiar permanente.
              </p>
            </div>

            <div className={styles.item}>
              <h3>União Estável</h3>
              <p>
                Reconhecimento jurídico da convivência pública, contínua e duradoura.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Divórcio</h3>
              <p>
                Processo que encerra o casamento civil, preservando direitos das partes e dos
                filhos.
              </p>
            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>🛟 O que fazer em caso de conflito familiar?</h2>

          <p>
            Quando surgem conflitos familiares envolvendo guarda, pensão, violência ou
            outras situações que afetem os direitos dos integrantes da família, é importante
            buscar orientação especializada.
          </p>

          <ol>
            <li>Converse com pessoas de confiança.</li>
            <li>Procure orientação jurídica.</li>
            <li>Busque atendimento na Defensoria Pública, caso necessário.</li>
            <li>Em situações envolvendo crianças, procure o Conselho Tutelar.</li>
            <li>Em casos de violência doméstica, acione imediatamente os órgãos competentes.</li>
          </ol>

          <p>
            Resolver conflitos de forma legal e respeitosa contribui para proteger todos os
            membros da família.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>🏛️ Onde Buscar Ajuda?</h2>

          <p>
            Diversos órgãos públicos oferecem atendimento gratuito para orientação jurídica,
            proteção de direitos e encaminhamento de casos familiares.
          </p>

          <ol>
            <li>Defensoria Pública.</li>
            <li>Conselho Tutelar.</li>
            <li>CRAS.</li>
            <li>CREAS.</li>
            <li>Vara da Família.</li>
            <li>Ministério Público.</li>
          </ol>

        </section>

        <section className={styles["content-card"]}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações desta página foram elaboradas com base na legislação brasileira
            e em materiais oficiais relacionados à proteção da família e dos direitos
            humanos.
          </p>

          <div className={styles["reference-category"]}>

            <div className={styles["reference-item"]}>
              <h4>Constituição Federal de 1988</h4>
              <p>
                Reconhece a família como base da sociedade e assegura sua proteção pelo Estado.
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

              <h4>Código Civil Brasileiro</h4>

              <p>
                Dispõe sobre casamento, união estável, guarda, alimentos, adoção e demais
                relações familiares.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles["reference-item"]}>

              <h4>Estatuto da Criança e do Adolescente (ECA)</h4>

              <p>
                Estabelece direitos fundamentais de crianças e adolescentes e a proteção
                integral da convivência familiar.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8069.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles["reference-item"]}>

              <h4>Lei Maria da Penha</h4>

              <p>
                Dispõe sobre mecanismos para prevenir e combater a violência doméstica e
                familiar contra a mulher.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
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
              Este conteúdo possui finalidade educativa e informativa, não substituindo a
              orientação jurídica ou atendimento realizado por profissionais especializados.
            </p>

          </div>

        </section>

        <section className={styles["actions-section"]}>

          <h2>O que deseja fazer agora?</h2>

          <div className={styles["actions-grid"]}>

            <Link to="/direitos" className={styles["action-card"]}>
              ⚖️ Voltar para Direitos
            </Link>

            <Link to="/recursos" className={styles["action-card"]}>
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link to="/cursos" className={styles["action-card"]}>
              🎓 Cursos Relacionados
            </Link>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
}

export default Familia;
